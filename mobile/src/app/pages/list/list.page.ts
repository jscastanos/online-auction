import { Component, OnInit, OnDestroy } from "@angular/core";
import { EnvService } from "src/app/services/env.service";
import { ProductsService } from "src/app/services/products.service";
import { CommonService } from "src/app/services/common.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  items = [];
  url;
  user;

  fetchBiddings;

  constructor(
    private nav: NavController,
    private env: EnvService,
    private productService: ProductsService,
    private common: CommonService
  ) {
    this.url = env.URL;
    this.user = common.user;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.fetchBiddings = this.productService
      .getUserBiddings(this.user.id)
      .subscribe(data => {
        if (Object.keys(data).length > 0) {
          for (let i in data) {
            data[i]["DateTimeLimit"] = data[i]["DateTimeLimit"].split("T")[0];
            this.items.push(data[i]);
          }
        }
      });
  }
  goToView(item) {
    let data = {
      name: item.ProductName,
      id: item.ProductId,
      status: 1
    };

    let params = {
      queryParams: {
        q: JSON.stringify(data)
      }
    };
    this.nav.navigateRoot(["/item-view"], params);
  }

  ionViewDidLeave() {
    if (this.fetchBiddings != null) this.fetchBiddings.unsubscribe();
  }
}
