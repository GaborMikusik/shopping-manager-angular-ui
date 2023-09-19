import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  nameErrorMessage = 'Name is required.'
  usernameErrorMessage = 'Username is required.'
  emailErrorMessage = 'Invalid email format.'
  passwordErrorMessage = 'Password is required.'

  signupFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }
}
