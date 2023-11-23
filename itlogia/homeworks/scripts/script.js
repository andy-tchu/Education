window.onload = () => {
    function loginPage() {
        console.log("begin");
        document.getElementById("signup-form-title").innerText = 'Log in to the system';
        let input = document.getElementsByClassName("signup-input");
        for (let i = 0; i < input.length; i++) {
            if (!input[i].classList.contains("login-input")) {
                input[i].remove();
            }
        }

        document.getElementsByClassName("agreement")[0].remove();
        document.getElementsByClassName("order-bottom-button")[0].innerText = "Sign In";
        document.getElementsByClassName("order-bottom-already")[0].remove();
        document.getElementsByClassName("main-image")[0].style.marginTop = "-80px";

        document.getElementById("button-signup").onclick = (e) => {
            let inputUsername = document.getElementById("input-username");
            let inputPassword = document.getElementById("input-password");

            if (!inputUsername.value) {
                alert("Заполните поле Username");
                return;
            }

            if (!inputPassword.value) {
                alert("Заполните поле Password");
                return;
            }
            alert("Добро пожаловать, " + inputUsername.value)
        }
    }

    let inputFullName = document.getElementById("input-full-name");
    let inputUsername = document.getElementById("input-username");
    let inputEmail = document.getElementById("input-email");
    let inputPassword = document.getElementById("input-password");
    let inputPassword2 = document.getElementById("input-password-2");
    let inputAgreement = document.getElementById("agreement-checkbox");

    document.getElementById("login-account").onclick = (e) => {
        loginPage();
    }


    inputFullName.onkeydown = (e) => {
        if (!isNaN(parseInt(e.key))) {
            return false;
        }
    }

    inputUsername.onkeydown = (e) => {
        if ((e.key === '.') || (e.key === ',')) {
            return false;
        }
    }

    inputAgreement.onclick = (e) => {
        if (inputAgreement.checked) {
            console.log("Согласен");
        } else {
            console.log("Не согласен")
        }
    }

    document.getElementById("button-signup").onclick = (e) => {
        if (!inputFullName.value) {
            alert("Заполните поле Full Name");
            return;
        }
        if (!inputUsername.value) {
            alert("Заполните поле Username");
            return;
        }
        if (!inputEmail.value) {
            alert("Заполните поле E-mail");
            return;
        }
        if (!inputPassword.value) {
            alert("Заполните поле Password");
            return;
        }
        if (!inputPassword2.value) {
            alert("Заполните поле Repeat Password");
            return;
        }
        if (inputPassword.value.length < 8) {
            alert("Пароль меньше 8 символов");
            return;
        }
        if (inputPassword.value !== inputPassword2.value) {
            alert("Пароли не совпадают");
            return;
        }
        if (!inputAgreement.checked) {
            alert("Соглвшение не принято");
            return;
        }
        alert("На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию");
        inputPassword.value = null;
        inputUsername.value = null;
        inputEmail.value = null;
        inputPassword.value = null;
        inputPassword2.value = null;
        inputAgreement.checked = false;

        loginPage();

    }
}