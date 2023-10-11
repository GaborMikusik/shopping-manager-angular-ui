import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from './service/form-validation.service';
import { AuthService } from './service/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthApiService } from './api/auth-api.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    FormValidationService,
    AuthService,
    AuthApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
