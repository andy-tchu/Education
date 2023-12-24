import {Worker} from "./worker.js";
class Index  {
    constructor() {
        //1. В файле index.js импортируйте класс Worker и создайте через конструктор пятерых работников.
        let workers = [];
        workers.push(new Worker('Ivan', 'Ivanov', '01.01.1989', 'analyst'));
        workers.push(new Worker('Peter', 'Petrov', '02.29.2000', 'business'));
        workers.push(new Worker('Andrey', 'Andreev', '09.01.2005', 'front-end'));
        workers.push(new Worker('Bill', 'Hohner', '05.05.1999', 'back-end'));
        workers.push(new Worker('Herman', 'Stachinsky', '12.30.2002', 'back-end'));
        console.log(workers)

        //2. Как минимум для троих поменяйте ставку в день.
        workers[0].rate = 2000;
        workers[2].rate = 5000;
        workers[3].rate = 4000 ;

        //3. Для каждого из сотрудников по 2-3 раза добавьте через метод addDays рабочие дни (попробуйте разные вариации, к примеру, добавить -2 дня или 50 дней)
        workers[0].addDays(1);
        workers[0].addDays(3);
        workers[0].addDays(4);
        workers[1].addDays(-2);
        workers[1].addDays(0);
        workers[1].addDays(20);
        workers[2].addDays(50);
        workers[2].addDays(0);
        workers[2].addDays(21);
        workers[3].addDays(0);
        workers[3].addDays(5);
        workers[3].addDays(30);
        workers[4].addDays(5);
        workers[4].addDays(5);
        workers[4].addDays(21);
        //4. Выведите зарплату за текущий месяц для каждого из работников в консоль в формате «Имя Фамилия - N рублей».
        workers.forEach(worker => {
            console.log(worker.getFullName() + ' - ' + worker.getSalary() + ' рублей');
        })

        //5. Выясните с помощью whoWorkedMore, кто из этих 5 работников отработал больше всех дней за месяц.
        Worker.whoWorkedMore(workers);

        //6. Выясните с помощью whoIsYounger, кто из этих 5 работников самый младший.
        Worker.whoIsYounger(workers);
    }
}
new Index();