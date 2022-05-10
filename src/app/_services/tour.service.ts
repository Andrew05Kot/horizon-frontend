import {Injectable} from '@angular/core';
import {BaseApiService} from "./base-api.service";
import {Tour} from "../_models/tour.model";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TourService extends BaseApiService<Tour> {

  getApiName(): string {
    return '/tour';
  }

  updateImages(tourId: number, files?: File[], imageIdsToRemove?: number[]): Observable< Tour > {
    const formData: FormData = new FormData();
    if (files) {
      files.forEach(file => formData.append('files', file, file.name));
    }

    let params = new HttpParams();
    // if (imageIdsToRemove) {
    //   params = params.append('imageIdsToRemove', imageIdsToRemove.join(","));
    // }

    return this.http.post<any>(this.apiPath + `/${tourId}/images`, formData,{params});
  }
}
