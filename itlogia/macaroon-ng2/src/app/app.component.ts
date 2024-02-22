import {Component, OnInit} from '@angular/core';
import {ProductType} from "./types/product.type";
import {AdvantageType} from "./types/advantage.type";
import {OrderFormType} from "./types/order-form.type";
import {ProductService} from "./services/product.service";
import {CartService} from "./services/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProductService, CartService]
})
export class AppComponent implements OnInit {
  title: string = 'macaroon-ng';
  public showPresent: boolean = true;
  public phone: string = '375293689868';
  public insta_link: string = 'https://instagram.com/';

  public advantages: AdvantageType[] = [
    {
      title: 'Лучшие продукты',
      text: 'Мы честно готовим макаруны только из натуральных и качественных продуктов. Мы не используем консерванты, ароматизаторы и красители.',
    },
    {
      title: 'Много вкусов',
      text: 'Наша задача – предоставить вам широкое разнобразие вкусов. Вы удивитесь, но у нас более 70 вкусов пироженок.',
    },
    {
      title: 'Бисквитное тесто',
      text: 'Все пирожные готовятся на бисквитном тесте с качественным сливочным маслом 82,5%. В составе нет маргарина и дрожжей!',
    },
    {
      title: 'Честный продукт',
      text: 'Вкус, качество и безопасность наших пирогов подтверждена декларацией о соответствии, которую мы получили 22.06.2016 г.',
    },
  ]

  public products: ProductType[] = [];

  public formValues: OrderFormType = {
    productTitle: '',
    name: '',
    phone: '',
  }

  constructor(private productService: ProductService,
              public cartService: CartService) {
  }

  ngOnInit() {
    this.products = this.productService.getProduct();
  }

  public scrollTo(target: HTMLElement): void {
    target.scrollIntoView({behavior: "smooth"});
  }

  public addToCart(product: ProductType, target: HTMLElement): void {
    this.scrollTo(target);
    this.formValues.productTitle = product.title.toUpperCase();
    alert(product.title + " добавлен в корзину!");
  }

  public createOrder(): void {
    let inputProduct: HTMLInputElement | null = document.getElementById("choose") as HTMLInputElement;
    let inputName: HTMLInputElement | null = document.getElementById("name") as HTMLInputElement;
    let inputPhone: HTMLInputElement | null = document.getElementById("phone") as HTMLInputElement;
    let hasError: boolean = false;

    if (!inputProduct || !inputName || !inputPhone) return;

    Array.from(document.getElementsByClassName("error-input")).forEach(element => {
        (element as HTMLElement).style.display = 'none';
      }
    );

    Array.from(document.getElementsByClassName("order-input")).forEach(element => {
      (element as HTMLElement).style.borderColor = "rgb(130, 19, 40)";
    });

    if (!inputProduct.value) {
      let nextElement: HTMLElement = inputProduct.nextSibling as HTMLElement;
      console.log(nextElement)
      if (nextElement) {
        nextElement.style.display = 'block';
      }
      let parentElement: HTMLElement = inputProduct.parentElement as HTMLElement;
      if (parentElement) {
        parentElement.style.borderColor = 'red';
      }
      hasError = true;
    }

    if (!inputName.value) {
      let nextElement: HTMLElement = inputName.nextSibling as HTMLElement;
      if (nextElement) {
        nextElement.style.display = 'block';
      }
      let parentElement: HTMLElement = inputName.parentElement as HTMLElement;
      if (parentElement) {
        parentElement.style.borderColor = 'red';
      }
      hasError = true;
    }

    if (!inputPhone.value) {
      let nextElement: HTMLElement = inputPhone.nextSibling as HTMLElement;
      if (nextElement) {
        nextElement.style.display = 'block';
      }
      let parentElement: HTMLElement = inputPhone.parentElement as HTMLElement;
      if (parentElement) {
        parentElement.style.borderColor = 'red';
      }
      hasError = true;
    }

    let orderElement: HTMLElement = document.getElementById("order") as HTMLElement;
    let orderSuccessElement: HTMLElement = document.getElementById("order-success") as HTMLElement;
    if (!hasError && orderElement && orderSuccessElement) {
      orderElement.style.display = 'none';
      orderSuccessElement.style.display = 'flex';
    }
  }
}
