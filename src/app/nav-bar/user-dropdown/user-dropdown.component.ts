import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../_models/user.model";
import { AuthService } from "../../_services/auth.service";

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit {

  @Input() set currentUser(value: User) {
    if (value) {
      this._currentUser = value;
      this._profileLink = `profile/info/${this._currentUser.id}`;
    }
  }

  _profileLink: string;
  _currentUser: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logOut();
  }

}
