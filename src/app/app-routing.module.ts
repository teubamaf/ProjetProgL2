import { NgModule } from '@angular/core';
// Required services for navigation
import { RouterModule, Routes } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from '././components/sign-in/sign-in.component';
import { SignUpComponent } from '././components/sign-up/sign-up.component';
import { DashboardComponent } from '././components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '././components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '././components/verify-email/verify-email.component';

import { AuthGuard } from '././shared/guard/auth.guard';

import { PageAccueilComponent } from '././components/page-accueil/page-accueil.component';
import { GroupesListComponent } from '././components/groupes-list/groupes-list.component';
import { MesMessagesComponent } from '././components/mes-messages/mes-messages.component';
import { AllGroupesPostComponent } from '././components/all-groupes-post/all-groupes-post.component';
import { AddGroupeComponent } from '././components/add-groupe/add-groupe.component';
import { GroupeDetailsComponent } from '././components/groupe-details/groupe-details.component';
import { MesGroupesComponent } from './components/mes-groupes/mes-groupes.component';

import { RejoindreGroupeComponent } from './components/rejoindre-groupe/rejoindre-groupe.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'home', component: PageAccueilComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'mes-groupes', component: GroupesListComponent},
  { path: 'mes-messages', component: MesMessagesComponent},
  { path: 'fil-actualite', component: AllGroupesPostComponent},
  { path: 'add-groupe', component: AddGroupeComponent },
  { path: 'update-groupe', component: GroupeDetailsComponent },
  { path: 'groupe/:nom', component: MesGroupesComponent },
  { path: 'rejoindre_groupe', component: RejoindreGroupeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
