import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../../_constants/app.constants";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(credentials: any): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'login', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
}
