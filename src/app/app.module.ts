import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { AuthComponent } from './auth/auth.component';
import { LoginPageComponent } from "./login/login-page/login-page.component";
import { BackgroundUrlPipe } from "./_pipes/backgroun-url.pipe";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HomeComponent } from './home/home.component';
import { InterceptorProviders } from "./_interceptors/interceptor-providers";
import { CookieService } from "ngx-cookie-service";
import { MatMenuModule } from "@angular/material/menu";
import { ToursListComponent } from './tour/tours-list/tours-list.component';
import { MatCardModule } from "@angular/material/card";
import { TourCardComponent } from './tour/tour-card/tour-card.component';
import { MatIconModule } from "@angular/material/icon";
import { TourEditPageComponent } from './tour/tour-edit-page/tour-edit-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgxEditorModule } from "ngx-editor";
import { MatInputModule } from "@angular/material/input";
import { EditTourImagesComponent } from './tour/tour-edit-page/edit-tour-images/edit-tour-images.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxFileDropModule } from "ngx-file-drop";
import { TourInfoPageComponent } from './tour/tour-info-page/tour-info-page.component';
import {
  TourInfoImagesSliderComponent
} from './tour/tour-info-page/tour-info-images-slider/tour-info-images-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SelectMapPointComponent } from './tour/tour-edit-page/select-map-point/select-map-point.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ViewMapComponent } from './tour/tour-info-page/view-map/view-map.component';
import { CustomPointMarkerComponent } from './tour/tour-info-page/view-map/custom-point-marker/custom-point-marker.component';
import { DecisionDialogComponent } from './_components/decision-dialog/decision-dialog.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AllToursPageComponent } from './tour/all-tours-page/all-tours-page.component';
import { PaginatorComponent } from './_components/paginator/paginator.component';
import { ConfirmTourComponent } from './tour/confirm-tour/confirm-tour.component';
import { TourBookingsComponent } from './tour/tour-bookings/tour-bookings.component';
import { TourBookingCardComponent } from './tour/tour-bookings/tour-booking-card/tour-booking-card.component';

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
    TourEditPageComponent,
    EditTourImagesComponent,
    TourInfoPageComponent,
    TourInfoImagesSliderComponent,
    SelectMapPointComponent,
    ViewMapComponent,
    CustomPointMarkerComponent,
    DecisionDialogComponent,
    AllToursPageComponent,
    PaginatorComponent,
    ConfirmTourComponent,
    TourBookingsComponent,
    TourBookingCardComponent
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
    MatInputModule,
    MatProgressSpinnerModule,
    NgxFileDropModule,
    CarouselModule,
    IvyCarouselModule,
    LeafletModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [
    CookieService,
    InterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
