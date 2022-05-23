import { Component, Inject, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Tour } from "../../../_models/tour.model";
import { divIcon, latLng, marker, tileLayer } from "leaflet";
import { CustomPointMarkerComponent } from "./custom-point-marker/custom-point-marker.component";

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.scss']
})
export class ViewMapComponent {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'}),
    ],
    zoom: 8,
    center: latLng(48.29149, 25.94034),
    zoomControl: true
  };

  markers = [];

  constructor(private dialog: MatDialogRef<ViewMapComponent>,
              @Inject(MAT_DIALOG_DATA) public tour: Tour,
              private viewContainerRef: ViewContainerRef
  ) {
    this.drawMarker(tour);
  }

  drawMarker(tour: Tour): void {
    const geoData = tour.geoData;


    const icon = divIcon({
      iconSize: [30, 30],
      html: "<div class='marker'></div>",
      className: 'point-marker',
    });

    const newMarker = marker([geoData.latitude, geoData.longitude],
      {
        icon: icon,
        draggable: false,
        autoPanSpeed: 20,
        riseOnHover: true
      });

    this.addRisePopupOnHoverEvent(newMarker);
    this.markers.push(newMarker);
  }

  closeMap() {
    this.dialog.close();
  }

  private addRisePopupOnHoverEvent(marker): void {
    marker.on('mouseover', function (e) {
      this.closePopup();
      this.openPopup();
    });

    marker.on('mouseout', function (e) {
      // this.closePopup();
    });
  }

}
