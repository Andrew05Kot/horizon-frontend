import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TourService } from "../../_services/tour.service";
import { Tour } from "../../_models/tour.model";
import { MatDialog } from "@angular/material/dialog";
import { SelectMapPointComponent } from "../tour-edit-page/select-map-point/select-map-point.component";
import { ViewMapComponent } from "./view-map/view-map.component";
import { User } from "../../_models/user.model";
import { AuthService } from "../../_services/auth.service";
import { EMPTY, switchMap } from "rxjs";
import { SnackBarMessageService } from "../../_services/snack-bar-message.service";
import { DecisionDialogComponent } from "../../_components/decision-dialog/decision-dialog.component";
import { ConfirmTourComponent } from "../confirm-tour/confirm-tour.component";
import { ImageService } from "../../_services/image.service";

@Component({
  selector: 'app-tour-info-page',
  templateUrl: './tour-info-page.component.html',
  styleUrls: ['./tour-info-page.component.scss']
})
export class TourInfoPageComponent implements OnInit {

  tourId: number;
  tour: Tour;
  carouselWidth: number;
  currentUser: User;
  isOwner = false;
  avatarLink: string;

  constructor(private router: Router,
              private dialog: MatDialog,
              private auth: AuthService,
              private tourService: TourService,
              private activatedRoute: ActivatedRoute,
              private snackBarMessageService: SnackBarMessageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.tourId = this.activatedRoute.snapshot.params['id'];
    this.initTour();
  }

  private initTour(): void {
    this.tourService.getById$(this.tourId).subscribe(response => {
      this.tour = Tour.fromObject(response);
      this.carouselWidth = this.tour.urls?.length > 2 ? 920 : 610;
      this.isOwner = this.tour?.owner?.id === this.currentUser?.id;
      this.avatarLink = this.tour?.owner?.image
        ? ImageService.getImageLinkByName(this.tour?.owner?.image?.imageName)
        : '../../../assets/icons/tourist_inc.png';
    });
  }

  edit(tourId: number): void {
    this.router.navigate(['tour', 'edit', tourId]);
  }

  delete(tour: Tour): void {
    this.dialog.open(DecisionDialogComponent, {width: '320px', restoreFocus: false, autoFocus: false})
      .afterClosed()
      .pipe(switchMap(res => res ? this.tourService.delete$(tour.id) : EMPTY))
      .subscribe(() => this.afterDelete(tour));
  }

  private afterDelete(tour: Tour): void {
    this.snackBarMessageService.showMessage(", було видалено ", tour.name);
    this.router.navigate(['home']);
  }

  onGoTour(): void {
    const dialogRef =  this.dialog.open(ConfirmTourComponent, {
      panelClass: 'confirm-tour-dialog',
      data: this.tour
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initTour();
    });
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

  goToUserProfilePage(): void {
    this.router.navigate(['profile', 'info', this.tour.owner.id]);
  }

}
