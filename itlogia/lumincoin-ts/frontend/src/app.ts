import {Router} from "./router";
import './libraries/bootstrap.min.js';

class App {
    router: Router = new Router();
    constructor() {
        console.log('Start');
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this));
        window.addEventListener('popstate', this.handleRouteChanging.bind(this));
    }

    handleRouteChanging() {
        this.router.openRoute();
    }
}

(new App());
