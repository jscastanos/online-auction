(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-category-view-category-view-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/category-view/category-view.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/category-view/category-view.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"{{user.statusColor}}\">\n    <ion-buttons slot=\"start\">\n      <ion-button [routerLink]=\"['/home']\">\n        <ion-icon name=\"arrow-back\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-title>{{ categoryName }}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list lines=\"none\" class=\"itemList\">\n    <ion-grid>\n      <ion-row>\n        <ion-col size-xs=\"6\" *ngFor=\"let item of products\" class=\"item\" (click)=\"openAuction(item)\">\n          <div class=\"badgeHolder\">\n            <div class=\"bidBadge\" [ngClass]=\"{'badge-success' : item.Status == 1}\">\n              {{item.Status == 1 ? \"On Auction\" : \"For Display\"}}\n            </div>\n          </div>\n          <img src=\"{{url}}/Product/RetrieveImage?id={{item.ProductId}}\"\n            onerror=\"this.onerror = null; this.src = '../assets/placeholder.png'\" />\n          <ion-text>\n            <h5>{{item.ProductName}}</h5>\n          </ion-text>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n\n  <ion-infinite-scroll threshold=\"10px\" (ionInfinite)=\"loadData()\">\n    <ion-infinite-scroll-content style=\"padding-top: 10px;\" loadingSpinner=\"crescent\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/category-view/category-view-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/category-view/category-view-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: CategoryViewPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryViewPageRoutingModule", function() { return CategoryViewPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _category_view_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category-view.page */ "./src/app/pages/category-view/category-view.page.ts");




var routes = [
    {
        path: '',
        component: _category_view_page__WEBPACK_IMPORTED_MODULE_3__["CategoryViewPage"]
    }
];
var CategoryViewPageRoutingModule = /** @class */ (function () {
    function CategoryViewPageRoutingModule() {
    }
    CategoryViewPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], CategoryViewPageRoutingModule);
    return CategoryViewPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/category-view/category-view.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/category-view/category-view.module.ts ***!
  \*************************************************************/
/*! exports provided: CategoryViewPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryViewPageModule", function() { return CategoryViewPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _category_view_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./category-view-routing.module */ "./src/app/pages/category-view/category-view-routing.module.ts");
/* harmony import */ var _category_view_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./category-view.page */ "./src/app/pages/category-view/category-view.page.ts");







var CategoryViewPageModule = /** @class */ (function () {
    function CategoryViewPageModule() {
    }
    CategoryViewPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _category_view_routing_module__WEBPACK_IMPORTED_MODULE_5__["CategoryViewPageRoutingModule"]
            ],
            declarations: [_category_view_page__WEBPACK_IMPORTED_MODULE_6__["CategoryViewPage"]]
        })
    ], CategoryViewPageModule);
    return CategoryViewPageModule;
}());



/***/ }),

/***/ "./src/app/pages/category-view/category-view.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/category-view/category-view.page.ts ***!
  \***********************************************************/
/*! exports provided: CategoryViewPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryViewPage", function() { return CategoryViewPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_products_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/products.service */ "./src/app/services/products.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_env_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/env.service */ "./src/app/services/env.service.ts");







var CategoryViewPage = /** @class */ (function () {
    function CategoryViewPage(route, router, env, productsService, common) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.env = env;
        this.productsService = productsService;
        this.common = common;
        this.products = [];
        this.index = 0;
        this.route.queryParams.subscribe(function (params) {
            var data = JSON.parse(params.q.toString());
            _this.categoryId = data.id;
            _this.categoryName = data.name;
        });
        this.url = this.env.URL;
        this.user = this.common.user;
        this.router.events.subscribe(function (ev) {
            if (ev instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                if ((ev.url).includes("/category-view"))
                    _this.getProducts();
                else {
                    _this.products = [];
                    _this.index = 0;
                    _this.fetchProductsService.unsubscribe();
                }
            }
        });
    }
    CategoryViewPage.prototype.ngOnInit = function () {
        this.getProducts();
    };
    CategoryViewPage.prototype.loadData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProducts()];
                    case 1:
                        _a.sent();
                        this.infiniteScroll.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoryViewPage.prototype.getProducts = function () {
        var _this = this;
        this.fetchProductsService = this.productsService.getProductsFromCategory(this.categoryId, this.index, this.user.status)
            .subscribe(function (data) {
            for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                var index = _a[_i];
                _this.products.push(data[index]);
                _this.index = data[Object.keys(data).length - 1].recNo;
            }
            console.log(_this.products);
            _this.fetchProductsService.unsubscribe();
        });
    };
    CategoryViewPage.prototype.openAuction = function (item) {
        var data = {
            name: item.ProductName,
            id: item.ProductId
        };
        var params = {
            queryParams: {
                q: JSON.stringify(data)
            }
        };
        this.router.navigate(["/item-view"], params);
    };
    CategoryViewPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_services_env_service__WEBPACK_IMPORTED_MODULE_6__["EnvService"] },
        { type: _services_products_service__WEBPACK_IMPORTED_MODULE_3__["ProductsService"] },
        { type: src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonInfiniteScroll"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonInfiniteScroll"])
    ], CategoryViewPage.prototype, "infiniteScroll", void 0);
    CategoryViewPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-category-view',
            template: __webpack_require__(/*! raw-loader!./category-view.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/category-view/category-view.page.html"),
            styles: [__webpack_require__(/*! ../../home/home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], src_app_services_env_service__WEBPACK_IMPORTED_MODULE_6__["EnvService"], _services_products_service__WEBPACK_IMPORTED_MODULE_3__["ProductsService"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], CategoryViewPage);
    return CategoryViewPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-category-view-category-view-module-es5.js.map