import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  yesOrNo: boolean;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.yesOrNo = data.yesOrNo ?? true;
  }
}

export interface DialogData {
  icon: string;
  title: string;
  body: string;
  yesOrNo?: boolean;
}