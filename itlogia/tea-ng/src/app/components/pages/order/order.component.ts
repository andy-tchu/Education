import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CartService} from "../../../services/cart.service";
import {OrderService} from "../../../services/order.service";
import {catchError, of, Subscription, tap} from "rxjs";

declare var $: any;

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm = this.fb.group(
    {
      product: [{value: '', disabled: true}, [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{11}$')]],
      country: ['', [Validators.required]],
      index: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.pattern('^[А-Яа-яЁё0-9\\s-/]+$')]],
      comment: [''],
    });

  private subscriptionOrder: Subscription | null = null;
  public orderError: boolean = false;

  get product() {
    return this.orderForm.get('product');
  }

  get name() {
    return this.orderForm.get('name');
  }

  get lastname() {
    return this.orderForm.get('lastname');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get index() {
    return this.orderForm.get('index');
  }

  get comment() {
    return this.orderForm.get('comment');
  }

  constructor(private fb: FormBuilder,
              private cartService: CartService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderForm.patchValue({product: this.cartService.product});
  }

  ngOnDestroy(): void {
    this.subscriptionOrder?.unsubscribe();
  }

  public createOrder() {
    $("#create-order").prop('disabled', true);
    this.subscriptionOrder = this.orderService.createOrder({
      name: this.name!.value!.toString(),
      last_name: this.lastname!.value!.toString(),
      phone: this.phone!.value!.toString(),
      country: this.country!.value!.toString(),
      zip: this.index!.value!.toString(),
      product: this.product!.value!.toString(),
      address: this.address!.value!.toString(),
      comment: this.comment!.value!.toString(),
    })
      .pipe(
        tap (() => {
          $("#create-order").prop('disabled', false);
        }),
        catchError((error) => {
          console.log(error);
          this.orderErrorMessage();
          $("#create-order").prop('disabled', false);
          return of();
        }),
      )
      .subscribe(responce => {
        if (responce.success && !responce.message) {
          $("#order").css("display", "none");
          $("#order-thanks").css("display", "block");
        } else {
          this.orderErrorMessage();
        }
      })
  }

  private orderErrorMessage() {
    this.orderError = true;
    setTimeout(() => {
      this.orderError = false;
    }, 3000);
  }
}
