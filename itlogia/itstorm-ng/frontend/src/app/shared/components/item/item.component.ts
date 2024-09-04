import {Component, Input, OnInit} from '@angular/core';
import {ItemType} from "../../../types/item.type";
import {environment} from "../../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {RequestComponent} from "../request/request.component";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item!: ItemType;
  serverStaticPath = environment.serverStaticPath + "items/";

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openRequest() {
    this.dialog.open(RequestComponent, {data: this.item.request});
  }

}
