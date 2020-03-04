import { Component, ViewChild, OnDestroy, OnInit } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { IonInfiniteScroll, NavController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { CommonService } from "../services/common.service";
import { EnvService } from "../services/env.service";
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from "@capacitor/core";
import { ProfileService } from "../services/profile.service";

const { PushNotifications, Modals } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;

  displayItems = [];
  auctionItems = [];
  activeItems = [];

  lazyLoadIndex = {
    auction: 0,
    display: 0
  };

  searchResults = [];
  didUserSearch = false;

  currItemStatus = 1;

  notifCount = 0;

  categorySliderOpts = {
    sliderOpts: {
      slidesPerView: 2
    },
    style: "box",
    sliderBrowseAllText: "See all categories",
    slideRedirect: "/category-view",
    sliderId: 1,
    requestUrl: "/category?id=0&key=",
    dataObject: {
      id: "CategoryId",
      name: "CategoryName"
    }
  };

  companySliderOpts = {
    sliderOpts: {
      slidesPerView: 3
    },
    style: "circle",
    sliderBrowseAllText: "See all companies",
    slideRedirect: "/company-view",
    sliderId: 2,
    requestUrl: "/branch",
    dataObject: {
      id: "BranchId",
      name: "BranchName"
    }
  };

  //api
  fetchDisplayService;
  fetchAuctionService;
  searchProduct;
  fetchNotif;

  //common
  user;
  url;

  constructor(
    private profileService: ProfileService,
    private nav: NavController,
    private env: EnvService,
    private productsService: ProductsService,
    private auth: AuthService,
    public common: CommonService
  ) {
    this.user = this.common.user;
    this.url = this.env.URL;
    this.setToDefault();
  }

  search(q) {
    this.searchResults = [];

    if (q != "") {
      this.searchProduct = this.productsService
        .getSearchProduct(q)
        .subscribe(data => {
          this.didUserSearch = true;
          if (Object.keys(data).length > 0) {
            for (let d in data) {
              this.searchResults.push(data[d]);
            }
          }
        });
    } else {
      this.didUserSearch = false;
    }
  }

  ngOnInit() {
    this.fetchDisplay();
    this.fetchNotifCount();

    if (this.user.status != 0) this.fetchAuction();

    PushNotifications.register();

    PushNotifications.addListener(
      "registration",
      (token: PushNotificationToken) => {
        console.log("Push registration success, token: " + token.value);

        //check token
        this.profileService
          .checkTokenValidity(this.user.id, token.value)
          .subscribe(result => {
            if (!result) {
              //register token
              this.profileService
                .registerFCMToken(this.user.id, token.value)
                .subscribe();
            }
          });
      }
    );

    PushNotifications.addListener("registrationError", (error: any) => {
      alert("Error on registration: " + JSON.stringify(error));
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotification) => {
        var audio = new Audio("assets/audio.mp3");
        audio.play();
        let pn = Modals.alert({
          title: notification.title,
          message: notification.body
        });
      }
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification: PushNotificationActionPerformed) => {
        this.nav.navigateRoot("/notification");
      }
    );
  }

  loadData() {
    if (this.user.status == 0) this.fetchDisplay();
    else {
      if (this.currItemStatus == 0) this.fetchDisplay();
      else this.fetchAuction();
    }

    this.infiniteScroll.complete();
  }

  fetchNotifCount() {
    this.fetchNotif = this.profileService
      .notifs(this.user.id)
      .subscribe(data => {
        for (let i of Object.keys(data)) {
          if (!data[i].seen) this.notifCount++;
        }
      });
  }

  async fetchDisplay() {
    this.fetchDisplayService = await this.productsService
      .getDisplayItems(this.lazyLoadIndex.display)
      .subscribe(data => {
        for (let index in data) {
          //rating stars
          data[index]["ratingStars"] = this.computeRating(data[index]["rate"]);
          data[index]["Status"] = 0;
          this.displayItems.push(data[index]);
          this.lazyLoadIndex.display = data[index]["recNo"];
        }
        this.activeItems = this.displayItems;
      });
  }

  async fetchAuction() {
    this.fetchAuctionService = await this.productsService
      .getAuctionItems(this.lazyLoadIndex.auction)
      .subscribe(data => {
        for (let index in data) {
          data[index]["DateTimeLimit"] = data[index]["DateTimeLimit"].split(
            "T"
          )[0];
          data[index]["Status"] = 1;
          this.auctionItems.push(data[index]);
          this.lazyLoadIndex.auction = data[index]["recNo"];
        }
        this.activeItems = this.auctionItems;
      });
  }

  segmentChanged(e) {
    if (e.detail.value == "display") {
      this.activeItems = this.displayItems;
      this.currItemStatus = 0;
    } else {
      this.activeItems = this.auctionItems;
      this.currItemStatus = 1;
    }
  }

  computeRating(rate) {
    let whole,
      half,
      none,
      array = [];

    whole = Math.trunc(rate);
    half = Math.ceil(rate - whole);
    none = Math.trunc(5 - (whole + half));

    //construct data
    for (const index of [].constructor(whole)) array.push("star");

    for (const index of [].constructor(half)) array.push("star-half");

    for (const index of [].constructor(none)) array.push("star-outline");

    return array;
  }

  goToView(item) {
    let data = {
      name: item.ProductName,
      id: item.ProductId,
      status: item.Status
    };

    let params = {
      queryParams: {
        q: JSON.stringify(data)
      }
    };

    if (item.Status == 1) {
      this.nav.navigateRoot(["/auction-view"], params);
    } else {
      this.nav.navigateRoot(["/item-view"], params);
    }
  }

  setToDefault() {
    this.displayItems = [];
    this.auctionItems = [];
    this.activeItems = [];
  }

  ionViewDidLeave() {
    this.setToDefault();
    this.fetchDisplayService.unsubscribe();

    if (this.fetchAuctionService != null)
      this.fetchAuctionService.unsubscribe();

    if (this.searchProduct != null) this.searchProduct.unsubscribe();
  }
}
