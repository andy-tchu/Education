import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class AuthService {

    public isLogged$: Subject<boolean> = new Subject<boolean>();
    private isLogged = false;

    constructor() {
    }

    logIn() {
        this.isLogged = true;
        this.isLogged$.next(this.isLogged);
    }

    logOut() {
        this.isLogged = false;
        this.isLogged$.next(this.isLogged);
    }

    isLoggedIn() {
        return this.isLogged;
    }

    getToken(){
        return 'test!';
    }
}
