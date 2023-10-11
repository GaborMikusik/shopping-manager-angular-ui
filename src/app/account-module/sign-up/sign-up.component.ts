import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { SignUpRequest } from 'src/app/api/model/sign-up-request';
import { ValidationMessages } from '../validation-messages';
import { SignUpResponse } from 'src/app/api/model/sign-up-response';
import { AppRoutes } from '../app-routes';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  name: string = 'Name...'
  username: string = 'Username...'
  email: string = 'email@email.com'
  password: string = 'Password...'

  nameErrorMessage = ValidationMessages.nameRequired
  usernameErrorMessage = ValidationMessages.usernameRequired
  emailErrorMessage = ValidationMessages.emailInvalid
  passwordErrorMessage = ValidationMessages.passwordRequired

  signupFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authApiService: AuthApiService) {
    this.signupFormGroup = this.fb.group({
      name: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    })
  }

  onSubmit() {
    console.log(this.signupFormGroup.value)
    const request: SignUpRequest = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      roles: [{ name: 'ROLE_USER' }],
    };
    this.authApiService.signUp(request).subscribe({
      next: this.handleSignUpSuccess.bind(this),
      error: this.handleSignUpError.bind(this),
      complete: this.handleSignUpComplete.bind(this),
    });
  }

  onCancel() {
    this.router.navigate([AppRoutes.signIn]);
  }

  private handleSignUpSuccess(response: SignUpResponse) {
    this.router.navigate([AppRoutes.signIn]);
  }

  private handleSignUpError(error: any) {
    console.error(error);
  }

  private handleSignUpComplete() {
    console.log('Request completed');
  }
}
