import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'count-selector',
    templateUrl: './count-selector.component.html',
    styleUrls: ['./count-selector.component.scss']
})
export class CountSelectorComponent implements OnInit {

    @Input() count: number = 1;
    @Input() canDelete: boolean = false;

    @Output() onCountChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    countChange() {
        this.onCountChange.emit(this.count);
    }

    decreaseCount() {
        if (!this.canDelete) {
            if (this.count > 1) {
                this.count--;
                this.countChange();
            }
        } else {
            if (this.count > 0) {
                this.count--;
                this.countChange();
            }
        }
    }

    increaseCount() {
        this.count++;
        this.countChange();
    }

}
