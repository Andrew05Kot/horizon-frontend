import { environment } from "../../environments/environment";
import { ImageService } from "../_services/image.service";

export class Tour {
  constructor(public id?: number,
              public name?: string,
              public description?: string,
              public rate?: number,
              public images?: string[],
              public urls?: string[]
  ) {
  }

  public static fromObject(model: Tour) {
    return new Tour(
      model.id,
      model.name,
      model.description,
      model.rate,
      model.images,
      model.images.map(image =>  ImageService.getImageLinkByName(image))
    );
  }

}
