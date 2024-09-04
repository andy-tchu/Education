import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../shared/services/cart.service";
import {ProductService} from "../../shared/services/product.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    providers: [ProductService],
})
export class OrderComponent implements OnInit, OnDestroy {

    public formValues = {
        productTitle: '',
        address: '',
        phone: '',
    }

  private subscriptionOrder: Subscription | null = null;

    constructor(private cartService: CartService,
                private productService: ProductService) {
    }

    ngOnInit(): void {
        this.formValues.productTitle = this.cartService.product;
    }

    ngOnDestroy(): void {
        this.subscriptionOrder?.unsubscribe();
    }

    public createOrder(): void {
        console.log(this.formValues);
        if (!this.formValues.productTitle) {
            alert("Заполните пиццу");
            return;
        }
        if (!this.formValues.address) {
            alert("Заполните адрес");
            return;
        }
        if (!this.formValues.phone) {
            alert("Заполните телефон");
            return;
        }

        this.subscriptionOrder = this.productService.createOrder({
            product: this.formValues.productTitle,
            address: this.formValues.address,
            phone: this.formValues.phone,
        }).subscribe(responce => {
            if (responce.success && !responce.message) {
                alert('Спасибо за заказ!');
                this.formValues = {
                    productTitle: '',
                    address: '',
                    phone: '',
                }
            } else {
                alert('Ошибка!');
            }
        })

    }
}
