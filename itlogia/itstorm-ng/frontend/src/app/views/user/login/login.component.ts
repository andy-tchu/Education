import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserResponseType} from "../../../types/user-response.type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  showPassword = false;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, !!this.loginForm.value.rememberMe)
        .subscribe(
          {
            next: (data: DefaultResponseType | LoginResponseType) => {
              let error = null;
              if ((data as DefaultResponseType).error !== undefined) {
                error = (data as DefaultResponseType).message;
              }

              const loginResponse = data as LoginResponseType;
              if (!(loginResponse).accessToken || !(loginResponse).refreshToken || !(loginResponse).userId) {
                error = "Authorization error!";
              }

              if (error) {
                this._snackBar.open(error);
                throw new Error(error);
              }
              this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
              this.authService.getUserInfo().subscribe({
                next: (data: DefaultResponseType | UserResponseType) => {
                  if ((data as DefaultResponseType).error) {
                    throw new Error((data as DefaultResponseType).message);
                  }
                  const userInfo = data as UserResponseType;
                  if (userInfo && userInfo.id && userInfo.name && userInfo.email) {
                    this.authService.setUserInfo(userInfo.id, userInfo.name, userInfo.email);

                    this._snackBar.open("Authorization successfully");
                    this.router.navigate(['/']);
                  }
                },
                error: (errorResponse: HttpErrorResponse) => {
                  if (errorResponse && errorResponse.message) {
                    if (errorResponse.error.error && errorResponse.error.message) {
                      throw new Error(errorResponse.error.message);
                    } else {
                      throw new Error(errorResponse.message);
                    }
                  } else {
                    throw new Error('Ошибка получения данных пользователя');
                  }
                }
              });
            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                this._snackBar.open(errorResponse.error.message);
              } else {
                this._snackBar.open("Authorization error!");
              }
            }
          }
        );
    }
  }

  passwordToggle() {
    this.showPassword = !this.showPassword;
  }
}
