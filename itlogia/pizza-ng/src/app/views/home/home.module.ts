import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {MainComponent} from "./main/main.component";
import {AboutComponent} from "./about/about.component";
import {SharedModule} from "../../shared/shared.module";
import {ProductsRoutingModule} from "../products/products-routing.module";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [
        MainComponent,
        AboutComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule,
        NgbModalModule,
    ],
    exports: [
        HomeRoutingModule,
    ],
})
export class HomeModule {
}
