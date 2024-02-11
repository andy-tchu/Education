import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {SessionParams} from "../services/session-params";
import {CategoryExpenses} from "./category-expenses";
import {CategoryType} from "../types/category.type";
import {DefaultResponseType} from "../types/default-response.type";

export class CategoryExpensesForm {
    private categoryId: string | null = null;
    readonly page: string | null = null;
    readonly formInputElement: HTMLInputElement | null = null;

    constructor(page: string) {
        this.page = page;
        const that: CategoryExpensesForm = this;
        this.formInputElement = document.getElementById('form-input') as HTMLInputElement;

        const successElement: HTMLElement | null = document.getElementById('success');
        if (successElement) {
            successElement.onclick = function () {
                if (that.page === 'edit') {
                    that.updateCategory();
                } else {
                    that.createCategory();
                }
            }
        }

        this.init();
    }

    private async init(): Promise<void> {
        if (this.page === 'edit') {
            const titleElement: HTMLElement | null = document.getElementById('form-title');
            if (titleElement) {
                titleElement.innerText = 'Редактирование категории расходов';
            }
            const successElement: HTMLElement | null = document.getElementById('success');
            if (successElement) {
                successElement.innerText = 'Сохранить';
            }
            this.categoryId = SessionParams.getCategoryId();
            if (this.categoryId && this.formInputElement) {
                try {
                    const result: CategoryType | DefaultResponseType = await CustomHttp.request(config.host + '/categories/expense/' + this.categoryId);
                    if (result) {
                        if ((result as DefaultResponseType).error) {
                            throw new Error((result as DefaultResponseType).message);
                        }
                        this.formInputElement.value = (result as CategoryType).title;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    private async updateCategory(): Promise<void> {
        try {
            if (!this.formInputElement) return;
            const result: DefaultResponseType = await CustomHttp.request(config.host + '/categories/expense/' + this.categoryId, 'PUT', {
                title: this.formInputElement.value
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

    private async createCategory(): Promise<void> {
        try {
            if (!this.formInputElement) return;
            const result = await CustomHttp.request(config.host + '/categories/expense', 'POST', {
                title: this.formInputElement.value
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