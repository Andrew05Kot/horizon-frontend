import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TourService } from "../../_services/tour.service";
import { Tour } from "../../_models/tour.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-tour-edit-page',
  templateUrl: './tour-edit-page.component.html',
  styleUrls: ['./tour-edit-page.component.scss']
})
export class TourEditPageComponent implements OnInit {

  tourForm: FormGroup;
  tourToEdit: Tour;

  maxLength = 10000;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private tourService: TourService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.checkIfEditMode();
  }

  save(): void {
    const tour: Tour = this.tourForm.value;
    console.log('this.tourForm.value >> ', this.tourForm.value)
    this.tourToEdit
      ? this.tourService.update$(this.tourToEdit.id, tour).subscribe(response => this.processSavedTour(response))
      : this.tourService.create$(tour).subscribe(response => this.processSavedTour(response));
  }

  checkIfEditMode(): void {
    const tourId = this.activatedRoute.snapshot.params['id'];
    this.tourService.getById$(tourId).subscribe(response => {
      this.tourToEdit = Tour.fromObject(response);
      this.tourToEdit ? this.initEditingForm() : this.initCreatingForm();
    });
  }

  private processSavedTour(tourResponse: Tour): void {
    this.updateImages(tourResponse);
  }

  private updateImages(tourResponse: Tour): void {
    console.log('BEFORE tourResponse >> ', tourResponse)
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
        files: [[]],
        imagesToRemove: [[]],
        images: [[]],
      }
    );
  }

  private initEditingForm(): void {
    this.tourForm = this.formBuilder.group({
        name: new FormControl(this.tourToEdit?.name, [Validators.required]),
        description: new FormControl(this.tourToEdit?.description, [Validators.required]),
        rate: new FormControl(80),
        files: [[]],
        imagesToRemove: [[]],
        images: [this.getOrDefault(this.tourToEdit, "urls")],
      }
    );
  }

  private getOrDefault(source, fieldName, defaultValue = null): any {
    return (source && source[fieldName]) ? source[fieldName] : defaultValue;
  }

}
