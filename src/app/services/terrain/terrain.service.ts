import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Critere } from '../../classes/recherche/critere';

const mapDetails = {
  attribution: 'Andy Natana',
  maxZoom: 100,
  id: 'mapbox.streets',
  accessToken: 'your.mapbox.access.token'
}

let profil = ['red','blue','green','yellow','black'];

const tileLayerLink = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';


@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  private findURL :string = "https://wsituhiu.herokuapp.com/api/get-all-terrain"
  private insertURL : string = "https://wsituhiu.herokuapp.com/api/insertion-terrain" ; 
  private searchURL : string ="https://wsituhiu.herokuapp.com/api/find-advanced";
  private findByIdURL : string = "https://wsituhiu.herokuapp.com/api/find-tbt";

  constructor(private http: HttpClient) {
    console.log('Hello TerrainProvider Provider');
  }

  findAll(){
    return  this.http.get(this.findURL); 
  }   

  insert(data : any ){
    this.insertURL+="?lieu=" + data.lieu 
    + "&description =" + data.description 
    + "&coordonnee ="+ data.coordonnee 
    + "&proprietaire= "+ data.proprietaire 
    + "&type=" + data.type 
    +"&nompropriete=" + data.nompropriete 
    +"&commune=" + data.commune 
    +"&numtitre=" + data.numtitre 
    +"&superficie="+data.superficie ;

    console.log(this.insertURL);
    
    return this.http.get(this.insertURL);
  }

  findById(id: any){
    this.findByIdURL+="?id="+id;
    return this.http.get(this.findByIdURL);
  }

  search(critere : Critere){
    this.searchURL += "?type="+critere.type+"&lieuTerrain="+critere.lieu+"&superficiemin="+critere.min+"&superficiemax="+critere.max;
    return this.http.get(this.searchURL);
  }
}
