import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsPage } from '../appointments/appointments.page';
import { PatientRecordsPage } from '../patient-records/patient-records.page';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: '/appointments',
    component: AppointmentsPage
  },
  {
    path: '/records',
    component: PatientRecordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
