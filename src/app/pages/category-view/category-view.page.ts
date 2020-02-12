import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CommonService } from 'src/app/services/common.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.page.html',
  styleUrls: ['../../home/home.page.scss'],
})
export class CategoryViewPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  categoryId;
  categoryName;
  products = [];
  index = 0;

  //common
  user;
  url;
  fetchProductsService;

  constructor(private route: ActivatedRoute, private router: Router, private env: EnvService, private productsService: ProductsService, private common: CommonService) {
    this.route.queryParams.subscribe(params => {
      let data = JSON.parse(params.q.toString());
      this.categoryId = data.id;
      this.categoryName = data.name;
    });
    this.url = this.env.URL;
    this.user = this.common.user;

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {

        if ((ev.url).includes("/category-view"))
          this.getProducts();
        else {
          this.products = [];
          this.index = 0;
          this.fetchProductsService.unsubscribe();
        }
      }


    });

  }

  ngOnInit() {
    this.getProducts();
  }

  async loadData() {
    await this.getProducts();

    this.infiniteScroll.complete();
  }

  getProducts() {
    this.fetchProductsService = this.productsService.getProductsFromCategory(this.categoryId, this.index,
      this.user.status)
      .subscribe(data => {
        for (let index of Object.keys(data)) {
          this.products.push(data[index]);
          this.index = data[Object.keys(data).length - 1].recNo;
        }

        console.log(this.products)

        this.fetchProductsService.unsubscribe();

      })
  }

  openAuction(item) {

    let data = {
      name: item.ProductName,
      id: item.ProductId
    }

    let params = {
      queryParams: {
        q: JSON.stringify(data)
      }
    }

    this.router.navigate(["/item-view"], params)
  }
}
