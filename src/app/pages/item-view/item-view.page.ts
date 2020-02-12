import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { EnvService } from 'src/app/services/env.service';
import { CommonService } from 'src/app/services/common.service';
import { ProductsService } from 'src/app/services/products.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.page.html',
  styleUrls: ['./item-view.page.scss'],
})
export class ItemViewPage implements OnInit {

  itemId;
  itemName;
  itemDetails;
  biddingDetails;
  highestBidPrice = 0;
  userBidPrice = 0;
  auctionID;
  //common
  url;
  user;

  //api
  fetchItemDetails;
  fetchItemBiddings;
  postBid;

  constructor(private alert: AlertController, private route: ActivatedRoute, private env: EnvService, private router: Router, private common: CommonService, private productService: ProductsService) {
    this.route.queryParams.subscribe(params => {
      let data = JSON.parse(params.q.toString());
      this.itemId = data.id;
      this.itemName = data.name;
    });


    this.url = this.env.URL;
    this.user = this.common.user;

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if ((ev.url).includes("/item-view"))
          this.getItemDetails();
        else {
          this.fetchItemDetails.unsubscribe();
          if (this.fetchItemBiddings != null)
            this.fetchItemBiddings.unsubscribe();
        }
      }

    })
  }

  async presentAlert() {

    const alert = await this.alert.create({
      header: 'Bid Price',
      inputs: [{
        name: 'bidAmount',
        type: 'number',
        placeholder: 'Enter Amount'
      }],
      buttons: ['Cancel', {
        text: 'OK',
        handler: data => {
          this.bidNow(data.bidAmount);
        }
      }]
    });

    await alert.present();

  }

  ngOnInit() {
  }

  async getItemDetails() {
    this.fetchItemDetails = await this.productService.getItemDetails(this.itemId).subscribe(data => {

      this.itemDetails = data;
      this.auctionID = this.itemDetails.AuctionId;
      this.getItemBiddings(this.auctionID);
    })
  }

  async getItemBiddings(auctionID) {
    this.fetchItemBiddings = await this.productService.getItemBiddings(auctionID, this.user.id).subscribe(data => {
      this.biddingDetails = data;
      this.userBidPrice = this.biddingDetails.userBidPrice;
      this.highestBidPrice = this.biddingDetails.highestBidPrice == null ? this.itemDetails.AskPrice : this.biddingDetails.highestBidPrice;

    })
  }

  bidNow(amount) {
    this.postBid = this.productService.postBid(this.auctionID, this.user.id, amount).subscribe(data => {
      console.log(data);
      this.getItemBiddings(this.auctionID);
    })
  }
}
