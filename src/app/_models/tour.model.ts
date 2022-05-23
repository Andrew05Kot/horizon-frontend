import { environment } from "../../environments/environment";
import { ImageService } from "../_services/image.service";
import { ImageModel } from "./image.model";
import { GeoData } from "./geo-data.model";
import { User } from "./user.model";

export class Tour {
  constructor(public id?: number,
              public name?: string,
              public description?: string,
              public rate?: number,
              public images?: ImageModel[],
              public urls?: string[],
              public geoData?: GeoData,
              public owner?: User
  ) {
  }

  public static fromObject(model: Tour) {
    return new Tour(
      model.id,
      model.name,
      model.description,
      model.rate,
      model.images,
      model.images.map(image =>  ImageService.getImageLinkByName(image.imageName)),
      model.geoData? GeoData.fromObject(model.geoData) : null,
      model.owner
    );
  }

}
