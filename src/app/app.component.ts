import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetAngular';
  isSignedIn = false;

  constructor(public firebaseService: FirebaseService) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }

  async onSignup(email: string, password: string): Promise<void> {
    await this.firebaseService.signup(email, password);
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
    }
  }

  async onSignin(email: string, password: string): Promise<void> {
    await this.firebaseService.signin(email, password);
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
    }
  }

  handleLogout(): void {
    this.isSignedIn = false;
  }
}


