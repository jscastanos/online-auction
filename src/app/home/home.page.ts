import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  displayItems;

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


  constructor() {
    this.displayItems = this.itemNames
  }

  segmentChanged(e) {
    if (e.detail.value == 'display')
      this.displayItems = this.DisplayItems;
    else
      this.displayItems = this.itemNames;
  }

  itemNames = [
    {
      'itemID': 1,
      'itemName': 'Kawat na Cell phone 444 4444 asda  asd asd asd asd asd',
      'NoOfBidders': 14,
      'CurrentBidPrice': 23000
    }, {
      'itemID': 2,
      'itemName': 'Samsung Toilet',
      'NoOfBidders': 5,
      'CurrentBidPrice': 1000
    }, {
      'itemID': 3,
      'itemName': 'Lush Last Least',
      'NoOfBidders': 6,
      'CurrentBidPrice': 12000
    }, {
      'itemID': 4,
      'itemName': 'Kawat na Puso',
      'NoOfBidders': 14,
      'CurrentBidPrice': 23000
    }, {
      'itemID': 5,
      'itemName': 'Kawat na Pusa',
      'NoOfBidders': 14,
      'CurrentBidPrice': 23000
    },
  ];

  DisplayItems = [
    {
      'itemID': 1,
      'itemName': 'Display Something',
      'NoOfDays': 5
    }, {
      'itemID': 2,
      'itemName': 'Display Something 2',
      'NoOfDays': 25
    }, {
      'itemID': 3,
      'itemName': 'Display Something 5',
      'NoOfDays': 12
    }, {
      'itemID': 4,
      'itemName': 'Display Something 6',
      'NoOfDays': 15
    }, {
      'itemID': 5,
      'itemName': 'Kawat na Pusa',
      'NoOfDays': 69
    },
  ];

}
