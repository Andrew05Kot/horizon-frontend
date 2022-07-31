import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../_models/user.model";
import { Locales } from "../../_constants/locale.constants";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { Locale } from "../../_models/locale.model";

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {

  @Input() set currentUser(value: User) {
    if (value) {
      this._currentUser = User.fromObject(value);
    }
  }

  _currentUser: User;
  _locales: Locale[] = Locales.VALUES;

  constructor() {
    console.log(this._locales);
  }

  ngOnInit(): void {
  }

  selectLocale(locale: string): void {
    console.log('selected: ', locale);
  }

  getUnicodeFlagIcon(locale: Locale): any {
    // console.log('locale ', locale)
    return getUnicodeFlagIcon(locale.country);
  }
}
