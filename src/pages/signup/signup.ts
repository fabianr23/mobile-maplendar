import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData : any;
	rootPage:any = SignupPage;
  // userData ={ "user": {	"first_name":"", "last_name":"","email":"","age":"" ,"password":"", "password_confirmation": ""
	userData = {"first_name":"", "last_name":"","email":"","age":"" ,"password":"", "password_confirmation": ""}
  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          private authprovider: AuthProvider
  	          ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){

  	this.authprovider.postData(this.userData, "users").then((result)=>{

  		this.responseData = result;
  		console.log("responseData")
  		console.log(this.responseData);
			this.login();
  		//localStorage.setItem('userData', JSON.stringify(this.responseData));
  		//this.navCtrl.push(LoginPage);
  	}, (err) =>{
      console.log("error")
			
  		//conection failed

  	});
  }

	login(){
		console.log("login en signup");
  	this.navCtrl.push(LoginPage);

  }
}
