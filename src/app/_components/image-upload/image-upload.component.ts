import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCropAndCompressService } from "../../_services/image-crop-and-compress.service";
import { NgxFileDropEntry } from "ngx-file-drop";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() initedImageSrc: string;
  @Input() loadedImage: string = null;
  @Input() supportedFormats: string[] = ['image/jpeg', 'image/png'];
  @Input() supportedFormatsForView: string = 'jpg, png';
  @Output() imageEmitter: EventEmitter<File> = new EventEmitter();
  @Output() imageInProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  uploadedFile: File;
  inProcess = false;
  supportedFormatsForProcessing = ['image/jpeg', 'image/png'];

  constructor(
    private imageCropAndCompressService: ImageCropAndCompressService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    if (this.initedImageSrc) {
      this.loadedImage = this.initedImageSrc;
    }
  }

  getSanitizeUrl(source: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(source);
  }

  catchDroppedFile(droppedFile: any): void {
    const fileEntry = droppedFile[0].fileEntry as FileSystemFileEntry;
    fileEntry.file((file: File) => {
      this.prepareFileToProcessing(file);
    });
  }

  catchUploadedFile(event: any): void {
    const file: File = event.target.files[0];
    this.prepareFileToProcessing(file);
  }

  private prepareFileToProcessing(file: File): void {
    if (file && this.validateImageFile(file)) {
      this.processFile(file);
    }
  }

  clearLoadedFile(): void {
    this.loadedImage = null;
    this.uploadedFile = null;
    this.imageEmitter.emit(null);
  }

  private async processFile(file: File): Promise<void> {
    this.uploadedFile = file;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedFile);
    reader.onload = (uploadedFile: ProgressEvent<FileReader>) => {
      if (this.isItProcessableFile(file)) {
        this.imageInProcessingEmitter.emit(true);
        this.inProcess = true;
        this.showSnackBarMessage('IMAGE_UPLOAD_COMPONENT.FILE_IN_PROCESS', null);
        this.readeAndProcessImageOnLoad(uploadedFile, file.type);
      } else {
        this.imageEmitter.emit(file);
        this.loadedImage = uploadedFile.target.result.toString();
      }
    }
  }

  private validateImageFile(file: File): boolean {
    for (let format of this.supportedFormats) {
      if (file.type === format) {
        return true;
      }
    }
    this.showSnackBarMessage('IMAGE_UPLOAD_COMPONENT.WRONG_FORMAT', 2000);
    return false;
  }

  private isItProcessableFile(file: File): boolean {
    return this.supportedFormatsForProcessing.some(format => format === file.type);
  }

  private readeAndProcessImageOnLoad = (uploadedFile: ProgressEvent<FileReader>, fileType: string): void => {
    const image = new Image();
    image.src = uploadedFile.target.result.toString();
    image.onload =
      () => this.resizeAndEmitPhoto(ImageCropAndCompressService.crop(image, 1 / 1, fileType));
  }

  private resizeAndEmitPhoto(readerResult: ArrayBuffer): void {
    this.imageCropAndCompressService.resizeImg(this.uploadedFile, readerResult)
      .then(async result => {
        const newFile = await this.imageCropAndCompressService.createFileFromBase64(result, this.uploadedFile);
        this.imageEmitter.emit(newFile);
        this.imageInProcessingEmitter.emit(false);
        this.inProcess = false;
        this.loadedImage = readerResult.toString();
        this.snackBar.dismiss();
      });
  }

  private showSnackBarMessage(message: string, snackBarDuration: number): void {
    this.snackBar.open(message, '',
      {duration: snackBarDuration, panelClass: 'default-snack-bar-message'})
  }

}
