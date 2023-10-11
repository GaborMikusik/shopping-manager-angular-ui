import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SignInRequest } from "./model/sign-in-request";
import { SignInResponse } from "./model/sign-in-response";
import { SignUpRequest } from "./model/sign-up-request";
import { SignUpResponse } from "./model/sign-up-response";

@Injectable({
    providedIn: 'root',
})
export class AuthApiService {
    private baseUrl = 'http://localhost:8081/shopping-manager-spring-service';

    constructor(private http: HttpClient) { }

    signIn(request: SignInRequest): Observable<SignInResponse> {
        const url = `${this.baseUrl}/signin`;
        return this.http.post<SignInResponse>(url, request);
    }

    signUp(request: SignUpRequest): Observable<SignUpResponse> {
        const url = `${this.baseUrl}/signup`;
        return this.http.post<SignUpResponse>(url, request);
    }
}