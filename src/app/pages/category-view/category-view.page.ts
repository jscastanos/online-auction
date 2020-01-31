import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.page.html',
  styleUrls: ['./category-view.page.scss'],
})
export class CategoryViewPage implements OnInit {

  categoryId;
  categoryName;
  products;

  constructor(private route: ActivatedRoute, private categoryService: ProductsService) {
    this.route.queryParams.subscribe(params => {
      let data = JSON.parse(params.q.toString());
      this.categoryId = data.id;
      this.categoryName = data.name;
    });

  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.categoryService.getProductsFromCategory(this.categoryId)
      .subscribe(data => {
        this.products = data;
      })
  }

}
