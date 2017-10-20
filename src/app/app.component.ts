import { Component, ViewChild } from '@angular/core';
import { App, Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { WelcomePage } from '../pages/welcome/welcome';
import { CalendarHomePage } from '../pages/calendar-home/calendar-home'

import { TabsPage } from '../pages/tabs/tabs';
import { OtherPage } from '../pages/other/other';
import { MapPage } from '../pages/map/map';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = WelcomePage;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authprovider: AuthProvider) {
    this.pages = [
      {title: 'Mapa de eventos', component: MapPage },
      {title: 'Perfil', component: ProfilePage },
      {title: 'Calendario de eventos', component: CalendarHomePage },
    ]
    // if(this.authprovider.isLogged() == true){
    //   this.rootPage = HomePage;
    // }else{
    //   this.rootPage = LoginPage;
    // }

    this.authprovider.isLogged().then(data=>{
      console.log("islogged?:", data);
      if (data == true){
        this.rootPage = HomePage;
      }
      else{
        //this.rootPage = LoginPage;
        this.rootPage = WelcomePage;
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

