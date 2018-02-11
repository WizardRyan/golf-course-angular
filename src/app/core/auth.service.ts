import {Injectable, OnDestroy} from '@angular/core';


import * as firebase from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';
import {Player} from "../model/interfaces";
import {Router} from "@angular/router";

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  golfData?: Player;
}

@Injectable()
export class AuthService {

  user: Observable<User>;
  credUser: any;

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore, private router: Router) {
    this.user = this.fireAuth.authState
      .switchMap(user => {
        if (user) {
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.fireAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.credUser = credential.user;
        this.updateUserData(credential.user);
      });
  }

  private updateUserData(user) {
    let rUser;

    this.user.subscribe(a => {
      const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${user.uid}`);
      let data: User;
      if (a) {
        data = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          golfData: a.golfData ? a.golfData : null
        };
        userRef.set(data);
        window.location.reload(true);
      }
      else {
        data = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          golfData: null
        };
        userRef.set(data);

      }
    });
  }

  setUserScores(gData: Player) {
    this.user.subscribe(dat => {
      const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${dat.uid}`);
      const data: User = {
        uid: dat.uid,
        email: dat.email,
        photoURL: dat.photoURL,
        displayName: dat.displayName,
        golfData: gData
      };
      userRef.set(data);
    });

  }

  signOut() {
    this.fireAuth.auth.signOut().then(() => console.log('user was signed out'));
  }

}
