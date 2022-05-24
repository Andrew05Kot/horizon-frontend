import { Component, OnInit } from '@angular/core';
import { BookingService } from "../../_services/booking.service";
import { Booking } from "../../_models/booking.model";

@Component({
  selector: 'app-tour-bookings',
  templateUrl: './tour-bookings.component.html',
  styleUrls: ['./tour-bookings.component.scss']
})
export class TourBookingsComponent implements OnInit {

  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.bookingService.getPage$(0, 30, [], []).subscribe((responsePage) => {
      this.bookings = responsePage.items;
      console.log('this.booking >> ', this.bookings)
    });
  }


}
