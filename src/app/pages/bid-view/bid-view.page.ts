import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { EnvService } from 'src/app/services/env.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bid-view',
  templateUrl: './bid-view.page.html',
  styleUrls: ['./bid-view.page.scss'],
})
export class BidViewPage implements OnInit, OnDestroy {


  ///api
  postBid;
  auctionID;
  itemName;
  itemID;
  error;

  //common
  user;
  url;

  constructor(private nav: NavController, private env: EnvService, private productService: ProductsService, private common: CommonService, private route: ActivatedRoute) {
    this.user = this.common.user;
    this.url = this.env.URL;

    this.route.queryParams.subscribe(params => {
      let data = JSON.parse(params.q.toString());
      this.auctionID = data.auctionID;
      this.itemName = data.name;
      this.itemID = data.id;
    });
  }

  ngOnInit() {
  }


  bidNow(amount) {
    console.log(amount)
    this.postBid = this.productService.postBid(this.auctionID, this.user.id, amount).subscribe(data => {
      this.nav.navigateRoot("/item-view")
    },
      error => {
        this.error = JSON.stringify(error);
      }
    )
  }

  ngOnDestroy() {
    if (this.postBid != null)
      this.postBid.unsubscribe();
  }
}
