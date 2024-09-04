import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {BannerType} from "../../types/banner.type";
import {ItemType} from "../../types/item.type";
import {RequestEnum} from "../../types/request.enum";
import {ArticleCardType} from "../../types/article-card.type";
import {ArticleService} from "../../shared/services/article.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  topArticles: ArticleCardType[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 24,
    dots: true,
    dotsEach: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false,
  };

  customOptionsRev: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: false
  };

  bannersList: BannerType[] = [
    {
      id: 1,
      image: 'banner1.png',
      preTitle: 'Предложение месяца',
      title: 'Продвижение в Instagram для вашего бизнеса <span>-15%</span>!',
      request: RequestEnum.advertising,
    },
    {
      id: 2,
      image: 'banner2.png',
      preTitle: 'Акция',
      title: 'Нужен грамотный <span>копирайтер</span>?',
      text: 'Весь декабрь у нас действует акция на работу копирайтера.',
      request: RequestEnum.copyWriting,
    },
    {
      id: 3,
      image: 'banner3.png',
      preTitle: 'Новость дня',
      title: '<span>6 место</span> в ТОП-10 <nobr>SMM-агенств</nobr> Москвы!',
      text: 'Мы благодарим каждого, кто голосовал за нас!',
      request: RequestEnum.smm,
    },
  ];

  itemsList: ItemType[] = [
    {
      id: 1,
      image: "image1.png",
      title: "Создание сайтов",
      text: "В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!",
      price: 7500,
      request: RequestEnum.creatingSites,
    },
    {
      id: 2,
      image: "image2.png",
      title: "Продвижение",
      text: "Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!",
      price: 3500,
      request: RequestEnum.smm,
    },
    {
      id: 3,
      image: "image3.png",
      title: "Реклама",
      text: "Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.",
      price: 1000,
      request: RequestEnum.advertising,
    },
    {
      id: 4,
      image: "image4.png",
      title: "Копирайтинг",
      text: "Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.",
      price: 750,
      request: RequestEnum.copyWriting,
    },
  ];

  reviews = [
    {
      name: 'Станислав',
      image: 'review1.jfif',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Алёна',
      image: 'review2.jfif',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      name: 'Мария',
      image: 'review3.jfif',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
    {
      name: 'Аделина',
      image: 'review4.jpg',
      text: 'Хочу поблагодарить всю команду за помощь в подборе подарка для моей мамы! Все просто в восторге от мини-сада! А самое главное, что за ним удобно ухаживать, ведь в комплекте мне дали целую инструкцию.'
    },
    {
      name: 'Яника',
      image: 'review5.jpg',
      text: 'Спасибо большое за мою обновлённую коллекцию суккулентов! Сервис просто на 5+: быстро, удобно, недорого. Что ещё нужно клиенту для счастья?'
    },
    {
      name: 'Марина',
      image: 'review6.jpg',
      text: 'Для меня всегда важным аспектом было наличие не только физического магазина, но и онлайн-маркета, ведь не всегда есть возможность прийти на место. Ещё нигде не встречала такого огромного ассортимента!'
    },
  ];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.getTopArticles()
      .subscribe((data: ArticleCardType[]) => {
        this.topArticles = data;
      });
  }

}
