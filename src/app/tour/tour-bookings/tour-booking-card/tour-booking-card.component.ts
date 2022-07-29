import { Component, Input, OnInit } from '@angular/core';
import { Booking } from "../../../_models/booking.model";
import { Router } from "@angular/router";
import { BookingService } from "../../../_services/booking.service";
import { BookingStatus } from "../../../_constants/booking-status.constants";
import { ImageService } from "../../../_services/image.service";
import { TourService } from "../../../_services/tour.service";

@Component({
  selector: 'app-tour-booking-card',
  templateUrl: './tour-booking-card.component.html',
  styleUrls: ['./tour-booking-card.component.scss']
})
export class TourBookingCardComponent implements OnInit {

  @Input() booking: Booking;
  convertedStatus: string;
  touristImageLink: string = null;

  constructor(private router: Router,
              private tourService: TourService,
              private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.convertStatus(this.booking?.status.toString());
    this.touristImageLink = this.booking?.tourist?.image
      ? ImageService.getImageLinkByName(this.booking?.tourist?.image?.imageName)
      : '../../../../assets/icons/tourist_inc.png';
  }

  openTour(): void {
    this.router.navigateByUrl(`/tour/info/${this.booking.tour.id}`);
  }

  openTouristProfile(): void {
    this.router.navigate(['profile', 'info', this.booking?.tourist?.id]);
  }

  reject(): void {
    this.updateBookingStatus(this.booking, BookingStatus.REJECTED);
  }

  accept(): void {
    this.updateBookingStatus(this.booking, BookingStatus.ACCEPTED);
  }

  private updateBookingStatus(booking: Booking, status: BookingStatus): void {
    const bookingToUpdate = booking;
    bookingToUpdate.tourId = booking.tour?.id;
    bookingToUpdate.touristId = booking.tourist?.id;
    this.booking.status = status;
    this.bookingService.update$(bookingToUpdate?.id, bookingToUpdate).subscribe(response => {
      this.booking = response;
      this.convertStatus(this.booking?.status.toString());
    });
  }

  private convertStatus(status: string): void {
    if (status == BookingStatus.PENDING) {
      this.convertedStatus = 'В очікуванні';
    }
    if (status == BookingStatus.ACCEPTED) {
      this.convertedStatus = 'Прийнято';
    }
    if (status == BookingStatus.REJECTED) {
      this.convertedStatus = 'Відмовлено';
    }
    if (status == BookingStatus.DONE) {
      this.convertedStatus = 'Відбувся';
    }
  }
}
