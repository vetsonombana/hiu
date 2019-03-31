import { Component ,  OnInit } from '@angular/core';
import * as L from 'leaflet';
import { TerrainService } from '../services/terrain/terrain.service';
import { Objectfetched } from '../classes/objet/objectfetched';
import { Router, ActivatedRoute } from '@angular/router';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Critere } from '../classes/recherche/critere';
import { Terrain } from '../classes/objet/terrain';


let profil = ['yellow','blue','green','red','black'];
const provider = new OpenStreetMapProvider();

const searchControl = new GeoSearchControl({
  provider: provider
});

@Component({
  selector: 'app-carte' , 
  templateUrl: './carte.component.html' , 
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  public single : boolean = false ;
  public lat: any;
  public lon: any;
  macarte = null;
  marker = null;
  tabTerr = [];
  control = 0;
  tabPolygon = [];
  tabId = [];
  public polygon: any;
  public suite: any = "" ;
  tabPoint = [];
  montrerFormulaire = false ; 
  public user : string;
  //donnee formulaire insertion de terrain
  propriete : string ; 
  lieu : string ;
  description : string ; 
  superficie : any ;
  commune : string ;
  titre : number ;
  type : any ; 
  coordonnee : string = "" ;
  proprietaire : string ;
  message : string ;
  public hreflogout : string = "vetso";
  //donnee formulaire recherche avancée
  critere : Critere = new Critere();
  idterrain : string ;
  constructor(public terrainService : TerrainService,public router : Router,private activatedRoute:ActivatedRoute) {
   
  }
 
   ngOnInit() {
   //localStorage.removeItem("logsession");
     console.log(localStorage.getItem("logsession"));
     this.user = localStorage.getItem("logsession"); 
     //console.log("enganie="+this.user);
     if(this.user=="" || this.user == null){ 
       this.user == "Nom"; 
       this.hreflogout ="/login" ;
      }
     else  {
      this.user = localStorage.getItem("logsession"); 
      this.hreflogout ="/logout" ;
     }
     this.geolocalisation();

     this.idterrain = this.activatedRoute.snapshot.paramMap.get('idterrain');
     if(this.idterrain){
      this.single = true ; 
     }

   }

   sendData(){
     this.coordonnee = this.coordonnee.substring(0,this.coordonnee.length-1);
     
     let data = {
      lieu : this.lieu ,
      description : this.description ,
      coordonnee : this.coordonnee ,
      proprietaire : this.proprietaire ,
      type : this.type ,
      nompropriete : this.propriete ,
      commune : this.commune ,
      numtitre : this.titre,
      superficie : this.superficie
     }
     
     this.terrainService.insert(data).subscribe(data => {
      let val = <Objectfetched> data ; 
      this.message = val.message ; 
      if(val.status === 'true'){
        this.router.navigateByUrl('/carte');
      }
     }) 
   }

   public getTerrains(){
    if(this.single){
      this.terrainService.findById(this.idterrain).subscribe(data=>{
        let elements = <Objectfetched>data;
        let element = <Terrain>elements.object;
        console.log(element);
        
        let coord = this.parsingData(element);
  
          let details = {
            'idterrain':element.idterrain,
            'description':element.descriptionTerrain,
            'color':profil[element.type],
            'superficie':element.superficie+' A',
            'commune':element.commune,
            'titre':element.titre,
            'lieu':element.lieuTerrain,
            'proprietaire':element.proprietaire
          };
  
          var poly = new L.polygon(coord,details).addTo(this.macarte);
          this.tabPolygon.push(poly);
          poly.on('click', ()=> {
            let coord = element.coordonnee.split(',')[0]+','+element.coordonnee.split(',')[1];            
            coord = JSON.parse(coord);
            
            let soratra = '<p>Titre : '+details.titre +'</p>'
              +'<h4>Proprietaire : '+details.proprietaire+'</h4>'
              +'<p>Superficie : ' + details.superficie + '</p>'
              +'<p>Lieu : ' + details.lieu + '</p>'
              +'<p>Commune : ' + details.commune + '</p>'
              +'<p>Description : ' + details.description + '</p>'
              +"<a href='details/1'>More details</a>"
  
            let form = ''
  
  
            L.popup()
            .setLatLng(coord)
            .setContent(soratra)
            .openOn(this.macarte);
          });

      })
    }
    else{
      this.terrainService.findAll().subscribe(data => {
        let grounds = <Objectfetched>data;
        grounds.object.forEach(element => {
          let coord = this.parsingData(element);
  
          let details = {
            'idterrain':element.idterrain,
            'description':element.descriptionTerrain,
            'color':profil[element.type],
            'superficie':element.superficie+' A',
            'commune':element.commune,
            'titre':element.titre,
            'lieu':element.lieuTerrain,
            'proprietaire':element.proprietaire
          };
  
          var poly = new L.polygon(coord,details).addTo(this.macarte);
          this.tabPolygon.push(poly);
          poly.on('click', ()=> {
            let coord = element.coordonnee.split(',')[0]+','+element.coordonnee.split(',')[1];            
            coord = JSON.parse(coord);
            
            let soratra = '<p><img src="assets/img/down/titre.png" width="15px" alt="" /> Titre n° : '+details.titre +'</p>'
              +'<h4><img src="assets/img/down/cnx2.png" width="23px" alt="" />Proprietaire : '+details.proprietaire+'</h4>'
              +'<p><img src="assets/img/down/superficie.png" width="16px" alt="" />  Superficie : ' + details.superficie + '</p>'
              +'<p><img src="assets/img/down/lieu.png" width="21px" alt="" /> Lieu : ' + details.lieu + '</p>'
              +'<p><img src="assets/img/down/mada2.png" width="24px" alt="" />Commune : ' + details.commune + '</p>'
              +'<p><img src="assets/img/down/maison.png" width="24px" alt="" />Description : ' + details.description + '</p>'
              +"<a href='details/1'>More details</a>"
  
            let form = ''
  
  
            L.popup()
            .setLatLng(coord)
            .setContent(soratra)
            .openOn(this.macarte);
          });
  
        });
      })
    }
  }

  public moreDetails(){
    console.log('mapme be');
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
      this.getTerrains();
       this.macarte = L.map('map').setView([this.lat , this.lon] ,  17);
       // macarte = L.map('map').setView([-18.985894377275923 , 47.532571256160736] ,  17);
       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ,  {
           // Il est toujours bien de laisser le lien vers la source des données
           attribution: '404Not FOund' ,
           minZoom: 1 ,
           maxZoom: 19
       }).addTo(this.macarte); 
       this.macarte.addControl(searchControl); 
      L.control.scale().addTo(this.macarte);
       this.marker = L.marker([this.lat ,  this.lon]).addTo(this.macarte);
       this.marker.bindPopup('Vous êtes ici');

       //tracage de terrains sur la carte 
       this.macarte.on('click',(e)=>{     
        
        this.testIn(e);
        
        if(this.control=== 0 ){     
          this.marker = L.marker([e.latlng.lat,  e.latlng.lng]).addTo(this.macarte);
          this.marker.bindPopup('Borne');
          this.tabTerr.push([e.latlng.lat , e.latlng.lng]);
          let taille = this.tabTerr.length;
          this.suite += '[' + this.tabTerr[taille - 1] + '],'  ;
          this.coordonnee="";
          this.coordonnee = this.suite ; 
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
       })

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

     public testIn (e: any): void {
      this.tabPolygon.forEach( element => {
        if (element.getBounds().contains(e.latlng) === true){
          this.control = 2;
          console.log('t es dedans mec!');
        }
      });
     }
       public effacer (): void {

       }

     public finir(){
       this.tabTerr.push(this.tabTerr[0]);
       var  polyline = L.polyline(this.tabTerr ,  {color: 'red'}).addTo(this.macarte);
       this.macarte.fitBounds(polyline.getBounds());
       this.control = 1 ;
     }
     public enregister(){
       this.montrerFormulaire = true ; 
     }

     public advancedSearch (){
      //passer na makany amle componentnle result le critere 
      this.router.navigateByUrl('/result/'+this.critere.lieu+'/'+this.critere.min+'/'+this.critere.max+'/'+this.critere.type);
    }
}
