import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    remember: [false],

  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private cartService: CartService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.value && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.remember)
        .subscribe({
          next: (data: LoginResponseType | DefaultResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message;
            }
            const loginResponse = data as LoginResponseType;
            if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
              error = 'Ошибка авторизации';
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }

            this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
            this.authService.userId = loginResponse.userId;
            this._snackBar.open('Вы успешно авторизовались');
            this.router.navigate(['/']);
            this.cartService.getCartCount().subscribe();
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse && errorResponse.message) {
              if (errorResponse.error.error && errorResponse.error.message) {
                this._snackBar.open(errorResponse.error.message)
              } else {
                this._snackBar.open(errorResponse.message);
              }
            } else {
              this._snackBar.open('Ошибка авторизации');
            }
          }
        })
    }
  }

}
