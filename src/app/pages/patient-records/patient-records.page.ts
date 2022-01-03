import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-patient-records',
  templateUrl: './patient-records.page.html',
  styleUrls: ['./patient-records.page.scss'],
})
export class PatientRecordsPage implements OnInit {
  records = [];
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
      this.api.getPatientRecords(user.uid).subscribe(records => {
        console.log(records);
        this.records = records;
      });
    } else if(user.accountType === 'doctor') {
      this.api.getDoctorRecords(user.uid).subscribe(records => {
        console.log(records);
        this.records = records;
      });
    }
    });
  }

}
