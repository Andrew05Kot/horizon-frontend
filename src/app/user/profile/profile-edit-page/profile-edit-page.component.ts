import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from "../../../_models/user.model";
import { AuthService } from "../../../_services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../_services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss']
})
export class ProfileEditPageComponent implements OnInit {

  @Output() formEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() imageInProcessingEmitter = new EventEmitter<boolean>();

  currentUser: User;
  userForm: FormGroup;

  constructor(private router: Router,
              private auth: AuthService,
              private userService: UserService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.initForm();
  }

  catchMainImage(uploadedMainImageFile: File): void {
    if (uploadedMainImageFile == null && this.currentUser.image) {
      this.userForm.patchValue({imageIdToDelete: this.currentUser.image.id});
    }
    this.userForm.markAsDirty();
    this.userForm.patchValue({image: uploadedMainImageFile});
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      lastName: this.formBuilder.control(this.currentUser.lastName, [Validators.required]),
      firstName: this.formBuilder.control(this.currentUser.firstName, [Validators.required]),
      phoneNumber: this.formBuilder.control(this.currentUser.phoneNumber, [Validators.required]),
      aboutMe: this.formBuilder.control(this.currentUser.aboutMe, []),
      image: null,
      imageIdToDelete: null,
    });
    this.formEmitter.emit(this.userForm);
  }

  save(): void {
    this.currentUser.lastName = this.userForm.value.lastName;
    this.currentUser.firstName = this.userForm.value.firstName;
    this.currentUser.phoneNumber = this.userForm.value.phoneNumber;
    this.currentUser.aboutMe = this.userForm.value.aboutMe;
    this.userService.update$(this.currentUser.id, this.currentUser).subscribe(() => {
      this.router.navigate(['profile', 'info', this.currentUser.id]);
    });
  }

  cancel(): void {
    this.initForm();
  }

}
