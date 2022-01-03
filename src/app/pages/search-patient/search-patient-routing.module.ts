import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPatientPage } from './search-patient.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPatientPage
  },
  {
    path: 'patient/:uid',
    loadChildren: () => import('./patient/patient.module').then( m => m.PatientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPatientPageRoutingModule {}
