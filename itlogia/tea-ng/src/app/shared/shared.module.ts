import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShortDescriptionPipe} from "./pipes/short-description.pipe";
import {AddRubblePipe} from "./pipes/add-rubble.pipe";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {PopupComponent} from "./components/popup/popup.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    ProductCardComponent,
    PopupComponent,
    ShortDescriptionPipe,
    AddRubblePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    ProductCardComponent,
    PopupComponent,
    ShortDescriptionPipe,
    AddRubblePipe
  ]
})
export class SharedModule { }
