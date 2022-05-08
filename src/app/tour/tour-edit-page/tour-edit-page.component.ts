import {Component, OnDestroy, OnInit} from '@angular/core';
import {Editor, Toolbar} from 'ngx-editor';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TourService} from "../../_services/tour.service";
import {Tour} from "../../_models/tour.model";

@Component({
  selector: 'app-tour-edit-page',
  templateUrl: './tour-edit-page.component.html',
  styleUrls: ['./tour-edit-page.component.scss']
})
export class TourEditPageComponent implements OnInit, OnDestroy {

  tourForm: FormGroup;

  editor: Editor;
  isEditorEmpty = true;
  maxLength = 10000;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["ordered_list", "bullet_list"],
    [{heading: ["h1", "h2", "h3", "h4", "h5", "h6"]}],
    ["link"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];

  constructor(private formBuilder: FormBuilder,
              private tourService: TourService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.editor = new Editor();
    // this.editor.valueChanges
    //   .subscribe(value => this.isEditorEmpty = !!!value.content[0].content);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  save(): void {
    const tour: Tour = this.tourForm.value;
    this.tourService.create$(tour).subscribe(response => {
      console.log('response >> ', response);
    })
    console.log('tour >> ', tour);
  }

  private initForm(): void {
    this.tourForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        rate: new FormControl(80)
      }
    )
  }

}
