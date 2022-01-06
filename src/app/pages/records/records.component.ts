import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SingleRecordComponent } from '../single-record/single-record.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {
  @Input() uid: string;
  @Input() patientName: string;
  records = [];
  user;


  constructor(private api: ApiService, private modalController: ModalController, private router: Router) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.api.getUserProfile()
    .subscribe(user => {
      console.log(user);
      this.api.getPatientRecords(this.uid).subscribe(records => {
        console.log(records);
        this.records = records;
      });
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

  navigateBack() {
    this.modalController.dismiss();
  }

}
