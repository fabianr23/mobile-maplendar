import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MailServiceProvider } from "../../providers/mail-service/mail-service";

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  imgplace = "";
  idevent: any;
  nameevent: any;
  descriptionevent: any;
  users: any[] = [];
  event: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public mailService: MailServiceProvider) {
  }

  ionViewDidLoad() {
    this.imgplace = this.navParams.get('img');
    this.idevent = this.navParams.get('id');
    this.nameevent = this.navParams.get('name');
    this.descriptionevent = this.navParams.get('description');

    console.log("idevent : "+this.idevent);

    // this.mailService.getEventById(this.idevent.Id)
    // .then(data => {
    //   console.log("data: ",data);
    //   this.event = data;
    // })
    // .catch(error =>{
    //   console.error(error);
    // })

    this.mailService.getUserList()
    .then(data => {
      this.users = data.results;
    })
    .catch(error =>{
      console.error(error);
    });

    

  }

  }

