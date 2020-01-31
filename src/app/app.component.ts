import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { get, remove } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Active Bidings',
      url: '/list',
      icon: 'list'
    }
  ];

  userID;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.getUserID();
    this.initializeApp();
  }

  async getUserID() {
    this.userID = await get("userID");

    if (this.userID == null) {
      this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl('/')
    }
  }

  logout() {
    remove("userID");
    this.router.navigateByUrl('/login')
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
