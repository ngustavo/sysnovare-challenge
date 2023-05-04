import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AccountComponent } from "./components/account/account.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "account", component: AccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
