let cities = [];
let specs = [];
let person = [];

Promise.all(
    [
        fetch("data/cities.json"),
        fetch("data/specializations.json"),
        fetch("data/person.json"),
    ]
).then(async ([citiesResponce, specsResponce, personResponce]) => {
    const brandJson = await citiesResponce.json();
    const typeJson = await specsResponce.json();
    const personJson = await personResponce.json();
    return [brandJson, typeJson, personJson]
})
    .then(responce => {
        cities = responce[0];
        specs = responce[1];
        person = responce[2];

        processData();
    })

function processData() {
    //Импортируйте данные из файлов в массивы
    console.log(cities);
    console.log(specs);
    console.log(person);

    //Создайте самостоятельную функцию getInfo
    console.log(getInfo.call(person.find(personItem => personItem.id === 1)));

    //Найдите среди пользователей всех дизайнеров, которые владеют Figma
    getAllDesignersFigma().forEach(personItem => {
        console.log(getInfo.call(personItem));
    });

    //Найдите первого попавшегося разработчика, который владеет React
    console.log(getInfo.call(person.find(personItem => personItem.skills.some(skill => skill.name === 'React'))));

    //Проверьте, все ли пользователи старше 18 лет
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (
        person.every(personItem => {
            let dateParts = personItem.personal.birthday.split('.')
            let dateBirthday = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
            let thisYearBirthday = new Date(now.getFullYear(), dateParts[1] - 1, +dateParts[0]);
            return ((today.getFullYear() - dateBirthday.getFullYear() - ((today < thisYearBirthday) ? 1 : 0)) >= 18);
        })
    ) {
        console.log("Все пользователи старше 18 лет")
    } else {
        console.log("Не все пользователи старше 18 лет")
    }

    //Найдите всех backend-разработчиков из Москвы, которые ищут работу на полный день и отсортируйте их в порядке возрастания зарплатных ожиданий
    console.log(getAllBackendsMoscowWithSalary().sort((a, b) => {
        return a.sallary - b.sallary;
    }));

    //Найдите всех дизайнеров, которые владеют Photoshop и Figma одновременно на уровне не ниже 6 баллов
    console.log(getAllDesignersPhotoshopFigma6());

    //Соберите команду для разработки проекта:
    // - дизайнера, который лучше всех владеет Figma
    // - frontend разработчика с самым высоким уровнем знания Angular
    // - лучшего backend разработчика на Go
    console.log(getInfo.call(getBestSpecialist('designer', 'figma')));
    console.log(getInfo.call(getBestSpecialist('Frontend', 'angular')));
    console.log(getInfo.call(getBestSpecialist('BACKEND', 'gO')));
}

function getInfo() {
    return this.personal.firstName + ' ' + this.personal.lastName + ', ' + cities.find(city => city.id === this.personal.locationId).name;
}

function getAllDesignersFigma() {
    return person.filter(personItem => (personItem.personal.specializationId === 3) && (personItem.skills.some(skill => skill.name === 'Figma')));
}

function getAllBackendsMoscowWithSalary() {

    return person.filter(personItem => (personItem.personal.specializationId === 2)
        && (personItem.request.some(requestItem => (requestItem.name === 'Тип занятости') && (requestItem.value === "Полная"))))
        .map(item => {
            item.sallary = item.request.find(req => req.name === 'Зарплата').value;
            return item;
        });
}

function getAllDesignersPhotoshopFigma6() {
    return person.filter(personItem => (personItem.personal.specializationId === 3)
        && (personItem.skills.some(skill => (skill.name === 'Figma') && (skill.level >= 6)))
        && (personItem.skills.some(skill => (skill.name === 'Photoshop') && (skill.level >= 6))));
}

function getBestSpecialist(spec, skill) {
    let maxLevel = 0;
    let maxLevelItem = null;
    let specId = -1;

    specId = specs.find(specItem => specItem.name.toLowerCase() === spec.toLowerCase()).id;
    if (specId > -1) {
        person.filter(personItem => personItem.personal.specializationId === specId).forEach(item => {
            let skillItem = item.skills.find(skillIt => skillIt.name.toLowerCase() === skill.toLowerCase());
            if (skillItem && skillItem.level) {
                let skillNum = parseInt(skillItem.level);
                if (!isNaN(skillNum) && skillNum > maxLevel) {
                    maxLevel = skillNum;
                    maxLevelItem = item;
                }
            }
        })
    }
    return maxLevelItem;
}
