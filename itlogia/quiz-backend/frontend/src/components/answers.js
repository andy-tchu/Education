import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";

export class Answers {
    userAnswers = [];
    testId = null;
    userInfo = null;
    email = null;

    constructor() {
        this.testId = sessionStorage.getItem('id');
        this.userInfo = Auth.getUserInfo();
        this.email = sessionStorage.getItem('email');

        this.init();
    }


    async init() {
        if (this.testId && this.userInfo) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.testId + '/result/details?userId=' + this.userInfo.userId)
                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    this.userAnswers = result;
                    this.showAnswers();
                }
            } catch (error) {
                console.log(error);
            }

        } else {
            location.href = '#/';
        }
    }

    showAnswers() {
        const that = this;
        document.getElementById('answers-back').onclick = function () {
            that.backToResult();
        }
        document.getElementById('pre-title').innerText = this.userAnswers.test.name;
        document.getElementById('post-title').innerText = this.userInfo.fullName + ', ' + this.email;
        let i = 1;
        this.userAnswers.test.questions.forEach(question => {
            const answerElement = document.createElement('div');
            answerElement.className = 'answer';
            const answerTitleElement = document.createElement('div');
            answerTitleElement.className = 'answer-title';
            answerTitleElement.innerHTML = '<span>Вопрос ' + (i++) + ':</span> ' + question.question;
            answerElement.appendChild(answerTitleElement);

            const answerOptionsElement = document.createElement('div');
            answerOptionsElement.className = 'answer-options';
            question.answers.forEach(answer => {
                const optionElement = document.createElement('div');
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

                const inputId = 'answer-' + answer.id;
                const inputElement = document.createElement('input');
                inputElement.className = 'answer-option';
                inputElement.setAttribute('id', inputId);
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('name', 'answer');
                inputElement.setAttribute('value', answer.id);
                inputElement.setAttribute('disabled', 'disabled');

                const labelElement = document.createElement('label');
                labelElement.setAttribute('for', inputId);
                labelElement.innerText = answer.answer;

                optionElement.appendChild(inputElement);
                optionElement.appendChild(labelElement);

                answerOptionsElement.appendChild(optionElement);

            });
            answerElement.appendChild(answerOptionsElement);

            document.getElementById('answers-list').appendChild(answerElement);
        })
    }

    backToResult() {
        location.href = '#/result';
    }

}
