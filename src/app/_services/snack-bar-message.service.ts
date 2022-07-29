import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarMessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  showMessage(finalMessage: string, additionalMessage: string = ''): void {
    this.snackBar.open(additionalMessage + ' ' + finalMessage, '',
      {duration: 2000, panelClass: 'default-snack-bar-message'});
  }

}
