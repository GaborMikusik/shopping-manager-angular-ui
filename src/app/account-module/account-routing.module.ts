import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInContainerComponent } from "./sign-in/feature/sign-in-container/sign-in-container.component";
import { SignUpContainerComponent } from "./sign-up/feature/sign-up-container/sign-up-container.component";

const routes: Routes = [
    { path: 'signin', component: SignInContainerComponent },
    { path: 'signup', component: SignUpContainerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }