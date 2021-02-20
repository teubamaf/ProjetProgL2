import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User = new User();
  submitted = false;

  title = 'ProjetAngular';
  isSignedIn = false;

  constructor(public firebaseService: FirebaseService, private userService: UserService) {
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

  saveUser(): void {
    this.userService.create(this.user).then(() => {
      console.log('Le groupe a été créé avec succès!');
      this.submitted = true;
    });
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }
  
  handleLogout(): void {
    this.isSignedIn = false;
  }
}

