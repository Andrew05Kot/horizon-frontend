import {ImageService} from "../_services/image.service";

export class ImageModel {
  constructor(
    public id?: number,
    public imageName?: string,
    public mimeType?: string,
    public link?: string
  ) {
  }

  public static fromObject(image: ImageModel): ImageModel {
    return new ImageModel(
      image.id,
      image.imageName,
      image.mimeType,
      ImageService.getImageLinkByName(image.imageName),
    );
  }
}
