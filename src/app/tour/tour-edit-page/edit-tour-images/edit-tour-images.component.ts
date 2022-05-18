import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ImageView} from "../../../_models/image-view.model";
import {ImageModel} from "../../../_models/image.model";
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import {ImageCropAndCompressService} from "../../../_services/image-crop-and-compress.service";
import {ImageProcessingService} from "../../../_services/image-processing.service";
import {ImageService} from "../../../_services/image.service";

@Component({
  selector: 'app-edit-tour-images',
  templateUrl: './edit-tour-images.component.html',
  styleUrls: ['./edit-tour-images.component.scss']
})
export class EditTourImagesComponent implements OnInit {

  @Input() parentForm: FormGroup;

  selectedImages: ImageView[] = [];
  files: File[] = new Array<File>();
  processedFilesToDisplay = [];
  imagesToRemove: ImageModel[] = [];
  isImageInProcessing = false;

  ration = 3 / 2;

  constructor(private imageCropAndCompressService: ImageCropAndCompressService,
              private imageProcessingService: ImageProcessingService) {
  }

  ngOnInit(): void {
    const images = this.parentForm.get('images');
    if (images && images.value && images.value.length > 0) {
      this.selectedImages = images.value.map(image => {
        return new ImageView(image, ImageService.getImageLink(image))
      });
    }
  }

  onFileChange(droppedFile: NgxFileDropEntry[]): void {
    const fileEntry = droppedFile[0].fileEntry as FileSystemFileEntry;
    fileEntry.file((fileEvent: File) => this.processFile(fileEvent));
  }

  private processFile(file: File): void {
    if (this.validateImageFile(file)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.startImageProcessing();
      reader.onload = uploadedFile => this.processLoadedFile(file, uploadedFile);
    }
  }

  private processLoadedFile(file: File, uploadedFile: ProgressEvent<FileReader>): void {
    const image = new Image();
    image.src = uploadedFile.target.result.toString();
    this.processedFilesToDisplay.push(uploadedFile.target.result.toString());
    image.onload =
      () => this.resizeAndEmitPhoto(file, ImageCropAndCompressService.crop(image, this.ration, file.type));
  }

  private resizeAndEmitPhoto(file, readerResult: ArrayBuffer): void {
    this.imageCropAndCompressService.resizeImg(file, readerResult)
      .finally(() => this.finishImageProcessing())
      .then(async result =>
        this.addImageToForm(await this.imageCropAndCompressService.createFileFromBase64(result, file)));
  }

  private addImageToForm(fileImage: File): void {
    this.files.push(fileImage);
    this.parentForm.patchValue({
      files: this.files
    });
    this.parentForm.markAsDirty();
  }

  private validateImageFile(file: File): boolean {
    if ((file.type === 'image/jpeg') || (file.type === 'image/png')) {
      return true;
    }
    // TODO
    console.log('Цей формат не підтримується!');
    // this.snackBarMessageService.showMessage('Цей формат не підтримується!');
    return false;
  }

  removeUploadedFile(url: ArrayBuffer): void {
    const removeIndex = this.processedFilesToDisplay.findIndex(item => item === url);
    this.processedFilesToDisplay.splice(removeIndex, 1);
    this.files.splice(removeIndex, 1);
    this.parentForm.patchValue({
      files: this.files
    });
    this.parentForm.markAsDirty();
  }

  removeImage(image: ImageView): void {
    this.imagesToRemove.push(image.image);
    const removeIndex = this.selectedImages.findIndex(item => item === image);
    if (removeIndex !== -1) {
      this.selectedImages.splice(removeIndex, 1);
    }
    this.parentForm.patchValue({
      imagesToRemove: this.imagesToRemove
    });
    this.parentForm.markAsDirty();
  }

  private startImageProcessing(): void {
    this.isImageInProcessing = true;
    this.imageProcessingService.startImageProcessing();
  }

  private finishImageProcessing(): void {
    this.isImageInProcessing = false;
    this.imageProcessingService.endImageProcessing();
  }

}
