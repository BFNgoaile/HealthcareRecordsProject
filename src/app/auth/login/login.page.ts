/* eslint-disable max-len */
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  private loading;

  constructor(private api: ApiService, public toastController: ToastController, private router: Router, private loadingCtrl: LoadingController, private zone: NgZone, private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeLoginForm();
  }


  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async loginUser() {
    await this.showLoading();

    try {
      const result = await this.api.login(this.loginForm.value.email, this.loginForm.value.password);
      console.log(result);
      this.loading.dismiss();
      if (result.error) {
        this.loading.dismiss();
        this.presentToastWithOptions(result.error.error);
      }
      if (result.result) {
        this.loading.dismiss();
        this.zone.run(() => {
          this.router.navigateByUrl('/');
        });

      } else if (result.error) {
        this.loading.dismiss();
        this.presentToastWithOptions(result.error);
      }
    } catch (err) {
      this.loading.dismiss();
      this.presentToastWithOptions(err);
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


  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Authenticating...'
    });

    this.loading.present();
  }

}
