/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AddAppointmentPage } from '../../add-appointment/add-appointment.page';
import { AddRecordPage } from '../../add-record/add-record.page';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
  patient;
  patientForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder, private toastController: ToastController, private modalController: ModalController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initializeRegistrationForm();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const uid = paramMap.get('uid');
      this.loadUserpatient(uid);
    });
  }

  initializeRegistrationForm() {
    this.patientForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121233262-stock-illustration-male-default-placeholder-avatar-patient.jpg', Validators.required],
      accountType: ['', Validators.required],
      uniqueNumber: ['', Validators.required]
    });
  }

  loadUserpatient(uid) {
    this.patient = this.api.getPatientProfile(uid)
    .subscribe(user => {
      this.patient = user;
      this.patientForm.patchValue({
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        accountType: user.accountType,
        uniqueNumber: user.uniqueNumber
      });
      console.log(this.patient);
    });
  }

  async updateProfile() {
    const result = await this.api.updateUserProfile(this.patient.uid, {fullName: this.patientForm.value.fullName});
    this.presentToastWithOptions('Updated Successfully!');
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      color: 'dark',
      duration: 2000
    });
    toast.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddAppointmentPage,
      cssClass: 'my-custom-class',
      componentProps: {
        uid: this.patient.uid,
        patientName: this.patient.fullName
      }
    });
    return await modal.present();
  }

  async presentAddRecordModal() {
    const modal = await this.modalController.create({
      component: AddRecordPage,
      cssClass: 'my-custom-class',
      componentProps: {
        uid: this.patient.uid,
        patientName: this.patient.fullName
      }
    });
    return await modal.present();
  }

}
