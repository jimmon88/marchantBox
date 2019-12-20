import { Component, OnInit, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-alert-confirm-modal",
  templateUrl: "./alert-confirm-modal.component.html",
  styleUrls: ["./alert-confirm-modal.component.scss"]
})
export class AlertConfirmModalComponent implements OnInit {
  @Input() msg = "Are you sure want to delete";
  constructor(
    public dialogRef: MatDialogRef<AlertConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  confirm() {}

  closeDialog(data) {
    this.dialogRef.close(data);
  }
}
