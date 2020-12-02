import { Component, OnInit } from '@angular/core';
import { remove } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { CommonService } from 'src/app/services/common.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent {

  public appPages = [{
    title: 'Active Bidings',
    url: '/list',
    icon: 'list'
  }];

  //common
  url;
  user;

  constructor(private router: Router, private auth: AuthService, private env: EnvService, public common: CommonService, private modal: ModalController) {
    this.user = this.common.user;
    this.url = this.env.URL;
  }

  logout() {
    remove("auction_data");
    this.router.navigateByUrl('/login');
  }

}
