import {Component, Input, OnInit} from '@angular/core';
import {BannerType} from "../../../types/banner.type";
import {environment} from "../../../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";
import {RequestComponent} from "../request/request.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() banner!: BannerType;
  bannerTitle: any;

  serverStaticPath = environment.serverStaticPath + 'banners/';

  constructor(private sanitizer:DomSanitizer,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.bannerTitle = this.sanitizer.bypassSecurityTrustHtml(this.banner.title);
  }

  openRequest() {
    this.dialog.open(RequestComponent, {data:  this.banner.request});
  }
}
