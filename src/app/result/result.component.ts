import { Component, OnInit } from '@angular/core';
import { TerrainService } from '../services/terrain/terrain.service';
import { ActivatedRoute } from '@angular/router';
import { Critere } from '../classes/recherche/critere';
import { Terrain } from '../classes/objet/terrain';
import { Objectfetched } from '../classes/objet/objectfetched';
import { Router } from '@angular/router';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  results :Objectfetched;
  critere : Critere ;
  constructor(private provider : TerrainService,private route  : ActivatedRoute,private router : Router) { 
    
  }

  ngOnInit() {
    // this.router.navigateByUrl("/result/:lieu/:min/:max/:type");
    this.critere = new Critere(
      this.route.snapshot.paramMap.get('lieu'),
      this.route.snapshot.paramMap.get('min'),
      this.route.snapshot.paramMap.get('max'),
      this.route.snapshot.paramMap.get('type')
    );
    this.getResult();
  }

  public getResult(){
    this.provider.search(this.critere).subscribe(data=>{
      this.results = <Objectfetched>data ; 
      console.log("resss"+this.results.object);
    })
  }
}
