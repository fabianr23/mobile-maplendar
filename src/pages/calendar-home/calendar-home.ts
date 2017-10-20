import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions,  Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthProvider} from '../../providers/auth/auth';



@Component({
  selector: 'calendar-home',
  templateUrl: 'calendar-home.html'
})
export class CalendarHomePage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  selectedSite: string;
  newtoken: any  =  "";

  userinfo: any;
  user: any;
  events: any;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, public authProvider: AuthProvider, public http: Http) {
        
        this.authProvider.getTokenStorage().then(data=>{
          this.userinfo = data;
          //console.log("data de usuario calendar: ", this.userinfo);
          //this.getUserEvents();
        })
   }

   getUserEvents(){
    console.log("userinfo: ",this.userinfo);
    
    let owner_id = this.userinfo.id;

    this.authProvider.getUsersEvents().then(data=>{
      let token = data.token;
      this.events = data.events;
      console.log("data de getuserevents: ", this.events);

      this.authProvider.refreshToken(token);
      console.log("events: ",this.events);
      
      for(let ev of this.events){
        console.log("ev: ",ev);
          this.eventSource.push(ev);
      }
      console.log("evento source: ",this.eventSource);

    })
        
   }
   edit_event(event) {
     let modal = this.modalCtrl.create('EditPage', { selectedTitle: event.title, description: event.description, selectedDay: event.selectedDay, selectedSite: event.selectedSite});

     modal.present();
     modal.onDidDismiss(data => {

       var index = this.eventSource.indexOf(event.title);
       let partialsource = this.eventSource;
       this.eventSource = [];

       if (index > -1) {
         partialsource.splice(index, 1);
         setTimeout(() => {
           this.eventSource = partialsource;
         });
       }


       if (data) {
         let eventData = data;

         eventData.startTime = new Date(data.startTime);
         eventData.endTime = new Date(data.endTime);
         eventData.description = data.description;
         eventData.selectedSite = data.selectedSite ;
         eventData.selectedTitle = data.selectedTitle ;

         let events = this.eventSource;
         events.push(eventData);
         this.eventSource = [];
         setTimeout(() => {
           this.eventSource = events;
         });
       }
     });

   }


  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay, selectedSite: this.selectedSite});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        eventData.selectedSite = data.selectedSite ;

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  delete_event(event, ins){
    if (ins === 0){

        var index = this.eventSource.indexOf(event);
        let partialsource = this.eventSource;
        this.eventSource = [];

        if (index > -1) {
          partialsource.splice(index, 1);
          setTimeout(() => {
            this.eventSource = partialsource;
          });
          console.log("Después", this.eventSource);
        }

        let headers = new Headers({ 'Content-Type': 'application/json',
                                         'Accept': 'q=0.8;application/json;q=0.9' });
        let options = new RequestOptions({ headers: headers });

        //this.http.delete("http://localhost:8001/events?name="+ event.title, options)
        this.http.delete("http://192.168.99.100:3006/events?name="+ event.title, options)
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
        });
   }

    if (ins == 1){
    let alert = this.alertCtrl.create({
      title: 'Delete: ' + event.title + '?',

      buttons: [{
        text: 'Yes, delete event!',
        handler: () => {

          var index = this.eventSource.indexOf(event);
          let partialsource = this.eventSource;
          this.eventSource = [];

          if (index > -1) {
            partialsource.splice(index, 1);
            setTimeout(() => {
              this.eventSource = partialsource;
            });
            console.log("Después", this.eventSource);
          }
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          console.log('ok');
        }
      }]
    })
    let headers = new Headers({ 'Content-Type': 'application/json',
                                     'Accept': 'q=0.8;application/json;q=0.9' });
    let options = new RequestOptions({ headers: headers });

    //this.http.delete("http://localhost:8001/events?name="+ event.title, options)
    this.http.delete("http://192.168.99.100:3006/events?name="+ event.title, options)
    .subscribe(data => {
      console.log(data['_body']);
    }, error => {
      console.log(error);
    });

    alert.present();
   }
 }

  onEventSelected(event) {

    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    let place = event.site;


    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: '<b>From: </b>' + start + '<b><br>To:</b> ' + end +  '<b><br>Where: </b>' + place ,
      buttons: [{
        text: 'Edit event',
        handler: () => {
          console.log("antes  "+ this.eventSource);
          this.edit_event(event);

        }
      },
      {
        text: 'Delete event',
        handler: () => {
          console.log("antes  "+ this.eventSource);
          this.delete_event(event, 1);
        }
      },
      {
        text: 'Ok',
        handler: () => {
          console.log('ok');
        }
      }]
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  onSiteSelected(ev){
    this.selectedSite = ev.selectedSite;
  }


}