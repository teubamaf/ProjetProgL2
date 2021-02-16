import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyComponent } from './body/body.component';
import { ContentComponent } from './content/content.component';
import { AddGroupeComponent } from './add-groupe/add-groupe.component';

const routes: Routes = [
 { path: '', component: BodyComponent, children: [
 //  { path: 'page-1', component: ContentComponent },
   { path: 'add-groupe', component: AddGroupeComponent},
   { path: 'home', component: ContentComponent},
 ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
