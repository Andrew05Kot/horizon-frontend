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

  saveImage(image: File): Observable<User> {
    const formData: FormData = new FormData();
    if (image) {
      formData.append('imageFile', image, image?.name)
    }
    return this.http.post<any>(this.apiPath + `/images`, formData);
  }

  deleteImage(imageId): Observable<User> {
    return this.http.delete<any>(this.apiPath + `/images/${imageId}`);
  }

  patch$(id: number, user: User): Observable<void> {
    return this.http.patch<void>(this.apiPath + `/${id}`, user);
  }

  getApiName(): string {
    return '/user';
  }
}
