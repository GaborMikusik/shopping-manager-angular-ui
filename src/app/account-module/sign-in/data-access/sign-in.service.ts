import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInRequest } from 'src/app/api/model/sign-in-request';
import { SignInResponse } from 'src/app/api/model/sign-in-response';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private baseUrl = 'http://localhost:8081/shopping-manager-spring-service';

  constructor(private http: HttpClient) { }

  signIn(request: SignInRequest): Observable<SignInResponse> {
    const url = `${this.baseUrl}/signin`;
    return this.http.post<SignInResponse>(url, request);
  }

}
