import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRecordPageRoutingModule } from './add-record-routing.module';

import { AddRecordPage } from './add-record.page';
import { Camera } from '@ionic-native/camera/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddRecordPageRoutingModule
  ],
  declarations: [AddRecordPage],
  providers: [
    Camera
  ]
})
export class AddRecordPageModule {}
