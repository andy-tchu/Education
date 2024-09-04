import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {CartService} from "../../../shared/services/cart.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, tap} from "rxjs";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    providers: [ProductService]
})
export class ProductsComponent implements OnInit {
    public products: ProductType[] = [];

    loading: boolean = false;

    constructor(private cartService: CartService,
                private productService: ProductService,
                private router: Router) {
    }

    ngOnInit(): void {
        // this.products = this.productService.getProducts();
        this.loading = true;
        this.productService.getProducts()
            .pipe(
                tap(() => {
                    this.loading = false;
                })
            )
            .subscribe({
                next: (data) => {
                    this.products = data;
                },
                error: (error) => {
                    console.log(error);
                    this.router.navigate(['/'])
                }
            });
    }

    public addToCart(title: string): void {
        this.cartService.product = title;
        let tmp = title.match('sdf');
        if (tmp) {
            let str: string = tmp[2];
        }
        this.router.navigate(['/order']);
    }

}
