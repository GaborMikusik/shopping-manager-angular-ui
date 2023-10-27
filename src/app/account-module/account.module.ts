import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './form-error/form-error.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from '../service/form-validation.service';
import { AlertService } from '../error-alert/alert.service';
import { AlertComponent } from '../error-alert/alert/alert.component';
import { SignInContainerComponent } from './sign-in/sign-in-container/sign-in-container.component';
import { SignInViewComponent } from './sign-in/sign-in-view/sign-in-view.component';
import { SignUpContainerComponent } from './sign-up/sign-up-container/sign-up-container.component';
import { SignUpViewComponent } from './sign-up/sign-up-view/sign-up-view.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    FormErrorComponent,
    AlertComponent,
    SignInContainerComponent,
    SignInViewComponent,
    SignUpContainerComponent,
    SignUpViewComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FormValidationService, AlertService],
})
export class AccountModule { }
