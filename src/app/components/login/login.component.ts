import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  host: {
    'class': 'contents'
  },
  template: `
    <div class="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 font-sans text-slate-900">
      <div class="max-w-[400px] w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div class="mb-8 text-center">
          <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg shadow-indigo-200">QA</div>
          <h2 class="text-2xl font-bold tracking-tight text-slate-900">Welcome Back</h2>
          <p class="text-sm text-slate-500 mt-2">
            Use <span class="font-bold text-slate-700">test&#64;test.com</span> / <span class="font-bold text-slate-700">123456</span>
          </p>
        </div>
        
        <form class="space-y-5" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div>
            <label for="email" class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Email address</label>
            <input formControlName="email" id="email" type="email" autocomplete="email" required
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="name@company.com" data-testid="login-email">
          </div>
          <div>
            <label for="password" class="block text-xs font-bold text-slate-500 uppercase mb-1.5">Password</label>
            <input formControlName="password" id="password" type="password" autocomplete="current-password" required
              class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••" data-testid="login-password">
          </div>

          @if (authService.error()) {
            <div class="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 flex items-start gap-2" data-testid="login-error">
              <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{{ authService.error() }}</span>
            </div>
          }

          <button type="submit" [disabled]="loginForm.invalid || authService.isLoading()"
            class="w-full flex justify-center items-center py-2.5 px-4 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md shadow-indigo-100 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="login-submit">
            @if (authService.isLoading()) {
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-testid="login-spinner">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            } @else {
              Sign in
            }
          </button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('test@test.com', [Validators.required, Validators.email]),
    password: new FormControl('123456', Validators.required)
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!);
    }
  }
}
