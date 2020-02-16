import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private route: HttpClient, private env: EnvService) {


  }

  getProductsFromCategory(id, index, accountStatus) {
    return this.route.get(this.env.API_URL + 'category/' + id + '/products?index=' + index + "&accountStatus=" + accountStatus)
  }

  getProductsFromCompany(id, index, accountStatus) {
    return this.route.get(this.env.API_URL + 'company/' + id + '/products?index=' + index + "&accountStatus=" + accountStatus)
  }
  getCategories() {
    return this.route.get(this.env.API_URL + 'category');
  }

  getCompanies() {
    return this.route.get(this.env.API_URL + 'branch');
  }

  getDisplayItems(index) {
    return this.route.get(this.env.API_URL + 'product/displays?index=' + index)
  }

  getAuctionItems(index) {
    return this.route.get(this.env.API_URL + 'product/auctions?index=' + index)
  }

  getAuctionItemDetails(id) {
    return this.route.get(this.env.API_URL + 'product/' + id + '/auction')
  }

  getAuctionItemBiddings(id, userID) {
    return this.route.get(this.env.API_URL + 'product/' + id + '/biddings?userID=' + userID)
  }

  postBid(id, userID, amount) {
    return this.route.post(this.env.API_URL + 'product/' + id + '/bid', {
      userID: userID, amount: amount
    })
  }

  getDisplayItemDetails(id, userID) {
    return this.route.get(this.env.API_URL + 'product/' + id + '/display?userID=' + userID);
  }

  postRate(id, userID, rate) {
    return this.route.post(this.env.API_URL + 'product/' + id + '/rate?userID=' + userID,
      rate
    )
  }

  getSearchProduct(query) {
    return this.route.get(this.env.API_URL + 'product/search?query=' + query)
  }

  getUserBiddings(userID) {
    return this.route.get(this.env.API_URL + 'bidders/biddings?userID=' + userID)
  }
}
