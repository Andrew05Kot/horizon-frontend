import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, map, Observable, switchMap} from 'rxjs';
import {User} from "../_models/user.model";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {Role} from "../_constants/role.constants";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<User>;
  public authenticatedUser$: Observable<User>;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.authenticatedUser$ = this.currentUserSubject.asObservable();
  }

  public getCurrentUser(): User {
    if (!this.currentUserSubject.getValue()) {
      const currentUser = this.cookieService.get('currentUser');
      if (!currentUser) {
        this.currentUserSubject.next(null);
        return null;
      }
      const user: User = JSON.parse(currentUser);
      this.currentUserSubject.next(user);
      return user;
    }
    return this.currentUserSubject.getValue();
  }

  public getLoggedInUser(): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/user/current')
      .pipe(
        map((user: User) => {
          this.updateCurrentUser(user);
          return user;
        }));
  }

  public updateCurrentUser(user: User): void {
    if (user) {
      this.cookieService.set('currentUser', JSON.stringify(user), new Date().getHours() + 2, '/');
    }
    this.currentUserSubject.next(user);
  }

  public logInViaFacebook(): void {
    this.loginOrShowShackBarMessage('/oauth2/authorization/facebook');
  }

  public loginViaInstagram(): void {
    this.loginOrShowShackBarMessage('/oauth2/authorization/instagram');
  }

  private loginOrShowShackBarMessage(location: string) {
    window.location.href = environment.prefixUrl + location;
  }

  public async logOut(): Promise<void> {
    this.cookieService.deleteAll('/');
    this.currentUserSubject.next(null);
    window.location.href = '/';
  }

  public authenticate(token: string): void {
    this.getAuthUser(token).subscribe((user) => {
      this.currentUserSubject.next(user);
      const isAdmin = this.isAdminOrSubAdmin(user);
      isAdmin ? this.router.navigateByUrl('/admin') : this.router.navigateByUrl('/');
    });
  }

  public getAuthUser(token: string): Observable<any> {
    const queryParams = new HttpParams().set('token', token);
    return this.http.get(environment.apiUrl + '/auth', {params: queryParams}).pipe(
      switchMap((longLivedToken: { token: string, value: string }) => {
        this.cookieService.set('userToken', longLivedToken.token, new Date().getHours() + 3, '/');
        return this.getLoggedInUser();
      }));
  }

  public isAdmin(user?: User): boolean {
    const userForCheck = user || this.getCurrentUser();
    return userForCheck && (userForCheck.role === Role.Admin);
  }

  public isAdminOrSubAdmin(user?: User): boolean {
    const userForCheck = user || this.getCurrentUser();
    return this.isAdmin(userForCheck) || this.isSubAdmin(userForCheck);
  }

  public isSubAdmin(user?: User): boolean {
    const userForCheck = user || this.getCurrentUser();
    return userForCheck && (userForCheck.role === Role.SubAdmin);
  }

}
