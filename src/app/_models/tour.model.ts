export class Tour {
  constructor(public id?: number,
              public name?: string,
              public description?: string,
              public rate?: number
  ) {
  }

  public static fromObject(model: Tour) {
    return new Tour(
      model.id,
      model.name,
      model.description,
      model.rate
    );
  }

}
