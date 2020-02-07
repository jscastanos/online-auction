import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { get, remove } from './services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  userID;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private auth: AuthService
  ) {
    this.getUserID();
    this.initializeApp();
  }

  async getUserID() {
    let data = await this.auth.checkId();
    this.userID = data != null ? data["id"] : null;
    if (this.userID == null) {
      this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl('/')
    }
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
