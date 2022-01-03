import { Injectable, NgZone } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { ApiService } from '../services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: ApiService, private router: Router, private zone: NgZone) {

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]):
    Observable<boolean> | Promise<boolean> | boolean {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user: firebase.User) => {

          if (user) {
            resolve(true);
          } else {
            console.log('User is not logged in');
            this.router.navigate(['/login']);
            resolve(false);
          }
        });
      });
    }
}
