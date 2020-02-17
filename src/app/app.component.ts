import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private auth: AuthService,
    private common: CommonService
  ) {
    this.checkAppUserData();
    this.initializeApp();
  }

  // get user details on next app init
  async checkAppUserData() {
    const data = await this.fetchDataFromLocalStorage();
    const state = await this.validateUser(data);

    if (state != null) {
      if (state)
        this.router.navigateByUrl('/');
      else
        this.router.navigateByUrl('/login');

    }
  }

  fetchDataFromLocalStorage() {
    return this.auth.checkId();
  }

  validateUser(data) {
    let state;
    state = data != null ? true : false;

    if (state) {
      //update global values
      this.common.user = {
        id: data["id"],
        username: data["user"],
        status: data["status"],
        statusColor: data["status"] == 0 ? "danger" : "primary"
      }
    }

    return state;
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
