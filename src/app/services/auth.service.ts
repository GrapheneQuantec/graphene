// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { User } from '../models/user'


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

  private user: Observable<User>;
  // private user: BehaviorSubject<User> = new BehaviorSubject(null)
  private userDetails: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private _firebaseAuth: AngularFireAuth,
    private router: Router
  ) {
    // this.afs.firestore.settings({ timestampsInSnapshots: true });

    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {


        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      }
      else {
        return Observable.of(null)
      }
    })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        console.log('credential: ', credential);
        this.updateUser(credential.user)
      })
  }

  signOut() {
    this.afAuth.auth.signOut()
  }

  private updateUser(authData) {
    const userData = new User(authData)
    const ref = this.db.object('users/' + authData.uid)
    ref.valueChanges()
      .subscribe(user => {
        if (!user) {
          ref.update(userData)
        }
      })

  }
}