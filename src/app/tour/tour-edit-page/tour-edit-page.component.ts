import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TourService} from "../../_services/tour.service";
import {Tour} from "../../_models/tour.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tour-edit-page',
  templateUrl: './tour-edit-page.component.html',
  styleUrls: ['./tour-edit-page.component.scss']
})
export class TourEditPageComponent implements OnInit {

  tourForm: FormGroup;

  maxLength = 10000;

  constructor(private formBuilder: FormBuilder,
              private tourService: TourService,
              private router: Router) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  save(): void {
    const tour: Tour = this.tourForm.value;
    this.tourService.create$(tour).subscribe(response => {
      this.processSavedTour(response);
    });
  }

  private processSavedTour(tourResponse: Tour): void {
    this.updateImages(tourResponse);

  }

  private updateImages(tourResponse: Tour): void {
    console.log('this.tourForm >> ', this.tourForm)
    const imagesToSave: File[] = this.tourForm.get('files').value;
    const imagesToRemove = this.tourForm.get('imagesToRemove').value;
    if (imagesToSave.length > 0 || imagesToRemove.length > 0) {
      console.log('images to save >> ', imagesToSave)
      this.tourService.updateImages(tourResponse.id, imagesToSave, imagesToRemove.map(img => img.id))
        .subscribe(response => this.router.navigate(['tour', 'info', response.id]));
    }
  }

  private initForm(): void {
    this.tourForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        rate: new FormControl(80),
        files: [[]],
        imagesToRemove: [[]],
      }
    )
  }

}
