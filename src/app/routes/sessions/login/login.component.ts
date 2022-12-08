import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as AuthActions from '@core/+state/actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isSubmitting = false;

  loginForm = this.fb.nonNullable.group({
    username: ['ng-matero', [Validators.required]],
    password: ['ng-matero', [Validators.required]],
    rememberMe: [false],
  });

  constructor(private fb: FormBuilder, private router: Router, private store: Store) {}

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  login() {
    this.isSubmitting = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(
      AuthActions.login({ username: this.username.value, password: this.password.value })
    );
  }
}
