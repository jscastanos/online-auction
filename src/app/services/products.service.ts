import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private route: HttpClient, private env: EnvService) {


  }

  getProductsFromCategory(categoryId) {
    return this.route.get(this.env.API_URL + 'category/' + categoryId + '/products')
  }

  getCategories() {
    return this.route.get(this.env.API_URL + 'category');
  }
}
