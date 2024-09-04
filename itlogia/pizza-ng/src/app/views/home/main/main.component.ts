import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {Observable} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
    @ViewChild(PopupComponent)
    private popupComponent!: PopupComponent;
    ngAfterViewInit(): void {
        this.popupComponent.open();
        // this.modalServise.open(this.popup, {});
    }

    public title: string = 'pizza-ng';


    constructor() {
    }

    ngOnInit() {
        // const myModalAlternative = new bootstrap.Modal('#myModal', {});
        // myModalAlternative.show();
        new Observable((observer) => {
            setTimeout(() => {
                observer.next('hello');
            }, 2000)
        })
    }

}
