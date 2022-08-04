export class Locale {

  constructor(public language?: string,
              public country?: string
  ) {
  }

  public static fromObject(model: Locale) {
    return new Locale(
      model.language,
      model.country
    );
  }

}
