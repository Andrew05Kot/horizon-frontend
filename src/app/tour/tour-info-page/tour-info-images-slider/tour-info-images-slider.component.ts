import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tour-info-images-slider',
  templateUrl: './tour-info-images-slider.component.html',
  styleUrls: ['./tour-info-images-slider.component.scss']
})
export class TourInfoImagesSliderComponent implements OnInit {

  @ViewChild('slider') sliderElement: ElementRef;

  @Input() set _images(value: string[]) {
    this.images = value;
  };

  images: string[];

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      // this.nextSlide();
    }, 2000);
  }

  nextSlide(): void {
    let element = this.sliderElement.nativeElement;

    // перший елемент плавно ховати
    // останній елемент плавно додавати
    // і весь блок сунути

    let item = element.getElementsByClassName('item');
    element.append(item[0]);
  }

}
