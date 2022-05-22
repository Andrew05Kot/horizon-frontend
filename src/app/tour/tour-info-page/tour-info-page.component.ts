import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TourService } from "../../_services/tour.service";
import { Tour } from "../../_models/tour.model";
import { MatDialog } from "@angular/material/dialog";
import { SelectMapPointComponent } from "../tour-edit-page/select-map-point/select-map-point.component";
import { ViewMapComponent } from "./view-map/view-map.component";

@Component({
  selector: 'app-tour-info-page',
  templateUrl: './tour-info-page.component.html',
  styleUrls: ['./tour-info-page.component.scss']
})
export class TourInfoPageComponent implements OnInit {

  tourId: number;
  tour: Tour;
  carouselWidth: number;

  constructor(private router: Router,
              private dialog: MatDialog,
              private tourService: TourService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.tourId = this.activatedRoute.snapshot.params['id'];
    this.tourService.getById$(this.tourId).subscribe(response => {
      this.tour = Tour.fromObject(response);
      this.carouselWidth = this.tour.urls?.length > 2 ? 920 : 610;
    });
  }

  edit(tourId: number): void {
    this.router.navigate(['tour', 'edit', tourId]);
  }

  openMap(): void {
    const dialogRef = this.dialog.open(ViewMapComponent, {
      data: {geoData: this.tour.geoData},
      panelClass: 'view-map-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('res >> ', result)
      console.log('The dialog was closed');
      // this.tourForm = t;
    });
  }

}
