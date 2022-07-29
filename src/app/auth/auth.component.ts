import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from "../_services/token-storage.service";
import {AuthService} from "../_services/auth.service";

// import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              // private userService: UserService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { token: string }) => this.authService.authenticate(params.token));
  }

}
