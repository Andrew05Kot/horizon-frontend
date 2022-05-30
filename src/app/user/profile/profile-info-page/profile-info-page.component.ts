import { Component, OnInit } from '@angular/core';
import { User } from "../../../_models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../_services/auth.service";
import { UserService } from "../../../_services/user.service";
import { ImageService } from "../../../_services/image.service";
import { Tour } from 'src/app/_models/tour.model';
import { TourService } from "../../../_services/tour.service";
import { Filter } from "../../../_utils/model/filter-model";
import { FilteringOperation } from "../../../_constants/filtering-operations.constants";

@Component({
  selector: 'app-profile-info-page',
  templateUrl: './profile-info-page.component.html',
  styleUrls: ['./profile-info-page.component.scss']
})
export class ProfileInfoPageComponent implements OnInit {

  userId: number;
  currentUser: User;
  user: User;
  avatarUrl : string;
  tours: Tour[];

  constructor(private router: Router,
              private auth: AuthService,
              private tourService: TourService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.userService.getById$(this.userId).subscribe(user => this.processUserResponse(user));
  }

  goToEditProfile(): void {
    this.router.navigate(['profile', 'edit', this.currentUser.id]);
  }

  private processUserResponse(user: User): void {
    this.user = user;
    this.user.fullName = User.getUserFullName(user);
    this.avatarUrl = this.user.image
      ? ImageService.getImageLinkByName(this.user.image.imageName)
      : 'assets/icons/tourist_inc.png';
    this.tourService.getList$([], this.buildFilters())
      .subscribe(toursResponse => {
        this.tours = toursResponse.items;
        console.log('this.tours' , this.tours)
      });
  }

  private buildFilters(): Filter[] {
    const filters = [
      new Filter('owner', FilteringOperation.EQUAL, this.user?.id.toString())
    ];
    return filters;
  }

}
