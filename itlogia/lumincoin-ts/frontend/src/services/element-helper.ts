export class ElementHelper {
    static createElement(tag: string, className: string, text: string = '', attributes: any = {}): HTMLElement {
        const element = document.createElement(tag);
        element.className = className;
        element.innerText = text;
        for (const attributesKey in attributes) {
            element.setAttribute(attributesKey, attributes[attributesKey]);
        }
        return element;
    }
}