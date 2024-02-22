import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductType} from "../../types/product.type";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: ProductType = {
    image: "",
    title: "",
    count: 0,
    price: 0,
  };

  @Output() addToCartEvent: EventEmitter<ProductType> = new EventEmitter<ProductType>();

  constructor(public cartService: CartService) {
  }

  ngOnInit(): void {
  }

  addProductToCart(product: ProductType) {
    this.cartService.count++;
    this.cartService.summ += product.price;
    this.addToCartEvent.emit(product);
  }
}
