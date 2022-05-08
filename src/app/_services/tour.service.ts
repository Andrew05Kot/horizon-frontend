import {Injectable} from '@angular/core';
import {BaseApiService} from "./base-api.service";
import {Tour} from "../_models/tour.model";

@Injectable({
  providedIn: 'root'
})
export class TourService extends BaseApiService<Tour> {

  getApiName(): string {
    return '/tour';
  }
}
