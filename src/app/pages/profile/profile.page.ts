import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userID;
  user;
  status;
  statusColor = 'medium';
  url;

  constructor(private auth: AuthService, private env: EnvService) {
    this.url = this.env.URL;
    //get user data
    this.loadLocalData();
  }

  async loadLocalData() {
    let data = await this.auth.checkId();

    this.userID = data["id"];
    this.user = data["user"];
    this.status = data["status"];


    if (this.status == 0) {
      this.statusColor = "danger";
    } else {
      this.statusColor = "primary"
    }
  }

  ngOnInit() {
  }

}
