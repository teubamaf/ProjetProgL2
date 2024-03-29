import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AngularFireStorageModule } from '@angular/fire/storage';

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

import { AddGroupeComponent } from './components/add-groupe/add-groupe.component';
import { GroupeDetailsComponent } from './components/groupe-details/groupe-details.component';
import { GroupesListComponent } from './components/groupes-list/groupes-list.component';

import { AddPostComponent } from './components/add-post/add-post.component';

import { RouterModule, Routes } from '@angular/router';

import { RejoindreGroupeComponent } from './components/rejoindre-groupe/rejoindre-groupe.component';
import { JoinGroupeDetailsComponent } from './components/join-groupe-details/join-groupe-details.component';
import { ListMembresComponent } from './components/list-membres/list-membres.component';
import { ListPostGroupeComponent } from './components/list-post-groupe/list-post-groupe.component';
import { UpdateGroupeComponent } from './components/update-groupe/update-groupe.component';
import { StatistiquesGroupeComponent } from './components/statistiques-groupe/statistiques-groupe.component';
import { ListMembresDetailsComponent } from './components/list-membres-details/list-membres-details.component';
import { QuitterGroupeComponent } from './components/quitter-groupe/quitter-groupe.component';

import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DatePipe } from '@angular/common';

import { CreateConversationComponent } from './components/create-conversation/create-conversation.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ChatsComponent } from './components/chats/chats.component';
import { CreateGroupeChatComponent } from './components/create-groupe-chat/create-groupe-chat.component';
import { GroupChatListComponent } from './components/group-chat-list/group-chat-list.component';
import { ChatsGroupeComponent } from './components/chats-groupe/chats-groupe.component';
import { InviteUserChatComponent } from './components/invite-user-chat/invite-user-chat.component';
import { GroupeChatListComponent } from './components/groupe-chat-list/groupe-chat-list.component';
import { ChatGroupDetailsComponent } from './components/chat-group-details/chat-group-details.component';
import { RechercheMenuComponent } from './components/recherche-menu/recherche-menu.component';
import { RechercheGroupeComponent } from './components/recherche-groupe/recherche-groupe.component';
import { RechercheMembreComponent } from './components/recherche-membre/recherche-membre.component';
import { RecherchePostComponent } from './components/recherche-post/recherche-post.component';
import { RechercheDocumentComponent } from './components/recherche-document/recherche-document.component';

import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ProfilComponent } from './components/profil/profil.component';
import { ListAmisComponent } from './components/list-amis/list-amis.component';
import { ProfilUserComponent } from './components/profil-user/profil-user.component';


const appRoutes: Routes = [
  { path: 'left-menu', component: LeftMenuComponent },
  { path: 'groupe/:id', component: MesGroupesComponent },

];

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    AddGroupeComponent,
    GroupeDetailsComponent,
    GroupesListComponent,
    AddPostComponent,
    RejoindreGroupeComponent,
    JoinGroupeDetailsComponent,
    ListMembresComponent,
    ListPostGroupeComponent,
    UpdateGroupeComponent,
    StatistiquesGroupeComponent,
    ListMembresDetailsComponent,
    QuitterGroupeComponent,
    UploadFormComponent,
    UploadListComponent,
    CreateConversationComponent,
    ConversationListComponent,
    CreateGroupeChatComponent,
    GroupChatListComponent,
    ChatsGroupeComponent,
    InviteUserChatComponent,
    GroupeChatListComponent,
    ChatGroupDetailsComponent,
    ChatsComponent,
    RechercheMenuComponent,
    RechercheGroupeComponent,
    RechercheMembreComponent,
    RecherchePostComponent,
    RechercheDocumentComponent,
    ProfilComponent,
    ListAmisComponent,
    ProfilUserComponent
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
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ChartsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSnackBarModule,
    MatSidenavModule,
    AngularFirestoreModule.enablePersistence(),
    NotifierModule.withConfig({
      // Custom options in here
    }),
  ],
  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
