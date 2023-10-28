import { Component } from '@angular/core';
import { ValidationMessages } from '../../../validation-messages';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/error-alert/alert.service';
import { ErrorDetails } from 'src/app/error-alert/model/error-details';
import { AppRoutes } from '../../../app-routes';
import { SignUpRequest } from 'src/app/api/model/sign-up-request';
import { SignUpService } from '../../data-access/sign-up.service';

@Component({
  selector: 'app-sign-up-container',
  templateUrl: './sign-up-container.component.html',
})
export class SignUpContainerComponent {
  nameErrorMessage = ValidationMessages.nameRequired
  usernameErrorMessage = ValidationMessages.usernameRequired
  emailErrorMessage = ValidationMessages.emailInvalid
  passwordErrorMessage = ValidationMessages.passwordRequired

  constructor(
    private signUpService: SignUpService,
    private alertService: AlertService,
    private router: Router) { }

  private handleSignUpSuccess() {
    this.router.navigate([AppRoutes.signIn]);
  }

  private handleSignUpError(error: any) {
    this.alertService.error(new ErrorDetails(error.error.message, error.error.status, error.error.errors))
  }

  private handleSignUpComplete() {
    console.log('Request completed');
  }

  onSubmit(signUpRequest: SignUpRequest) {
    this.signUpService.signUp(signUpRequest).subscribe({
      next: this.handleSignUpSuccess.bind(this),
      error: this.handleSignUpError.bind(this),
      complete: this.handleSignUpComplete.bind(this),
    });
  }

  onCancel() {
    this.router.navigate([AppRoutes.signIn]);
  }
}
