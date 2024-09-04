import {Router} from "./router";

class App {
    private router = new Router();
    constructor() {
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }

    private handleRouteChanging(): void {
        this.router.openRoute();
    }
}

(new App());
