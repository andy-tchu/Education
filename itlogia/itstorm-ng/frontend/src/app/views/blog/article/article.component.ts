import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute} from "@angular/router";
import {ArticleType} from "../../../types/article.type";
import {environment} from "../../../../environments/environment";
import {ArticleCardType} from "../../../types/article-card.type";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentType} from "../../../types/comment.type";
import {CommentService} from "../../../shared/services/comment.service";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {LoaderService} from "../../../shared/services/loader.service";
import {CommentActionType} from "../../../types/comment-action.type";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: ArticleType | null = null;
  comments: CommentType[] = [];
  relatedArticles: ArticleCardType[] = [];
  commentsCount: number = 0;
  offset: number = 0;
  serverStaticPath = environment.serverStaticPath + 'blog/';
  isLoggedIn = false;
  isLoading = false;
  commentForm = this.fb.group({
    comment: ['', Validators.required],
  });

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private commentService: CommentService,
              private loaderService: LoaderService,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();
    this.loaderService.show();

    this.activatedRoute.url
      .subscribe(url => {
        let urlArticle = url[url.length - 1].path;
        if (urlArticle) {
          this.articleService.getArticle(urlArticle)
            .subscribe(data => {
              this.article = data;
              this.commentService.getActionsForArticle({articleId: this.article.id})
                .subscribe({
                  next: (dataActions: CommentActionType[] | DefaultResponseType) => {
                    if (!(dataActions as DefaultResponseType).error) {
                      this.comments = data.comments.map(comment => {
                        const action = (dataActions as CommentActionType[]).find(item => item.comment === comment.id);
                        if (action?.action === 'like') {
                          comment.userLiked = true;
                        }
                        if (action?.action === 'dislike') {
                          comment.userLiked = false;
                        }
                        return comment;
                      });

                    } else {
                      this._snackBar.open((dataActions as DefaultResponseType).message);
                    }
                  },
                  error: (errorResponse: HttpErrorResponse) => {
                    if (errorResponse.error && errorResponse.error.message) {
                      this._snackBar.open(errorResponse.error.message);
                    } else {
                      this._snackBar.open('Ошибка загрузки комментария');
                    }
                  }
                });
              this.commentsCount = data.commentsCount;
              this.offset = 3;
            });
        }
      });

    this.activatedRoute.url
      .subscribe(url => {
        let urlArticle = url[url.length - 1].path;
        if (urlArticle) {
          this.articleService.getRelatedArticles(urlArticle)
            .subscribe(data => {
              this.relatedArticles = data;
            });
        }
      });
  }

  thereIsMoreComments(): boolean {
    return this.offset < this.commentsCount;
  }

  addComment() {
    if (this.isLoggedIn && this.article?.id && this.commentForm.valid && this.commentForm.value.comment) {
      this.commentService.addComment({text: this.commentForm.value.comment, article: this.article.id})
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (!data.error) {
              this.offset = 0;
              this.comments = [];
              this.refreshComments();
              this.commentForm.reset();
            } else {
              this._snackBar.open(data.message);
            }
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка добавления комментария');
            }
          }

        });
    }
  }

  refreshComments() {
    this.isLoading = true;
    this.loaderService.show();
    setTimeout(() => {
      if (this.article?.id) {
        this.commentService.getComments({offset: this.offset, article: this.article.id})
          .subscribe(data => {
            this.commentService.getActionsForArticle({articleId: this.article!.id})
              .subscribe({
                next: (dataActions: CommentActionType[] | DefaultResponseType) => {
                  if (!(dataActions as DefaultResponseType).error) {
                    this.comments = [...this.comments, ...data.comments.map(comment => {
                      const action = (dataActions as CommentActionType[]).find(item => item.comment === comment.id);
                      if (action?.action === 'like') {
                        comment.userLiked = true;
                      }
                      if (action?.action === 'dislike') {
                        comment.userLiked = false;
                      }
                      return comment;
                    })];
                  } else {
                    this._snackBar.open((dataActions as DefaultResponseType).message);
                  }
                  this.isLoading = false;
                  this.loaderService.hide();
                },
                error: (errorResponse: HttpErrorResponse) => {
                  if (errorResponse.error && errorResponse.error.message) {
                    this._snackBar.open(errorResponse.error.message);
                  } else {
                    this._snackBar.open('Ошибка загрузки комментария');
                  }
                  this.isLoading = false;
                  this.loaderService.hide();
                }
              });
            this.offset += data.comments.length;
            this.commentsCount = data.allCount;
          });
      }
    }, 2000);
  }
}
