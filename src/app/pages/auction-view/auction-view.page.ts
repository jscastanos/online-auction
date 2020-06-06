import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { EnvService } from "src/app/services/env.service";
import { CommonService } from "src/app/services/common.service";
import { ProductsService } from "src/app/services/products.service";
import { ModalController, NavController } from "@ionic/angular";
import { get, set } from "../../services/storage.service";
import { interval } from "rxjs";
import { BidViewPage } from "../bid-view/bid-view.page";

@Component({
  selector: "app-auction-view",
  templateUrl: "./auction-view.page.html",
  styleUrls: ["./auction-view.page.scss"]
})
export class AuctionViewPage implements OnInit {
  itemId;
  itemName;
  itemDescription;
  itemDetails;
  biddingDetails;
  currentHighestPrice;
  branchName;
  categoryName;
  auctionID;
  winner;
  isLoaded = false;
  timeLimit: any;
  displayDetails;
  ratingStars;
  timer;
  isBidTimeLimitOver = false;
  returnTo = {
    page: null,
    id: null,
    name: null
  };

  // REAL TIME KUNO
  psuedoRT;
  //common
  url;
  user;

  //api
  fetchAuctionItemDetails;
  fetchAuctionItemBiddings;

  constructor(
    private route: ActivatedRoute,
    private env: EnvService,
    private router: Router,
    private common: CommonService,
    private productService: ProductsService,
    private modalController: ModalController,
    private nav: NavController
  ) {
    this.url = this.env.URL;
    this.user = this.common.user;

    this.route.queryParams.subscribe(params => {
      if (params.q != null) {
        let data = JSON.parse(params.q.toString());
        this.itemId = data.id;
        this.itemName = data.name;

        //set LS
        set("item", data);

        //setReturnPage
        get("returnPage").then(data => {
          if (data != null) {
            this.returnTo.page = data;

            if (this.returnTo.page == "company") {
              get("company").then(c => {
                this.returnTo.id = c["id"];
                this.returnTo.name = c["name"];
              });
            } else {
              get("category").then(c => {
                this.returnTo.id = c["id"];
                this.returnTo.name = c["name"];
              });
            }
          }
        });

        this.loadData();
      } else {
        get("item").then(data => {
          if (data != null) {
            this.itemId = data["id"];
            this.itemName = data["name"];

            this.loadData();
          } else {
            this.router.navigateByUrl("/category-view");
          }
        });
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        if (ev.url.includes("/auction-view")) {
          this.psuedoRT = interval(2000).subscribe(() => {
            this.loadData();
          });
        } else {
          clearInterval(this.psuedoRT);
          this.psuedoRT.unsubscribe();
        }
      }
    });
  }

  goTo() {
    let data = {
      name: this.returnTo.name,
      id: this.returnTo.id
    };

    let params = {
      queryParams: {
        q: JSON.stringify(data)
      }
    };

    if (this.returnTo.page == "category") {
      this.nav.navigateRoot(["/category-view"], params);
    } else {
      this.nav.navigateRoot(["/company-view"], params);
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: BidViewPage,
      componentProps: {
        auctionID: this.auctionID,
        name: this.itemName,
        id: this.itemId,
        currentHighestPrice: this.currentHighestPrice
      }
    });
    return await modal.present();
  }

  async loadData() {
    this.getAuctionItemDetails();
  }

  getAuctionItemDetails() {
    this.fetchAuctionItemDetails = this.productService
      .getAuctionItemDetails(this.itemId)
      .subscribe(data => {
        this.itemDetails = data;
        this.branchName = this.itemDetails.branchName;
        this.categoryName = this.itemDetails.categoryName;
        this.itemDescription = this.itemDetails.ProductDescription;
        this.auctionID = this.itemDetails.AuctionId;
        this.timeLimit = this.timeLeft(
          this.itemDetails.serverTime,
          this.itemDetails.DateTimeLimit
        );

        if (this.itemDetails.serverTime > this.itemDetails.DateTimeLimit) {
          this.isBidTimeLimitOver = true;
        } else {
          //start countdown
          this.timer = interval(1000).subscribe(x => {
            this.timeLimit = this.timeLeft(
              this.itemDetails.serverTime,
              this.itemDetails.DateTimeLimit
            );
          });
        }

        this.getAuctionItemBiddings();
      });
  }

  getAuctionItemBiddings() {
    this.fetchAuctionItemBiddings = this.productService
      .getAuctionItemBiddings(this.auctionID, this.user.id)
      .subscribe(data => {
        this.biddingDetails = data;

        this.currentHighestPrice =
          this.biddingDetails.highestBidPrice == null
            ? this.biddingDetails.AskPrice
            : this.biddingDetails.highestBidPrice;

        //check winner
        if (this.biddingDetails.WinnerId != null) {
          let bidlist = this.biddingDetails.bidList;

          for (let user in bidlist) {
            if (bidlist[user]["BiddersId"] == this.biddingDetails.WinnerId) {
              this.winner = bidlist[user];
            }
          }
        } else {
          this.winner = null;
        }

        this.isLoaded = true;
      });
  }

  bidNow() {
    this.presentModal();
    console.log("hey");
  }

  timeLeft(serverTime, auctionTime) {
    let date =
      Math.floor(
        new Date(auctionTime).getTime() - new Date(serverTime).getTime()
      ) / 1000;

    let days, hours, minutes, seconds;

    days = Math.floor(date / 86400);
    date -= days * 86400;

    hours = Math.floor(date / 3600) % 24;
    date -= hours * 3600;

    minutes = Math.floor(date / 60) % 60;
    date -= minutes * 60;

    seconds = Math.floor(date % 60);

    return [days + "d", hours + "h", minutes + "m", seconds + "s"].join(" ");
  }
  unsubscription() {
    if (this.fetchAuctionItemDetails != null)
      this.fetchAuctionItemDetails.unsubscribe();

    if (this.fetchAuctionItemBiddings != null)
      this.fetchAuctionItemBiddings.unsubscribe();

    if (this.timer != null) this.timer.unsubscribe();
    clearInterval(this.timer);
  }

  ionViewDidLeave() {
    this.auctionID = null;
    this.itemDetails = null;
    this.branchName = null;
    this.categoryName = null;
    this.winner = null;
    this.itemDescription = null;
    this.biddingDetails = null;
    this.isLoaded = false;
    this.unsubscription();
  }
}
