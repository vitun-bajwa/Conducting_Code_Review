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
    disabled: false
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
    if(this.data.config && this.data.config[0].name == commonEnum.assignTo && this.review) {
      this.saveBtn.disabled = true
      this.review.form.controls[this.data.config[0].name].valueChanges.subscribe((res:any) => {
        this.saveBtn.disabled = false;
      })
    }
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
    this.dialogRef.close(this.data.config ? this.review.form.value : true);
  }
}