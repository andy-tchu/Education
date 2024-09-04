import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";
import {UserInfoType} from "../types/user-info.type";
import {UserAnswersQuestionType, UserAnswersType, UserAnswerType} from "../types/user-answers.type";
import {DefaultResponseType} from "../types/default-response.type";

export class Answers {
    private userAnswers: UserAnswersType | null = null;
    readonly testId: string | null = null;
    readonly userInfo: UserInfoType | null = null;
    readonly email: string | null = null;

    constructor() {
        this.testId = sessionStorage.getItem('id');
        this.userInfo = Auth.getUserInfo();
        this.email = sessionStorage.getItem('email');

        this.init();
    }

    private async init(): Promise<void> {
        if (this.testId && this.userInfo) {
            try {
                const result: UserAnswersType | DefaultResponseType = await CustomHttp.request(config.host + '/tests/' + this.testId + '/result/details?userId=' + this.userInfo.userId)
                if (result) {
                    if ((result as DefaultResponseType).error !== undefined) {
                        throw new Error((result as DefaultResponseType).message);
                    }
                    this.userAnswers = result as UserAnswersType;
                    this.showAnswers();
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

        location.href = '#/';
    }

    private showAnswers(): void {
        if (!this.userAnswers || !this.userInfo) return;
        const that: Answers = this;
        const answerBackELement = document.getElementById('answers-back')
        if (answerBackELement) {
            answerBackELement.onclick = function () {
                that.backToResult();
            }
        }
        const preTitleElement: HTMLElement | null = document.getElementById('pre-title');
        if (preTitleElement) {
            preTitleElement.innerText = this.userAnswers.test.name;
        }
        const postTitleElement: HTMLElement | null = document.getElementById('post-title')
        if (postTitleElement) {
            postTitleElement.innerText = this.userInfo.fullName + ', ' + this.email;
        }
        let i: number = 1;
        this.userAnswers.test.questions.forEach((question: UserAnswersQuestionType) => {
                const answerElement: HTMLElement = document.createElement('div');
                answerElement.className = 'answer';
                const answerTitleElement: HTMLElement = document.createElement('div');
                answerTitleElement.className = 'answer-title';
                answerTitleElement.innerHTML = '<span>Вопрос ' + (i++) + ':</span> ' + question.question;
                answerElement.appendChild(answerTitleElement);

                const answerOptionsElement: HTMLElement = document.createElement('div');
                answerOptionsElement.className = 'answer-options';
                question.answers.forEach((answer: UserAnswerType) => {
                    const optionElement: HTMLElement = document.createElement('div');
                    optionElement.className = 'answer-option question-option';

                    optionElement.classList.remove('right');
                    optionElement.classList.remove('wrong');

                    if (answer.correct !== undefined) {
                        if (answer.correct) {
                            optionElement.classList.add('right');
                        } else {
                            optionElement.classList.add('wrong');
                        }
                    }

                    const inputId: string = 'answer-' + answer.id;
                    const inputElement: HTMLElement = document.createElement('input');
                    inputElement.className = 'answer-option';
                    inputElement.setAttribute('id', inputId);
                    inputElement.setAttribute('type', 'radio');
                    inputElement.setAttribute('name', 'answer');
                    inputElement.setAttribute('value', answer.id.toString());
                    inputElement.setAttribute('disabled', 'disabled');

                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', inputId);
                    labelElement.innerText = answer.answer;

                    optionElement.appendChild(inputElement);
                    optionElement.appendChild(labelElement);

                    answerOptionsElement.appendChild(optionElement);

                });
                answerElement.appendChild(answerOptionsElement);
                const answersListElement: HTMLElement | null = document.getElementById('answers-list');
                if (answersListElement) {
                    answersListElement.appendChild(answerElement);
                }
            }
        )
    }

    backToResult() {
        location.href = '#/result';
    }

}
