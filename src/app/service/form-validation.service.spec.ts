import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from './form-validation.service';

describe('FormValidationService', () => {
  let service: FormValidationService;
  let signinFormGroup: FormGroup;

  beforeEach((() => {
    TestBed.configureTestingModule({
      providers: [FormValidationService],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(FormValidationService);

    signinFormGroup = new FormBuilder().group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    service.setSignInFormGroup(signinFormGroup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if username is valid, email is invalid, and password is invalid', () => {
    setFormGroupValues(signinFormGroup, 'username', 'email', '');
    const isFormInvalid = service.isFormInvalid();
    expect(isFormInvalid).toBeTrue();
  });

  it('should return true if username is invalid, email is valid, and password is invalid', () => {
    setFormGroupValues(signinFormGroup, '', 'email@email', '');
    const isFormInvalid = service.isFormInvalid();
    expect(isFormInvalid).toBeTrue();
  });

  it('should return true if username is invalid, email is invalid, and password is valid', () => {
    setFormGroupValues(signinFormGroup, '', 'email@', 'password');
    const isFormInvalid = service.isFormInvalid();
    expect(isFormInvalid).toBeTrue();
  });

  it('should return false if username is valid, email is valid, and password is valid', () => {
    setFormGroupValues(signinFormGroup, 'username', 'email@email', 'password');
    const isFormInvalid = service.isFormInvalid();
    expect(isFormInvalid).toBeFalse();
  });

  it('should return true if username is valid, email is invalid, and password is valid', () => {
    setFormGroupValues(signinFormGroup, 'username', 'email@', 'password');
    const isFormInvalid = service.isFormInvalid();
    expect(isFormInvalid).toBeFalse();
  });

  it('should return true if username is invalid, email is valid, and password is valid', () => {
    setFormGroupValues(signinFormGroup, '', 'email@email', 'password');
    const isFormInvalid = service.isFormInvalid();
    expect(isFormInvalid).toBeTrue();
  });

  it('should return true if username is invalid, email is invalid, and password is invalid', () => {
    setFormGroupValues(signinFormGroup, '', 'email@', '');
    const isFormInvalid = service.isFormInvalid();
    expect(isFormInvalid).toBeTrue();
  });

  it('should return false if username is valid, email is valid, and password is invalid', () => {
    setFormGroupValues(signinFormGroup, 'username', 'email@email', '');
    const isFormInvalid = service.isFormInvalid();
    expect(isFormInvalid).toBeFalse();
  });

  it('should return false if username is valid, email is invalid, and password is valid', () => {
    setFormGroupValues(signinFormGroup, 'username', 'email@', 'password');
    const isFormInvalid = service.isFormInvalid();
    expect(isFormInvalid).toBeFalse();
  });

  function setFormGroupValues(signinFormGroup: FormGroup, username: string, email: string, password: string) {
    signinFormGroup.get('username')!.setValue(username);
    signinFormGroup.get('email')!.setValue(email);
    signinFormGroup.get('password')!.setValue(password);
  }
});
