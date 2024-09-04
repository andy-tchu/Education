import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginResponseType} from "../../../../types/login-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password
    ) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
            next: (data: LoginResponseType) => {
              if ((data.error || !data.accessToken || !data.refreshToken || !data.fullName || !data.userId)) {
                this._snackBar.open('Authorization error');
                throw new Error(data.message ? data.message : 'Error with data to login');
              }

              this.router.navigate(['/choice']);
            },
            error: (error: HttpErrorResponse) => {
              this._snackBar.open('Authorization error');
              throw new Error(error.error.message);
            },
          }
        );
    }
  }

}
