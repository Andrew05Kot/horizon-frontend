import { Component, Input, OnInit } from '@angular/core';
import { Booking } from "../../_models/booking.model";
import { Router } from "@angular/router";
import { ImageService } from "../../_services/image.service";
import { BookingStatus } from "../../_constants/booking-status.constants";
import { BookingService } from "../../_services/booking.service";

@Component({
  selector: 'app-my-booking-history-card',
  templateUrl: './my-booking-history-card.component.html',
  styleUrls: ['./my-booking-history-card.component.scss']
})
export class MyBookingHistoryCardComponent implements OnInit {

  @Input() booking: Booking;
  imageLink: string;
  convertedStatus: string;

  constructor(private router: Router,
              private BookingService: BookingService) { }

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

  doLike(liked: boolean): void {
    this.booking.liked = liked;
    this.booking.touristId = this.booking.tourist?.id;
    this.booking.tourId = this.booking.tour?.id;
    this.BookingService.update$(this.booking.id, this.booking).subscribe(response => {
      this.booking = response;
    });
  }

}
