import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-decision-dialog',
  templateUrl: './decision-dialog.component.html',
  styleUrls: ['./decision-dialog.component.scss']
})
export class DecisionDialogComponent implements OnInit {

  showConfirmation = false;
  confirmationWord = '';
  enteredWord = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    if (this.data) {
      this.showConfirmation = this.data.showConfirmation;
      this.confirmationWord = this.data.confirmationWord;
    }
  }

}
