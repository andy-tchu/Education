import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[buttonColor]'
})
export class ButtonColorDirective implements OnInit {

    @Input() defaultButtonBgColor: string = "red";
    @Input() hoverButtonBgColor: string = "orange";

    constructor(private el: ElementRef,
                private rend: Renderer2) {
    }

    private _backgroundColor: string = '';

    @HostBinding('style.backgroundColor')
    get getBgColor() {
        return this._backgroundColor;
    }

    @HostListener('mouseover')
    onMouseOver() {
        this.changeElementBgColor(this.hoverButtonBgColor);
    }

    @HostListener('mouseout')
    onMouseOut() {
        this.changeElementBgColor(this.defaultButtonBgColor);
    }

    changeElementBgColor(color: string) {
        this._backgroundColor = color;
    }

    ngOnInit(): void {
        this.changeElementBgColor(this.defaultButtonBgColor);
    }
}
