import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NgZone } from '@angular/core';
import { OtherPage } from '../other/other';
import { MailServiceProvider } from "../../providers/mail-service/mail-service";
import { Storage } from '@ionic/storage';


declare var google;
declare var jquery:any;
declare var $ :any;
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  users: any[] = [];
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  start: any;
  rutafinal: any;
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public ngZone: NgZone, public mailService: MailServiceProvider, private storage: Storage) {
  }
  
  ionViewDidLoad() {
    this.getPosition();
  }

  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // get start point to calculate direction service
    this.start = myLatLng;

    // center map
    let centermap = {lat: 4.6364594, lng: -74.083513};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: centermap,
      zoom: 15
    });


    let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
    });

    //Content for university marker 
    let contentString = '<div id="content">'+
                '<strong> Tu ubicación </strong>' + 
                '</div>'; 
    let infowindow = new google.maps.InfoWindow({content: contentString});

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });

    google.maps.event.addListener(marker, 'click', 
            function (infowindow, marker) {
                return function () {
                    infowindow.open(this.map, marker);
                };
            }(infowindow, marker)
        );
    marker.setMap(this.map);

    this.directionsDisplay.setMap(this.map);

    let placeslist = this.getPlaces();
    console.log("retorno de getusers: ");
    
    console.log(JSON.stringify(placeslist));
    console.log("arreglo newarray: ");
    // for (let i=0; i <=2; i++){
    //this.addMarker(LatLng1, valueString, "house");
    //this.addMarker(LatLng2, valueString, "police");
    //}
  }

  getPlaces(){
        let thisScope = this;
        //let placesAPI = "http://192.168.99.102:3080/invites/get-event.php";//Api to obtain data of places
        let placesAPI = "http://192.168.99.103:6000/sites";//Api to obtain data of places
        let icon="";
        
        $.getJSON(placesAPI, function (data) {
        let i= 0;
            console.log("data de places: ",data);
            for (let datos in data.sites){
                i = i+1;
                let info = data.sites[datos];
                //console.log("infoplace: ",JSON.stringify(info));
                let events = i % 4;
                let photo = info.image;
                let idplace = Number(info.id);
                let name = info.name;
                let longi = Number(info.latitude);
                let lati = Number(info.longitude);
                let myLatLng={lat:lati, lng:longi};
                //,"'+photo+'","'+name+'"
                let valueString = '<div id="content" class="barra-titulo">'+
                '<strong> ' + name + '</strong> <br><br> <img class="img-place" src="'+photo+'" /> <div class="text-lugar"> ¡Tenemos <strong> '+events+' </strong> eventos en este sitio! </div> <button class="ir-lugar" onClick="window.ionicPageRef.zone.run(function () { window.ionicPageRef.component.openPage(\'' + idplace +'\' , '+ '\'' + photo +'\' , '+ '\'' + name +'\') })">Ver eventos</button> <button class="llevame-alli" onClick="window.ionicPageRef.zone.run(function () { window.ionicPageRef.component.calculateAndDisplayRoute('+lati+','+longi+') })">Llévame allí</button> </div>';
                
                console.log ("events: ",events);
                if (events <= 0){
                    icon = "flag1";
                }else if(events <= 1){
                    icon = "flag2";
                }else if(events <= 2){
                    icon = "flag3";
                }else if(events > 3){
                    icon = "flag4";
                }
                thisScope.rutafinal = myLatLng;
                //console.log(this);
                thisScope.addMarker(myLatLng, valueString, icon);
            }
            //this.addMarker(LatLng1, valueString, "house");
            //console.log(data);
        });
        //console.log ("retorno interna");
        //console.log(PlacesList);
        //return PlacesList;
        // set a key/value
        //this.storage.set('name', 'Max');

        // Or to get a key/value pair
        // this.storage.get('name').then((val) => {
        // console.log('Your name is', val);
        // });
    }

  //Function to add marker to the map
  addMarker(location, contentString, markertype) {
      //console.log("ingreso add marker");
    (<any>window).ionicPageRef = { component: this, zone: this.ngZone };
    let titulo="";
    let markerImage = "";

    //let infowindow = new google.maps.InfoWindow({content: contentString});
    let infowindow = new google.maps.InfoWindow({content: contentString});
    //Obtaining the type of marker, used to set the icon on the map
    if (markertype == "flag1"){
        markerImage = new google.maps.MarkerImage
        (
            "assets/icon/flag-event1.png",
            new google.maps.Size(64, 64, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(32, 64),
            new google.maps.Size(64, 64, "px", "px")
        );
    }
    if (markertype == "flag2"){
        markerImage = new google.maps.MarkerImage
        (
            "assets/icon/flag-event2.png",
            new google.maps.Size(64, 64, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(32, 64),
            new google.maps.Size(64, 64, "px", "px")
        );
    }
    if (markertype == "flag3"){
        markerImage = new google.maps.MarkerImage
        (
            "assets/icon/flag-event3.png",
            new google.maps.Size(64, 64, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(32, 64),
            new google.maps.Size(64, 64, "px", "px")
        );
    }
    if (markertype == "flag4"){
        markerImage = new google.maps.MarkerImage
        (
            "assets/icon/flag-event4.png",
            new google.maps.Size(64, 64, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(32, 64),
            new google.maps.Size(64, 64, "px", "px")
        );
    }
    titulo = "Información del lugar"
    var marker = new google.maps.Marker({
        position: location,
        map: this.map,
        icon: markerImage,
        title: titulo 
    });
    google.maps.event.addListener(marker, 'click', 
            function (infowindow, marker) {
                return function () {
                    //console.log("marcador añadido");
                    infowindow.open(this.map, marker);
                };
            }(infowindow, marker)
        );
    marker.setMap(this.map);
    }

    calculateAndDisplayRoute(lati,longi) {
        let myLatLng={lat:lati, lng:longi};
        console.log("calcular: "+ myLatLng);
        this.directionsService.route({
        origin: this.start,
        destination: myLatLng,
        travelMode: 'DRIVING'
        }, (response, status) => {
        if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
        });
    }
    
    openPage(idplace, imgplace, nameplace) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(OtherPage , { idsite: idplace, imgsite: imgplace,  namesite: nameplace});
    }
}
    