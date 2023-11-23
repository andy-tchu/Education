document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

document.getElementById("choose-pizza").onclick = function () {
    document.getElementsByClassName("products")[0].scrollIntoView({behavior: "smooth"})
}

let addToCardButton = document.getElementsByClassName("add-to-cart");
let productInput = document.getElementById("product-input");

for (let i = 0; i < addToCardButton.length; i++) {
    addToCardButton[i].onclick = function (e) {
        productInput.value = e.target.parentElement.previousElementSibling.previousElementSibling.innerText;
        document.getElementsByClassName("order")[0].scrollIntoView({behavior: "smooth"})
    }
}

document.getElementById("create-order").onclick = function (e) {
    let addressInput = document.getElementById("address-input");
    let phoneInput = document.getElementById("phone-input");
    if (!productInput.value) {
        alert("Заполните пиццу");
        return;
    }
    if (!addressInput.value) {
        alert("Заполните адрес");
        return;
    }
    if (!phoneInput.value) {
        alert("Заполните телефон");
        return;
    }

    alert('Спасибо за заказ!');
    productInput.value = null;
    addressInput.value = null;
    phoneInput.value = null;
}