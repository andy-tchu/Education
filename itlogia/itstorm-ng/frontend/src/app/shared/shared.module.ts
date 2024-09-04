import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {BannerComponent} from "./components/banner/banner.component";
import {UppercaseTextPipe} from "./pipes/uppercase-text.pipe";
import {ItemComponent} from "./components/item/item.component";
import {RequestComponent} from "./components/request/request.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArticleCardComponent} from './components/article-card/article-card.component';
import {RouterLinkWithHref} from "@angular/router";
import {ClickOutsideDirective} from './directives/click-outside.directive';
import {CommentComponent} from './components/comment/comment.component';
import {LoaderComponent} from './components/loader/loader.component';

@NgModule({
  declarations: [
    BannerComponent,
    UppercaseTextPipe,
    ItemComponent,
    RequestComponent,
    ArticleCardComponent,
    ClickOutsideDirective,
    CommentComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLinkWithHref,
  ],
  exports: [
    BannerComponent,
    UppercaseTextPipe,
    ItemComponent,
    RequestComponent,
    ArticleCardComponent,
    ClickOutsideDirective,
    CommentComponent,
    LoaderComponent,
  ]
})
export class SharedModule {
}
