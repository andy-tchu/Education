import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import * as string_decoder from "string_decoder";
import {CustomValidators} from "../../shared/custom-validators";

@Component({
    selector: 'app-checkout-form',
    templateUrl: './checkout-form.component.html',
    styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {
    checkoutForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.pattern('^[a-zA-z]+$')]],
        email: ['', [Validators.email]],
        address: ['', [Validators.required, Validators.minLength(10)]],
        addressSecond: [''],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        sameAddress: [false],
        saveInfo: [false],
        payment: this.fb.group({
            type: ['credit', Validators.required],
            name: ['', Validators.required],
            number: ['', [Validators.required, CustomValidators.creditCardNumberValidator]],
            expiration: ['', [Validators.required, CustomValidators.expirationValidator]],
            cvv: ['', [Validators.required, CustomValidators.cvvValidator]],
        })
    });

    get paymentName() {
        return this.checkoutForm.get('payment')?.get('name');
    }
    get paymentNumber() {
        return this.checkoutForm.get('payment')?.get('number');
    }
    get paymentExpiration() {
        return this.checkoutForm.get('payment')?.get('expiration');
    }
    get paymentCVV() {
        return this.checkoutForm.get('payment')?.get('cvv');
    }

    constructor(private fb: FormBuilder) {
    }

}
