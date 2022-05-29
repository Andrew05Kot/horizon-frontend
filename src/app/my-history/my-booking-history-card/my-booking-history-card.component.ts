import { Component, Input, OnInit } from '@angular/core';
import { Booking } from "../../_models/booking.model";
import { Router } from "@angular/router";
import { ImageService } from "../../_services/image.service";
import { BookingStatus } from "../../_constants/booking-status.constants";

@Component({
  selector: 'app-my-booking-history-card',
  templateUrl: './my-booking-history-card.component.html',
  styleUrls: ['./my-booking-history-card.component.scss']
})
export class MyBookingHistoryCardComponent implements OnInit {

  @Input() booking: Booking;
  imageLink: string;
  convertedStatus: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.imageLink = ImageService.getImageLinkByName(this.booking?.tour?.images[0]?.imageName) || '../../../../assets/icons/default_mountains.png';
    this.convertStatus(this.booking?.status.toString());
  }

  openTour(): void {
    this.router.navigateByUrl(`/tour/info/${this.booking.tour.id}`);
  }

  openOwnerProfile(): void {
    this.router.navigate(['profile', 'info', this.booking?.tour?.owner?.id]);
  }

  convertStatus(status: string): void {
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
