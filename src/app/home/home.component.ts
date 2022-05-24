import { Component } from '@angular/core';
import { Tour } from "../_models/tour.model";
import { TourService } from "../_services/tour.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  tours: Tour[] = [];
  pageSize: number = 12;
  currentSortDirection = 'DESC';

  constructor(private tourService: TourService) {
  }

  ngOnInit(): void {
    this.tourService.getPage$(0, this.pageSize, ['name,' + this.currentSortDirection.toUpperCase()], [])
      .subscribe(response => {
          this.tours = response?.items;
        }
      );
  }
}
