import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ImageModel} from "../_models/image.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  static url = `${environment.apiUrl}/image`

  constructor(protected http: HttpClient) {
  }

  static getImageLink(image: ImageModel): string {
    if (image?.imageName) {
      return `${ImageService.url}/${image.imageName}`;
    }
    return null;
  }

  static getImageLinkByName(imageName: string): string {
    if (imageName) {
      return `${ImageService.url}/${imageName}`;
    }
    return null;
  }

  delete(imageId: number): Observable<any> {
    return this.http.delete(`${ImageService.url}/${imageId}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  public handleError(error: any): Observable<never> {
    return throwError(error);
  }
}
