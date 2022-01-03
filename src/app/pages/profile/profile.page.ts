/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile;
  profileForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder, private toastController: ToastController) { }

  ngOnInit() {
    this.initializeRegistrationForm();
    this.loadUserProfile();
  }

  initializeRegistrationForm() {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      avatar: ['https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121233262-stock-illustration-male-default-placeholder-avatar-profile.jpg', Validators.required],
      accountType: ['', Validators.required]
    });
  }

  loadUserProfile() {
    this.profile = this.api.getUserProfile()
    .subscribe(user => {
      this.profile = user;
      this.profileForm.patchValue({
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        accountType: user.accountType
      });
      console.log(this.profile.avatar);
    });
  }

  async updateProfile() {
    const result = await this.api.updateUserProfile(this.profile.uid, {fullName: this.profileForm.value.fullName});
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

  async logout() {
    await this.api.logOut();
    await window.location.reload();
  }

}
