import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "../_services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { token: string }) => this.authService.authenticate(params.token));
  }

}
