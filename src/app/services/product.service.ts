import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private initialProducts: Product[] = [
    { id: '1', name: 'Wireless Mouse', price: 29.99, category: 'Electronics', stock: 150 },
    { id: '2', name: 'Mechanical Keyboard', price: 89.99, category: 'Electronics', stock: 85 },
    { id: '3', name: '27-inch Monitor', price: 299.99, category: 'Electronics', stock: 32 },
    { id: '4', name: 'USB-C Cable', price: 12.99, category: 'Accessories', stock: 500 },
    { id: '5', name: 'Ergonomic Chair', price: 199.99, category: 'Furniture', stock: 10 },
    { id: '6', name: 'Standing Desk', price: 349.99, category: 'Furniture', stock: 5 },
    { id: '7', name: 'Bluetooth Headphones', price: 149.99, category: 'Electronics', stock: 120 },
    { id: '8', name: 'Webcam 1080p', price: 59.99, category: 'Electronics', stock: 45 },
    { id: '9', name: 'Laptop Stand', price: 34.99, category: 'Accessories', stock: 75 },
    { id: '10', name: 'Mouse Pad', price: 9.99, category: 'Accessories', stock: 300 },
    { id: '11', name: 'External Hard Drive 1TB', price: 65.00, category: 'Storage', stock: 60 },
    { id: '12', name: 'USB Flash Drive 64GB', price: 15.00, category: 'Storage', stock: 200 },
    { id: '13', name: 'Desk Lamp', price: 24.99, category: 'Furniture', stock: 40 },
    { id: '14', name: 'Noise Cancelling Earbuds', price: 199.99, category: 'Electronics', stock: 25 },
    { id: '15', name: 'HDMI Cable 6ft', price: 8.99, category: 'Accessories', stock: 400 },
  ];

  public products = signal<Product[]>(this.initialProducts);

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substring(2, 9)
    };
    this.products.update(prods => [...prods, newProduct]);
  }

  deleteProduct(id: string) {
    this.products.update(prods => prods.filter(p => p.id !== id));
  }
}
