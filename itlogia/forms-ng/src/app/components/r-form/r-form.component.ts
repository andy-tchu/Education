import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../../directives/password-validator.directive";
import {passwordNotEmailValidator} from "../../directives/password-not-email.directive";
import {emailExistsValidator} from "../../directives/email-exists.directive";

@Component({
    selector: 'app-r-form',
    templateUrl: './r-form.component.html',
    styleUrls: []
})
export class RFormComponent implements OnInit {

    signInForm = this.fb.group(
        {
            email: ['', {
                validators: [Validators.email, Validators.required],
                asyncValidators: emailExistsValidator,
                updateOn: 'blur',
            }],
            password: ['', [Validators.required, passwordValidator('^(?=.*\\d)(?=.*[a-zA-Z])[a-zA-Z0-9.@]{8,}$')]],
            rememberMe: [false],
        }, {validators: passwordNotEmailValidator});

    // signInForm = new FormGroup({
    //     email: new FormControl('', {
    //         validators: [Validators.email, Validators.required],
    //         asyncValidators: emailExistsValidator,
    //         updateOn: 'blur',
    //     }),
    //     password: new FormControl('', [Validators.required, passwordValidator('^(?=.*\\d)(?=.*[a-zA-Z])[a-zA-Z0-9.@]{8,}$')]),
    //     rememberMe: new FormControl(false),
    //
    // }, {validators: passwordNotEmailValidator});

    get email() {
        return this.signInForm.get('email');
    }

    get password() {
        return this.signInForm.get('password');
    }

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
    }

    signIn() {
        console.log(this.signInForm);
        this.signInForm.reset();
    }

}
