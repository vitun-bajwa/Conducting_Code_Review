import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.sass']
})
export class ConfirmDialogComponent {
  
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>){

  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
