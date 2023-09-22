import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidationService } from '../service/form-validation.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  username: string = 'Username...';
  email: string = 'email@email.com';
  password: string = 'Password...';

  usernameErrorMessage = 'Username is required.';
  emailErrorMessage = 'Invalid email format.';
  passwordErrorMessage = 'Password is required.';

  signinFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private formValidationService: FormValidationService) {
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
    console.log(this.signinFormGroup.controls);
  }
}
