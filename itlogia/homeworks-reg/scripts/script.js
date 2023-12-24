window.onload = () => {
    let inputFullName = document.getElementById("input-full-name");
    let inputUsername = document.getElementById("input-username");
    let inputEmail = document.getElementById("input-email");
    let inputPassword = document.getElementById("input-password");
    let inputPassword2 = document.getElementById("input-password-2");
    let inputAgreement = document.getElementById("agreement-checkbox");

    function clientPage(client) {
        document.getElementById("signup-form-title").innerText = 'Welcome, ' + client.full_name + '!';
        document.getElementsByClassName("signup-form-text")[0].remove();
        document.getElementById("login-account").remove()
        document.getElementsByClassName("order-bottom-button")[0].innerText = "Exit";

        let input = document.querySelectorAll(".login-input");
        input.forEach(item => {
            item.remove();
        });

        document.getElementsByClassName("order-bottom-button")[0].onclick = () => {
            location.reload();
        }
    }

    function loginPage() {
        document.getElementById("signup-form-title").innerText = 'Log in to the system';
        let input = document.querySelectorAll(".signup-input");
        input.forEach(item => {
            if (!item.classList.contains("login-input")) {
                item.remove();
            }
        });

        document.getElementsByClassName("agreement")[0].remove();
        document.getElementsByClassName("order-bottom-button")[0].innerText = "Sign In";
        document.getElementById("login-account").innerText = "Registration";
        document.getElementsByClassName("main-image")[0].style.marginTop = "-80px";

        document.getElementById("login-account").onclick = () => {
            location.reload();
        }

        document.getElementById("button-signup").onclick = (e) => {
            inputUsername.nextElementSibling.style.display = 'none';
            inputPassword.nextElementSibling.style.display = 'none';
            inputUsername.parentElement.style.borderColor = '#C6C6C4';
            inputPassword.parentElement.style.borderColor = '#C6C6C4';
            let hasError = false;

            if (!inputUsername.value) {
                inputUsername.nextElementSibling.style.display = 'block';
                inputUsername.parentElement.style.borderColor = 'red';
                hasError = true;
            }
            if (!inputPassword.value) {
                inputPassword.nextElementSibling.style.display = 'block';
                inputPassword.parentElement.style.borderColor = 'red';
                hasError = true;
            }
            if (!hasError) {
                let clients = localStorage.getItem('clients');
                let clientsArray = [];
                if (clients) {
                    clientsArray = JSON.parse(clients);
                }
                let userFound = false;
                let passCorrect = false;
                let clientCurrent;
                clientsArray.forEach(client => {
                        if (client.username === inputUsername.value) {
                            userFound = true;
                            if (client.password === inputPassword.value) {
                                passCorrect = true;
                                clientCurrent = client;
                            }
                        }
                    }
                )
                if (!userFound) {
                    inputUsername.nextElementSibling.style.display = 'block';
                    inputUsername.nextElementSibling.textContent = 'Такой пользователь не зарегистрирован';
                    inputUsername.parentElement.style.borderColor = 'red';
                    hasError = true;
                }
                if (!passCorrect) {
                    inputPassword.nextElementSibling.style.display = 'block';
                    inputPassword.nextElementSibling.textContent = 'Неверный пароль';
                    inputPassword.parentElement.style.borderColor = 'red';
                    hasError = true;
                }

                if (!hasError) {
                    clientPage(clientCurrent);
                }
            }
        }
    }


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
        inputFullName.nextElementSibling.style.display = 'none';
        inputUsername.nextElementSibling.style.display = 'none';
        inputEmail.nextElementSibling.style.display = 'none';
        inputPassword.nextElementSibling.style.display = 'none';
        inputPassword2.nextElementSibling.style.display = 'none';
        inputAgreement.parentElement.nextElementSibling.style.display = 'none';
        inputFullName.parentElement.style.borderColor = '#C6C6C4';
        inputUsername.parentElement.style.borderColor = '#C6C6C4';
        inputEmail.parentElement.style.borderColor = '#C6C6C4';
        inputPassword.parentElement.style.borderColor = '#C6C6C4';
        inputPassword2.parentElement.style.borderColor = '#C6C6C4';
        let hasError = false;

        if (!inputFullName.value) {
            inputFullName.nextElementSibling.style.display = 'block';
            inputFullName.parentElement.style.borderColor = 'red';
            hasError = true;
        } else {
            if (inputFullName.value.toString().search("[^А-ЯЁа-яё ]") > -1) {
                inputFullName.nextElementSibling.style.display = 'block';
                inputFullName.nextElementSibling.textContent = 'Full Name может содержать только буквы и пробел';
                inputFullName.parentElement.style.borderColor = 'red';
                hasError = true;
            }
        }
        if (!inputUsername.value) {
            inputUsername.nextElementSibling.style.display = 'block';
            inputUsername.parentElement.style.borderColor = 'red';
            hasError = true;
        } else {
            if (inputUsername.value.toString().search("[^A-Za-z0-9_-]") > -1) {
                inputUsername.nextElementSibling.style.display = 'block';
                inputUsername.nextElementSibling.textContent = 'Your username - может содержать только буквы, цифры, символ подчеркивания и тире';
                inputUsername.parentElement.style.borderColor = 'red';
                hasError = true;
            }
        }
        if (!inputEmail.value) {
            inputEmail.nextElementSibling.style.display = 'block';
            inputEmail.parentElement.style.borderColor = 'red';
            hasError = true;
        } else {
            if (!inputEmail.value.toString().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                inputEmail.nextElementSibling.style.display = 'block';
                inputEmail.nextElementSibling.textContent = 'E-mail - некорректный формат адреса';
                inputEmail.parentElement.style.borderColor = 'red';
                hasError = true;
            }
        }
        if (!inputPassword.value) {
            inputPassword.nextElementSibling.style.display = 'block';
            inputPassword.parentElement.style.borderColor = 'red';
            hasError = true;
        } else {
            if (inputPassword.value.length < 8) {
                inputPassword.nextElementSibling.style.display = 'block';
                inputPassword.nextElementSibling.textContent = 'Пароль меньше 8 символов';
                inputPassword.parentElement.style.borderColor = 'red';
                hasError = true;
            } else {
                if ((inputPassword.value.toString().search('[0-9]') === -1) || (inputPassword.value.toString().search('[A-Z]') === -1)
                    || (inputPassword.value.toString().search('[!@#$%^&*?><]') === -1)) {
                    inputPassword.nextElementSibling.style.display = 'block';
                    inputPassword.nextElementSibling.textContent = 'Пароль слишком простой';
                    inputPassword.parentElement.style.borderColor = 'red';
                    hasError = true;
                }
            }
        }
        if (!inputPassword2.value) {
            inputPassword2.nextElementSibling.style.display = 'block';
            inputPassword2.parentElement.style.borderColor = 'red';
            hasError = true;
        } else {
            if (inputPassword2.value !== inputPassword.value) {
                inputPassword2.nextElementSibling.style.display = 'block';
                inputPassword2.nextElementSibling.textContent = 'Пароли не совпадают';
                inputPassword2.parentElement.style.borderColor = 'red';
                hasError = true;
            }
        }
        if (!inputAgreement.checked) {
            inputAgreement.parentElement.nextElementSibling.style.display = 'block';
            hasError = true;
        }

        if (!hasError) {
            let client = {
                full_name: inputFullName.value,
                username: inputUsername.value,
                email: inputEmail.value,
                password: inputPassword.value
            }
            let clientsArray = [];
            let clients = localStorage.getItem('clients');
            if (clients) {
                clientsArray = JSON.parse(clients);
            }
            clientsArray.push(client);
            localStorage.setItem('clients', JSON.stringify(clientsArray));

            alert("На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию");

            inputFullName.value = null;
            inputUsername.value = null;
            inputEmail.value = null;
            inputPassword.value = null;
            inputPassword2.value = null;
            inputAgreement.checked = false;

            loginPage();
        }

    }
}