import { Component, Input } from '@angular/core';
import { Tour } from "../../_models/tour.model";

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.component.html',
  styleUrls: ['./tours-list.component.scss']
})
export class ToursListComponent {

  @Input() set _tours(value: Tour[]) {
    this.tours = value;
  }

  tours: Tour[] = [];

  constructor() {
  }

}
