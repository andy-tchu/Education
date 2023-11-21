function fullName(object) {
    return object.firstName + " " + object.lastName;
}

function getBirthday(str) {
    let birthday = new Date(str);
    let today = new Date();
    return birthday.toLocaleString("ru-RU", {
        day: 'numeric',
        month: 'long'
    }) + (((birthday.getDate() === today.getDate()) && (birthday.getMonth() === today.getMonth())) ? " (сегодня)" : "");
}

function getAllAmount(amounts) {
    let sum = 0;
    for (let a of amounts) {
        sum += a;
    }
    return sum;
}

function getAverageAmount(amounts) {
    let sum = 0;
    for (let a of amounts) {
        sum += a;
    }
    return (sum / amounts.length).toFixed(1);
}

function whoSpentMore(clients) {
    let maxAmount = 0
    let maxClient = null;

    for (let cl of clients) {
        let currAmount = getAllAmount(cl.amounts);
        if ( currAmount > maxAmount) {
            maxClient = cl;
            maxAmount = currAmount;
        }
    }
    console.log("Больше всех потратил " + fullName(maxClient) + ". Сумма покупок: " + getAllAmount(maxClient.amounts));
}

let clients = [
    {
        firstName: "Александр",
        lastName: "Иванчук",
        date: new Date("1990-11-29"),
        phone: "8 (929) 988-90-09",
        amounts: [2546, 2098, 764, 7266]
    },
    {
        firstName: "Анатолий",
        lastName: "Стаценко",
        date: new Date("1987-02-12"),
        phone: null,
        amounts: [563, 8287, 889]
    },
    {
        firstName: "Марина",
        lastName: "Петрова",
        date: new Date("1997-07-20"),
        phone: "8 (899) 546-09-08)",
        amounts: [6525, 837, 1283, 392]
    },
    {
        firstName: "Иван",
        lastName: "Караванов",
        date: new Date("1999-09-12"),
        phone: null,
        amounts: [7634, 283, 9823, 3902]
    },
    {
        firstName: "Оксана",
        lastName: "Абрамова",
        date: new Date("2002-01-24"),
        phone: "8 (952) 746-99-22",
        amounts: [342, 766, 362]
    }
];

let bestClients = [
    {
        firstName: "Андрей",
        lastName: "Чучалов",
        date: new Date("1977-11-29"),
        phone: "8 (929) 555-90-09",
        amounts: [12, 13, 11, 16]
    },
    {
        firstName: "Ирина",
        lastName: "Балерина",
        date: new Date("1987-04-14"),
        phone: null,
        amounts: [9, 3, 4]
    }
]

let newClient = {
    firstName: prompt("Введите имя: "),
    lastName: prompt("Введите фамилию: "),
    date: new Date(prompt("Введите дату рождения (мм-дд-гггг): ")),
    phone: prompt("Введите номер телефона: "),
    amounts: []
};

while (confirm("Добавить покупку для клиента " + fullName(newClient) + "?")) {
    newClient.amounts.push(prompt("Введите сумму покупки: "));
}

clients.push(newClient);


showClients = (clients) => {
    for (let cl of clients) {
        console.log("Клиент " + fullName(cl) + " имеет среднюю сумму чека " + getAverageAmount(cl.amounts) + ". День рождения клиента: " + getBirthday(cl.date));
    }
}

showClients(clients);

try {
    showClients();
} catch (e) {
    console.log("Вызвана функция без параметров");
    console.log(e.message);
}

setTimeout(() => {
    showClients(bestClients)
}, 3000);

whoSpentMore(clients);

whoSpentMore(bestClients);