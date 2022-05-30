import { Component, Input, OnInit } from '@angular/core';
import { Tour } from "../../../../_models/tour.model";
import { AuthService } from "../../../../_services/auth.service";
import { User } from "../../../../_models/user.model";
import { Router } from "@angular/router";
import { ImageService } from "../../../../_services/image.service";

@Component({
  selector: 'app-profile-tour-history-card',
  templateUrl: './profile-tour-history-card.component.html',
  styleUrls: ['./profile-tour-history-card.component.scss']
})
export class ProfileTourHistoryCardComponent implements OnInit {

  @Input() tour: Tour;
  currentUser: User;
  imageLink: string = null;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.imageLink = ImageService.getImageLinkByName(this.tour?.images[0]?.imageName) || '../../../../../assets/icons/default_mountains.png';
  }

  openTour(): void {
    this.router.navigate(['tour', 'info', this.tour.id]);
  }

  openEditTour(): void {
    this.router.navigate(['tour', 'edit', this.tour.id]);
  }

}
