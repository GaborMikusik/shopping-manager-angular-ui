import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  isUsernameValid = 'INVALID'
  isEmailValid = 'INVALID'
  isPasswordValid = 'INVALID'

  constructor() { }

  setSignInFormGroup(signinFormGroup: FormGroup) {
    signinFormGroup.statusChanges.subscribe(() => {
      this.isFormValid()
    });

    signinFormGroup.get('username')!.statusChanges.subscribe((status: string) => {
      this.isUsernameValid = status
    })

    signinFormGroup.get('email')!.statusChanges.subscribe((status: string) => {
      this.isEmailValid = status
    })

    signinFormGroup.get('password')!.statusChanges.subscribe((status: string) => {
      this.isPasswordValid = status
    })
  }

  isFormValid(): boolean {
    return (this.isPasswordValid === 'VALID' && (this.isEmailValid === 'VALID' || this.isUsernameValid === 'VALID'))
  }
}
