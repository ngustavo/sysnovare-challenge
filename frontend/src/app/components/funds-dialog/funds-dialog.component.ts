import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import { MatDialogRef } from "@angular/material/dialog";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Inject } from "@angular/core";

@Component({
  selector: "app-funds-dialog",
  templateUrl: "./funds-dialog.component.html",
  styleUrls: ["./funds-dialog.component.sass"],
})
export class FundsDialogComponent {
  amount = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FundsDialogComponent>,
    private userService: UserService
  ) {}

  addFunds(): void {
    this.userService.addFunds(this.data.email, this.amount).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.log("dialog error", error);
      },
    });
  }

  removeFunds(): void {
    this.userService.removeFunds(this.data.email, this.amount).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        console.log("dialog error");
      },
    });
  }
}
