import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  host: {
    'class': 'contents'
  },
  template: `
    <div class="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col">
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
        <div class="flex items-center gap-8">
          <a routerLink="/dashboard" class="flex items-center gap-2" data-testid="nav-logo">
            <div class="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">QA</div>
            <span class="font-bold text-lg tracking-tight">E2E Shop</span>
          </a>
          <nav class="hidden sm:flex gap-1">
            <a routerLink="/dashboard" routerLinkActive="!text-indigo-600 !bg-indigo-50" class="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md" data-testid="nav-dashboard">Dashboard</a>
            <a routerLink="/checkout" routerLinkActive="!text-indigo-600 !bg-indigo-50" class="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md" data-testid="nav-checkout">Checkout</a>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <a routerLink="/checkout" class="p-2 text-slate-500 hover:bg-slate-100 rounded-full flex items-center relative" data-testid="header-cart-link">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l3.6 18h13.5L22 6H6" />
              </svg>
              @if (cartService.totalItems() > 0) {
                <span class="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white" data-testid="cart-badge">
                  {{ cartService.totalItems() }}
                </span>
              }
            </a>
          </div>
          <div class="hidden sm:block h-8 w-[1px] bg-slate-200"></div>
          <div class="flex items-center gap-3">
            <div class="text-right hidden sm:block">
              <p class="text-xs font-semibold leading-tight" data-testid="header-username">{{ authService.currentUser()?.username || 'Guest' }}</p>
              <p class="text-[10px] text-slate-500">user&#64;test.com</p>
            </div>
            <button (click)="logout()" class="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded hover:bg-slate-50" data-testid="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 flex flex-col p-6 w-full max-w-7xl mx-auto overflow-hidden">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class LayoutComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);

  logout() {
    this.authService.logout();
  }
}
