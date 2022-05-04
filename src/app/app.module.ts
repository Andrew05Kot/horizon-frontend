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

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginPageComponent,
    BackgroundUrlPipe,
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [
    CookieService,
    InterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
