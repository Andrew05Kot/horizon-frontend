import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../_models/user.model";
import { Router } from "@angular/router";
import { ImageService } from "../../_services/image.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  userImage: string = null;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.userImage = this.user?.image
      ? ImageService.getImageLinkByName(this.user.image?.imageName)
      : 'assets/icons/tourist_inc.png';
  }

  openUserProfile(): void {
    this.router.navigate(['profile', 'info', this.user.id]);
  }

}
