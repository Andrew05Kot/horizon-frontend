import { Component, OnInit } from '@angular/core';
import { BookingService } from "../../_services/booking.service";
import { Booking } from "../../_models/booking.model";
import { Filter } from "../../_utils/model/filter-model";
import { FilteringOperation } from "../../_constants/filtering-operations.constants";
import { User } from "../../_models/user.model";
import { AuthService } from "../../_services/auth.service";

@Component({
  selector: 'app-tour-bookings',
  templateUrl: './tour-bookings.component.html',
  styleUrls: ['./tour-bookings.component.scss']
})
export class TourBookingsComponent implements OnInit {

  bookings: Booking[] = [];
  currentUser: User;

  constructor(private auth: AuthService,
              private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.bookingService.getList$([], this.buildFilters()).subscribe((responsePage) => {
      this.bookings = responsePage.items;
    });
  }

  private buildFilters(): Filter[] {
    const filters = [
      new Filter('owner', FilteringOperation.EQUAL, this.currentUser?.id.toString())
    ];
    return filters;
  }


}
