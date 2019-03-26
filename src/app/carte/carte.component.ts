import { Component ,  OnInit } from '@angular/core';
import * as L from 'leaflet';

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
  constructor() { }

  ngOnInit() {
    this.geolocalisation();
  }
  public geolocalisation(): void {
    var this2=this;
      let geoSuccess = function(position) { // Ceci s'exécutera si l'utilisateur accepte la géolocalisation
      let startPos = position;
      console.log('longitude ' + startPos.coords.longitude);
      console.log('latitude '  + startPos.coords.latitude);
      this2.lat = startPos.coords.latitude;
      this2.lon = startPos.coords.longitude;
      this2.initMap(); 
    };
    const geoFail = function() { // Ceci s'exécutera si l'utilisateur refuse la géolocalisation
      alert('Erreur: géolocalisation rejetée ou connexion serveur');
    };
    // La ligne ci-dessous cherche la position de l'utilisateur et déclenchera la demande d'accord
    navigator.geolocation.getCurrentPosition(geoSuccess , geoFail);
  }
  public initMap(): void {
// Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
/*this.lat=-18.985894377275923;
this.lon =47.532571256160736;*/
      this.macarte = L.map('map').setView([this.lat , this.lon] ,  17);
      // macarte = L.map('map').setView([-18.985894377275923 , 47.532571256160736] ,  17);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ,  {
          // Il est toujours bien de laisser le lien vers la source des données
          attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/IT Smart - HIU_19</a>' ,
          minZoom: 1 ,
          maxZoom: 19
      }).addTo(this.macarte); 
     L.control.scale().addTo(this.macarte);
      this.marker = L.marker([this.lat ,  this.lon]).addTo(this.macarte);
      this.marker.bindPopup('Vous êtes ici');
      this.dessinerProp();
      this.macarte.on('click' ,this.getCoord);

// debut recherche
/*const searchControl = new L.esri.Controls.Geosearch().addTo(this.macarte);
const results = new L.LayerGroup().addTo(this.macarte);
searchControl.on('results' ,  function(data) {
results.clearLayers();
for (let i = data.results.length - 1; i >= 0; i--) {
  console.log(data.results[i].text);
// results.addLayer(L.marker(data.results[i].latlng));
}
});*/
//setTimeout(function() { $ ('.pointer').fadeOut('slow'); } ,  3400);
// fin recherche
  }
  public dessinerProp(): void {
    const nbTerrain = 2;
    const tabId2 = ['id1' ,  'id2'];
    // tslint:disable-next-line:max-line-length
    this.tabPoint.push([[-18.985929885379072 ,  47.53262490034104] ,  [-18.986073185861343 ,  47.53259807825089] ,  [-18.986130252390733 ,  47.53263428807259] ,  [-18.986174637455637 ,  47.53279924392701] ,  [-18.985914667621508 ,  47.532870322465904] ,  [-18.985872818781022 ,  47.532717436552055] ,  [-18.985933689818257 ,  47.53263160586358]]);

    // tslint:disable-next-line:whitespace
    // tslint:disable-next-line:max-line-length
    this.tabPoint.push( [[ -18.986071917716014 , 47.53235936164857]  ,  [-18.986168296732803 , 47.532607465982444] , [-18.986221558797094 , 47.53276571631432] , [-18.98626340754995 , 47.532801926136024] , [-18.986328082874593 , 47.53276571631432] , [-18.98630779257936 , 47.53271475434304] , [-18.986295111143587 , 47.53271475434304] , [-18.98627482084436 , 47.53264233469964] , [-18.986251994254765 , 47.53254979848862] , [-18.98614039754947 , 47.53231912851334] , [-18.986074454006637 , 47.53235667943955]]);
    for (let i = 0; i < nbTerrain; i++) {
        this.dessin(this.tabPoint[i]);
// fonction maka Id
      tabId2.push(tabId2[i]);
    }
  }

  public dessin(point: any): void {
    const tab = [point];
                this.polygon = L.polygon(tab ,  {color: 'green'}).addTo(this.macarte);
                this.macarte.fitBounds(this.polygon.getBounds());
              this.tabPolygon.push(this.polygon);
      }
      public getCoord(e: any): void {
        console.log(e);
       // this.testIn(e);
        if (this.control === 0) {
          // Aficher point 
            this.marker = L.marker([e.latlng.lat,  e.latlng.lng]).addTo(this.macarte);
    this.marker.bindPopup('Borne');
    this.tabTerr.push([e.latlng.lat , e.latlng.lng]);
    const taille = this.tabTerr.length;
    this.suite += '[' + this.tabTerr[taille - 1] + '] , '  ;
    const polyline = L.polyline(this.tabTerr ,  {color: 'red'}).addTo(this.macarte);
    this.macarte.fitBounds(polyline.getBounds());
} else if (this.control === 1) {
  alert('Vous avez déjà terminer votre traçage');
     } else {
  // alert("Erreur: point appartenant déjà à une propriété");
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
