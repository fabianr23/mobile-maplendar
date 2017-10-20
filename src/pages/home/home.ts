import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: any ="";
  name: any ="";
  newtoken:any ="";
  img_random = [
  "http://images.all-free-download.com/images/graphicthumb/abstract_blue_background_vector_graphic_3_148032.jpg",
  
  "https://ak8.picdn.net/shutterstock/videos/5038838/thumb/1.jpg",
  "https://ak8.picdn.net/shutterstock/videos/5408018/thumb/1.jpg",
  "http://technode.com/wp-content/uploads/2017/03/42702038_m.jpg" 
  ];
  constructor(public navCtrl: NavController, private authprovider: AuthProvider) {
  setTimeout(() => {
        this.showname();
      }, 1000);
  
  }

showname(){
this.authprovider.getUserInfo().then(res=>{

      console.log("res user info: " + JSON.stringify(res) );
//this.authprovider.private().then(data =>{
      this.name = res.user;
 
      console.log("reswithdata"+ this.name);
      this.authprovider.refreshToken(res.token);
      setTimeout(() => {
        this.getrandom();
      }, 2000);
      
      return true;
   
    })
 }
 getrandom(){
    console.log("entrando a get random");
    this.authprovider.getEventsRandom().then(res=>{
    console.log("res get random:" + JSON.stringify(res) );
    this.data = res.events;
    console.log("ressss*** with data");
    console.log(this.data);
    console.log("login successful");
    this.authprovider.refreshToken(res.token);
    return true;
    //return true;
   })

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
