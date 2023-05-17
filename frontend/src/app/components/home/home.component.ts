import { Component, Output, EventEmitter } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

type LoginResponse = {
  token?: string;
  user?: Object;
  error?: {
    message: string;
  };
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
})
export class HomeComponent {
  @Output() onLogin = new EventEmitter<LoginResponse>();
  isLogin = true;
  isLoading = false;
  error: string | undefined;
  name = "";
  email = "";
  password = "";

  constructor(private userService: UserService, private _router: Router) {}

  subscribe(): void {
    this.isLoading = true;
    this.userService.subscribe(this.name, this.email, this.password).subscribe({
      next: (data: LoginResponse) => {
        this.isLoading = false;
        if (!data.token) {
          this.error = data.error?.message;
          return;
        }
        this.onLogin.emit(data);
        this._router.navigate(["account"], { queryParams: data });
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error.message;
      },
    });
  }

  login(): void {
    this.isLoading = true;
    this.userService.login(this.email, this.password).subscribe({
      next: (data: { token?: string }) => {
        this.isLoading = false;
        if (!data.token) return;
        this.onLogin.emit(data);
        this._router.navigate(["account"], { queryParams: { data } });
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error.message;
      },
    });
  }
}
