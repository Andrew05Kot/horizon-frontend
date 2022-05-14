import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
  urlsToSlider = [];

  constructor(private router: Router,
              private tourService: TourService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tourId = this.activatedRoute.snapshot.params['id'];
    this.tourService.getById$(this.tourId).subscribe(response => {
      this.tour = Tour.fromObject(response);
      this.urlsToSlider =  this.tour?.urls;
    });
  }

  edit(tourId: number): void {
    this.router.navigate(['tour', 'edit', tourId]);
    // this.router.navigateByUrl('tour/edit/' + tourId);
    console.log('tourId >> ', tourId);
  }

}
