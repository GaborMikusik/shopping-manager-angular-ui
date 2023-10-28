import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpRequest } from 'src/app/api/model/sign-up-request';
import { SignUpResponse } from 'src/app/api/model/sign-up-response';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private baseUrl = 'http://localhost:8081/shopping-manager-spring-service';

  constructor(private http: HttpClient) { }

  signUp(request: SignUpRequest): Observable<SignUpResponse> {
    const url = `${this.baseUrl}/signup`;
    return this.http.post<SignUpResponse>(url, request);
  }
}
