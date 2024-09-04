import {Component, ElementRef, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  userInfoName: string | null = null;

  constructor(private authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.isLogged = this.authService.getIsLoggedIn();
    if (this.isLogged) {
      this.userInfoName = this.authService.getUserName();
    }
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      if (this.isLogged) {
        this.userInfoName = this.authService.getUserName();
      }
    });

  }

  login(): void {
    if (!this.isLogged) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: ((data: DefaultResponseType) => {
          if (data.error) {
            console.log(data.message);
          }
          this.doLogout();
        }),
        error: ((errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            console.log(errorResponse.error.message);
          } else {
            console.log('Logout error');
          }
          this.doLogout();
        })
      });
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.removeUserInfo();
    this._snackBar.open('Logout successfully');
    this.router.navigate(['/']);
  }

  activateMenu(element: EventTarget | null) {
    let elementHtml = element as HTMLElement;

    for (const child of elementHtml.parentElement?.parentElement?.children as any as HTMLElement[]) {
      child.classList.remove('active');
    }

    elementHtml.parentElement?.classList.add('active');
  }

}
