import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { SharedModule } from '@shared/shared.module';

import { LoginComponent } from './pages/login/login.component';
import { AuthorizationComponent } from './authorization.component';
import { RegistrationComponent } from './pages/registration/registration.component';

@NgModule({
  declarations: [LoginComponent, AuthorizationComponent, RegistrationComponent],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class AuthorizationModule { }
