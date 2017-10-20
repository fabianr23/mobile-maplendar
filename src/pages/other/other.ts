import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MailServiceProvider } from "../../providers/mail-service/mail-service";
import { AuthProvider } from '../../providers/auth/auth';
import { EventPage } from "../event/event";

/**
 * Generated class for the OtherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'otherpage'
  }
)
@Component({
  selector: 'page-other',
  templateUrl: 'other.html',
})
export class OtherPage {
  idplace: any;
  nameplace: any;
  imgplace: any;
  users: any[] = [];
  place: any = "";
  img_random = [
  "http://images.all-free-download.com/images/graphicthumb/abstract_blue_background_vector_graphic_3_148032.jpg",
  
  "https://ak8.picdn.net/shutterstock/videos/5038838/thumb/1.jpg",
  "https://ak8.picdn.net/shutterstock/videos/5408018/thumb/1.jpg",
  "http://technode.com/wp-content/uploads/2017/03/42702038_m.jpg" 
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public mailService: MailServiceProvider, public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    this.idplace = this.navParams.get('idsite');
    this.nameplace = this.navParams.get('namesite');
    this.imgplace = this.navParams.get('imgsite');
    console.log ("informacion del sitio: ", this.idplace + "," + this.nameplace + "," + this.imgplace + ",");
    // this.mailService.getUsers()
    // .then(data => {
    //   this.users = data.results;
    // })
    // .catch(error =>{
    //   console.error(error);
    // });

    this.authService.getPlaceById(this.idplace)
    .then(data => {
      console.log("data: ",data);
      this.place = data;
      this.authService.refreshToken(data.token);
    })
    .catch(error =>{
      console.error(error);
    })

  }

  goToEvent(img,item,name,description){
      // console.log("img: "+ img);
      // console.log("item: "+ JSON.stringify(item));
      this.navCtrl.push(EventPage , { id:item, img: img, name: name, description: description });
    }

}
