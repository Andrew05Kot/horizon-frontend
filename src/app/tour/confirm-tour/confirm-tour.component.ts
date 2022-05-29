import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Tour } from "../../_models/tour.model";
import { BookingService } from "../../_services/booking.service";
import { Booking } from "../../_models/booking.model";
import { AuthService } from "../../_services/auth.service";

@Component({
  selector: 'app-confirm-tour',
  templateUrl: './confirm-tour.component.html',
  styleUrls: ['./confirm-tour.component.scss']
})
export class ConfirmTourComponent implements OnInit {

  constructor(private auth: AuthService,
              private bookingService: BookingService,
              @Inject(MAT_DIALOG_DATA) public tour: Tour,
              public dialogRef: MatDialogRef<ConfirmTourComponent>) {
  }

  ngOnInit(): void {
  }

  makeTourRequest(): void {
    this.bookingService.create$(this.makeBookingRequestBody())
      .subscribe(() => this.dialogRef.close());
  }

  makeBookingRequestBody(): Booking {
    const booking: Booking = new Booking();
    booking.tourId = this.tour.id;
    booking.touristId = this.auth.getCurrentUser().id;
    return booking;
  }

}
