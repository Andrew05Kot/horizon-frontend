import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {User} from "../_models/user.model";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: any;
  currentUser: User;
  profileLink: string;

  constructor(private authService: AuthService) {
    this.authService.currentUserSubject.subscribe((currentUser => {
      this.currentUser = currentUser;
      this.profileLink = `profile/info/${currentUser.id}`;
    }));
  }

  ngOnInit(): void {
    this.initCurrentUser();
  }

  initCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.profileLink = `profile/info/${this.currentUser.id}`;
  }

  public logout(): void {
    this.authService.logOut();
  }

}
