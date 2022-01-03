import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'foroft-password',
    loadChildren: () => import('./auth/foroft-password/foroft-password.module').then( m => m.ForoftPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'search-patient',
    loadChildren: () => import('./pages/search-patient/search-patient.module').then( m => m.SearchPatientPageModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./pages/appointments/appointments.module').then( m => m.AppointmentsPageModule)
  },
  {
    path: 'add-appointment',
    loadChildren: () => import('./pages/add-appointment/add-appointment.module').then( m => m.AddAppointmentPageModule)
  },
  {
    path: 'add-record',
    loadChildren: () => import('./pages/add-record/add-record.module').then( m => m.AddRecordPageModule)
  },
  {
    path: 'patient-records',
    loadChildren: () => import('./pages/patient-records/patient-records.module').then( m => m.PatientRecordsPageModule)
  },
  {
    path: 'doctor-records',
    loadChildren: () => import('./pages/doctor-records/doctor-records.module').then( m => m.DoctorRecordsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
