import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductType} from "../../../types/product.type";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductType;

  @Output() addToCartEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
  }

  ngOnInit(): void {
  }

  public addProductToCart(title: string):void
  {
    this.addToCartEvent.emit(title);
  }

}
