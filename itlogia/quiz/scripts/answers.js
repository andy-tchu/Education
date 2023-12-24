(function () {
    const Answers = {
        answers: [],
        userAnswers: [],
        init() {
            checkUserData();
            const testId = sessionStorage.getItem('id');
            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                    xhr.open('GET', 'https://testologia.site/get-quiz-right?id=' + testId, false);
                    xhr.send();
                    if (xhr.status === 200 && xhr.responseText) {
                        try {
                            this.answers = JSON.parse(xhr.responseText);
                        } catch (e) {
                            location.href = 'index.html';
                        }
                        this.showAnswers();
                    } else {
                        location.href = 'index.html';
                    }
                } else {
                    location.href = 'index.html';
                }

            } else {
                location.href = 'index.html';
            }
        },
        showAnswers() {
            const that = this;
            document.getElementById('answers-back').onclick = function () {
                that.backToResult();
            }
            const name = sessionStorage.getItem('name');
            const lastName = sessionStorage.getItem('lastName');
            const email = sessionStorage.getItem('email');
            this.userAnswers = sessionStorage.getItem('results').split(',').map((x) => parseInt(x));
            document.getElementById('pre-title').innerText = this.quiz.name;
            document.getElementById('post-title').innerText = name + ' ' + lastName + ', ' + email;

            this.quiz.questions.forEach(question => {
                const answerElement = document.createElement('div');
                answerElement.className = 'answer';
                const answerTitleElement = document.createElement('div');
                answerTitleElement.className = 'answer-title';
                answerTitleElement.innerHTML = '<span>Вопрос ' + (question.id) + ':</span> ' + question.question;
                answerElement.appendChild(answerTitleElement);

                const answerOptionsElement = document.createElement('div');
                answerOptionsElement.className = 'answer-options';
                question.answers.forEach(answer => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'answer-option question-option';

                    optionElement.classList.remove('right');
                    optionElement.classList.remove('wrong');
                    console.log(this.answers.includes(answer.id));
                    if (this.answers.includes(answer.id) && this.userAnswers.includes(answer.id)) {
                        optionElement.classList.add('right');
                    } else if (this.userAnswers.includes(answer.id)) {
                        optionElement.classList.add('wrong');
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
        },
        backToResult() {
            location.href = 'result.html' + location.search;
        },
    }
    Answers.init();
})();