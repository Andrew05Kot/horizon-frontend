import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_services/auth.service";
import { User } from "../_models/user.model";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: any;
  currentUser: User;

  constructor(private authService: AuthService) {
    this.authService.currentUserSubject.subscribe((currentUser => {
      this.currentUser = currentUser;
    }));
  }

  ngOnInit(): void {
    this.initCurrentUser();
  }

  initCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

}
