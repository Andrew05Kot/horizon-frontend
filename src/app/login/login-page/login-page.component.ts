import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {AppConstants} from "../../_constants/app.constants";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  currentUser: any;
  errorMessage = '';

  ngOnInit(): void {
  }

  constructor(private authService: AuthService,
              private translate: TranslateService) {
    this.translate.use('en');
  }

  loginGoogle(): void {
    window.location.href = AppConstants.GOOGLE_AUTH_URL;
  }

  loginViaFacebook(): void {
    this.authService.logInViaFacebook();
  }

}
