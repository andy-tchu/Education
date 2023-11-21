new WOW({
    animateClass: "animate__animated"
}).init();

document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

let loader = $(".loader");

//Обработчик меню
$(".menu-item-country").click(function () {
    $(".country")[0].scrollIntoView({behavior: "smooth"});
});

$(".menu-item-program").click(function () {
    $(".program")[0].scrollIntoView({behavior: "smooth"});
})

$(".menu-item-review").click(function () {
    $(".reviews")[0].scrollIntoView({behavior: "smooth"});
})

$(".menu-item-gallery").click(function () {
    $(".gallery")[0].scrollIntoView({behavior: "smooth"});
})

$(".main-button").click(function () {
    $(".order")[0].scrollIntoView({behavior: "smooth"});
})

//Обработчие кнопок на основном блоке
$(".main-video").click(function () {
    $(".video")[0].scrollIntoView({behavior: "smooth"});
})

$(".video-play").click(function () {
    $(".video-play").hide();
    $(".video-player").show();
})

//Увеличение картинок в галлерее
$('.photo').magnificPopup({
    type: 'image'
    // other options
});

// Слайдер у программы
const sliderProgram = $('.program-days');
const prevButtonProgram = $('.slider-left');
const nextButtonProgram = $('.slider-right');
const slidesProgram = $('.program-day')
const slidesProgramArray = Array.from(slidesProgram);
const slideCountProgram = slidesProgramArray.length;
let slideIndexProgram = 0;

prevButtonProgram.on('click', () => {
    slideIndexProgram = (slideIndexProgram - 1 + slideCountProgram) % slideCountProgram;
    slideProgram();
});

nextButtonProgram.on('click', () => {
    slideIndexProgram = (slideIndexProgram + 1) % slideCountProgram;
    slideProgram();
});

const slideProgram = () => {
    let imageWidthProgram = parseInt($(slidesProgram[0]).css("width"));
    let slideOffsetProgram = -slideIndexProgram * imageWidthProgram;
    sliderProgram.css('transform', `translateX(${slideOffsetProgram}px)`);
}

window.addEventListener('load', () => {
    slideProgram();
});

//Слайдер у отзывов
const sliderReview = $('.reviews-list');
const prevButtonReview = $('.review-slider-left');
const nextButtonReview = $('.review-slider-right');
const slidesReview = $('.review')
const slidesReviewArray = Array.from(slidesReview);
const slideCountReview = slidesReviewArray.length;
let slideIndexReview = 0;

prevButtonReview.on('click', () => {
    slideIndexReview = (slideIndexReview - 1 + slideCountReview) % slideCountReview;
    slideReview();
});

nextButtonReview.on('click', () => {
    slideIndexReview = (slideIndexReview + 1) % slideCountReview;
    slideReview();
});

const slideReview = () => {
    let imageWidthReview = parseInt($(slidesReview[0]).css("width")) + parseInt($(slidesReview[0]).css("padding-left")) * 2;
    let slideOffsetReview = -slideIndexReview * imageWidthReview;
    sliderReview.css('transform', `translateX(${slideOffsetReview}px)`);
}

window.addEventListener('load', () => {
    slideReview();
});

//Слайдер в галлерее
const sliderGallery = $('.pages-list');
const prevButtonGallery = $('.gallery-left');
const nextButtonGallery = $('.gallery-right');
const slidesGallery = $('.page')
const slidesGalleryArray = Array.from(slidesGallery);
const slideCountGallery = slidesGalleryArray.length;

let slideIndexGallery = 0;
const dotButtonGallery = $(".gallery-dot");
const dotButtonGalleryArray = Array.from(dotButtonGallery);

let slidesGalleryPage = $(slidesGalleryArray[slideIndexGallery]);
let slidesGalleryPagePhoto = slidesGalleryPage.children(".photo");
let slidesGalleryPageArrayPhoto = Array.from(slidesGalleryPagePhoto);
let slideCountGalleryPagePhoto = slidesGalleryPageArrayPhoto.length;
let slideIndexGalleryPagePhoto = 0;

const initPage = () => {
    $('.photo').css('display', 'none');
    slidesGalleryPage = $(slidesGalleryArray[slideIndexGallery]);
    slidesGalleryPagePhoto = slidesGalleryPage.children(".photo");
    slidesGalleryPageArrayPhoto = Array.from(slidesGalleryPagePhoto);
    slideCountGalleryPagePhoto = slidesGalleryPageArrayPhoto.length;
    slideIndexGalleryPagePhoto = 0;

    $(slidesGalleryPagePhoto[slideIndexGalleryPagePhoto]).css('display', 'block');
}

