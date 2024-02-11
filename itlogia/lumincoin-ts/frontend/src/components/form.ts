import {Auth} from "../services/auth";
import config from "../../config/config";
import {CustomHttp} from "../services/custom-http";
import {DefaultResponseType} from "../types/default-response.type";

export class Form {
    readonly page: string | null = null;
    readonly email: HTMLInputElement | null = null;
    readonly password: HTMLInputElement | null = null;
    readonly rememberMe: HTMLInputElement | null = null;
    readonly fio: HTMLInputElement | null = null;
    readonly passwordRepeat: HTMLInputElement | null = null;

    constructor(page: string) {
        this.page = page;
        const form = document.getElementById('form-validated') as HTMLInputElement;
        this.email = document.getElementById('validationCustomEmail') as HTMLInputElement;
        this.rememberMe = document.getElementById('rememberCheck') as HTMLInputElement;
        this.password = document.getElementById('validationCustomPassword') as HTMLInputElement;
        this.fio = document.getElementById('validationCustomFIO') as HTMLInputElement;
        this.passwordRepeat = document.getElementById('validationCustomPasswordRepeat') as HTMLInputElement;

        const accessToken: string | null = localStorage.getItem(Auth.accessTokenKey);
        if (accessToken) {
            location.href = '#/main';
            return;
        }

        this.email.onkeyup = () => {
            if (this.email) {
                if (this.email.value && this.email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    this.email.setCustomValidity('');
                } else {
                    this.email.setCustomValidity('bad email');
                }
            }
        }

        this.password.onkeyup = () => {
            if (this.password) {
                if (this.password.value && this.password.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
                    this.password.setCustomValidity('');
                } else {
                    this.password.setCustomValidity('bad password');
                }
            }
        }

        if (page === 'create') {
            this.fio.onkeyup = () => {
                if (this.fio) {
                    if (this.fio.value && this.fio.value.match(/^[А-ЯЁа-яё]+(?:-[А-ЯЁа-яё]+)? [А-ЯЁа-яё]+(?: [А-ЯЁа-яё]+)*$/)) {
                        this.fio.setCustomValidity('');
                    } else {
                        this.fio.setCustomValidity('bad FIO');
                    }
                }
            }

            this.passwordRepeat.onkeyup = () => {
                if (this.passwordRepeat && this.password) {
                    if (this.passwordRepeat.value === this.password.value) {
                        this.passwordRepeat.setCustomValidity('');
                    } else {
                        this.passwordRepeat.setCustomValidity('bad repeat password');
                    }
                }
            }
        }

        const that: Form = this;
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                this.processForm(that);
            }

            form.classList.add('was-validated')
        }, false)
    }

    private async processForm(that: Form): Promise<void> {
        if (this.page === 'create') {
            try {
                if (!that.fio || !that.email || !that.password || !that.passwordRepeat) return;

                const result: DefaultResponseType = await CustomHttp.request(config.host + "/signup", "POST", {
                    name: that.fio.value.split(" ")[1],
                    lastName: that.fio.value.split(" ")[0],
                    email: that.email.value,
                    password: that.password.value,
                    passwordRepeat: that.passwordRepeat.value
                });
                if (result) {
                    if ((result as DefaultResponseType).error) {
                        throw new Error((result as DefaultResponseType).message);
                    }
                }
            } catch (error) {
                console.log(error);
                return;
            }
        }

        let rememberChecked;
        if (this.page === "create") {
            rememberChecked = false;
        } else {
            if (that.rememberMe) {
                rememberChecked = that.rememberMe.checked;
            }
        }
        try {
            if (!that.email || !that.password) return;

            const result = await CustomHttp.request(config.host + "/login", "POST", {
                email: that.email.value,
                password: that.password.value,
                rememberMe: rememberChecked,
            });
            if (result) {
                if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.lastName || !result.user.id) {
                    throw new Error(result.message);
                }

                Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
                Auth.setUserInfo({
                    name: result.user.name,
                    lastName: result.user.lastName,
                    id: result.user.id,
                })
                location.href = '#/main';
            }
        } catch (error) {
            console.log(error);
        }
    }
}