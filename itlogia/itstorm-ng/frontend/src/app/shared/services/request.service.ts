import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DefaultResponseType} from "../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {RequestType} from "../../types/request.type";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  createRequest(payload: RequestType) {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', payload);
  }
}
