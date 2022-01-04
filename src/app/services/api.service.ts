/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }
  getUserProfile(): Observable<any> {
    // eslint-disable-next-line prefer-const
    let userID = this.getCurrentUser().uid;
    return this.firestore.doc(`users/${userID}`).valueChanges();
  }

  getPatientProfile(uid): Observable<any> {
    return this.firestore.doc(`users/${uid}`).valueChanges();
  }

  updateUserProfile(userID, newData) {
    return this.firestore.doc(`users/${userID}`)
    .update(newData);
  }

  async createUser(email: string, password: string, fullName: string, avatar: string, accountType: string, uniqueNumber) {

    try {
      const createAccount = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      if (createAccount.user) {
        const authData = { email, fullName, uid: createAccount.user.uid, avatar, createdDate: new Date(), accountType, uniqueNumber };
        return {
          result: await this.firestore.collection('users').doc(createAccount.user.uid).set(authData)
        };
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return {
        error: err.message
      };
    }
  }

  async uploadPicture(imageString) {
    const storageRef = firebase
    .storage()
    .ref(`${new Date().toString()}.png`);
    const uploadedPicture = await storageRef.putString(imageString.split(',')[1], 'base64', {
    contentType: 'image/png'
    });
    const downloadURL = await storageRef.getDownloadURL();
    return downloadURL;
   }


  async login(email: string, password: string) {
    try {
      return {
        result: await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      };
    } catch (err) {
      console.log(err);
      return {
        error: err.message
      };
    }
  }

  async logOut() {
    try {
      return {
        result: await this.afAuth.auth.signOut()
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  async resetPassword(email): Promise<{result?: any; error?: any}> {
    try {
      return {
        result: await this.afAuth.auth.sendPasswordResetEmail(email)
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  async updatePassword(newPassword): Promise<{result?: any; error?: any}> {
    try {
      const user = await this.afAuth.auth.currentUser;
      return {
        result: await user.updatePassword(newPassword)
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  getPatients() {
    return this.firestore.collection('users', ref => ref.where('accountType', '==', 'patient')).valueChanges();
  }

  getPatientAppointments(uid): Observable<any> {
    return this.firestore.collection('appointments', ref => ref.where('patientUid', '==', uid)).valueChanges();
  }

  getPatientRecords(uid): Observable<any> {
    return this.firestore.collection('records', ref => ref.where('patientUid', '==', uid)).valueChanges();
  }

  getDoctorAppointments(uid): Observable<any> {
    return this.firestore.collection('appointments', ref => ref.where('doctorUid', '==', uid)).valueChanges();
  }

  getDoctorRecords(uid): Observable<any> {
    return this.firestore.collection('records').valueChanges();
  }

  findPatientinDB(uid) {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  findPatientByNumber(uniqueNumber) {
    return this.firestore.collection('users', ref => ref.where('uniqueNumber', '==', uniqueNumber)).valueChanges();
  }

  addAppointment(patientUid, description, appointmentDate, doctorUid, doctorName, patientName) {
    return this.firestore.collection('appointments').add({
      patientUid,
      description,
      appointmentDate,
      doctorUid,
      doctorName,
      patientName
    });
  }

  addPatientRecord(patientUid, comments, image, appointmentDate, doctorUid, doctorName, patientName) {
    return this.firestore.collection('records').add({
      patientUid,
      comments,
      image,
      appointmentDate,
      doctorUid,
      doctorName,
      patientName
    });
  }











}
