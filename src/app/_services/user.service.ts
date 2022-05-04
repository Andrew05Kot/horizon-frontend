import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, map, Observable, switchMap} from 'rxjs';
import {AppConstants} from "../_constants/app.constants";
import { CookieService } from 'ngx-cookie-service';
import {User} from "../_models/user.model";
import {Router} from "@angular/router";
import {Role} from "../_constants/role.constants";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiPath: string;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router
  ) {
    // this.apiPath = environment.apiUrl + `/user`;
    this.apiPath = `https://localhost:8080/v1` + `/user`;
  }

  getCurrentUser$(): Observable<User> {
    console.log('this.apiPath >> ', this.apiPath)
    return this.http.get<User>(this.apiPath + '/current');
  }
}
