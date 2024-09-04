import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

    @ViewChild('popup')
    popup!: TemplateRef<ElementRef>;

    @Input()
    data: string = '';

    constructor(private modalService: NgbModal) {
    }

    ngOnInit(): void {
    }

    open(): void {
        this.modalService.open(this.popup);
    }

}
