(function () {
    const Result = {
        init() {
            document.getElementById('result-score').innerText = sessionStorage.getItem('score') + '/' + sessionStorage.getItem('total');
            document.getElementById('answers').onclick = function () {
                location.href = 'answers.html';
            }
        },
    }
    Result.init();
})();