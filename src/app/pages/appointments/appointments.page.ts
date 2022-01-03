import { Component, OnInit } from '@angular/core';
import { app } from 'firebase';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  appointments = [];
  user;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.api.getUserProfile()
    .subscribe(user => {
      console.log(user);
      this.user = user;
      if (user.accountType === 'patient') {
        this.api.getPatientAppointments(user.uid).subscribe(appointments => {
          console.log(appointments);
          this.appointments = appointments;
        });
      } else if(user.accountType === 'doctor') {
        this.api.getDoctorAppointments(user.uid).subscribe(appointments => {
          console.log(appointments);
          this.appointments = appointments;
        });
      }
    });
  }
}
