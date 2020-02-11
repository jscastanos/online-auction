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
    return this.route.get(this.env.API_URL + 'products?id=' + index + '&key')
  }

  getAuctionItems(index) {
    return this.route.get(this.env.API_URL + 'products/auctiondata?id=' + index + '&key')
  }


}
