import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { commonEnum, modalData } from 'src/app/core/enums/common.enum';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.sass']
})
export class CommonDialogComponent {
  @ViewChild('review') review: any;
  isConfirmDisabled: boolean = false; 
  cancelBtn = {
    class: 'button',  
    name: 'Cancel'
  }
  saveBtn = {
    class: 'button',
    name: 'Save',
  }
  closeBtn = {
    name: "close",
    class: 'icon delete',
    type : "icon"
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CommonDialogComponent>
  ){}

  ngAfterViewInit() {
    if(this.data.declinedReason) {
      this.review.form.patchValue({
        [this.data.config[0].name] : this.data.declinedReason.declinedReason
      })
    }
    if(this.data.heading == modalData.deleteUser || this.data.heading == modalData.deleteCodereview) {
      this.saveBtn.name = 'Delete'
      this.saveBtn.class = 'button danger'
    }
  }

  onConfirmClick(): void {
    if(this.data.config) {
      if(this.review.form.valid) {
        this.dialogRef.close(this.review.form.value);
      }else {
        this.review.form.markAllAsTouched();
      }
    }else {
      this.dialogRef.close(true);
    }
  }

}