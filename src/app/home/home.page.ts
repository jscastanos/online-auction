import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  displayItems = [];
  auctionItems = [];
  activeItems = [];
  lazyLoadIndex = {
    auction: 0,
    display: 0
  };
  currItemStatus = 1;

  categorySliderOpts = {
    sliderOpts: {
      slidesPerView: 2,
    },
    style: 'box',
    sliderBrowseAllText: 'See all categories',
    slideRedirect: '/category-view',
    sliderId: 1,
    requestUrl: '/category',
    dataObject: {
      id: 'CategoryId',
      name: 'CategoryName'
    }
  }

  companySliderOpts = {
    sliderOpts: {
      slidesPerView: 3,
    },
    style: 'circle',
    sliderBrowseAllText: 'See all companies',
    slideRedirect: '/company-view',
    sliderId: 2,
    requestUrl: '/company',
    dataObject: {
      id: 'BranchId',
      name: 'BranchName'
    }
  }

  userID;
  constructor(private productsService: ProductsService, private auth: AuthService) {
    this.fetchDisplay();
    this.fetchAuction();
    this.init();

  }

  async init() {
    let data = await this.auth.checkId();
    this.userID = data["id"]
  }

  loadData() {
    setTimeout(() => {

      if (this.currItemStatus == 0)
        this.fetchDisplay();
      else
        this.fetchAuction();

      this.infiniteScroll.complete();

    }, 300);

  }

  fetchDisplay() {
    this.productsService.getDisplayItems(this.lazyLoadIndex.display)
      .subscribe(data => {
        for (let index in data) {
          this.displayItems.push(data[index]);
          this.lazyLoadIndex.display = data[index]["rowNum"];
        }
        this.activeItems = this.displayItems


      });
  };

  fetchAuction() {
    this.productsService.getAuctionItems(this.lazyLoadIndex.auction)
      .subscribe(data => {
        for (let index in data) {
          this.auctionItems.push(data[index]);
          this.lazyLoadIndex.auction = data[index]["rowNum"];
        }
        this.activeItems = this.auctionItems
      })
  };

  segmentChanged(e) {
    if (e.detail.value == 'display') {
      this.activeItems = this.displayItems;
      this.currItemStatus = 0;

    }
    else {
      this.activeItems = this.auctionItems;
      this.currItemStatus = 1;
    }
  }


}
