import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from './event.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';

import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { GstAddComponent } from './admin/gst-add/gst-add.component';
import { GstGetComponent } from './admin/gst-get/gst-get.component';
import { GstEditComponent } from './admin/gst-edit/gst-edit.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'adminEDACY@2019aspirefarther@',
    component: AdminComponent
  },
  {
    path: 'admin/event/create',
    component: GstAddComponent
  },
  {
    path: 'admin/event/edit',
    component: GstEditComponent
  },
  {
    path: 'edit/:id',
    component: GstEditComponent
  },
  {
    path: 'event/:id',
    component: GstGetComponent
  },
  { path: 'home-detail/:id', component: HomeDetailComponent },
  { path: 'gallery/:id', component: GalleryComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeDetailComponent,
    HomeComponent,
    GalleryComponent,
    AdminComponent,
    GstAddComponent,
    GstGetComponent,
    GstEditComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SlimLoadingBarModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatButtonModule, MatCheckboxModule,
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAPue_PTa03pBBRZqmLMLvTxwt_nJEvxIc',
      authDomain: 'goorgoorlu-eaf88.firebaseapp.com',
      databaseURL: 'https://goorgoorlu-eaf88.firebaseio.com',
      projectId: 'goorgoorlu-eaf88',
      storageBucket: 'goorgoorlu-eaf88.appspot.com',
      messagingSenderId: '869688170119'
    }),
    AngularFireStorageModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
