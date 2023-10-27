import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpRequest } from 'src/app/api/model/sign-up-request';

@Component({
  selector: 'app-sign-up-view',
  templateUrl: './sign-up-view.component.html',
})
export class SignUpViewComponent {
  @Input() nameErrorMessage: string = '';
  @Input() usernameErrorMessage: string = '';
  @Input() emailErrorMessage: string = '';
  @Input() passwordErrorMessage: string = '';
  @Output() signUp = new EventEmitter<SignUpRequest>();
  @Output() cancel = new EventEmitter<void>();

  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  signupFormGroup: FormGroup;

  constructor(private fb: FormBuilder,) {
    this.signupFormGroup = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }

  onSubmit() {
    const request: SignUpRequest = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      roles: [{ name: 'ROLE_USER' }]
    };
    console.log('SIGN UP VIEW: ', request)
    this.signUp.emit(request);
  }

  onCancel() {
    this.cancel.emit();
  }
}
