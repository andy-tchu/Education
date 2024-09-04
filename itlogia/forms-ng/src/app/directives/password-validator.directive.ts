import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

export function passwordValidator(pattern: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const result = new RegExp(pattern).test(control.value);
        return result ? null : {pattern: {value: control.value}};
    }
}

@Directive({
    selector: '[passwordValidator]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}
    ]
})
export class PasswordValidatorDirective implements Validator {

    @Input('passwordValidator') pattern: string = '';

    constructor() {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return passwordValidator(this.pattern)(control);
    }

}
