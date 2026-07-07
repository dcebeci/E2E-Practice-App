import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems = signal<CartItem[]>([]);

  public totalItems = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  public totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  });

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i => i.product.id === product.id 
          ? { ...i, quantity: i.quantity + 1 } 
          : i);
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
