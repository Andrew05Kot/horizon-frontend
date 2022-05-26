import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "../_models/user.model";
import { BaseApiService } from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService <User> {

  getCurrentUser$(): Observable<User> {
    console.log('this.apiPath >> ', this.apiPath)
    return this.http.get<User>(this.apiPath + '/current');
  }

  getApiName(): string {
    return '/user';
  }
}
