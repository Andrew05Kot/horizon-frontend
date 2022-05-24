import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Tour } from "../../_models/tour.model";

@Component({
  selector: 'app-confirm-tour',
  templateUrl: './confirm-tour.component.html',
  styleUrls: ['./confirm-tour.component.scss']
})
export class ConfirmTourComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public tour: Tour) { }

  ngOnInit(): void {
  }

  makeTourRequest(): void {

  }

}
