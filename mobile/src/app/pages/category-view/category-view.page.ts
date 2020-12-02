import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { ProductsService } from "../../services/products.service";
import { CommonService } from "src/app/services/common.service";
import { IonInfiniteScroll, NavController } from "@ionic/angular";
import { EnvService } from "src/app/services/env.service";
import { get, set } from "../../services/storage.service";

@Component({
  selector: "app-category-view",
  templateUrl: "./category-view.page.html",
  styleUrls: ["../../home/home.page.scss"]
})
export class CategoryViewPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;

  categoryId;
  categoryName;
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
        this.categoryId = data.id;
        this.categoryName = data.name;
        set("category", data);
        set("returnPage", "category");
        this.loadData();
      } else {
        get("category").then(data => {
          if (data != null) {
            this.categoryId = data["id"];
            this.categoryName = data["name"];
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
      .getProductsFromCategory(this.categoryId, this.index, this.user.status)
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

    if (item.Status == 0) {
      this.nav.navigateRoot(["/item-view"], params);
    } else {
      this.nav.navigateRoot(["/auction-view"], params);
    }
  }

  ionViewDidLeave() {
    this.fetchProductsService.unsubscribe();
  }
}
