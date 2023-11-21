let loader = $(".loader");

$('#burger').click(
    function () {
        $('#menu').addClass('open');
    }
)

$('#menu').children().each((index, item) => {
    item.onclick = () => {
        $('#menu').removeClass('open');
    }
})

$("#submit").click(function () {
        let inputProduct = $("#choose");
        let inputName = $("#name");
        let inputPhone = $("#phone");
        let hasError = false;

        $(".error-input").hide();
        $(".order-input").css("border-color", "rgb(130, 19, 40)");

        if (!inputProduct.val()) {
            inputProduct.next().show();
            inputProduct.parent().css("border-color", "red");
            hasError = true;
        }
        if (!inputName.val()) {
            inputName.next().show();
            inputName.parent().css("border-color", "red");
            hasError = true;
        }
        if (!inputPhone.val()) {
            inputPhone.next().show();
            inputPhone.parent().css("border-color", "red");
            hasError = true;
        }

        if (!hasError) {
            loader.css("display", "flex");
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {product: inputProduct.val(), name: inputName.val(), phone: inputPhone.val()}
            })
                .done(function (msg) {
                        loader.hide();
                        if (msg.success) {
                            $("#order").hide();
                            $("#order-success").css("display", "flex");
                        } else {
                            alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                        }

                    }
                )
        }
    }
)
