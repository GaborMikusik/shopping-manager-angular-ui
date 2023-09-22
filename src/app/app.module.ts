import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormValidationService } from './service/form-validation.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    FormErrorComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
