import config from "../../config/config";
import {CustomHttp} from "../services/custom-http";
import {SessionParams} from "../services/session-params";
import {ElementHelper} from "../services/element-helper";
import {CategoryType} from "../types/category.type";
import {DefaultResponseType} from "../types/default-response.type";

export class CategoryRevenue {
    private categories: CategoryType[] | null = null;
    readonly categoriesCards: HTMLElement | null = null;
    private currentCategory: string | null = null;


    constructor() {
        const that: CategoryRevenue = this;
        this.categoriesCards = document.getElementById('categories-cards');
        const deleteCategoryElement: HTMLElement | null = document.getElementById('delete-category');
        if (deleteCategoryElement) {
            deleteCategoryElement.onclick = function () {
                that.deleteCategory();
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

                this.categories = (result as CategoryType[]);
                this.showCategories();
            }
        } catch (error) {
            console.log(error);
        }
    }

    private showCategories(): void {
        if (this.categories) {
            this.categories.forEach((category: CategoryType) => {
                const that = this;

                const categoryElement: HTMLElement = ElementHelper.createElement('div', 'card mb-3 me-3');
                const categoryBodyElement: HTMLElement = ElementHelper.createElement('div', 'card-body', '', {'category-id': category.id});
                const categoryTitleElement: HTMLElement = ElementHelper.createElement('h5', 'card-title', category.title);
                const categoryEditElement: HTMLElement = ElementHelper.createElement('a', 'btn btn-primary', 'Редактировать',
                    {'href': '#/category-revenue-edit'});
                categoryEditElement.onclick = function () {
                    const parentElement = (this as HTMLElement).parentElement;
                    if (parentElement) {
                        const categoryId: string | null = parentElement.getAttribute('category-id');
                        if (categoryId) {
                            SessionParams.setCategoryId(categoryId);
                        }
                    }
                }

                const categoryDeleteElement = ElementHelper.createElement('a', 'btn btn-danger', 'Удалить', {
                    'href': 'javascript:void(0)',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#deleteModal',
                });
                categoryDeleteElement.onclick = function () {
                    const parentElement = (this as HTMLElement).parentElement;
                    if (parentElement) {
                        that.currentCategory = parentElement.getAttribute('category-id');
                    }
                }

                categoryBodyElement.appendChild(categoryTitleElement);
                categoryBodyElement.appendChild(categoryEditElement);
                categoryBodyElement.appendChild(categoryDeleteElement);

                categoryElement.appendChild(categoryBodyElement);
                if (this.categoriesCards) {
                    this.categoriesCards.appendChild(categoryElement);
                }
            });
        }
        const categoryElement: HTMLElement = ElementHelper.createElement('div', 'card mb-3 me-3');
        categoryElement.innerHTML = "<a href=\"#/category-revenue-create\" class=\"card-body card-add\">\n" +
            "                <svg width=\"15\" height=\"15\" viewBox=\"0 0 15 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
            "                    <path d=\"M14.5469 6.08984V9.05664H0.902344V6.08984H14.5469ZM9.32422 0.511719V15.0039H6.13867V0.511719H9.32422Z\" fill=\"#CED4DA\"/>\n" +
            "                </svg>\n" +
            "\n" +
            "            </a>";
        if (this.categoriesCards) {
            this.categoriesCards.appendChild(categoryElement);
        }
    }

    private async deleteCategory(): Promise<void> {
        if (this.currentCategory) {
            try {
                const result: DefaultResponseType = await CustomHttp.request(config.host + '/categories/income/' + this.currentCategory, 'DELETE');

                if (result) {
                    if ((result as DefaultResponseType).error) {
                        throw new Error((result as DefaultResponseType).message);
                    }
                    location.reload();
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return;
        }
    }
}