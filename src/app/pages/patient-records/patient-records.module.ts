import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientRecordsPageRoutingModule } from './patient-records-routing.module';

import { PatientRecordsPage } from './patient-records.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientRecordsPageRoutingModule
  ],
  declarations: [PatientRecordsPage]
})
export class PatientRecordsPageModule {}
