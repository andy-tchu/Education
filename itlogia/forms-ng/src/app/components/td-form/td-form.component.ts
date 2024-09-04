import { Component} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-td-form',
  templateUrl: './td-form.component.html',
  styleUrls: []
})
export class TdFormComponent {
  signInForm = {
    email: "",
    password: "",
    rememberMe: false,
  }

  signIn (siForm: NgForm){
    if (siForm.valid) {
      console.log(this.signInForm);
    } else {
      console.log('invalid');
    }
  }

}
