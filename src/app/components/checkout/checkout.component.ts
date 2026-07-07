import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  host: {
    'class': 'contents'
  },
  template: `
    <div class="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto w-full flex flex-col h-full max-h-[800px]">
      <div class="px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
        <h2 class="text-lg font-bold text-slate-900">Checkout</h2>
      </div>
      
      <div class="p-6 flex-1 overflow-y-auto">
        @if (cartService.cartItems().length === 0) {
          <div class="text-center py-12" data-testid="empty-cart-message">
            <svg class="mx-auto h-12 w-12 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l3.6 18h13.5L22 6H6" /></svg>
            <h3 class="text-sm font-bold text-slate-900">Your cart is empty</h3>
            <p class="mt-1 text-sm text-slate-500">Go back to the dashboard to add some products.</p>
          </div>
        } @else {
          <div class="flow-root">
            <ul role="list" class="-my-4 divide-y divide-slate-100" data-testid="checkout-items-list">
              @for (item of cartService.cartItems(); track item.product.id) {
                <li class="py-4 flex items-center" [attr.data-testid]="'cart-item-' + item.product.id">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-slate-900 truncate">{{ item.product.name }}</p>
                    <p class="text-xs text-slate-500 mt-1"><span class="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">{{ item.product.category }}</span></p>
                  </div>
                  <div class="text-right ml-4">
                    <p class="text-sm font-bold text-slate-900">\${{ item.product.price * item.quantity | number:'1.2-2' }}</p>
                    <p class="text-xs text-slate-500 mt-1">Qty: {{ item.quantity }}</p>
                  </div>
                </li>
              }
            </ul>
          </div>
          
          <div class="border-t border-slate-200 mt-6 pt-6 shrink-0">
            <div class="flex justify-between text-sm font-medium text-slate-600 mb-2">
              <p>Total items</p>
              <p data-testid="checkout-total-items">{{ cartService.totalItems() }}</p>
            </div>
            <div class="flex justify-between items-center mb-6">
              <p class="text-base font-bold text-slate-900">Total price</p>
              <p class="text-xl font-bold text-indigo-600" data-testid="checkout-total-price">\${{ cartService.totalPrice() | number:'1.2-2' }}</p>
            </div>
            <button (click)="placeOrder()" class="w-full flex justify-center items-center px-4 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md shadow-indigo-100 hover:bg-indigo-700" data-testid="place-order-btn">
              Place Order
            </button>
          </div>
        }
      </div>
    </div>
  `
})
export class CheckoutComponent {
  cartService = inject(CartService);

  placeOrder() {
    alert('Order placed successfully! This is a mock checkout.');
    this.cartService.clearCart();
  }
}
