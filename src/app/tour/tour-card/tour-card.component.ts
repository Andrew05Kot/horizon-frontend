import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Tour } from "../../_models/tour.model";
import { OwlOptions } from "ngx-owl-carousel-o";
import { CarouselComponent } from "ngx-owl-carousel-o/lib/carousel/carousel.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.scss']
})
export class TourCardComponent implements OnInit {

  @ViewChild('carousel') carouselElement: CarouselComponent;

  @Input() set _tour(value: Tour) {
    this.tour = Tour.fromObject(value);
  };

  tour: Tour;

  customOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    autoHeight: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1
  }

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.carouselElement?.next();
    }, (Math.floor(Math.random() * 4) + 1.5) * 1000);
  }

  openInfo(): void {
    this.router.navigateByUrl(`/tour/info/${this.tour.id}`);
  }

}
