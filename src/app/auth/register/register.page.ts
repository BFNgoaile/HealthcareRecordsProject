/* eslint-disable max-len */
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registrationForm: FormGroup;
  loading;

  constructor(private api: ApiService, private zone: NgZone, private router: Router, private toastController: ToastController, private loadingCtrl: LoadingController, private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeRegistrationForm();
    console.log(this.registrationForm.value);
  }

  initializeRegistrationForm() {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: ['https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121233262-stock-illustration-male-default-placeholder-avatar-profile.jpg', Validators.required],
      accountType: ['', Validators.required],
      uniqueNumber: ['', Validators.required]
    });
  }



  async registerUser() {
    console.log(this.registrationForm.value);
    await this.showLoading();
    this.api.createUser(this.registrationForm.value.email, this.registrationForm.value.password, this.registrationForm.value.fullName, this.registrationForm.value.avatar, this.registrationForm.value.accountType, this.registrationForm.value.uniqueNumber)
    .then(res => {
      console.log(res);
      this.zone.run(() => {
        this.loading.dismiss();
        this.router.navigateByUrl('/');
      });
    }).catch(err => {
      console.log(err);
      this.loading.dismiss();
      this.presentToastWithOptions(err.message);
    });
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

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Creating Account...'
    });

    this.loading.present();
  }

}
