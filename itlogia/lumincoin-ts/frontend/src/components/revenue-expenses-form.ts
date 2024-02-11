import {SessionParams} from "../services/session-params";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {ElementHelper} from "../services/element-helper";
import {CategoryType} from "../types/category.type";
import {DefaultResponseType} from "../types/default-response.type";
import {OperationType} from "../types/operation.type";

export class RevenueExpensesForm {
    readonly page: string | null = null;
    private operationId: string | null = null;
    private revenueCategory: CategoryType[] | null = null;
    private expensesCategory: CategoryType[] | null = null;
    readonly titleElement: HTMLElement | null = null;
    readonly operationTypeElement: HTMLInputElement | null = null;
    readonly operationTypeElements: HTMLCollectionOf<Element> | null = null;
    readonly operationCategoryElement: HTMLInputElement | null = null;
    readonly operationAmountElement: HTMLInputElement | null = null;
    readonly operationDateElement: HTMLInputElement | null = null;
    readonly operationCommentElement: HTMLInputElement | null = null;

    constructor(page: string) {
        this.page = page;
        const that = this;
        this.titleElement = document.getElementById('form-title');
        this.operationTypeElements = document.getElementsByClassName('operation-type');
        this.operationTypeElement = document.getElementById('operation-type') as HTMLInputElement;
        this.operationCategoryElement = document.getElementById('operation-category') as HTMLInputElement;
        this.operationAmountElement = document.getElementById('revenue-expenses-form-sum-input') as HTMLInputElement;
        this.operationDateElement = document.getElementById('revenue-expenses-form-date-input') as HTMLInputElement;
        this.operationCommentElement = document.getElementById('revenue-expenses-form-comm-input') as HTMLInputElement;

        const successElement: HTMLElement | null = document.getElementById('success');
        if (successElement) {
            successElement.onclick = function () {
                if (that.page === 'edit') {
                    that.updateOperation();
                } else {
                    that.createOperation();
                }
            }
        }

        const formInput: HTMLInputElement | null = document.getElementById('revenue-expenses-form-sum-input') as HTMLInputElement;
        if (formInput) {
            formInput.onblur = function () {
                const oldValue: string = formInput.value;
                const inputElement: HTMLElement | null = document.getElementById('revenue-expenses-form-sum');
                if (inputElement) {
                    inputElement.innerText = oldValue.replace('$', '') + '$';
                }
            }
        }
        if (this.operationTypeElement) {
            if (this.page === 'create-revenue') {
                this.operationTypeElement.value = '1';
            } else if (this.page === 'create-expenses') {
                this.operationTypeElement.value = '2';
            }

            this.operationTypeElement.onchange = function () {
                if (parseInt((this as HTMLInputElement).value) === 1) {
                    that.changeOperationType('revenue');
                } else {
                    that.changeOperationType('expense');
                }
            }
        }

        this.init();
    }

