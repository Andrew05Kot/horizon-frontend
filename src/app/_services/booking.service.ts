import { Injectable } from '@angular/core';
import { BaseApiService } from "./base-api.service";
import { Booking } from "../_models/booking.model";

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseApiService<Booking> {

  getApiName(): string {
    return '/booking';
  }
}
