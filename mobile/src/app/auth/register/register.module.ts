import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { TermsAndConditionsPageModule } from 'src/app/pages/terms-and-conditions/terms-and-conditions.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    TermsAndConditionsPageModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule { }
