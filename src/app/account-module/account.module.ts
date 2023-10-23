import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './form-error/form-error.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from '../service/form-validation.service';
import { AlertService } from '../error-alert/alert.service';
import { AlertComponent } from '../error-alert/alert/alert.component';
import { SignInContainerComponent } from './sign-in/sign-in-container/sign-in-container.component';
import { SignInComponent } from './sign-in/sign-in-view/sign-in.component';

@NgModule({
  declarations: [
    SignUpComponent,
    FormErrorComponent,
    AlertComponent,
    SignInContainerComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormValidationService, AlertService],
})
export class AccountModule { }
