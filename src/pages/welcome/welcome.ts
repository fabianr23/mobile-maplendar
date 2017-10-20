import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  rootPage:any = WelcomePage;


  constructor(public navCtrl: NavController, public navParams: NavParams ,private authprovider: AuthProvider) {
  
   this.authprovider.isLogged().then(data=>{
      console.log("islogged?:", data);
      if (data == true){
        this.rootPage = HomePage;
      }
      else{
        //this.rootPage = LoginPage;
        this.rootPage = LoginPage;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  login(){
  	this.navCtrl.push(LoginPage);
  }

  signup(){

  	this.navCtrl.push(SignupPage);

  }

}
