import {Injectable} from '@angular/core';


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
        this.updateUserData(credential.user);
      });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email
    };

    userRef.set(data);
  }
}
