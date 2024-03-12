import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupComponent} from "../../common/popup/popup.component";
import {Observable, Subscription} from "rxjs";

declare var $: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  popupStarter: Observable<void>;
  private subscription: Subscription | null = null;

  constructor(private modalService: NgbModal) {
    this.popupStarter = new Observable((observer) => {
      setTimeout(() => {
        observer.next();
      }, 10000)
    })
  }

  ngOnInit(): void {
    this.subscription = this.popupStarter.subscribe(() => {
      this.openPopup();
    })
    $(function () {
      let icons = {
        header: "iconClosed",
        activeHeader: "iconOpen"
      };
      $("#faq-accordion").accordion({
        icons: icons,
        heightStyle: "content"
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  openPopup() {
    this.modalService.open(PopupComponent);
  }


}
