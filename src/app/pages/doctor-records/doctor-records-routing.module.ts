import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorRecordsPage } from './doctor-records.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorRecordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRecordsPageRoutingModule {}
