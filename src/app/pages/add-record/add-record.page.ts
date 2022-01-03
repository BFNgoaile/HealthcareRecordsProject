/* eslint-disable max-len */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss'],
})
export class AddRecordPage implements OnInit {
  @Input() uid: string;
  @Input() patientName: string;
  addPatientRecordForm: FormGroup;
  doctorUid;
  doctorName;
  base64Image = '';

  // eslint-disable-next-line max-len
  constructor(private modalController: ModalController, private fb: FormBuilder, private api: ApiService, private toastController: ToastController, private camera: Camera) {
    console.log(this.uid);
  }

  ngOnInit() {
    console.log(this.uid);
    console.log(this.patientName);
    this.loadUserProfile();
    this.initializeAddPatientRecordForm();
  }

  initializeAddPatientRecordForm() {
    this.addPatientRecordForm = this.fb.group({
      comments: ['', Validators.required]
    });
  }

  async takePicture() {
    console.log('Active');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log(err);
    });

  };

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

  async addPatientRecord() {
    this.base64Image = '';
    try {
      const response = await this.api.addPatientRecord(this.uid, this.addPatientRecordForm.value.comments, this.base64Image, new Date(), this.doctorUid, this.doctorName, this.patientName);
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
