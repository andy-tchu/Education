import {Auth} from "../services/auth";
import config from "../../config/config";
import {CustomHttp} from "../services/custom-http";
import {MenuItemType} from "../types/menu-item.type";
import {DefaultResponseType} from "../types/default-response.type";
import {BalanceResponseType} from "../types/balance-response.type";
import {UserInfoType} from "../types/user-info.type";

export class NavBar {
    readonly navLinkElements: HTMLCollectionOf<HTMLElement> | null = null;
    private activeElement: HTMLElement | null = null;
    readonly categoriesElement: HTMLElement | null = null;
    readonly balanceElement: HTMLElement | null = null;
    readonly newBalanceElement: HTMLInputElement | null = null;
    readonly updateBalanceElement: HTMLElement | null = null;

    constructor(activeMenuItem: MenuItemType) {
        const that: NavBar = this;
        this.navLinkElements = document.getElementsByClassName('nav-link') as HTMLCollectionOf<HTMLElement>;
        this.activeElement = document.getElementById(activeMenuItem);
        this.categoriesElement = document.getElementById(MenuItemType.categories);
        this.balanceElement = document.getElementById('nav-bar-balance');
        this.newBalanceElement = document.getElementById('new-balance') as HTMLInputElement;
        this.updateBalanceElement = document.getElementById('balance-update');

        const userInfo: UserInfoType | null = Auth.getUserInfo();
        const userInfoElement: HTMLElement | null = document.getElementById('user-info');
        if (userInfoElement && userInfo) {
            userInfoElement.innerText = userInfo.lastName + ' ' + userInfo.name;
        }

        Array.from(this.navLinkElements).forEach(function (item: HTMLElement) {
            item.onclick = function () {
                that.changePage(item); //was this
            }
        })
        if (this.activeElement) {
            this.setActiveMenuItem(this.activeElement);
        }
        if (this.updateBalanceElement) {
            this.updateBalanceElement.onclick = function () {
                if (that.newBalanceElement) {
                    that.updateBalance(parseInt(that.newBalanceElement.value));
                }
            }
        }

        this.updateBalanceText();
    }

    private async updateBalanceText(): Promise<void> {
        try {
            const result: DefaultResponseType | BalanceResponseType = await CustomHttp.request(config.host + '/balance');

            if (result) {
                if ((result as DefaultResponseType).error) {
                    throw new Error((result as DefaultResponseType).message);
                }
                if (this.balanceElement) {
                    this.balanceElement.innerText = (result as BalanceResponseType).balance + '$';
                    return;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    private async updateBalance(balance: number): Promise<void> {
        try {
            const result: DefaultResponseType = await CustomHttp.request(config.host + "/balance", "PUT", {
                newBalance: balance
            });
            if (result) {
                if ((result as DefaultResponseType).error) {
                    throw new Error((result as DefaultResponseType).message);
                }
            }
        } catch (error) {
            console.log(error);
            return;
        }
        await this.updateBalanceText();
    }

    private changePage(menuItem: HTMLElement): void {
        switch (menuItem.id) {
            case MenuItemType.main: {
                location.href = '#/main';
                break;
            }
            case MenuItemType.revenueExpenses: {
                location.href = '#/revenue-expenses';
                break;
            }
            case MenuItemType.categoryRevenue: {
                location.href = '#/category-revenue';
                break;
            }
            case MenuItemType.categoryExpenses: {
                location.href = '#/category-expenses';
                break;
            }
            case MenuItemType.categories: {
                this.activeElement = this.categoriesElement;
                if (this.activeElement) {
                    this.setActiveMenuItem(this.activeElement);
                }
            }
        }
    }

    private setActiveMenuItem(activeMenuItem: HTMLElement): void {
        if (this.navLinkElements) {
            Array.from(this.navLinkElements).forEach(function (item) {
                    item.classList.remove('active');
                    item.classList.add('link-dark');
                }
            )
        }
        activeMenuItem.classList.add('active');
        activeMenuItem.classList.remove('link-dark');
        if (activeMenuItem.id === MenuItemType.categoryExpenses || activeMenuItem.id === MenuItemType.categoryRevenue) {
            if (this.categoriesElement) {
                this.categoriesElement.classList.add('active');
                this.categoriesElement.classList.remove('link-dark');
                this.categoriesElement.setAttribute('aria-expanded', 'true');
                const collapseElement = document.getElementById('category-collapse')
                if (collapseElement) {
                    collapseElement.classList.add('show');
                }
                this.categoriesElement.classList.remove('collapsed');
            }
        }
    }
}
