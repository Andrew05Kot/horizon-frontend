export class GeoData {

  constructor(public id?: number,
              public latitude?: number,
              public longitude?: number,
              public altitude?: number,
              public addressName?: string
  ) {
  }

  static fromObject(object: GeoData): GeoData {
    return new GeoData(
      object.id,
      object.latitude,
      object.longitude,
      object.altitude,
      object.addressName
    );
  }
}
