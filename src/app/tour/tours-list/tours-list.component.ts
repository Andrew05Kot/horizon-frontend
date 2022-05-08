import { Component, OnInit } from '@angular/core';
import {TourService} from "../../_services/tour.service";
import {Tour} from "../../_models/tour.model";

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.scss']
})
export class ToursListComponent implements OnInit {

  tours: Tour[] = [];

  constructor(private tourService: TourService) {
  }

  ngOnInit(): void {
    this.tourService.getPage$(0, 10, [], []).subscribe(response => {
        this.tours = response?.items;
      }
    )
  }

}
