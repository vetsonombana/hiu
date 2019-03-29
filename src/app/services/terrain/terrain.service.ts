import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  private findURL = "https://wsituhiu.herokuapp.com/api/get-all-terrain"
  private map : any ;

  constructor(private http: HttpClient) {
    console.log('Hello TerrainProvider Provider');
  }

  findAll(){
    return  this.http.get(this.findURL); 
  }
}
