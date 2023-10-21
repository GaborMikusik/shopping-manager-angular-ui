import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { FormValidationService } from '../../service/form-validation.service';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { SignInResponse } from 'src/app/api/model/sign-in-response';
import { AlertService } from 'src/app/error-alert/alert.service';
import { MockAlertComponent } from './mock-alert.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let mockFormValidationService: jasmine.SpyObj<FormValidationService>
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthApiService: jasmine.SpyObj<AuthApiService>;

  beforeEach(() => {
    const formValidationSerivceSpy = jasmine.createSpyObj('FormValidationService', ['isFormInvalid', 'setSignInFormGroup']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authApiServiceSpy = jasmine.createSpyObj('AuthApiService', ['signIn']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['error', 'onAlert']);

    TestBed.configureTestingModule({
      declarations: [
        SignInComponent,
        FormErrorComponent,
        MockAlertComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        { provide: FormValidationService, useValue: formValidationSerivceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthApiService, useValue: authApiServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    mockFormValidationService = TestBed.inject(FormValidationService) as jasmine.SpyObj<FormValidationService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockAuthApiService = TestBed.inject(AuthApiService) as jasmine.SpyObj<AuthApiService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form controls and errors correctly', () => {
    mockFormValidationService.isFormInvalid.and.returnValue(true);

    component.signinFormGroup.controls['username'].markAsTouched();
    component.signinFormGroup.controls['email'].markAsTouched();
    component.signinFormGroup.controls['password'].markAsTouched();

    fixture.detectChanges();

    const usernameInput = fixture.nativeElement.querySelector('input[name="username"]');
    const emailInput = fixture.nativeElement.querySelector('input[name="email"]');
    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
    const usernameError = fixture.nativeElement.querySelector('#username-error');
    const emailError = fixture.nativeElement.querySelector('#email-error');
    const passwordError = fixture.nativeElement.querySelector('#password-error');

    expect(usernameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(usernameError).toBeTruthy();
    expect(emailError).toBeTruthy();
    expect(passwordError).toBeTruthy();

    expect(usernameError.textContent).toContain('Username is required.');
    expect(emailError.textContent).toContain('Invalid email format.');
    expect(passwordError.textContent).toContain('Password is required.');
  });

  it('should disable the submit button when the form is invalid', () => {
    mockFormValidationService.isFormInvalid.and.returnValue(true);

    component.signinFormGroup.controls['username'].setValue('');
    component.signinFormGroup.controls['email'].setValue('');
    component.signinFormGroup.controls['password'].setValue('');

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable the submit button when the form is valid', () => {
    mockFormValidationService.isFormInvalid.and.returnValue(false);

    component.signinFormGroup.controls['username'].setValue('validUsername');
    component.signinFormGroup.controls['email'].setValue('valid@email.com');
    component.signinFormGroup.controls['password'].setValue('validPassword');

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBe(false);
  });

  it('should navigate to signup page on signup', () => {
    const signUpButton = fixture.debugElement.query(By.css('#signup'));
    expect(signUpButton).toBeTruthy();

    signUpButton.triggerEventHandler('click');

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/signup'])
  })

  it('should navigate to management page on signin', () => {
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();

    mockFormValidationService.isFormInvalid.and.returnValue(false);
    const response: SignInResponse = {
      accessToken: 'testAccsessToken',
      tokenType: 'testTokenType'
    }

    mockAuthApiService.signIn.and.returnValue(of(response));

    form.triggerEventHandler('submit');

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/management']);
  })
});
