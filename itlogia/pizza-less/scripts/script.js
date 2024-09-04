document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

let productInput = $("#product-input");

productInput.attr("placeholder", "Имя");

$(".rights span").text((new Date()).getFullYear());

let products = $(".product");

$("#choose-pizza").click(function () {
    $(".products")[0].scrollIntoView({behavior: "smooth"});
})

$(".add-to-cart").click((e) => {
    console.log('12')
    productInput.val($(e.target).parents(".product").find(".product-title").text());
    $(".order")[0].scrollIntoView({behavior: "smooth"});
})

let phoneInput = $("#phone-input");
phoneInput.inputmask({"mask": "(999) 999-9999"});

$("#create-order").click(function () {
    console.log("order");
    let addressInput = $("#address-input");

    if (!productInput.val()) {
        alert("Заполните пиццу");
        return;
    }
    if (!addressInput.val()) {
        alert("Заполните адрес");
        return;
    }
    if (!phoneInput.val()) {
        alert("Заполните телефон");
        return;
    }

    $.ajax( {
        method: "GET",
        url: "https://testologia.site/test-cookie?name=" + productInput.value,
        xhrFields: {
            withCredentials: true
        }
    })
    productInput.val(null);
    addressInput.val(null);
    phoneInput.val(null);
})

if (!localStorage.getItem("cookieAccepted")) {
    $(".cookie").show();
}

$(".cookie-accept").click(function () {
    $(".cookie").hide();
    localStorage.setItem("cookieAccepted", "1");
})

let cookie = {
    set: (name, value, options) => {
        if (!name || !value) {
            return null;
        }
        let string = name + '=' + value;
        if (options) {
            string += ';' + options;
        }
        document.cookie = string;
        return cookie;
    },
    get: (name) => {
        const value = '; ' + document.cookie;
        const parts = value.split(`; ${name}=`);
        if (parts.length ===2 ) {
            return parts.pop().split(";").shift();
        }
    },
    delete: (name) => {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:001 GMT';
    }
}

localStorage.clear()
document.cookie.cle