import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {catchError, map, Observable, of, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    constructor(public http: HttpClient) {
    }

    getProducts(): Observable<ProductType[]> {
        let params = new HttpParams();
        params = params.set('extraField', 1);
        return this.http.get<{ data: ProductType[] }>('https://testologia.site/pizzas',
            {
                observe: 'response',
                params: params
            })
            .pipe(
                map((result) => (result.body ? result.body.data : [])),
            );
    }

    getProduct(id: number): Observable<ProductType> {
        return this.http.get<ProductType>(`https://testologia.site/pizzas?id=${id}`);
    }

    createOrder(data: { product: string, address: string, phone: string }) {
        return this.http.post<{ success: boolean, message?: string }>('https://testologia.site/order-pizza', data);
    }
}
