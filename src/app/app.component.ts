import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Role } from "./_constants/role.constants";
import { AuthService } from "./_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isAdmin = false;

  constructor(private auth: AuthService,
              private translate: TranslateService) {
    this.isAdmin = this.auth.getCurrentUser()?.role == Role.Admin;
    this.translate.use(this.auth.getCurrentUser()?.language?.toLocaleLowerCase());
    if (!this.translate.langs) {
      this.translate.use('EN');
    }
  }
}
