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
import { Login_ws } from './services/login_ws';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CarteComponent,
    LoginComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [ Login_ws, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
