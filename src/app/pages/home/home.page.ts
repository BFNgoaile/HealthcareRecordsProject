import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  profile;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.api.getUserProfile()
    .subscribe(user => {
      this.profile = user;
    });
  }

}