dotButtonGallery.on('click', (e) => {
    slideIndexGallery = dotButtonGalleryArray.indexOf(e.target);
    slideGallery();
});

prevButtonGallery.on('click', () => {
    slideIndexGallery = (slideIndexGallery - 1 + slideCountGallery) % slideCountGallery;
    slideGallery();
});

nextButtonGallery.on('click', () => {
    slideIndexGallery = (slideIndexGallery + 1) % slideCountGallery;
    slideGallery();
});

const slideGallery = () => {
    let imageWidthGallery = parseInt($(slidesGallery[0]).css("width"))
    let slideOffsetGallery = -slideIndexGallery * imageWidthGallery;
    sliderGallery.css('transform', `translateX(${slideOffsetGallery}px)`);
    dotButtonGallery.removeClass("dot-active");
    $(dotButtonGalleryArray[slideIndexGallery]).addClass("dot-active");
    if (imageWidthGallery < 1110) {
        initPage();
    }
}

window.addEventListener('load', () => {
    slideGallery();
});

//слайдер для галлереи на странице в адаптиве
const prevButtonGalleryPage = $('.photo-left');
const nextButtonGalleryPage = $('.photo-right');

prevButtonGalleryPage.on('click', () => {
    $(slidesGalleryPagePhoto[slideIndexGalleryPagePhoto]).css('display', 'none');
    if (slideIndexGalleryPagePhoto === 0) {
        slideIndexGalleryPagePhoto = slideCountGalleryPagePhoto - 1;
    } else {
        slideIndexGalleryPagePhoto--;
    }
    $(slidesGalleryPagePhoto[slideIndexGalleryPagePhoto]).css('display', 'block');
});

nextButtonGalleryPage.on('click', () => {
    $(slidesGalleryPagePhoto[slideIndexGalleryPagePhoto]).css('display', 'none');
    if (slideIndexGalleryPagePhoto === slideCountGalleryPagePhoto - 1) {
        slideIndexGalleryPagePhoto = 0;
    } else {
        slideIndexGalleryPagePhoto++;
    }
    $(slidesGalleryPagePhoto[slideIndexGalleryPagePhoto]).css('display', 'block');
});

window.addEventListener('load', () => {
    $(slidesGalleryPagePhoto[slideIndexGalleryPagePhoto]).css('display', 'block');
});

//Количество человек
const numbersOrder = $(".number");
const numberOrderArray = Array.from(numbersOrder);
let numberOrderIndex = 1;

numbersOrder.on("click", (e) => {
    numberOrderIndex = numberOrderArray.indexOf(e.target);
    numbersOrder.removeClass("number-active");
    $(e.target).addClass("number-active");
})

//Телефон только цифры
$(".order-phone").keypress((e) => {
    if (!parseInt(e.originalEvent.key)) {
        return false;
    }
})

//Проверка заказа
$(".order-button").click(() => {
    let nameInput = $(".input-name");
    let phoneInput = $(".input-phone");
    let numberInput = numberOrderIndex + 1;
    let hasError = false;

    $(".error-input").hide();
    $(".order-input").css("border-color", "rgb(255, 255, 255)");

    if (!nameInput.val()) {
        nameInput.next().show();
        nameInput.css("border-color", "rgb(175, 3, 3)");
        hasError = true;
        nameInput
    }
    if (!phoneInput.val()) {
        phoneInput.next().show();
        phoneInput.css("border-color", "rgb(175, 3, 3)");
        hasError = true;
    }

    if (!hasError) {
        loader.css("display", "flex");
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {name: nameInput.val(), phone: phoneInput.val(), number: numberInput}
        })
            .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        $(".order-thanks").css("display", "flex");
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                    }

                }
            )
    }

});

//Выбор места
const numbersPlace = $(".place-dot");
const numberPlaceArray = Array.from(numbersPlace);
let numberPlaceIndex = 0;

const place = $(".place");
const placeArray = Array.from(place);

numbersPlace.on("click", (e) => {
    numberPlaceIndex = numberPlaceArray.indexOf(e.target);
    numbersPlace.removeClass("place-dot-active");
    $(e.target).addClass("place-dot-active");
    showPlace();
})

const showPlace = () => {
    numbersPlace.removeClass("place-dot-active");
    place.css('display', 'none');
    $(numberPlaceArray[numberPlaceIndex]).addClass("place-dot-active")
    $(placeArray[numberPlaceIndex]).css('display', 'block');
}

window.addEventListener('load', () => {
    showPlace();
});