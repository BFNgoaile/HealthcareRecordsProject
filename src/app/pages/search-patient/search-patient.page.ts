import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.page.html',
  styleUrls: ['./search-patient.page.scss'],
})
export class SearchPatientPage implements OnInit {
  patients;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.api.getPatients()
    .subscribe(res => {
      this.patients = res;
    });
  }

  getPatientsByNumber(val) {
    this.api.findPatientByNumber(val)
    .subscribe(res => {
      this.patients = res;
    });
  }

  findPatient(e) {
    console.log(e.detail.value);
    if (e.detail.value.length < 1) {
      this.getPatients();
      return;
    };

    this.getPatientsByNumber(+e.detail.value);

  }



}
