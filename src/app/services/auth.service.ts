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

  user$: Observable<User>;
  // private user: BehaviorSubject<User> = new BehaviorSubject(null)
  private userDetails: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private _firebaseAuth: AngularFireAuth
    // ,
    // private router: Router
  ) {
    // this.afs.firestore.settings({ timestampsInSnapshots: true });

    this.user$ = this.afAuth.authState.switchMap(user => {
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

    provider.setCustomParameters({
       prompt: 'select_account'
    });

    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.updateUser(credential.user)
      })
  }

  signOut() {
    this.afAuth.auth.signOut()
  }

  private updateUser(authData) {
    const userData = new User(authData)

    const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/' + authData.uid);

    const data: User = {
      uid: authData.uid,
      email: authData.email,
      photoURL: authData.photoURL,
      displayName: authData.displayName,
      roles: {
        reader: true
      }
    }

    return userRef.set(data, { merge: true });

  }

  canRead(user:User): boolean {
    return this.checkAuthorization(user, [ 'admin', 'author', 'reader' ])
  }

  canEdit(user:User): boolean {
    return this.checkAuthorization(user, [ 'admin', 'author' ])
  }

  canAddOrDelete(user:User): boolean {
    return this.checkAuthorization(user, [ 'admin' ])
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role]) {
        return true
      }
    }
    return false
  }

}