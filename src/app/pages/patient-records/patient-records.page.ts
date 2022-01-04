import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SingleRecordComponent } from '../single-record/single-record.component';

@Component({
  selector: 'app-patient-records',
  templateUrl: './patient-records.page.html',
  styleUrls: ['./patient-records.page.scss'],
})
export class PatientRecordsPage implements OnInit {
  records = [];
  user;

  constructor(private api: ApiService, private modalController: ModalController) { }

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

  async openRecord(data) {
    const modal = await this.modalController.create({
      component: SingleRecordComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        data
      }
    });
    return await modal.present();
  }

}
