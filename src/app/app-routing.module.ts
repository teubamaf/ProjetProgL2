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
import { MesGroupesComponent } from '././components/mes-groupes/mes-groupes.component';

import { RejoindreGroupeComponent } from './components/rejoindre-groupe/rejoindre-groupe.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { MenuAddPostComponent } from './components/menu-add-post/menu-add-post.component';
import { AddDocComponent } from './components/add-doc/add-doc.component';
import { ListMembresComponent } from './components/list-membres/list-membres.component';
import { ListPostGroupeComponent } from './components/list-post-groupe/list-post-groupe.component';
import { UpdateGroupeComponent } from './components/update-groupe/update-groupe.component';
import { StatistiquesGroupeComponent } from './components/statistiques-groupe/statistiques-groupe.component';

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
  { path: 'groupe/:id', component: MesGroupesComponent },
  { path: 'rejoindre_groupe', component: RejoindreGroupeComponent },
  { path: 'groupe/:id/menu-add-post', component: MenuAddPostComponent },
  { path: 'groupe/:id/menu-add-post/add-post', component: AddPostComponent},
  { path: 'groupe/:id/menu-add-post/add-doc', component: AddDocComponent },
  { path: 'groupe/:id/list-membre-groupe', component: ListMembresComponent },
  { path: 'groupe/:id/list-post-groupe', component: ListPostGroupeComponent },
  { path: 'groupe/:id/groupe-update', component: UpdateGroupeComponent },
  { path: 'groupe/:id/statistiques-groupe', component: StatistiquesGroupeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
