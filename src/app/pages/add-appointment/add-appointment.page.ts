/* eslint-disable max-len */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.page.html',
  styleUrls: ['./add-appointment.page.scss'],
})
export class AddAppointmentPage implements OnInit {
  @Input() uid: string;
  @Input() patientName: string;
  addApointmentForm: FormGroup;
  doctorUid;
  doctorName;

  constructor(private modalController: ModalController, private fb: FormBuilder, private api: ApiService, private toastController: ToastController) {
    console.log(this.uid);
    console.log(this.patientName);
  }

  ngOnInit() {
    this.loadUserProfile();
    this.initializeAddApointmentForm();
    console.log(this.uid);
    console.log(this.patientName);
  }

  initializeAddApointmentForm() {
    this.addApointmentForm = this.fb.group({
      description: ['', Validators.required],
      appointmentDate: ['', Validators.required]
    });
  }

  loadUserProfile() {
    this.api.getUserProfile()
    .subscribe(user => {
      console.log(user);
      this.doctorUid = user.uid;
      this.doctorName = user.fullName;
    });
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async addAppointmnet() {
    try {
      const response = await this.api.addAppointment(this.uid, this.addApointmentForm.value.description, this.addApointmentForm.value.appointmentDate, this.doctorUid, this.doctorName, this.patientName);
      console.log(response);
      this.presentToastWithOptions('Appointment added successfully');
      this.closeModal();
    } catch(err) {
      console.log(err);
    }
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      color: 'dark',
      duration: 5000
    });
    toast.present();
  }

}
