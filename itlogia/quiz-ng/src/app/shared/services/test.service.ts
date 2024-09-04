import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {QuizListType} from "../../../types/quiz-list.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {TestResultType} from "../../../types/test-result.type";
import {QuizType} from "../../../types/quiz.type";
import {UserResultType} from "../../../types/user-result.type";
import {PassTestResponseType} from "../../../types/pass-test-response.type";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
  }

  getTests(): Observable<QuizListType[]> {
    return this.http.get<QuizListType[]>(environment.apiHost + 'tests');
  }

  getUserResults(userId: number): Observable<TestResultType[] | DefaultResponseType> {
    return this.http.get<TestResultType[] | DefaultResponseType>(environment.apiHost + 'tests/results?userId=' + userId);
  }

  getQuize(id: number | string): Observable<QuizType | DefaultResponseType> {
    return this.http.get<QuizType | DefaultResponseType>(environment.apiHost + 'tests/' + id);
  }

  passQuize(id: number | string, userId: string | number, userResults: UserResultType[]): Observable<PassTestResponseType | DefaultResponseType> {
    return this.http.post<PassTestResponseType | DefaultResponseType>(environment.apiHost + 'tests/' + id + '/pass',
      {
        userId: userId,
        results: userResults
      });
  }

  getResult(id: number | string, userId: string | number  ): Observable<PassTestResponseType | DefaultResponseType> {
    return this.http.get<PassTestResponseType | DefaultResponseType>(environment.apiHost + 'tests/' + id + '/result?userId=' + userId);
  }


}
