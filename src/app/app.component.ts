import { Component } from '@angular/core';
import {AuthService} from "./_services/auth.service";
import {Role} from "./_constants/role.constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isAdmin = false;

  constructor(private auth: AuthService) {
    this.isAdmin = this.auth.getCurrentUser()?.role == Role.Admin;
  }
}
