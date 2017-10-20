import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data: any ="";

  constructor(public navCtrl: NavController, public navParams: NavParams, private authprovider: AuthProvider) {
  this.showname();
  }


showname(){
this.authprovider.private().then(res=>{

      console.log("res" + JSON.stringify(res) );
//this.authprovider.private().then(data =>{
      this.data = res.user;
      this.authprovider.refreshToken(res.token);
      
    })
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout(){
   //this.authprovider.logout();
   this.authprovider.logout().then(data =>{
      console.log("fin de logout")
      console.log(data)
    });
   this.navCtrl.setRoot(LoginPage); 
   }

}
