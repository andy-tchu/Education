import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FavoriteType} from "../../../types/favorite.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {

    constructor(private http: HttpClient) {
    }

    getFavorites(): Observable<FavoriteType[] | DefaultResponseType> {
        return this.http.get<FavoriteType[] | DefaultResponseType>(environment.api + 'favorites');
    }

    removeFavorite(productId: string): Observable<DefaultResponseType> {
        return this.http.delete<DefaultResponseType>(environment.api + 'favorites', {body: {productId}});
    }

    addFavorite(productId: string): Observable<FavoriteType | DefaultResponseType> {
        return this.http.post<DefaultResponseType>(environment.api + 'favorites', {productId});
    }
}
