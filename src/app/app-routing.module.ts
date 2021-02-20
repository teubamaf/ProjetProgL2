import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyComponent } from './body/body.component';
import { ContentComponent } from './content/content.component';
import { MesMessagesComponent } from './mes-messages/mes-messages.component';
import { FilActualiteComponent } from './fil-actualite/fil-actualite.component';

import { AddGroupeComponent } from './components/add-groupe/add-groupe.component';
import { GroupesListComponent } from './components/groupes-list/groupes-list.component';

import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  { path: '', component: BodyComponent, children: [
     { path: 'add-groupe', component: AddGroupeComponent},
     { path: 'home', component: ContentComponent},
     { path: 'mes-groupes', component: GroupesListComponent},
     { path: 'mes-messages', component: MesMessagesComponent},
     { path: 'fil-actualite', component: FilActualiteComponent},
     { path: 'add-user', component: AddUserComponent},
     { path: 'user-list', component: UserListComponent }
 ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
