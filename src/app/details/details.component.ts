import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TerrainService } from '../services/terrain/terrain.service';
import { Objectfetched } from '../classes/objet/objectfetched';
import { Terrain } from '../classes/objet/terrain';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  details : Terrain = new Terrain() ;
  parametre : string ;
  idterrain : string ;
  constructor(public terrainService : TerrainService,public router : Router,private activatedRoute:ActivatedRoute) {

  }

  ngOnInit() {
    this.idterrain = this.activatedRoute.snapshot.paramMap.get('idterrain');
    if(!this.idterrain){
      console.log("tsy misy id terrain akory ve d....");
    }
    else{
      this.terrainService.findById(this.idterrain).subscribe(data=>{
        let fetched = <Objectfetched>data ; 
        console.log("objectFetched : "+fetched);
        
        if(fetched.status==='true'){
          let object  = <Terrain>fetched.object ; 
          this.details.lieuTerrain = object.lieuTerrain ;
          this.details.commune = object.commune ;
          this.details.date = object.date ;
          this.details.descriptionTerrain = object.descriptionTerrain ;
          this.details.nompropriete = object.nompropriete ;
          this.details.proprietaire = object.proprietaire ;
          this.details.type = object.type ;
          this.details.titre = object.titre ;
          this.details.superficie = object.superficie ;
        }
      })
    }
  }

}
