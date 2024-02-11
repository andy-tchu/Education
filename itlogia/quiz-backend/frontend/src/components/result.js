import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";

export class Result {
    testId = null;
    userInfo = null;

    constructor() {
        this.testId = sessionStorage.getItem('id');
        this.userInfo = Auth.getUserInfo();

        document.getElementById('answers').onclick = function () {
            location.href = '#/answers';
        }

        this.init();
    }

    async init() {
        if (this.testId && this.userInfo) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.testId + '/result?userId=' + this.userInfo.userId)

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    document.getElementById('result-score').innerText = result.score + '/' + result.total;
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}