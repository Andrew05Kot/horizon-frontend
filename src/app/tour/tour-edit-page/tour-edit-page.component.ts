import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TourService } from "../../_services/tour.service";
import { Tour } from "../../_models/tour.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { SelectMapPointComponent } from "./select-map-point/select-map-point.component";

@Component({
  selector: 'app-tour-edit-page',
  templateUrl: './tour-edit-page.component.html',
  styleUrls: ['./tour-edit-page.component.scss']
})
export class TourEditPageComponent implements OnInit {

  tourForm: FormGroup;
  tourToEdit: Tour;

  maxLength = 10000;
  myDatePicker
  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private tourService: TourService,
              public dialog: MatDialog,
              private router: Router) {
    this.checkIfEditMode();
  }

  ngOnInit(): void {

  }

  save(): void {
    const tour: Tour = this.tourForm.value;
    this.tourToEdit
      ? this.tourService.update$(this.tourToEdit.id, tour).subscribe(response => this.processSavedTour(response))
      : this.tourService.create$(tour).subscribe(response => this.processSavedTour(response));
  }

  checkIfEditMode(): void {
    const tourId = this.activatedRoute.snapshot.params['id'];
    if (tourId) {
      this.tourService.getById$(tourId).subscribe(response => {
        this.tourToEdit = Tour.fromObject(response);
        this.initEditingForm();
      });
    } else {
      this.initCreatingForm();
    }
  }

  openSelectMapDialog(): void {
    const dialogRef = this.dialog.open(SelectMapPointComponent, {
      data: this.tourForm,
      maxWidth: '750px',
      maxHeight: '750px',
      height: '100%',
      width: '100%',
      panelClass: 'map-point-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('this.tourForm.get(\'geoData\') ', this.tourForm.get('geoData'))
    });
  }

  private processSavedTour(tourResponse: Tour): void {
    this.updateImages(tourResponse);
  }

  private updateImages(tourResponse: Tour): void {
    const imagesToSave: File[] = this.tourForm.get('files').value;
    const imagesToRemove = this.tourForm.get('imagesToRemove').value;
    if (imagesToSave.length > 0 || imagesToRemove.length > 0) {
      this.tourService.updateImages(tourResponse.id, imagesToSave, imagesToRemove.map(img => img.id))
        .subscribe(response => this.router.navigate(['tour', 'info', response.id]));
    } if (this.tourToEdit?.id) {
      this.router.navigate(['tour', 'info', this.tourToEdit?.id])
    }
  }

  private initCreatingForm(): void {
    this.tourForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        rate: new FormControl(80),
        eventDate: new FormControl(null),
        files: [[]],
        imagesToRemove: [[]],
        images: [[]],
        geoData: new FormControl(null, [Validators.required])
      }
    );
  }

  private initEditingForm(): void {
    this.tourForm = this.formBuilder.group({
        name: new FormControl(this.tourToEdit?.name, [Validators.required]),
        description: new FormControl(this.tourToEdit?.description, [Validators.required]),
        rate: new FormControl(80),
        eventDate: new FormControl(null),
        files: [[]],
        imagesToRemove: [[]],
        images: [this.getOrDefault(this.tourToEdit, "images")],
        geoData: new FormControl(this.getOrDefault(this.tourToEdit, "geoData"), [Validators.required])
      }
    );
  }

  private getOrDefault(source, fieldName, defaultValue = null): any {
    return (source && source[fieldName]) ? source[fieldName] : defaultValue;
  }

}
