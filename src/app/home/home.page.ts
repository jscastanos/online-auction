import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  displayItems = [];
  auctionItems = [];
  activeItems;
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


  constructor(private productsService: ProductsService) {

  }

  loadData(event) {
    setTimeout(() => {
      let service;

      if (this.currItemStatus == 0)
        service = this.productsService.getDisplayItems(this.lazyLoadIndex.display);
      else
        service = this.productsService.getAuctionItems(this.lazyLoadIndex.auction);

      service.subscribe(params => {

        if (this.currItemStatus == 0) {
          for (let index in params) {
            this.displayItems.push(params[index])
            this.lazyLoadIndex.display = params[index]["rowNum"];
          }

          this.activeItems = this.displayItems;
        }
        else {
          for (let index in params) {
            this.auctionItems.push(params[index])
            this.lazyLoadIndex.auction = params[index]["rowNum"];
          }

          this.activeItems = this.auctionItems
        }

        event.target.complete();
      });

    }, 500);
  }

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
