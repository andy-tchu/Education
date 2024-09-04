import { Injectable } from '@angular/core';
import {DefaultResponseType} from "../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ArticleCardType} from "../../types/article-card.type";
import {Observable} from "rxjs";
import {ActiveParamsType} from "../../types/active-params.type";
import {ArticleType} from "../../types/article.type";
import {ArticleResponseType} from "../../types/article-response.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getTopArticles(): Observable<ArticleCardType[]> {
    return this.http.get<ArticleCardType[]>(environment.api + 'articles/top');
  }

  getArticle(url: string): Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.api + 'articles/' + url);
  }

  getArticles(params: ActiveParamsType): Observable<ArticleResponseType> {
    return this.http.get<ArticleResponseType>(environment.api + 'articles', {
      params: params
    });
  }

  getRelatedArticles(url: string): Observable<ArticleCardType[]> {
    return this.http.get<ArticleCardType[]>(environment.api + 'articles/related/' + url);
  }

}
