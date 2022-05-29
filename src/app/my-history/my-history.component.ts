import { Component, OnInit } from '@angular/core';
import { Booking } from "../_models/booking.model";
import { BookingService } from "../_services/booking.service";
import { Filter } from "../_utils/model/filter-model";
import { FilteringOperation } from "../_constants/filtering-operations.constants";
import { User } from "../_models/user.model";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.scss']
})
export class MyHistoryComponent implements OnInit {

  filteredBookings: Booking[] = [];
  currentUser: User;

  constructor(private auth:  AuthService,
              private bookingService: BookingService) { }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.bookingService.getList$([], this.buildFilters()).subscribe(response => {
      this.filteredBookings = response.items;
    });
  }

  private buildFilters(): Filter[] {
    const filters = [
      new Filter('tourist', FilteringOperation.EQUAL, this.currentUser?.id.toString())
    ];
    return filters;
  }

}
