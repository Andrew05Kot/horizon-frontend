import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user/user-table/user-table.component';
import { AdminComponent } from './admin.component';
import {AdminRouting} from "./admin-routing.module";
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    UserTableComponent,
    AdminComponent,
    AdminHeaderComponent,
    AdminNavBarComponent,
    AdminDashboardComponent
  ],
  imports: [
    AdminRouting,
    CommonModule,
    MatListModule,
    MatIconModule
  ]
})
export class AdminModule { }
