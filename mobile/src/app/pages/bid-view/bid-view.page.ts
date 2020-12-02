import { Component, OnInit, Input } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { CommonService } from "src/app/services/common.service";
import { EnvService } from "src/app/services/env.service";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-bid-view",
  templateUrl: "./bid-view.page.html",
  styleUrls: ["./bid-view.page.scss"]
})
export class BidViewPage implements OnInit {
  @Input() auctionID;
  @Input() name;
  @Input() id;
  @Input() currentHighestPrice;
  ///api
  postBid;
  error;

  //common
  user;
  url;

  constructor(
    private env: EnvService,
    private productService: ProductsService,
    private common: CommonService,
    private modalController: ModalController
  ) {
    this.user = this.common.user;
    this.url = this.env.URL;
  }

  ngOnInit() {}

  bidNow(amount) {
    if (amount > this.currentHighestPrice) {
      this.postBid = this.productService
        .postBid(this.auctionID, this.user.id, amount)
        .subscribe(
          data => {
            this.modalController.dismiss();
          },
          error => {
            this.error = JSON.stringify(error);
          }
        );
    } else {
      alert(
        "You can't place value lower than or equal to ₱ " +
          this.currentHighestPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  ionViewDidLeave() {
    if (this.postBid != null) this.postBid.unsubscribe();
    this.modalController.dismiss();
  }
}
