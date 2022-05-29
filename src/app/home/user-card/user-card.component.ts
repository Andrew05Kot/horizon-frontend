import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../_models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  openUserProfile(): void {
    this.router.navigate(['profile', 'info', this.user.id]);
  }

}
