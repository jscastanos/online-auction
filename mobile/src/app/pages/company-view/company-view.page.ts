import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { ProductsService } from "../../services/products.service";
import { CommonService } from "src/app/services/common.service";
import { IonInfiniteScroll, NavController } from "@ionic/angular";
import { EnvService } from "src/app/services/env.service";
import { get, set } from "../../services/storage.service";

@Component({
  selector: "app-company-view",
  templateUrl: "./company-view.page.html",
  styleUrls: ["../../home/home.page.scss"]
})
export class CompanyViewPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;

  companyId;
  companyName;
  products = [];
  index = 0;

  //common
  user;
  url;
  fetchProductsService;

  constructor(
    private nav: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private env: EnvService,
    private productsService: ProductsService,
    private common: CommonService
  ) {
    this.url = this.env.URL;
    this.user = this.common.user;

    this.setToDefault();

    this.route.queryParams.subscribe(params => {
      if (params.q != null) {
        let data = JSON.parse(params.q.toString());
        this.companyId = data.id;
        this.companyName = data.name;
        set("company", data);
        set("returnPage", "company");
        this.loadData();
      } else {
        get("category").then(data => {
          if (data != null) {
            this.companyId = data["id"];
            this.companyName = data["name"];
            this.loadData();
          } else {
            this.router.navigateByUrl("/home");
          }
        });
      }
    });
  }

  setToDefault() {
    this.index = 0;
    this.products = [];
  }

  ngOnInit() {
    this.index = 0;
  }

  async loadData() {
    this.setToDefault();
    await this.getProducts();

    this.infiniteScroll.complete();
  }

  getProducts() {
    this.fetchProductsService = this.productsService
      .getProductsFromCompany(this.companyId, this.index, this.user.status)
      .subscribe(data => {
        for (let index of Object.keys(data)) {
          this.products.push(data[index]);
          this.index = data[Object.keys(data).length - 1].recNo;
        }
      });
  }

  goToView(item) {
    let data = {
      name: item.ProductName,
      id: item.ProductId
    };

    let params = {
      queryParams: {
        q: JSON.stringify(data)
      }
    };

    if (item.Status == "1") {
      this.nav.navigateRoot(["/auction-view"], params);
    } else {
      this.nav.navigateRoot(["/item-view"], params);
    }
  }

  ionViewDidLeave() {
    this.setToDefault();
    this.fetchProductsService.unsubscribe();
  }
}
