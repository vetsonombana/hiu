import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './app.component';

import { AccueilComponent } from './accueil/accueil.component';
import { CarteComponent } from './carte/carte.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {path : '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component : AccueilComponent},
  {path: 'carte', component : CarteComponent},
  {path: 'carte/:idterrain', component : CarteComponent},
  {path:'details/:idterrain', component : DetailsComponent},
  {path: 'login', component : LoginComponent},
  {path: 'logout', component : LogoutComponent},
  {path: 'inscrire', component : InscriptionComponent},
  {path:'result',component:ResultComponent},
  {path:'result/:lieu/:min/:max/:type',component:ResultComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true })
  ],
exports: [
    RouterModule,HttpClientModule
]
})
export class AppRoutingModule {
  constructor(private router: Router) { }
 }
