export class Person {
    static now = new Date();
    static today = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());

    firstName;
    lastName;
    #birthday;

    get birthday() {
        return this.#birthday;
    }

    set birthday(birthday) {
        this.#birthday = birthday;
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

    get age() {
        let dateParts = this.birthday.split('.')
        let dateBirthday = new Date(+dateParts[2], dateParts[0] - 1, +dateParts[1]);
        let thisYearBirthday = new Date(Person.now.getFullYear(), dateBirthday.getMonth(), dateBirthday.getDate());
        return (Person.today.getFullYear() - dateBirthday.getFullYear() - ((Person.today < thisYearBirthday) ? 1 : 0));
    }

    getAge() {
        let age = this.age;
        let years = 'нет данных';
        switch (age) {
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
                years = age + ' лет';
                break;
            default:
                switch (age % 10) {
                    case 1:
                        years = age + ' год';
                        break;
                    case 2:
                    case 3:
                    case 4:
                        years = age + ' года';
                        break;
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 0:
                        years = age + ' лет';
                        break;
                }
        }
        return years;
    }
}