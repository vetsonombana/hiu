import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inscription_Ws } from '../services/Inscription_Ws';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public msg : string ;
  public profil : any;
  constructor(private  register : Inscription_Ws ,private router : Router) { }

  ngOnInit() {
  }

  public inscription (inscrire : any) : void{
    if((inscrire.email==null || inscrire.email=="" ) && (inscrire.password ==null || inscrire.password =="" ) && (inscrire.password ==null || inscrire.password =="" ) )
    this.msg = "champ vide";
    if(inscrire.password==inscrire.password2){  
      if(inscrire.admin) this.profil = 0;
      else this.profil = 1;
    this.register.inscription(inscrire.email,inscrire.password,this.profil).then(response => { 
        this.router.navigateByUrl('/login');    
    }
  );
  }
  else{
    this.msg = "mot de passe incorrect";
  }
}
}
