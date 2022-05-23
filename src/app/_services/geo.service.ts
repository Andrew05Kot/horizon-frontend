import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(private http: HttpClient) {
  }

  public getStreetAddress(lat: number, lon: number) {
    return this.http.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=en`);
  }
}
