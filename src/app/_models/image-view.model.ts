import { ImageModel } from "./image.model";

export class ImageView {
    constructor(
        public image?: ImageModel,
        public url?: string
    ) {
    }

    public static fromObject(imageView: ImageView): ImageView {
        return new ImageView(
            imageView.image,
            imageView.url
        );
    }
}
