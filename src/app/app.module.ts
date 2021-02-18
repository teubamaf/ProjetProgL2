import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyComponent } from './body/body.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';

import { FirebaseService } from './services/firebase.service';

import { MesGroupesComponent } from './mes-groupes/mes-groupes.component';
import { MesMessagesComponent } from './mes-messages/mes-messages.component';
import { FilActualiteComponent } from './fil-actualite/fil-actualite.component';
import { AddGroupeComponent } from './components/add-groupe/add-groupe.component';
import { GroupeDetailsComponent } from './components/groupe-details/groupe-details.component';
import { GroupesListComponent } from './components/groupes-list/groupes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BodyComponent,
    ContentComponent,
    HomeComponent,
    MesGroupesComponent,
    MesMessagesComponent,
    FilActualiteComponent,
    AddGroupeComponent,
    GroupeDetailsComponent,
    GroupesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCpBll86ef4C-anE0tKRieL_sGMJQHfOUI',
      authDomain: 'projet-2ea5d.firebaseapp.com',
      databaseURL: 'https://projet-2ea5d-default-rtdb.firebaseio.com',
      projectId: 'projet-2ea5d',
      storageBucket: 'projet-2ea5d.appspot.com',
      messagingSenderId: '908874767053',
      appId: '1:908874767053:web:aab93ac0845117f5cca784',
      measurementId: 'G-Q2FX7CT1LB'
      }),
      FormsModule,
      AngularFireDatabaseModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
