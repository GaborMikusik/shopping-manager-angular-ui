import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManagementComponent } from "./management/management.component";
import { AuthGuard } from "./guard/auth-guard";


const routes: Routes = [
    { path: '', component: ManagementComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagementRoutingModule { }