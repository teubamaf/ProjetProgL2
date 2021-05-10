import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import auth from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase';

import { flatMap, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  usersRef: AngularFirestoreCollection<User>;
  loginRef: any;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning,
    private db: AngularFireDatabase
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // tslint:disable-next-line:no-non-null-assertion
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', '');
        // tslint:disable-next-line:no-non-null-assertion
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    this.loginRef = db.list('users');
  }

  // Sign in with email/password
  SignIn(email: string, password: string): any {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        // this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, pseudo: string): any {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.UpdatePseudo(result.user.uid, pseudo);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail(): any {
    /*return this.afAuth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });*/
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: any): any {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    // tslint:disable-next-line:no-non-null-assertion
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any): any {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
       this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any): any {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  async delete(uid: string): Promise<any> {
    this.afs.collection('users').doc(uid).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

  // Sign out
  SignOut(): any {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  UpdateUser(uid: string, newDisplayName: string, newEmail: string, newPhotoUrl: string): any {
    this.afs.collection('users').doc(uid).update({ displayName: newDisplayName, email: newEmail, photoUrl: newPhotoUrl });
  }

  ReadUser(uid: string): any {
    return this.afs.doc<User>(`users/${uid}`).valueChanges();
  }

  async UpdatePseudo(uid: string, pseudo: string): Promise<any> {
    this.setLogin(uid, pseudo);
    return this.afs.collection('users').doc(uid).update({ displayName: pseudo });
  }

  setLogin(uid: string, pseudo: string): void {
    console.log('Set Login OK');
    return this.loginRef.push({ nickname: pseudo });

  }

}

