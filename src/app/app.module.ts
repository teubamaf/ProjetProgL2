import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AuthService } from './shared/services/auth.service';

import { AppComponent } from './app.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageAccueilComponent } from './components/page-accueil/page-accueil.component';
import { MesGroupesComponent } from './components/mes-groupes/mes-groupes.component';
import { MesMessagesComponent } from './components/mes-messages/mes-messages.component';
import { AllGroupesPostComponent } from './components/all-groupes-post/all-groupes-post.component';

import { AddGroupeComponent } from './components/add-groupe/add-groupe.component';
import { GroupeDetailsComponent } from './components/groupe-details/groupe-details.component';
import { GroupesListComponent } from './components/groupes-list/groupes-list.component';

import { AddPostComponent } from './components/add-post/add-post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

import { RouterModule, Routes } from '@angular/router';
import { RejoindreGroupeComponent } from './components/rejoindre-groupe/rejoindre-groupe.component';
import { JoinGroupeDetailsComponent } from './components/join-groupe-details/join-groupe-details.component';
import { MenuAddPostComponent } from './components/menu-add-post/menu-add-post.component';
import { AddDocComponent } from './components/add-doc/add-doc.component';

const appRoutes: Routes = [
  { path: 'left-menu', component: LeftMenuComponent },
  { path: 'groupe/:id', component: MesGroupesComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    LeftMenuComponent,
    MenuComponent,
    PageAccueilComponent,
    MesGroupesComponent,
    MesMessagesComponent,
    AllGroupesPostComponent,
    AddGroupeComponent,
    GroupeDetailsComponent,
    GroupesListComponent,
    AddPostComponent,
    PostDetailsComponent,
    PostsListComponent,
    RejoindreGroupeComponent,
    JoinGroupeDetailsComponent,
    MenuAddPostComponent,
    AddDocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
