import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ImageProcessingService {

  imageProcessingSubj = new BehaviorSubject(false);

  startImageProcessing(): void {
    this.imageProcessingSubj.next(true);
  }

  endImageProcessing(): void {
    this.imageProcessingSubj.next(false);
  }

}
