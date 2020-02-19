import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CommonService } from 'src/app/services/common.service';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.page.html',
  styleUrls: ['../../home/home.page.scss'],
})
export class CompanyViewPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  companyId;
  companyName;
  products = [];
  index = 0;

  //common
  user;
  url;
  fetchProductsService;

  constructor(private nav: NavController, private route: ActivatedRoute, private router: Router, private env: EnvService, private productsService: ProductsService, private common: CommonService) {
    this.route.queryParams.subscribe(params => {
      let data = JSON.parse(params.q.toString());
      this.companyId = data.id;
      this.companyName = data.name;
    });
    this.url = this.env.URL;
    this.user = this.common.user;

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {

        if ((ev.url).includes("/company-view"))
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
    this.index = 0;
    this.getProducts();
  }

  async loadData() {
    await this.getProducts();

    this.infiniteScroll.complete();
  }

  getProducts() {
    this.fetchProductsService = this.productsService.getProductsFromCompany(this.companyId, this.index,
      this.user.status)
      .subscribe(data => {
        for (let index of Object.keys(data)) {
          this.products.push(data[index]);
          this.index = data[Object.keys(data).length - 1].recNo;
        }

        this.fetchProductsService.unsubscribe();

      })
  }

  goToView(item) {

    let data = {
      name: item.ProductName,
      id: item.ProductId,
      status: item.Status
    }

    let params = {
      queryParams: {
        q: JSON.stringify(data)
      }
    }
    this.nav.navigateRoot(["/item-view"], params);
  }

}
