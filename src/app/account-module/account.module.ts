import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from './form-error/form-error.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from '../service/form-validation.service';
import { AlertService } from '../error-alert/alert.service';
import { AlertComponent } from '../error-alert/alert/alert.component';

@NgModule({
  declarations: [
    SignUpComponent,
    FormErrorComponent,
    SignInComponent,
    AlertComponent
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
