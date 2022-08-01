import { Component, Input } from '@angular/core';
import { User } from "../../_models/user.model";
import { Locales } from "../../_constants/locale.constants";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { Locale } from "../../_models/locale.model";
import { UserService } from "../../_services/user.service";
import { AuthService } from "../../_services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent {

  @Input() set currentUser(value: User) {
    if (value) {
      this._currentUser = User.fromObject(value);
      this.translate.use(this._currentUser.language.toLocaleLowerCase());
    }
  }

  _currentUser: User;
  _locales: Locale[] = Locales.VALUES;

  constructor(private userService: UserService,
              private authService: AuthService,
              private translate: TranslateService) {
  }

  selectLocale(locale: Locale): void {
    this._currentUser.language = locale.language;
    this._currentUser.locale = locale;
    this.translate.use(this._currentUser.language.toLocaleLowerCase());
    this.userService.patch$(this._currentUser.id, this._currentUser)
      .subscribe(() => this.authService.updateCurrentUser(this._currentUser));
  }

  getUnicodeFlagIcon(locale: Locale): any {
    return getUnicodeFlagIcon(locale.country);
  }
}
