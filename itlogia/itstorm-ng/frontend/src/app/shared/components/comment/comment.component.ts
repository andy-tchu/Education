import {Component, Input, OnInit} from '@angular/core';
import {CommentType} from "../../../types/comment.type";
import {DateTimeUtils} from "../../utils/date-time.utils";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {CommentService} from "../../services/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: CommentType;
  formattedDate: string = '';
  isLoggedIn = false;

  constructor(private commentService: CommentService,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();

    this.formattedDate = DateTimeUtils.dateCustomFormatting(new Date(this.comment.date));
  }

  actionLike(action: string) {
    if (this.isLoggedIn) {
      this.commentService.applyAction(this.comment.id, {action: action})
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (!data.error) {
              if (action === 'violate') {
                this._snackBar.open("Жалоба отправлена");
              } else {
                this._snackBar.open("Ваш голос учтен");
              }
            } else {
              if (action === 'violate' && data.message === 'Это действие уже применено к комментарию') {
                this._snackBar.open("Жалоба уже отправлена");
              } else {
                this._snackBar.open("Ошибка голосования");
              }
            }
            this.commentService.getActionsForComment(this.comment.id)
              .subscribe(data => {
                const reloadAction = data[0]?.action;
                const prevAction = this.comment.userLiked;
                this.comment.userLiked = undefined;
                if (reloadAction === 'like') {
                  this.comment.userLiked = true;
                }
                if (reloadAction === 'dislike') {
                  this.comment.userLiked = false;
                }
                if (action === 'like') {
                  if (prevAction === true) {
                    this.comment.likesCount--;
                  } else {
                    this.comment.likesCount++;
                    if (prevAction === false) {
                      this.comment.dislikesCount--;
                    }
                  }
                }
                if (action === 'dislike') {
                  if (prevAction === false) {
                    this.comment.dislikesCount--;
                  } else {
                    this.comment.dislikesCount++;
                    if (prevAction === true) {
                      this.comment.likesCount--;
                    }
                  }
                }
              });
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка голосования');
            }
          }
        });


    }
  }
}
