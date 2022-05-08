import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {AuthComponent} from './auth/auth.component';
import {LoginPageComponent} from "./login/login-page/login-page.component";
import {BackgroundUrlPipe} from "./_pipes/backgroun-url.pipe";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {HomeComponent} from './home/home.component';
import {InterceptorProviders} from "./_interceptors/interceptor-providers";
import {CookieService} from "ngx-cookie-service";
import {MatMenuModule} from "@angular/material/menu";
import { ToursListComponent } from './tour/tours-list/tours-list.component';
import {MatCardModule} from "@angular/material/card";
import { TourCardComponent } from './tour/tour-card/tour-card.component';
import {MatIconModule} from "@angular/material/icon";
import { TourEditPageComponent } from './tour/tour-edit-page/tour-edit-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgxEditorModule} from "ngx-editor";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginPageComponent,
    BackgroundUrlPipe,
    NavBarComponent,
    HomeComponent,
    ToursListComponent,
    TourCardComponent,
    TourEditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxEditorModule,
    MatInputModule
  ],
  providers: [
    CookieService,
    InterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
