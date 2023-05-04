import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { FundsDialogComponent } from "../funds-dialog/funds-dialog.component";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.sass"],
})
export class AccountComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(isAdd: boolean) {
    this.dialog.open(FundsDialogComponent, {
      data: {
        isAdd,
        email: "email@example.com",
      },
    });
  }
}
