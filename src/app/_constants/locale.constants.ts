import { Locale } from "../_models/locale.model";

export namespace Locales {

  export const DEFAULT_LOCALE: Locale = new Locale('EN', 'GB')

  export const VALUES: Locale[] = [
    DEFAULT_LOCALE,
    new Locale('UK', 'UA')
  ];
}
