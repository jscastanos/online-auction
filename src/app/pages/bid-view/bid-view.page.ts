import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bid-view',
  templateUrl: './bid-view.page.html',
  styleUrls: ['./bid-view.page.scss'],
})
export class BidViewPage implements OnInit, OnDestroy {


  ///api
  postBid;
  auctionID;

  //common
  user;

  constructor(private productService: ProductsService, private common: CommonService, private route: ActivatedRoute) {
    this.user = this.common.user;
    this.route.queryParams.subscribe(params => {
      let data = JSON.parse(params.q.toString());
      this.auctionID = data.auctionID;

      console.log(this.auctionID)
    });
  }

  ngOnInit() {
  }


  bidNow(amount) {

    this.postBid = this.productService.postBid(this.auctionID, this.user.id, amount).subscribe(data => {
      console.log(data);
    })
  }

  ngOnDestroy() {
    if (this.postBid != null)
      this.postBid.unsubscribe();
  }
}
