new WOW({
    animateClass: "animate__animated"
}).init();

$(document).ready(function () {
    $('.main-slick').slick({
        // setting-name: setting-value
        nextArrow: '.btn-right',
        prevArrow: '.btn-left'
    });
});

$(document).ready(function() {
    $('.image-link').magnificPopup({type:'image'});
});

$('.product-image').magnificPopup({
    type: 'image'
    // other options
});

$(function () {
    let icons = {
        header: "iconClosed",
        activeHeader: "iconOpen"
    };
    $("#faq-accordion").accordion({
        icons: icons,
        heightStyle: "content"
    });
});

$("#index-input").keypress(function (e) {
    if (!parseInt(e.originalEvent.key)) {
        return false;
    }
})

$("#phone-input").keypress(function (e) {
    if (!parseInt(e.originalEvent.key)) {
        return false;
    }
})

$("#create-order").click(function () {
    let nameInput = $("#name-input");
    let lastNameInput = $("#lastname-input");
    let phoneInput = $("#phone-input");
    let countryInput = $("#country-input");
    let indexInput = $("#index-input")
    let addressInput = $("#address-input");

    if (!nameInput.val()) {
        alert("Заполните Имя");
        return;
    }
    if (!lastNameInput.val()) {
        alert("Заполните Фамилию");
        return;
    }
    if (!phoneInput.val()) {
        alert("Заполните телефон");
        return;
    }
    if (!countryInput.val()) {
        alert("Заполните Страну");
        return;
    }
    if (!indexInput.val()) {
        alert("Заполните Индекс");
        return;
    }
    if (indexInput.val().length < 6) {
        alert("Индекс меньше 6 символов");
        return;
    }
    if (!addressInput.val()) {
        alert("Заполните адрес");
        return;
    }
    if (addressInput.val().length < 3) {
        alert("Адрес меньше 3 символов");
        return;
    }
    $("#order").css("display", "none");
    $("#order-thanks").css("display", "block");
})