import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RequestEnum} from "../../../types/request.enum";
import {FormBuilder, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {RequestService} from "../../services/request.service";
import {RequestType} from "../../../types/request.type";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  requestsList = RequestEnum;
  requestSelected: RequestEnum | undefined;
  requestsOpen = false;
  success = false;
  error = false;

  requestForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('[- +()0-9]{6,12}')]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: RequestEnum,
              private fb: FormBuilder,
              private requestService: RequestService) {
    if (data) {
      this.requestSelected = this.data;
    }
  }

  ngOnInit(): void {
  }

  createRequest(type: string) {
    let payload: RequestType | null = null;

    if (type === 'order' && this.requestForm.valid && this.requestForm.value.name && this.requestForm.value.phone && this.requestSelected)
    {
      payload = {
        name: this.requestForm.value.name!,
        phone: this.requestForm.value.phone!,
        service: this.requestSelected,
        type: type,
      };
    }

    if (type === 'consultation' && this.requestForm.valid && this.requestForm.value.name && this.requestForm.value.phone)
    {
      payload = {
        name: this.requestForm.value.name!,
        phone: this.requestForm.value.phone!,
        type: type
      };
    }

    if (payload) {
      this.requestService.createRequest(payload)
        .subscribe(
          {
            next: (data: DefaultResponseType) => {
              if (data.error === true) {
                this.error = true;
              } else {
                this.success = true;
              }
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.error = true;
            }
          }
        );
    }
  }

  changeService(request: RequestEnum) {
    this.requestSelected = request;
  }

  toggleOption() {
    //для работы директивы clickOutside с элементом с *ngIf
    setTimeout(() => this.requestsOpen = !this.requestsOpen, 0);
  }

  clickedOutside(): void {
    this.requestsOpen = false;
  }
}
