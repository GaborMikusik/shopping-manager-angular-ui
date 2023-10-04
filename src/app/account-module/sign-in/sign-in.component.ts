import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidationService } from '../../service/form-validation.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  usernameErrorMessage = 'Username is required.';
  emailErrorMessage = 'Invalid email format.';
  passwordErrorMessage = 'Password is required.';

  signinFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private authService: AuthService,
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
    this.authService.authenticateUser(this.username, this.password).subscribe((result: boolean) => {
      localStorage.setItem('isAuthenticated', result.toString());
      if (result)
        this.router.navigate(['/management']);
    });
  }

  onSignUp() {
    this.router.navigate(['/account/signup']);
  }
}
