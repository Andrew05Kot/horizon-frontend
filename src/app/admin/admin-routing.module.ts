import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {UserTableComponent} from "./user/user-table/user-table.component";
import {AdminComponent} from "./admin.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    data: {
      breadcrumb: {
        skip: true
      }
    },
    children: [
      {
        path: '', redirectTo: 'users', pathMatch: 'full'
      },
      {
        path: 'users', component: UserTableComponent
      },
      {
        path: 'dashboard', component: AdminDashboardComponent
      }
    ]
  }
];

export const AdminRouting = RouterModule.forChild(routes);
