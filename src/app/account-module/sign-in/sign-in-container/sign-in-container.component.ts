import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/error-alert/alert.service';
import { AppRoutes } from '../../app-routes';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { SignInRequest } from 'src/app/api/model/sign-in-request';
import { SignInResponse } from 'src/app/api/model/sign-in-response';
import { ErrorDetails } from 'src/app/error-alert/model/error-details';
import { ValidationMessages } from '../../validation-messages';

@Component({
  selector: 'app-sign-in-container',
  templateUrl: './sign-in-container.component.html',
})
export class SignInContainerComponent {
  usernameErrorMessage = ValidationMessages.usernameRequired;
  emailErrorMessage = ValidationMessages.emailInvalid;
  passwordErrorMessage = ValidationMessages.passwordRequired;

  constructor(
    private authApiService: AuthApiService,
    private alertService: AlertService,
    private router: Router) { }

  handleSignInSuccess(username: string, email: string, token: string) {
    const user = { username, email, token };
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate([AppRoutes.management]);
  }

  handleSignInError(error: ErrorDetails) {
    this.alertService.error(error);
  }

  onSubmit(signInData: SignInRequest) {
    this.authApiService.signIn(signInData).subscribe({
      next: (response: SignInResponse) => {
        this.handleSignInSuccess(signInData.usernameOrEmail, signInData.usernameOrEmail, response.tokenType + ' ' + response.accessToken);
      },
      error: (error: any) => {
        this.handleSignInError(new ErrorDetails(error.error.message, error.error.status, error.error.errors));
      },
    });
  }

  onSignUp() {
    this.router.navigate([AppRoutes.signUp]);
  }
}