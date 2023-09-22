import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormErrorComponent } from './form-error.component';

describe('FormErrorComponent', () => {
  let fixture: ComponentFixture<FormErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormErrorComponent],
    });

    const control = new FormControl();
    fixture = TestBed.createComponent(FormErrorComponent);
    fixture.componentInstance.control = control;
    fixture.componentInstance.errorMessage = 'This field is required.';
  });

  it('should not display error message when control is pristine', () => {
    const control = fixture.componentInstance.control;

    let errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(0);

    control.markAsTouched();

    fixture.detectChanges();

    errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(0);
  });

  it('should display error message when control is invalid and touched', () => {
    const control = fixture.componentInstance.control;

    let errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(0);

    control.setErrors({ required: true });
    control.markAsTouched();

    fixture.detectChanges();

    errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(1);
    expect(errorMessages[0].nativeElement.textContent.trim()).toBe('This field is required.');
  });

  it('should not display error message when control is valid', () => {
    const control = fixture.componentInstance.control;

    let errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(0);

    control.setErrors(null);

    fixture.detectChanges();

    errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(0);
  });

  it('should display custom error message', () => {
    const control = fixture.componentInstance.control;

    let errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(0);

    control.setErrors({ required: true });
    control.markAsTouched();

    fixture.detectChanges();

    fixture.componentInstance.errorMessage = 'Custom error message';
    fixture.detectChanges();
    errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(1);
    expect(errorMessages[0].nativeElement.textContent.trim()).toBe('Custom error message');
  });
});
