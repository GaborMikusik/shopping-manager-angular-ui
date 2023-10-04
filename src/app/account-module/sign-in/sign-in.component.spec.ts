import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { FormValidationService } from '../../service/form-validation.service';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { of } from 'rxjs';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let mockFormValidationService: jasmine.SpyObj<FormValidationService>
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const formValidationSerivceSpy = jasmine.createSpyObj('FormValidationService', ['isFormInvalid', 'setSignInFormGroup']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['authenticateUser']);

    TestBed.configureTestingModule({
      declarations: [
        SignInComponent,
        FormErrorComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,

      ],
      providers: [
        { provide: FormValidationService, useValue: formValidationSerivceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ]
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    mockFormValidationService = TestBed.inject(FormValidationService) as jasmine.SpyObj<FormValidationService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

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
    mockAuthService.authenticateUser.and.returnValue(of(true));

    form.triggerEventHandler('submit');

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/management']);
  })
});
