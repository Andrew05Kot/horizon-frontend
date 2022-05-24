import { Component, Input, OnInit } from '@angular/core';
import { Booking } from "../../../_models/booking.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-tour-booking-card',
  templateUrl: './tour-booking-card.component.html',
  styleUrls: ['./tour-booking-card.component.scss']
})
export class TourBookingCardComponent implements OnInit {

  @Input() booking: Booking;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openTour(): void {
    this.router.navigateByUrl(`/tour/info/${this.booking.tour.id}`);
  }

  openTouristProfile(): void {

  }

}
