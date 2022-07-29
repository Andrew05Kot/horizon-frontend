import { Component } from '@angular/core';
import { Tour } from "../_models/tour.model";
import { TourService } from "../_services/tour.service";
import { User } from "../_models/user.model";
import { UserService } from "../_services/user.service";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ImageService } from "../_services/image.service";
import { CarouselTourModel } from "../_models/carousel-tour.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  tours: Tour[] = [];
  pageSize: number = 8;
  currentSortDirection = 'DESC';
  topTourists: User[];
  carouselModels = new Array<CarouselTourModel>();

  constructor(private userService: UserService,
              private tourService: TourService) {
  }

  ngOnInit(): void {
    this.userService.getPage$(0, 5, ['rate,' + this.currentSortDirection.toUpperCase()], [])
      .subscribe(response => {
        this.topTourists = response.items;
      }
    );
    this.tourService.getPage$(0, this.pageSize, ['rate,' + this.currentSortDirection.toUpperCase()], [])
      .subscribe(response => {
          this.tours = response?.items;
          this.carouselModels = [...this.tours].splice(0, 5).map(
            tour => new CarouselTourModel(ImageService.getImageLinkByName(tour.images[0]?.imageName) || 'assets/icons/default_mountains.png', tour.name)
          );
        }
      );
  }
}
