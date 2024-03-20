import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { adminList, declineReason } from 'src/app/core/config/form.constant';
import { commonEnum } from 'src/app/core/enums/common.enum';
import { FieldConfig } from 'src/app/core/models/field-config';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.sass']
})
export class RequestDialogComponent {
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RequestDialogComponent>
  ){}

  ngAfterViewInit() {
    if(this.data.config[0].name == commonEnum.assignTo && this.review) {
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
  }


  onConfirmClick(): void {
    this.dialogRef.close(this.review.form.value);
  }
}