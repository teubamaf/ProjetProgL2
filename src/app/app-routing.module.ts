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
import { AddGroupeComponent } from '././components/add-groupe/add-groupe.component';
import { GroupeDetailsComponent } from '././components/groupe-details/groupe-details.component';
import { MesGroupesComponent } from '././components/mes-groupes/mes-groupes.component';

import { RejoindreGroupeComponent } from './components/rejoindre-groupe/rejoindre-groupe.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ListMembresComponent } from './components/list-membres/list-membres.component';
import { ListPostGroupeComponent } from './components/list-post-groupe/list-post-groupe.component';
import { UpdateGroupeComponent } from './components/update-groupe/update-groupe.component';
import { StatistiquesGroupeComponent } from './components/statistiques-groupe/statistiques-groupe.component';
import { QuitterGroupeComponent } from './components/quitter-groupe/quitter-groupe.component';

import { UploadListComponent } from './components/upload-list/upload-list.component';

import { CreateConversationComponent } from './components/create-conversation/create-conversation.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ChatsComponent } from './components/chats/chats.component';
import { CreateGroupeChatComponent } from './components/create-groupe-chat/create-groupe-chat.component';
import { ChatsGroupeComponent } from './components/chats-groupe/chats-groupe.component';
import { InviteUserChatComponent } from './components/invite-user-chat/invite-user-chat.component';
import { GroupeChatListComponent } from './components/groupe-chat-list/groupe-chat-list.component';
import { RechercheMenuComponent } from './components/recherche-menu/recherche-menu.component';
import { RechercheGroupeComponent } from './components/recherche-groupe/recherche-groupe.component';
import { RecherchePostComponent } from './components/recherche-post/recherche-post.component';
import { RechercheMembreComponent } from './components/recherche-membre/recherche-membre.component';
import { RechercheDocumentComponent } from './components/recherche-document/recherche-document.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ListAmisComponent } from './components/list-amis/list-amis.component';
import { ProfilUserComponent } from './components/profil-user/profil-user.component';

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
  { path: 'add-groupe', component: AddGroupeComponent },
  { path: 'update-groupe', component: GroupeDetailsComponent },
  { path: 'groupe/:id', component: MesGroupesComponent },
  { path: 'rejoindre_groupe', component: RejoindreGroupeComponent },
  { path: 'groupe/:id/add-post', component: AddPostComponent},
  { path: 'groupe/:id/list-membre-groupe', component: ListMembresComponent },
  { path: 'groupe/:id/list-post-groupe', component: ListPostGroupeComponent },
  { path: 'groupe/:id/groupe-update', component: UpdateGroupeComponent },
  { path: 'groupe/:id/statistiques-groupe', component: StatistiquesGroupeComponent },
  { path: 'groupe/:id/quit', component: QuitterGroupeComponent },
  { path: 'groupe/:id/list-doc-groupe', component: UploadListComponent },
  { path: 'create-conversation', component: CreateConversationComponent },
  { path: 'conversation-list', component: ConversationListComponent },
  { path: 'conversation/:id', component: ChatsComponent },
  { path: 'create-groupe-conversation', component: CreateGroupeChatComponent },
  { path: 'conversation-groupe/:id', component: ChatsGroupeComponent },
  { path: 'conversation-groupe/:id/invite-user', component: InviteUserChatComponent },
  { path: 'join-group-chat', component: GroupeChatListComponent },
  { path: 'recherche/:value', component: RechercheMenuComponent },
  { path: 'groupe/:id/recherche-post/:value', component: RechercheGroupeComponent },
  { path: 'groupe/:id/recherche-membre/:value', component: RechercheMembreComponent },
  { path: 'groupe/:id/recherche-publications/:value', component: RecherchePostComponent },
  { path: 'groupe/:id/recherche-document/:value', component: RechercheDocumentComponent,
  runGuardsAndResolvers: 'always' },
  { path: 'profil/:uid', component: ProfilComponent },
  { path: 'list-amis', component: ListAmisComponent },
  { path: 'profil-user/:uid', component: ProfilUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
