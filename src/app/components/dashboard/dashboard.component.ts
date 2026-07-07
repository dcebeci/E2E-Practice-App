import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  host: {
    'class': 'contents'
  },
  template: `
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3 flex-1 max-w-2xl">
          <div class="relative flex-1">
            <input [formControl]="searchControl" type="text" placeholder="Search products..." class="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" data-testid="search-input">
            <svg class="absolute left-3 top-2.5 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <select [formControl]="categoryControl" class="px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none" data-testid="category-filter">
            <option value="">All Categories</option>
            @for (cat of categories(); track cat) {
              <option [value]="cat">{{ cat }}</option>
            }
          </select>
        </div>
        <button (click)="openAddModal()" class="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 flex items-center gap-2" data-testid="open-add-product-btn">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Add Product
        </button>
      </div>

      <div class="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm min-h-0">
        <div class="overflow-y-auto flex-1">
          <table class="w-full text-left border-collapse table-fixed">
            <thead class="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold sticky top-0 z-10">
              <tr class="h-10">
                <th class="w-16 px-4">ID</th>
                <th class="px-4">Name</th>
                <th class="w-32 px-4 cursor-pointer hover:text-indigo-600" (click)="toggleSort()" data-testid="sort-price-header">
                  Price 
                  @if (sortDirection() === 'asc') {
                    ↑
                  } @else {
                    ↓
                  }
                </th>
                <th class="w-32 px-4">Category</th>
                <th class="w-24 px-4">Stock</th>
                <th class="w-48 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-slate-100">
              @for (product of filteredProducts(); track product.id) {
                <tr class="h-11 hover:bg-slate-50" [attr.data-testid]="'product-row-' + product.id">
                  <td class="px-4 text-slate-400 font-mono text-xs">{{ product.id }}</td>
                  <td class="px-4 font-medium">{{ product.name }}</td>
                  <td class="px-4">\${{ product.price }}</td>
                  <td class="px-4">
                    <span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold">{{ product.category }}</span>
                  </td>
                  <td class="px-4 text-green-600">{{ product.stock }}</td>
                  <td class="px-4 text-right">
                    <button (click)="cartService.addToCart(product)" class="text-indigo-600 hover:underline mr-3" [attr.data-testid]="'add-to-cart-' + product.id">Add to Cart</button>
                    <button (click)="openDeleteModal(product)" class="text-red-500 hover:underline" [attr.data-testid]="'delete-btn-' + product.id">Delete</button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="6" class="px-4 py-8 text-center text-slate-500">No products found.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Toast Notification -->
      @if (toastMessage()) {
        <div class="fixed bottom-6 right-6 px-4 py-3 bg-slate-800 text-white rounded-lg shadow-xl flex items-center gap-3 z-50 animate-bounce" data-testid="toast-message">
          <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
          </div>
          <p class="text-sm font-medium">{{ toastMessage() }}</p>
        </div>
      }
    </div>

    <!-- Add Product Modal -->
    @if (isAddModalOpen()) {
      <div class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8" data-testid="add-product-modal">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Add New Product</h2>
            <button (click)="closeAddModal()" class="text-slate-400 hover:text-slate-600" data-testid="close-modal">✕</button>
          </div>
          <form [formGroup]="addProductForm" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Name</label>
                <input type="text" formControlName="name" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" placeholder="Product name" data-testid="add-name-input">
              </div>
              <div class="col-span-2">
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Category</label>
                <input type="text" formControlName="category" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" placeholder="Category" data-testid="add-category-input">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Price ($)</label>
                <input type="number" formControlName="price" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" placeholder="0.00" data-testid="add-price-input">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Stock</label>
                <input type="number" formControlName="stock" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" placeholder="0" data-testid="add-stock-input">
              </div>
            </div>
            <div class="pt-4 flex gap-3">
              <button type="button" (click)="closeAddModal()" class="flex-1 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200" data-testid="add-cancel-btn">Cancel</button>
              <button type="button" (click)="submitAddProduct()" [disabled]="addProductForm.invalid" class="flex-1 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed" data-testid="add-submit-btn">Create Product</button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Delete Confirmation Modal -->
    @if (isDeleteModalOpen()) {
      <div class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6" data-testid="delete-product-modal">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <svg class="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-900">Delete Product</h2>
              <p class="text-sm text-slate-500 mt-1">Are you sure you want to delete <span class="font-bold text-slate-700">{{ productToDelete()?.name }}</span>?</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button type="button" (click)="closeDeleteModal()" class="flex-1 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200" data-testid="cancel-delete-btn">Cancel</button>
            <button type="button" (click)="confirmDelete()" class="flex-1 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700" data-testid="confirm-delete-btn">Delete</button>
          </div>
        </div>
      </div>
    }
  `
})
export class DashboardComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);

  searchControl = new FormControl('');
  categoryControl = new FormControl('');

  searchQuery = toSignal(this.searchControl.valueChanges.pipe(debounceTime(300)), { initialValue: '' });
  selectedCategory = toSignal(this.categoryControl.valueChanges, { initialValue: '' });
  
  sortDirection = signal<'asc' | 'desc'>('asc');

  isAddModalOpen = signal(false);
  isDeleteModalOpen = signal(false);
  productToDelete = signal<Product | null>(null);
  toastMessage = signal<string | null>(null);

  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
  });

  categories = computed(() => {
    const products = this.productService.products();
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats);
  });

  filteredProducts = computed(() => {
    let prods = this.productService.products();
    const search = (this.searchQuery() || '').toLowerCase();
    const category = this.selectedCategory() || '';
    const sort = this.sortDirection();

    if (search) {
      prods = prods.filter(p => p.name.toLowerCase().includes(search));
    }

    if (category) {
      prods = prods.filter(p => p.category === category);
    }

    prods.sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      return b.price - a.price;
    });

    return prods;
  });

  toggleSort() {
    this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
  }

  showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }

  openAddModal() {
    this.addProductForm.reset({ price: 0, stock: 0 });
    this.isAddModalOpen.set(true);
  }

  closeAddModal() {
    this.isAddModalOpen.set(false);
  }

  submitAddProduct() {
    if (this.addProductForm.valid) {
      const val = this.addProductForm.value;
      this.productService.addProduct({
        name: val.name || '',
        price: val.price || 0,
        stock: val.stock || 0,
        category: val.category || ''
      });
      this.closeAddModal();
      this.showToast('Product added successfully!');
    }
  }

  openDeleteModal(product: Product) {
    this.productToDelete.set(product);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.productToDelete.set(null);
  }

  confirmDelete() {
    const prod = this.productToDelete();
    if (prod) {
      this.productService.deleteProduct(prod.id);
      this.closeDeleteModal();
      this.showToast('Product deleted successfully!');
    }
  }
}
