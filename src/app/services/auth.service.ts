import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  public currentUser = signal<{ username: string } | null>(null);
  public isLoading = signal(false);
  public error = signal<string | null>(null);

  login(email: string, pass: string) {
    this.isLoading.set(true);
    this.error.set(null);
    
    // Simulate API call delay
    setTimeout(() => {
      this.isLoading.set(false);
      if (email === 'test@test.com' && pass === '123456') {
        this.currentUser.set({ username: 'TestUser' });
        this.router.navigate(['/dashboard']);
      } else {
        this.error.set('Invalid credentials. Please use test@test.com / 123456.');
      }
    }, 1000);
  }

  logout() {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
