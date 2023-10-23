import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignInRequest } from 'src/app/api/model/sign-in-request';
import { FormValidationService } from 'src/app/service/form-validation.service';

@Component({
  selector: 'app-sign-in-view',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  @Input() usernameErrorMessage: string = "";
  @Input() emailErrorMessage: string = "";
  @Input() passwordErrorMessage: string = "";
  @Output() signIn = new EventEmitter<SignInRequest>();
  @Output() signUp = new EventEmitter<void>();

  username: string = '';
  email: string = '';
  password: string = '';

  signinFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private formValidationService: FormValidationService,) {
    this.signinFormGroup = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.formValidationService.setSignInFormGroup(this.signinFormGroup)
  }

  isFormInvalid(): boolean {
    return this.formValidationService.isFormInvalid();
  }

  onSubmit() {
    const usernameOrEmail = this.username === '' ? this.email : this.username;
    const request: SignInRequest = {
      usernameOrEmail,
      password: this.password,
    };
    this.signIn.emit(request);
  }

  onSignUp() {
    this.signUp.emit();
  }
}