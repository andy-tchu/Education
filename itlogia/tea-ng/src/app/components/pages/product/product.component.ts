import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {tap} from "rxjs";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService],
})
export class ProductComponent implements OnInit {
  product: ProductType;
  loading: boolean = false;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService
  ) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProduct(+params['id'])
          .pipe(
            tap(() => {
              this.loading = false;
            })
          )
          .subscribe({
            next: (data) => {
              this.product = data;
            },
            error: (error) => {
              this.router.navigate(['/']);
            }
          })
      }
    })
  }

  public addProductToCart(title: string): void {
    this.cartService.product = title;
    this.router.navigate(['/order']);
  }


}