    private async init(): Promise<void> {
        try {
            const result: CategoryType[] | DefaultResponseType = await CustomHttp.request(config.host + '/categories/income');
            if (result) {
                if ((result as DefaultResponseType).error) {
                    throw new Error((result as DefaultResponseType).message);
                }
                this.revenueCategory = (result as CategoryType[]);
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const result: CategoryType[] | DefaultResponseType = await CustomHttp.request(config.host + '/categories/expense');
            if (result) {
                if ((result as DefaultResponseType).error) {
                    throw new Error((result as DefaultResponseType).message);
                }
                this.expensesCategory = (result as CategoryType[]);
            }
        } catch (error) {
            console.log(error);
        }

        if (this.page === 'edit') {
            if (this.titleElement) {
                this.titleElement.innerText = 'Редактирование дохода/расхода';
            }
            const successElement: HTMLElement | null = document.getElementById('success');
            if (successElement) {
                successElement.innerText = 'Сохранить';
            }

            this.operationId = SessionParams.getOperationId();
            if (this.operationId && this.operationTypeElement && this.operationTypeElements && this.operationAmountElement && this.operationDateElement && this.operationCommentElement) {
                try {
                    const result: OperationType | DefaultResponseType = await CustomHttp.request(config.host + '/operations/' + this.operationId);
                    if (result) {
                        if ((result as DefaultResponseType).error) {
                            throw new Error((result as DefaultResponseType).message);
                        }

                        Array.from(this.operationTypeElements).forEach(opType => {
                            if (opType.id === ((result as OperationType).type)) {
                                (opType as HTMLOptionElement).selected = true;
                            }
                        });
                        this.changeOperationType((result as OperationType).type, (result as OperationType).category);
                        this.operationAmountElement.value = (result as OperationType).amount.toString();
                        const sumElement: HTMLElement | null = document.getElementById('revenue-expenses-form-sum');
                        if (sumElement) {
                            sumElement.innerText = (result as OperationType).amount + "$";
                        }
                        this.operationDateElement.value = (result as OperationType).date;
                        this.operationDateElement.type = 'date';
                        this.operationCommentElement.value = (result as OperationType).comment;
                    }
                } catch (error) {
                    console.log(error);
                }
            }

        } else {
            if (this.page === 'create-revenue') {
                this.changeOperationType('revenue');
            } else if (this.page === 'create-expenses') {
                this.changeOperationType('expense');
            }
        }
    }

    private changeOperationType(type: string, selectedCategory: string | null = null): void {
        if (!this.operationCategoryElement) return;
        this.operationCategoryElement.replaceChildren();
        this.operationCategoryElement.innerHTML = '<option value="" hidden>Категория...</option>';
        if (type === 'expense') {
            if (this.expensesCategory) {
                this.expensesCategory.forEach((category: CategoryType) => {
                    const categoryElement: HTMLOptionElement = ElementHelper.createElement('option', 'select-option', category.title, {'value': category.id}) as HTMLOptionElement;
                    if (this.operationCategoryElement) {
                        this.operationCategoryElement.appendChild(categoryElement);
                        if (categoryElement && categoryElement.innerText === selectedCategory) {
                            categoryElement.selected = true;
                        }
                    }
                });
            }
        } else {
            if (this.revenueCategory) {
                this.revenueCategory.forEach(category => {
                    const categoryElement: HTMLOptionElement = ElementHelper.createElement('option', 'select-option', category.title, {'value': category.id}) as HTMLOptionElement;
                    if (this.operationCategoryElement) {
                        this.operationCategoryElement.appendChild(categoryElement);
                        if (categoryElement && categoryElement.innerText === selectedCategory) {
                            categoryElement.selected = true;
                        }
                    }
                })
            }
        }
    }

    private async createOperation(): Promise<void> {
        try {
            if (!this.operationTypeElement || !this.operationAmountElement || !this.operationDateElement || !this.operationCommentElement || !this.operationCategoryElement) return;
            const result = await CustomHttp.request(config.host + '/operations', 'POST', {
                type: this.operationTypeElement.value === "1" ? "income" : "expense",
                amount: this.operationAmountElement.value,
                date: this.operationDateElement.value,
                comment: this.operationCommentElement.value,
                category_id: parseInt(this.operationCategoryElement.value),
            });

            if (result) {
                if ((result as DefaultResponseType).error) {
                    throw new Error((result as DefaultResponseType).message);
                }
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    private async updateOperation(): Promise<void> {
        try {
            if (!this.operationTypeElement || !this.operationAmountElement || !this.operationDateElement || !this.operationCommentElement || !this.operationCategoryElement) return;
            const result = await CustomHttp.request(config.host + '/operations/' + this.operationId, 'PUT', {
                type: this.operationTypeElement.value === "1" ? "income" : "expense",
                amount: this.operationAmountElement.value,
                date: this.operationDateElement.value,
                comment: this.operationCommentElement.value,
                category_id: parseInt(this.operationCategoryElement.value),
            });

            if (result) {
                if ((result as DefaultResponseType).error) {
                    throw new Error((result as DefaultResponseType).message);
                }
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }
}