import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { ItemsComponent } from './components/items/items.component';
import { PublicationsComponent } from './components/publications/publications.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterializeModule } from "angular2-materialize";

import { AuthService } from './services/auth.service';
import { ItemService } from './services/item.service';
import { DoiService } from './services/doi.service';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    NavbarComponent, 
    PublicationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AngularFireModule.initializeApp(environment.firebase, 'graphene'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ItemService, AuthService, DoiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
