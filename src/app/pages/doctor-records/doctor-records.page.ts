import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-doctor-records',
  templateUrl: './doctor-records.page.html',
  styleUrls: ['./doctor-records.page.scss'],
})
export class DoctorRecordsPage implements OnInit {
  records = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.api.getUserProfile()
    .subscribe(user => {
      console.log(user);
      this.api.getPatientRecords(user.uid).subscribe(records => {
        console.log(records);
        this.records = records;
      });
    });
  }

}
