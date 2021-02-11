import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginsystemComponent } from './loginsystem/loginsystem.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuGroupeComponent } from './menu-groupe/menu-groupe.component';
import { BodyComponent } from './body/body.component';
import { ContentComponent } from './content/content.component';
import { AddGroupeComponent } from './add-groupe/add-groupe.component';

import{ AngularFireModule } from '@angular/fire';
import { FirebaseService } from './services/firebase.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginsystemComponent,
    MenuComponent,
    MenuGroupeComponent,
    BodyComponent,
    ContentComponent,
    AddGroupeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDwSo9zgny2wG1q0d2r9aUZmssLIksVNX8",
      authDomain: "projetprog-bc10f.firebaseapp.com",
      databaseURL: "https://projetprog-bc10f-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "projetprog-bc10f",
      storageBucket: "projetprog-bc10f.appspot.com",
      messagingSenderId: "462392072798",
      appId: "1:462392072798:web:dbdd794a347604226e72cf",
      measurementId: "G-NF5HWMXRH1"
    }),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
