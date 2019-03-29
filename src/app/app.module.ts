import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AppRoutingModule } from './app-routing.module';
import { CarteComponent } from './carte/carte.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { Login_ws } from './services/Login_ws';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { Inscription_Ws } from './services/Inscription_Ws';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CarteComponent,
    LoginComponent,
    DetailsComponent,
    LogoutComponent,
    InscriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ Login_ws,Inscription_Ws ],
  bootstrap: [AppComponent]
})
export class AppModule { }
