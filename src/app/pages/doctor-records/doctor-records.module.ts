import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorRecordsPageRoutingModule } from './doctor-records-routing.module';

import { DoctorRecordsPage } from './doctor-records.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorRecordsPageRoutingModule
  ],
  declarations: [DoctorRecordsPage]
})
export class DoctorRecordsPageModule {}
