import {Injectable} from '@angular/core';
import {NgxImageCompressService} from "ngx-image-compress";

@Injectable({
  providedIn: 'root'
})
export class ImageCropAndCompressService {

  constructor(private imageCompress: NgxImageCompressService) {
  }

  static readonly defaultHeight = 720;
  static readonly defaultWidth = 720;

  static crop(inputImage, aspectRatio: number, fileType: string): any {
    const inputWidth = inputImage.naturalWidth;
    const inputHeight = inputImage.naturalHeight;
    const inputImageAspectRatio = inputWidth / inputHeight;

    // if it's bigger than our target aspect ratio
    let outputWidth = inputWidth;
    let outputHeight = inputHeight;
    if (inputImageAspectRatio > aspectRatio) {
      outputWidth = inputHeight * aspectRatio;
    } else if (inputImageAspectRatio < aspectRatio) {
      outputHeight = inputWidth / aspectRatio;
    }

    // calculate the position to draw the image at
    const outputX = (outputWidth - inputWidth) * 0.5;
    const outputY = (outputHeight - inputHeight) * 0.5;

    // create a canvas that will present the output image
    const outputImage = document.createElement('canvas');

    outputImage.width = outputWidth;
    outputImage.height = outputHeight;

    // draw our image at position 0, 0 on the canvas
    const ctx = outputImage.getContext('2d');
    ctx.drawImage(inputImage, outputX, outputY);

    return outputImage.toDataURL(fileType);
  }

  static calcRatio(image): number {
    const heightIsBigger = image.height > image.width;
    const biggerSide = heightIsBigger ? image.height : image.width;

    const sideOfPhotoForComparing = heightIsBigger ? ImageCropAndCompressService.defaultHeight
      : ImageCropAndCompressService.defaultWidth;

    if (biggerSide > sideOfPhotoForComparing) {
      return (sideOfPhotoForComparing * 100) / biggerSide;
    }
    return 100;
  }

  async resizeImg(file: File, readerResult: ArrayBuffer | null): Promise<string> {
    const quality = 80;
    const orientation = await this.imageCompress.getOrientation(file);
    const ratio = ImageCropAndCompressService.calcRatio(readerResult);
    return this.imageCompress
      .compressFile(readerResult.toString(), orientation, ratio, quality);
  }

  createFileFromBase64(base64: string, startFile: File): File {
    const imageBlob = this.convertBase64ToBlob(base64, startFile.type);
    return new File([imageBlob], startFile.name, {type: startFile.type});
  }

  public convertBase64ToBlob(base64Data: string, fileType): Blob {
    const sliceSize = 512;
    base64Data = base64Data.replace(/^[^,]+,/, '');
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: fileType});
  }
}
