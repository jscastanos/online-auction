import { Component, OnInit } from '@angular/core';
import { remove } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {

  public appPages = [{
    title: 'Active Bidings',
    url: '/list',
    icon: 'list'
  }
  ];

  userID;
  status;
  username;
  statusColor = 'medium';
  url;

  constructor(private router: Router, private auth: AuthService, private env: EnvService) {
    this.url = env.URL;
  }

  async checkId() {
    let data = await this.auth.checkId();
    this.userID = data["id"];
    this.status = data["status"];
    this.username = data["user"];


    if (this.status == 0) {
      this.statusColor = "danger";
    } else {
      this.statusColor = "primary"
    }
  }

  ngOnInit() {
    this.checkId();
  }

  logout() {
    remove("auction_data");
    this.userID = null;
    this.router.navigateByUrl('/login')
  }

}
