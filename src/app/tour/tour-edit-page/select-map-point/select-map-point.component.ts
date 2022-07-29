import { Component, Inject, Input, OnInit } from '@angular/core';
import { divIcon, latLng, LeafletMouseEvent, Map, Marker, marker, tileLayer } from "leaflet";
import { FormGroup } from "@angular/forms";
import { GeoService } from "../../../_services/geo.service";
import { GeoData } from "../../../_models/geo-data.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

class DialogData {
}

@Component({
  selector: 'app-select-map-point',
  templateUrl: './select-map-point.component.html',
  styleUrls: ['./select-map-point.component.scss']
})
export class SelectMapPointComponent {

  form: FormGroup;
  leafMap: Map;
  marker: Marker;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'}),
    ],
    zoom: 10,
    center: latLng(48.29149, 25.94034),
    zoomControl: true
  };

  constructor(private geoService: GeoService,
              @Inject(MAT_DIALOG_DATA) public tourForm: FormGroup) {
    this.form = tourForm;
  }

  handleAddressChange(event: LeafletMouseEvent): void {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    this.geoService.getStreetAddress(lat, lng)
      .subscribe(result => this.drawMarker(lat, lng, result));
  }

  drawMarker(lat, lng, streetResult): void {
    const geoData = new GeoData(null, lat, lng, 0, streetResult['display_name']);
    this.form.get('geoData').setValue(geoData);

    const icon = divIcon({
      iconSize: [20, 20],
      html: "<div class='marker'></div>",
      className: 'point-marker',
    });

    this.marker = marker([geoData.latitude, geoData.longitude],
      {
        icon: icon,
        draggable: false,
        autoPanSpeed: 20,
        riseOnHover: true
      }).bindPopup('<b>' + geoData.addressName + '</b>')

    this.addRisePopupOnHoverEvent();
  }

  onMapReady(leafMap): void {
    this.leafMap = leafMap;
  }

  zoomChange(event): void {
    // console.log(event);
  }

  private addRisePopupOnHoverEvent(): void {
    this.marker.on('mouseover', function (e) {
      this.openPopup();
    });

    this.marker.on('mouseout', function (e) {
      this.closePopup();
    });
    // this.marker.on("dragend",(e) => {
    //     console.log(e);
    //     const lat = e.target._latlng.lat;
    //     const lng = e.target._latlng.lng;
    //     this.geoService.getStreetAddress(lat, lng)
    //         .subscribe(result => this.drawMarker(lat, lng, result));
    // });
  }

}
