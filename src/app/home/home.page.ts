import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
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

  //api
  fetchDisplayService;
  fetchAuctionService;

  //common
  user;

  constructor(private productsService: ProductsService, private auth: AuthService, public common: CommonService) {
    this.user = this.common.user;
  }

  ngOnInit() {
    this.fetchAuction();
    this.fetchDisplay();
  }

  async loadData() {
    if (this.currItemStatus == 0)
      await this.fetchDisplay();
    else
      await this.fetchAuction();

    this.infiniteScroll.complete();

  }

  fetchDisplay() {
    this.fetchDisplayService = this.productsService.getDisplayItems(this.lazyLoadIndex.display)
      .subscribe(data => {
        for (let index in data) {
          this.displayItems.push(data[index]);
          this.lazyLoadIndex.display = data[index]["rowNum"];
        }
        this.activeItems = this.displayItems

        this.fetchDisplayService.unsubscribe();
      });
  };

  fetchAuction() {
    this.fetchAuctionService = this.productsService.getAuctionItems(this.lazyLoadIndex.auction)
      .subscribe(data => {
        for (let index in data) {
          this.auctionItems.push(data[index]);
          this.lazyLoadIndex.auction = data[index]["rowNum"];
        }
        this.activeItems = this.auctionItems

        this.fetchAuctionService.unsubscribe();
      });
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

  ngOnDestroy() {

    this.fetchDisplayService.unsubscribe();
    this.fetchAuctionService.unsubscribe();
  }

}
