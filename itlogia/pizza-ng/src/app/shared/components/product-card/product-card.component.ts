import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {CartProductService} from "../../services/cart-product.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [CartProductService],
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductType;

  @Output() addToCartEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(public cartProductService: CartProductService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: '',
      datetime: '',
    }
  }

  ngOnInit(): void {
  }

  public addProductToCart(title: string):void
  {
    this.cartProductService.count++;
    this.addToCartEvent.emit(title);
  }
}
