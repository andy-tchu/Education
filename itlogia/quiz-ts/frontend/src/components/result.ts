import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";
import {UserInfoType} from "../types/user-info.type";
import {DefaultResponseType} from "../types/default-response.type";
import {PassTestResponseType} from "../types/pass-test-response.type";

export class Result {
    readonly testId: string | null;
    readonly userInfo: UserInfoType | null;

    constructor() {
        this.testId = sessionStorage.getItem('id');
        this.userInfo = Auth.getUserInfo();
        const answerElement = document.getElementById('answers');
        if (answerElement) {
            answerElement.onclick = function () {
                location.href = '#/answers';
            }
        }

        this.init();
    }

    private async init(): Promise<void> {
        if (this.testId && this.userInfo) {
            try {
                const result: DefaultResponseType | PassTestResponseType = await CustomHttp.request(config.host + '/tests/' + this.testId + '/result?userId=' + this.userInfo.userId)

                if (result) {
                    if ((result as DefaultResponseType).error !== undefined) {
                        throw new Error((result as DefaultResponseType).message);
                    }
                    const resultElement = document.getElementById('result-score');
                    if (resultElement) {
                        resultElement.innerText = (result as PassTestResponseType).score + '/' + (result as PassTestResponseType).total;
                    }
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

        location.href = '#/';
    }
}