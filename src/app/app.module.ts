import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
 { path : 'home' , component: HomeComponent },
 { path : 'home-detail/:id' , component: HomeDetailComponent},
 { path : 'gallery' , component: GalleryComponent },
 { path : '' ,
    redirectTo: '/home',
    pathMatch: 'full'
  },
 { path : '**' , component: HomeComponent } ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeDetailComponent,
    HomeComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
