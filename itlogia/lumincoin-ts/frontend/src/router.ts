import {Form} from "./components/form";
import {Main} from "./components/main";
import {NavBar} from "./components/nav-bar";
import {RevenueExpenses} from "./components/revenue-expenses";
import {CategoryRevenue} from "./components/category-revenue";
import {CategoryExpenses} from "./components/category-expenses";
import {CategoryRevenueForm} from "./components/category-revenue-form";
import {CategoryExpensesForm} from "./components/category-expenses-form";
import {RevenueExpensesForm} from "./components/revenue-expenses-form";
import {Auth} from "./services/auth";
import {RouteType} from "./types/route.type";
import {MenuItemType} from "./types/menu-item.type";
import {UserInfoType} from "./types/user-info.type";

export class Router {
    private navBarElement: HTMLElement | null;
    private contentElement: HTMLElement | null;
    private stylesElement: HTMLElement | null;
    private titleElement: HTMLElement | null;
    private routes: RouteType[];
    constructor() {
        this.navBarElement = document.getElementById('nav-bar');
        this.contentElement = document.getElementById('content');
        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('title');

        this.routes = [
            {
                route: '#/',
                title: 'Вход',
                template: 'templates/login.html',
                styles: 'styles/form.css',
                navbar: false,
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/create-account',
                title: 'Создайте аккаунт',
                template: 'templates/create-account.html',
                styles: 'styles/form.css',
                navbar: false,
                load: () => {
                    new Form('create');
                }
            },
            {
                route: '#/main',
                title: 'Главная',
                template: 'templates/main.html',
                styles: 'styles/main.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.main);
                    new Main();
                }
            },
            {
                route: '#/revenue-expenses',
                title: 'Доходы и расходы',
                template: 'templates/revenue-expenses.html',
                styles: 'styles/revenue-expenses.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.revenueExpenses);
                    new RevenueExpenses();
                }
            },
            {
                route: '#/revenue-create',
                title: 'Создание дохода/расхода',
                template: 'templates/revenue-expenses-form.html',
                styles: 'styles/revenue-expenses-form.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.revenueExpenses);
                    new RevenueExpensesForm('create-revenue');
                }
            },

            {
                route: '#/expenses-create',
                title: 'Создание дохода/расхода',
                template: 'templates/revenue-expenses-form.html',
                styles: 'styles/revenue-expenses-form.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.revenueExpenses);
                    new RevenueExpensesForm('create-expenses');
                }
            },
            {
                route: '#/revenue-expenses-edit',
                title: 'Редактирование дохода/расхода',
                template: 'templates/revenue-expenses-form.html',
                styles: 'styles/revenue-expenses-form.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.revenueExpenses);
                    new RevenueExpensesForm('edit');
                }
            },
            {
                route: '#/category-revenue',
                title: 'Категории доходов',
                template: 'templates/category-revenue.html',
                styles: 'styles/category-revenue.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.categoryRevenue);
                    new CategoryRevenue();
                }
            },
            {
                route: '#/category-revenue-create',
                title: 'Создание категории доходов',
                template: 'templates/category-revenue-form.html',
                styles: 'styles/category-revenue-form.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.categoryRevenue);
                    new CategoryRevenueForm('create');
                }
            },
            {
                route: '#/category-revenue-edit',
                title: 'Редактирование категории доходов',
                template: 'templates/category-revenue-form.html',
                styles: 'styles/category-revenue-form.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.categoryRevenue);
                    new CategoryRevenueForm('edit');
                }
            },
            {
                route: '#/category-expenses',
                title: 'Категории расходов',
                template: 'templates/category-expenses.html',
                styles: 'styles/category-expenses.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.categoryExpenses);
                    new CategoryExpenses();
                }
            },
            {
                route: '#/category-expenses-create',
                title: 'Создание категории расходов',
                template: 'templates/category-expenses-form.html',
                styles: 'styles/category-expenses-form.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.categoryExpenses);
                    new CategoryExpensesForm('create');
                }
            },
            {
                route: '#/category-expenses-edit',
                title: 'Редактирование категории расходов',
                template: 'templates/category-expenses-form.html',
                styles: 'styles/category-expenses-form.css',
                navbar: true,
                load: () => {
                    new NavBar(MenuItemType.categoryExpenses);
                    new CategoryExpensesForm('edit');
                }
            },
        ]
    }

    public async openRoute(): Promise<void> {
        const urlRoute: string = window.location.hash;

        if (urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = '#/';
            return;
        }

        const newRoute: RouteType | undefined = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if (!newRoute) {
            window.location.href = '#/';
            return;
        }

        const userInfo: UserInfoType | null = Auth.getUserInfo();
        const accessToken: string | null = localStorage.getItem(Auth.accessTokenKey);
        if ( urlRoute === '#/' || urlRoute === '#/create-account' || (userInfo && accessToken)) {

            if (!this.navBarElement || !this.contentElement || !this.stylesElement || !this.titleElement) {
                window.location.href = '#/';
                return;
            }

            if (newRoute.navbar) {
                this.navBarElement.innerHTML = await fetch('templates/nav-bar.html').then(response => response.text());
            } else {
                this.navBarElement.innerHTML = '';
            }
            this.contentElement.innerHTML = await fetch(newRoute.template).then(response => response.text());
            this.titleElement.innerText = newRoute.title;
            this.stylesElement.setAttribute('href', newRoute.styles);

            newRoute.load();
        } else {
            window.location.href = '#/';
            return;
        }
    }
}