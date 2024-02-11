import {Router} from "./router.js";

class App {
    router = new Router();
    constructor() {
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));

        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }

    handleRouteChanging() {
        this.router.openRoute();
    }
}

(new App());
