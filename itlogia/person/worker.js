import {Person} from "./person.js";

export class Worker extends Person {
    position;
    #rate = 1000;
    #days = 0;

    #daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    get rate() {
        return this.#rate;
    }

    set rate(rate) {
        if (rate >= 1000) {
            this.#rate = rate;
        } else {
            console.error('Ставка меньше 1000: ' + rate);
        }
    }

    get days() {
        return this.#days;
    }

    set days(days) {
        this.#days = days;
    }

    constructor(name, lastName, birthday, position) {
        super();
        this.firstName = name;
        this.lastName = lastName;
        this.birthday = birthday;
        this.position = position;
    }

    addDays(workedDays) {
        if (workedDays > 0 && workedDays + this.#days <= this.#daysInMonth(Person.today.getMonth(), Person.today.getFullYear())) {
            this.#days += workedDays;
        }
    }

    getSalary() {
        let result = this.days * this.rate;
        if (this.birthday.split()[0] === Person.today.getMonth() + 1) {
            result *= 1.1;
        }
        return result;
    }

    static whoWorkedMore(workers) {
        let maxDays = 0;
        workers.forEach(worker => {
            if (worker.days > maxDays) {
                maxDays = worker.days;
            }
        });
        workers.filter(item => {
                return item.days === maxDays
            }
        ).forEach(worker => {
            console.log('Больше всех отработал ' + worker.getFullName() + '. Количество рабочих дней - ' + worker.days);
        });
    }

    static whoIsYounger(workers) {
        let minAge = 9999;

        workers.forEach(worker => {
            let workerAge = worker.age;
            if (workerAge < minAge) {
                minAge = workerAge;
            }
        })
        workers.filter(item => {
            return item.age === minAge;
        }).forEach(worker => {
            console.log(worker.getFullName() + ' ' + worker.getAge());
        })
    }
}