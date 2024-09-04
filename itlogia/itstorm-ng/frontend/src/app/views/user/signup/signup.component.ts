import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../types/default-response.type";
import {LoginResponseType} from "../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {SignupResponseType} from "../../../types/signup-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserResponseType} from "../../../types/user-response.type";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)*$/)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
    agree: [false, [Validators.requiredTrue]]
  });

  showPassword = false;

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get agree() {
    return this.signupForm.get('agree');
  }


  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  signup() {
    if (this.signupForm.valid && this.signupForm.value.name && this.signupForm.value.email && this.signupForm.value.password && this.signupForm.value.agree) {
      this.authService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password)
        .subscribe(
          {
            next: (data: DefaultResponseType | SignupResponseType) => {
              let error = null;
              if ((data as DefaultResponseType).error !== undefined) {
                error = (data as DefaultResponseType).message;
              }

              const signupResponse = data as SignupResponseType;
              if (!(signupResponse).accessToken || !(signupResponse).refreshToken || !(signupResponse).userId) {
                error = "Signup error!";
              }

              if (error) {
                this._snackBar.open(error);
                throw new Error(error);
              }
              this.authService.setTokens(signupResponse.accessToken, signupResponse.refreshToken);
              this.authService.getUserInfo()
                .subscribe({
                  next: (data: DefaultResponseType | UserResponseType) => {
                    if ((data as DefaultResponseType).error) {
                      throw new Error((data as DefaultResponseType).message);
                    }
                    const userInfo = data as UserResponseType;
                    if (userInfo && userInfo.id && userInfo.name && userInfo.email) {
                      this.authService.setUserInfo(userInfo.id, userInfo.name, userInfo.email);

                      this._snackBar.open("Signup successfully");
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
                this._snackBar.open("Signup error!");
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
