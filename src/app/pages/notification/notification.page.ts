import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit, OnDestroy {

  items = [];
  url;
  user;

  fetchNotif;

  constructor(private nav: NavController, private env: EnvService,
    private profileService: ProfileService, private common: CommonService) {
    this.url = env.URL;
    this.user = common.user;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.fetchNotif = this.profileService.notifs(this.user.id)
      .subscribe(data => {
        if (Object.keys(data).length > 0) {
          for (let i in data) {
            this.items.push(data[i]);
          }
        }
      });

  }
  goToView(item) {

    let data = {
      name: item.ProductName,
      id: item.ProductId,
      status: 1
    }

    let params = {
      queryParams: {
        q: JSON.stringify(data)
      }
    }
    this.nav.navigateRoot(["/item-view"], params);
  }


  ngOnDestroy() {
    if (this.fetchNotif != null)
      this.fetchNotif.unsubscribe();
  }

}
