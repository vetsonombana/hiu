import { Component, OnInit } from '@angular/core';
import { Critere } from '../classes/recherche/critere';
import { TerrainService } from '../services/terrain/terrain.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
 public logout : string;
 
  critere : Critere = new Critere("default","default","default","default") ;

  constructor(private router:Router,private route:ActivatedRoute) { 
    let idterrain = this.route.snapshot.paramMap.get('idterrain');
  }

  ngOnInit() {
   
   //localStorage.removeItem("logsession");
    console.log("hahahahahhahahahahahaha="+localStorage.getItem("logsession"));
        if(localStorage.getItem("logsession")=="" || localStorage.getItem("logsession") == null) {
          this.logout == "";
        }
        else{
            this.logout = "Se déconnecter"; 
        }  
  }

  advancedSearch(){
    //passer na makany amle componentnle result le critere 
    this.router.navigateByUrl('/result/'+this.critere.lieu+'/'+this.critere.min+'/'+this.critere.max+'/'+this.critere.type);
  }
}
