import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonalRoutingModule} from './personal-routing.module';
import {InfoComponent} from './info/info.component';
import {OrdersComponent} from './orders/orders.component';
import {SharedModule} from "../../shared/shared.module";
import {FavoriteComponent} from "./favorite/favorite.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        InfoComponent,
        FavoriteComponent,
        OrdersComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PersonalRoutingModule,
        ReactiveFormsModule
    ]
})
export class PersonalModule {
}
