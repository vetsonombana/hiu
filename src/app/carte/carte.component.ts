import { Component ,  OnInit } from '@angular/core';
import * as L from 'leaflet';
import { TerrainService } from '../services/terrain/terrain.service';
import { Objectfetched } from '../classes/objet/objectfetched';

let profil = ['red','blue','green','yellow','black'];

@Component({
  selector: 'app-carte' , 
  templateUrl: './carte.component.html' , 
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  
  public lat: any;
  public lon: any;
  macarte = null;
  marker = null;
  tabTerr = [];
  control = 0;
  tabPolygon = [];
  tabId = [];
  public polygon: any;
  public suite: any;
  tabPoint = [];


   constructor(public terrainService : TerrainService) { 

   }
 
   ngOnInit() {
     this.geolocalisation();
   }


   public getTerrains(){
    this.terrainService.findAll().subscribe(data => {
      let grounds = <Objectfetched>data;
      grounds.object.forEach(element => {
        let coord = this.parsingData(element);

        let details = {
          'description':element.descriptionTerrain,
          'color':profil[element.type],
          'superficie':element.superficie+' A',
          'commune':element.commune,
          'titre':element.titre,
          'lieu':element.lieuTerrain,
          'proprietaire':element.proprietaire
        };

        var poly = new L.polygon(coord,details).addTo(this.macarte);
        poly.on('click', ()=> {
          let coord = element.coordonnee.split(',')[0]+','+element.coordonnee.split(',')[1];            
          coord = JSON.parse(coord);
          
          let soratra = '<p>Titre : '+details.titre +'</p>'
                        +'<h4>Proprietaire : '+details.proprietaire+'</h4>'
                        +'<p>Superficie : ' + details.superficie + '</p>'
                        +'<p>Lieu : ' + details.lieu + '</p>'
                        +'<p>Commune : ' + details.commune + '</p>'
                        +'<p>Description : ' + details.description + '</p>'
                        +'<a href="">Plus de details</a>'; ////eto mandefa url 

          L.popup()
          .setLatLng(coord)
          .setContent(soratra)
          .openOn(this.macarte);
        });

      });
    })
  }

  public parsingData(element){
    let coord = '['+element.coordonnee;
    coord = coord.substring(0,coord.length-1)  ;
    coord +=']]';
    coord = JSON.parse(coord);
    return coord ;
  }

   public geolocalisation(): void {
     var this2=this;
       let geoSuccess = function(position) { // Ceci s'exécutera si l'utilisateur accepte la géolocalisation
       let startPos = position;
       this2.lat = startPos.coords.latitude;
       this2.lon = startPos.coords.longitude;
       this2.initMap(); 
     };
     const geoFail = function() { 
       alert('Erreur: géolocalisation rejetée ou connexion serveur');
     };
     navigator.geolocation.getCurrentPosition(geoSuccess , geoFail);
   }
   public initMap(): void {

    

       this.macarte = L.map('map').setView([this.lat , this.lon] ,  17);
       // macarte = L.map('map').setView([-18.985894377275923 , 47.532571256160736] ,  17);
       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ,  {
           // Il est toujours bien de laisser le lien vers la source des données
           attribution: '404Not FOund' ,
           minZoom: 1 ,
           maxZoom: 19
       }).addTo(this.macarte); 
      L.control.scale().addTo(this.macarte);
       this.marker = L.marker([this.lat ,  this.lon]).addTo(this.macarte);
       this.marker.bindPopup('Vous êtes ici');
       this.macarte.on('click' ,this.getCoord);
 
       this.getTerrains();

 // fin recherche
   }
 
   public dessin(point: any): void {
     let tab = [point];
                 this.polygon = L.polygon(tab ,  {color: 'green'}).addTo(this.macarte);
                 this.polygon.on("click",()=>{
                   console.log("this.macarte"+this.macarte);
                    L.popup().setLatLng([-18.98537190002551,47.532952237233985]).setContent("a propos du terrain").openOn(this.macarte)
                 });
                 this.macarte.fitBounds(this.polygon.getBounds());
               this.tabPolygon.push(this.polygon);
       }
       public getCoord(e: any): void {
        // this.testIn(e);
         if (this.control === 0) {
           // Aficher point 
           this.marker = L.marker([e.latlng.lat,  e.latlng.lng]).addTo(this.macarte);
           this.marker.bindPopup('Borne');
           this.tabTerr.push([e.latlng.lat , e.latlng.lng]);
           let taille = this.tabTerr.length;
           this.suite += '[' + this.tabTerr[taille - 1] + '] , '  ;
           let polyline = L.polyline(this.tabTerr ,  {color: 'red'}).addTo(this.macarte);
           this.macarte.fitBounds(polyline.getBounds());
         } 
         else if (this.control === 1) {
           alert('Vous avez déjà terminer votre traçage');
         } 
         else 
         {
           this.control = 0;
         }
       }
    /* public testIn (e: any): void {
         const taille = this.tabPolygon.length;
           for (let i = 0; i < taille; i++) {
             if (this.tabPolygon[i].getBounds().contains(e.coords) === true) {
               this.control = 2;
               document.getElementById('aPropos').innerHTML = 'ty ary e ' + this.tabId[i];
               document.getElementById('detailsTerrain').style.display = 'block';
               break;
             }
           }
     }*/
       public effacer (): void {
 
       }

     
}
