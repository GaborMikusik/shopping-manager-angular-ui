import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidationService } from '../../service/form-validation.service';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { SignInRequest } from 'src/app/api/model/sign-in-request';
import { SignInResponse } from 'src/app/api/model/sign-in-response';
import { ValidationMessages } from '../validation-messages';
import { AppRoutes } from '../app-routes';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  usernameErrorMessage = ValidationMessages.usernameRequired;
  emailErrorMessage = ValidationMessages.emailInvalid;
  passwordErrorMessage = ValidationMessages.passwordRequired;

  signinFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private authApiService: AuthApiService,
    private router: Router
  ) {
    this.signinFormGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.formValidationService.setSignInFormGroup(this.signinFormGroup)
  }

  isFormInvalid(): boolean {
    return this.formValidationService.isFormInvalid();
  }

  onSubmit() {
    const usernameOrEmail = this.username === '' ? this.email : this.username;
    const request: SignInRequest = {
      usernameOrEmail: usernameOrEmail,
      password: this.password
    }
    this.authApiService.signIn(request).subscribe({
      next: this.handleSignInSuccess.bind(this),
      error: this.handleSignInError.bind(this),
      complete: this.handleSignInComplete.bind(this),
    })
  }

  onSignUp() {
    this.router.navigate([AppRoutes.signUp]);
  }

  private handleSignInSuccess(response: SignInResponse) {
    const user = {
      username: this.username,
      email: this.email,
      token: response.tokenType + ' ' + response.accessToken
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate([AppRoutes.management]);
  }

  private handleSignInError(error: any) {
    console.error(error);
  }

  private handleSignInComplete() {
    console.log('Request completed');
  }
}
