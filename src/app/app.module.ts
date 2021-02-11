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
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
