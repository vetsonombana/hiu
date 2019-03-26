import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './app.component';

import { AccueilComponent } from './accueil/accueil.component';
import { CarteComponent } from './carte/carte.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path : '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component : AccueilComponent},
  {path: 'carte', component : CarteComponent},
  {path: 'login', component : LoginComponent},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    /*RouterModule.forRoot(
      routes,
      { enableTracing: true })*/
  ],
exports: [
    RouterModule
]
})
export class AppRoutingModule {
  constructor(private router: Router) { }
 }
