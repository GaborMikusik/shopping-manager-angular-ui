import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormErrorComponent } from '../form-error/form-error.component';
import { Router } from '@angular/router';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [SignUpComponent, FormErrorComponent],
      providers: [{ provide: Router, useValue: routerSpy },]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable signup button when form is valid', () => {
    const signupbutton = fixture.debugElement.query(By.css('[id="signup"]')).nativeElement;
    expect(signupbutton.disabled).toBeTruthy();

    component.signupFormGroup.controls['name'].setValue('testname');
    component.signupFormGroup.controls['username'].setValue('testuser');
    component.signupFormGroup.controls['email'].setValue('test@example.com');
    component.signupFormGroup.controls['password'].setValue('testpassword');
    component.signupFormGroup.controls['confirmPassword'].setValue('testpassword');

    fixture.detectChanges();

    expect(signupbutton.disabled).toBeFalsy();
  })

  it('should display error messages for invalid forms', () => {
    const signupbutton = fixture.debugElement.query(By.css('[id="signup"]')).nativeElement;

    const nameError = fixture.nativeElement.querySelector('[id="name-error"]');
    const usernameError = fixture.nativeElement.querySelector('[id="username-error"]');
    const emailError = fixture.nativeElement.querySelector('[id="email-error"]');
    const passwordError = fixture.nativeElement.querySelector('[id="password-error"]');
    const confimpasswordError = fixture.nativeElement.querySelector('[id="confirmpassword-error"]');

    expect(nameError.textContent).toMatch('')
    expect(usernameError.textContent).toMatch('')
    expect(emailError.textContent).toMatch('')
    expect(passwordError.textContent).toMatch('')
    expect(confimpasswordError.textContent).toMatch('')

    component.signupFormGroup.controls['name'].setValue('');
    component.signupFormGroup.controls['username'].setValue('');
    component.signupFormGroup.controls['email'].setValue('');
    component.signupFormGroup.controls['password'].setValue('');
    component.signupFormGroup.controls['confirmPassword'].setValue('');

    component.signupFormGroup.controls['name'].markAsTouched();
    component.signupFormGroup.controls['username'].markAsTouched();
    component.signupFormGroup.controls['email'].markAsTouched();
    component.signupFormGroup.controls['password'].markAsTouched();
    component.signupFormGroup.controls['confirmPassword'].markAsTouched();
    fixture.detectChanges();

    expect(signupbutton.disabled).toBeTruthy();

    expect(nameError.textContent).toMatch(component.nameErrorMessage)
    expect(usernameError.textContent).toMatch(component.usernameErrorMessage)
    expect(emailError.textContent).toMatch(component.emailErrorMessage)
    expect(passwordError.textContent).toMatch(component.passwordErrorMessage)
    expect(confimpasswordError.textContent).toMatch(component.passwordErrorMessage)
  })

  it('should navigate to signin page on cancel', () => {
    const signUpButton = fixture.debugElement.query(By.css('#cancel'));
    expect(signUpButton).toBeTruthy();

    signUpButton.triggerEventHandler('click');

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/signin'])
  })

  it('should navigate to signin page on signup', () => {
    component.signupFormGroup.controls['name'].setValue('testname');
    component.signupFormGroup.controls['username'].setValue('testuser');
    component.signupFormGroup.controls['email'].setValue('test@example.com');
    component.signupFormGroup.controls['password'].setValue('testpassword');
    component.signupFormGroup.controls['confirmPassword'].setValue('testpassword');

    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();

    form.triggerEventHandler('submit');

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/signin']);
  })
});
