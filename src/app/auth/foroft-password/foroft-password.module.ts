import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForoftPasswordPageRoutingModule } from './foroft-password-routing.module';

import { ForoftPasswordPage } from './foroft-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForoftPasswordPageRoutingModule
  ],
  declarations: [ForoftPasswordPage]
})
export class ForoftPasswordPageModule {}
