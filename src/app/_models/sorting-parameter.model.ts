export class SortingParameter {

  constructor(public fieldKey?: string,
              public fieldName?: string
  ) {
  }

  static fromObject(object: SortingParameter): SortingParameter {
    return new SortingParameter(
      object.fieldKey,
      object.fieldName
    );
  }
}
