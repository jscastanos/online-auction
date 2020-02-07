import { Component, OnInit } from '@angular/core';
import { remove } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {

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

  constructor(private router: Router, private auth: AuthService) { }

  async checkId() {
    let data = await this.auth.checkId();
  }

  ngOnInit() { }

  logout() {
    remove("auction_data");
    this.userID = null;
    this.router.navigateByUrl('/login')
  }

}
