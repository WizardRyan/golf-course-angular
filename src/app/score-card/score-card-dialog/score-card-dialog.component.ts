import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-score-card-dialog',
  templateUrl: 'score-card-dialog.component.html',
})
export class ScoreCardDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ScoreCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
