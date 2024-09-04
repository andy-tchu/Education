import {Component, Input, OnInit} from '@angular/core';
import {ArticleCardType} from "../../../types/article-card.type";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article!: ArticleCardType;
  @Input() related = false;
  serverStaticPath = environment.serverStaticPath + 'blog/';

  constructor() { }

  ngOnInit(): void {
  }

}
