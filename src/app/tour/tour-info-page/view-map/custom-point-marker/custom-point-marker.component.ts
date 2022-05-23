import { Component, Input } from '@angular/core';
import { Tour } from "../../../../_models/tour.model";

@Component({
  selector: 'app-custom-point-marker',
  templateUrl: './custom-point-marker.component.html',
  styleUrls: ['./custom-point-marker.component.scss']
})
export class CustomPointMarkerComponent {

  @Input() set apartment(tour: Tour) {
    this._tour = tour;
  }

  _tour: Tour;

  constructor() {
  }
}
