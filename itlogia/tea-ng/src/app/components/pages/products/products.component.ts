import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {ProductType} from "../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService],
})
export class ProductsComponent implements OnInit {
  public products: ProductType[] = [];
  loading: boolean = false;
  searchStr: string | undefined = undefined;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchStr = params['subject'];
      if (this.searchStr === '') {
        this.searchStr = undefined;
      }
      this.productService.getProducts(this.searchStr)
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
    });


  }

  public addToCart(title: string): void {
    // this.cartService.product = title;
    this.router.navigate(['/order']);
  }
}
