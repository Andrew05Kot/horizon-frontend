import { Component, Input } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { Locales } from "../../_constants/locale.constants";
import { Locale } from "../../_models/locale.model";
import { User } from "../../_models/user.model";
import { AuthService } from "../../_services/auth.service";
import { UserService } from "../../_services/user.service";

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent {

  @Input() set currentUser(value: User) {
    if (value) {
      this._currentUser = User.fromObject(value);
      this.translate.use(this._currentUser.language);
      this._currentLocale = this._locales.find(l => l.language === this._currentUser.language);
    } else {
      this._currentLocale = this._locales.find(l => l.language === this.translate.currentLang);
    }

  }

  _currentUser: User;
  _locales: Locale[] = Locales.VALUES;
  _currentLocale: Locale;

  constructor(private userService: UserService,
    private authService: AuthService,
    private translate: TranslateService) {
  }

  selectLocale(locale: Locale): void {
    if (this._currentUser) {
      this._currentUser.language = locale.language;
      this._currentUser.locale = locale;
      this.userService.patch$(this._currentUser.id, this._currentUser)
        .subscribe(() => this.authService.updateCurrentUser(this._currentUser));
    }
    this.translate.use(locale.language);

  }

  getUnicodeFlagIcon(locale: Locale): any {
    return getUnicodeFlagIcon(locale.country);
  }
}
