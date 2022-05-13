import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TourService} from "../../_services/tour.service";
import {Tour} from "../../_models/tour.model";

@Component({
  selector: 'app-tour-info-page',
  templateUrl: './tour-info-page.component.html',
  styleUrls: ['./tour-info-page.component.scss']
})
export class TourInfoPageComponent implements OnInit {

  tourId: number;
  tour: Tour;

  constructor(private tourService: TourService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tourId = this.activatedRoute.snapshot.params['id'];
    this.tourService.getById$(this.tourId).subscribe(response => {
      this.tour = Tour.fromObject(response);
      console.log('this.tour >> ', this.tour);
    });
  }

}
