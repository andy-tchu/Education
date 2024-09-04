import {ArticleCardType} from "./article-card.type";

export type ArticleResponseType = {
  count: number,
  pages: number,
  items: ArticleCardType[]
}
