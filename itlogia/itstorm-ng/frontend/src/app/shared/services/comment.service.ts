import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {CommentType} from "../../types/comment.type";
import {CommentActionType} from "../../types/comment-action.type";
import {CommentsResponseType} from "../../types/comments-response.type";
import {CommentPayloadType} from "../../types/comment-payload.type";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) {
    }

    addComment(comment: CommentPayloadType): Observable<DefaultResponseType> {
        return this.http.post<DefaultResponseType>(environment.api + 'comments', comment);
    }

    getComments(params: {offset: number, article: string}): Observable<CommentsResponseType>{
        return this.http.get<CommentsResponseType>(environment.api + 'comments', {
            params: params
        });

    }

    applyAction(id: string, action: {action: string}) : Observable<DefaultResponseType>{
      return this.http.post<DefaultResponseType>(environment.api + 'comments/' + id + '/apply-action', action);
    }

    getActionsForArticle(params: { articleId: string }): Observable<CommentActionType[] | DefaultResponseType> {
      return this.http.get<CommentActionType[] | DefaultResponseType>(environment.api + 'comments/article-comment-actions', {
        params: params
      });
    }

  getActionsForComment(id:  string): Observable<CommentActionType[]> {
    return this.http.get<CommentActionType[]>(environment.api + 'comments/' + id + '/actions');
  }
}
