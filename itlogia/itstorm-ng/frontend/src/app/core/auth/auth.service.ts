import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from "rxjs";
import {DefaultResponseType} from "../../types/default-response.type";
import {LoginResponseType} from "../../types/login-response.type";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SignupResponseType} from "../../types/signup-response.type";
import {UserResponseType} from "../../types/user-response.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessTokenKey: string = "accessToken";
  public refreshTokenKey: string = "refreshToken";
  public userIdKey: string = "userId";
  public userNameKey: string = "userName";
  public userEmailKey: string = "userEmail";

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<DefaultResponseType | LoginResponseType> {
    return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'login', {
      email, password, rememberMe,
    });
  }

  logout(): Observable<DefaultResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType>(environment.api + 'logout', {
        refreshToken: tokens.refreshToken,
      });
    }
    return throwError(() => new Error("Can not find tokens"));
  }

  getUserInfo(): Observable<DefaultResponseType | UserResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.accessToken) {
      return this.http.get<DefaultResponseType | UserResponseType>(environment.api + 'users');
    }

    return throwError(() => new Error('Can not find tokens'));
  }

  public getIsLoggedIn() {
    return this.isLogged;
  }

  signup(name: string, email: string, password: string): Observable<DefaultResponseType | SignupResponseType> {
    return this.http.post<DefaultResponseType | SignupResponseType>(environment.api + 'signup', {
      name, email, password
    });
  }

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  public removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  public getTokens(): { accessToken: string | null, refreshToken: string | null } {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey),
    };
  }

  setUserInfo(id: string, name: string, email: string): void {
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userEmailKey);

    if (id && name && email) {
      localStorage.setItem(this.userIdKey, id);
      localStorage.setItem(this.userNameKey, name);
      localStorage.setItem(this.userEmailKey, email);
    }

    this.isLogged = true;
    this.isLogged$.next(true);
  }

  removeUserInfo() {
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userEmailKey);

    this.isLogged = false;
    this.isLogged$.next(false);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

  refresh(): Observable<DefaultResponseType | LoginResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType | LoginResponseType>(environment.api + 'refresh', {
        refreshToken: tokens.refreshToken,
      });
    }
    return throwError(() => new Error("Can not find tokens"));
  }
}
