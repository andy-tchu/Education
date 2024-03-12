import {Injectable} from '@angular/core';
import {ProductType} from "../types/product.type";
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class ProductService {
  constructor(public http: HttpClient) {
  }

  getProducts(searchStr: string | undefined): Observable<ProductType[]> {
    if (searchStr) {
      return this.http.get<ProductType[]>('https://testologia.site/tea',
        {
          params: {search: searchStr},
          observe: 'response',
        })
        .pipe(
          map((result) => {
            if (result.body){
              let res: ProductType[] = [];
              for (let [key, value] of Object.entries(result.body)) {
                res.push(value);
              }
              return res;
            } else return [];
          })
        );
    } else {
      return this.http.get<ProductType[]>('https://testologia.site/tea',
        {
          observe: 'response',
        })
        .pipe(
          map((result) => (result.body ? result.body : [])),
        );
    }
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`);
  }

  createOrder(data: { product: string, address: string, phone: string }) {
    return this.http.post<{ success: boolean, message?: string }>('https://testologia.site/order-tea', data);
  }
}
