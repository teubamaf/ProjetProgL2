import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddGroupeComponent } from './components/add-groupe/add-groupe.component';
import { AllGroupesPostComponent } from './components/all-groupes-post/all-groupes-post.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GroupeDetailsComponent } from './components/groupe-details/groupe-details.component';
import { GroupesListComponent } from './components/groupes-list/groupes-list.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MesGroupesComponent } from './components/mes-groupes/mes-groupes.component';
import { MesMessagesComponent } from './components/mes-messages/mes-messages.component';
import { PageAccueilComponent } from './components/page-accueil/page-accueil.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    AddGroupeComponent,
    AllGroupesPostComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    GroupeDetailsComponent,
    GroupesListComponent,
    LeftMenuComponent,
    MesGroupesComponent,
    MesMessagesComponent,
    PageAccueilComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
