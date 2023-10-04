import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authenticateUser(usernameOrEmail: string, password: string): Observable<boolean> {
    if (usernameOrEmail === "username" && password === "password")
      return of(true);

    return of(false);
  }
}
