import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/common/header/header.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {ProductCardComponent} from './components/common/product-card/product-card.component';
import {MainComponent} from './components/pages/main/main.component';
import {ProductsComponent} from './components/pages/products/products.component';
import {ProductComponent} from './components/pages/product/product.component';
import {OrderComponent} from './components/pages/order/order.component';
import {HttpClientModule} from "@angular/common/http";
import {ShortDescriptionPipe} from './pipes/short-description.pipe';
import {AddRubblePipe} from './pipes/add-rubble.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './components/common/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    MainComponent,
    ProductsComponent,
    ProductComponent,
    OrderComponent,
    ShortDescriptionPipe,
    AddRubblePipe,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
