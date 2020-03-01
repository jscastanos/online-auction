(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-company-view-company-view-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/company-view/company-view.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/company-view/company-view.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"{{user.statusColor}}\">\n    <ion-buttons slot=\"start\">\n      <ion-button [routerLink]=\"['/home']\">\n        <ion-icon name=\"arrow-back\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-title>{{ companyName }}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list lines=\"none\" class=\"itemList\">\n    <ion-grid>\n      <ion-row *ngIf=\"products.length > 0; else nodata\">\n        <ion-col\n          size-xs=\"6\"\n          *ngFor=\"let items of products\"\n          class=\"item\"\n          (click)=\"goToView(items)\"\n        >\n          <div class=\"badgeHolder\">\n            <div\n              class=\"bidBadge\"\n              [ngClass]=\"{'badge-success' : items.Status == 1}\"\n            >\n              {{items.Status == 1 ? \"On Auction\" : \"For Display\"}}\n            </div>\n          </div>\n          <img\n            src=\"{{url}}/Product/RetrieveImage?id={{items.ProductId}}\"\n            onerror=\"this.onerror = null; this.src = '../assets/placeholder.png'\"\n          />\n          <ion-text>\n            <h5>{{items.ProductName}}</h5>\n          </ion-text>\n        </ion-col>\n      </ion-row>\n      <ng-template #nodata>\n        <ion-row>\n          <ion-col>No Items</ion-col>\n        </ion-row>\n      </ng-template>\n    </ion-grid>\n  </ion-list>\n\n  <ion-infinite-scroll threshold=\"10px\" (ionInfinite)=\"loadData()\">\n    <ion-infinite-scroll-content\n      style=\"padding-top: 10px;\"\n      loadingSpinner=\"crescent\"\n    >\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/company-view/company-view-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/company-view/company-view-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: CompanyViewPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyViewPageRoutingModule", function() { return CompanyViewPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _company_view_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./company-view.page */ "./src/app/pages/company-view/company-view.page.ts");




var routes = [
    {
        path: '',
        component: _company_view_page__WEBPACK_IMPORTED_MODULE_3__["CompanyViewPage"]
    }
];
var CompanyViewPageRoutingModule = /** @class */ (function () {
    function CompanyViewPageRoutingModule() {
    }
    CompanyViewPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], CompanyViewPageRoutingModule);
    return CompanyViewPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/company-view/company-view.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/company-view/company-view.module.ts ***!
  \***********************************************************/
/*! exports provided: CompanyViewPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyViewPageModule", function() { return CompanyViewPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _company_view_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./company-view-routing.module */ "./src/app/pages/company-view/company-view-routing.module.ts");
/* harmony import */ var _company_view_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./company-view.page */ "./src/app/pages/company-view/company-view.page.ts");







var CompanyViewPageModule = /** @class */ (function () {
    function CompanyViewPageModule() {
    }
    CompanyViewPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _company_view_routing_module__WEBPACK_IMPORTED_MODULE_5__["CompanyViewPageRoutingModule"]
            ],
            declarations: [_company_view_page__WEBPACK_IMPORTED_MODULE_6__["CompanyViewPage"]]
        })
    ], CompanyViewPageModule);
    return CompanyViewPageModule;
}());



/***/ }),

/***/ "./src/app/pages/company-view/company-view.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/company-view/company-view.page.ts ***!
  \*********************************************************/
/*! exports provided: CompanyViewPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanyViewPage", function() { return CompanyViewPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_products_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/products.service */ "./src/app/services/products.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_env_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/env.service */ "./src/app/services/env.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/storage.service */ "./src/app/services/storage.service.ts");








var CompanyViewPage = /** @class */ (function () {
    function CompanyViewPage(nav, route, router, env, productsService, common) {
        var _this = this;
        this.nav = nav;
        this.route = route;
        this.router = router;
        this.env = env;
        this.productsService = productsService;
        this.common = common;
        this.products = [];
        this.index = 0;
        this.url = this.env.URL;
        this.user = this.common.user;
        this.setToDefault();
        this.route.queryParams.subscribe(function (params) {
            if (params.q != null) {
                var data = JSON.parse(params.q.toString());
                _this.companyId = data.id;
                _this.companyName = data.name;
                Object(_services_storage_service__WEBPACK_IMPORTED_MODULE_7__["set"])("company", data);
                Object(_services_storage_service__WEBPACK_IMPORTED_MODULE_7__["set"])("returnPage", "company");
                _this.loadData();
            }
            else {
                Object(_services_storage_service__WEBPACK_IMPORTED_MODULE_7__["get"])("category").then(function (data) {
                    if (data != null) {
                        _this.companyId = data["id"];
                        _this.companyName = data["name"];
                        _this.loadData();
                    }
                    else {
                        _this.router.navigateByUrl("/home");
                    }
                });
            }
        });
    }
    CompanyViewPage.prototype.setToDefault = function () {
        this.index = 0;
        this.products = [];
    };
    CompanyViewPage.prototype.ngOnInit = function () {
        this.index = 0;
    };
    CompanyViewPage.prototype.loadData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setToDefault();
                        return [4 /*yield*/, this.getProducts()];
                    case 1:
                        _a.sent();
                        this.infiniteScroll.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    CompanyViewPage.prototype.getProducts = function () {
        var _this = this;
        this.fetchProductsService = this.productsService
            .getProductsFromCompany(this.companyId, this.index, this.user.status)
            .subscribe(function (data) {
            for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                var index = _a[_i];
                _this.products.push(data[index]);
                _this.index = data[Object.keys(data).length - 1].recNo;
            }
        });
    };
    CompanyViewPage.prototype.goToView = function (item) {
        var data = {
            name: item.ProductName,
            id: item.ProductId
        };
        var params = {
            queryParams: {
                q: JSON.stringify(data)
            }
        };
        if (item.Status == "1") {
            this.nav.navigateRoot(["/auction-view"], params);
        }
        else {
            this.nav.navigateRoot(["/item-view"], params);
        }
    };
    CompanyViewPage.prototype.ionViewDidLeave = function () {
        this.setToDefault();
        this.fetchProductsService.unsubscribe();
    };
    CompanyViewPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_services_env_service__WEBPACK_IMPORTED_MODULE_6__["EnvService"] },
        { type: _services_products_service__WEBPACK_IMPORTED_MODULE_3__["ProductsService"] },
        { type: src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonInfiniteScroll"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonInfiniteScroll"])
    ], CompanyViewPage.prototype, "infiniteScroll", void 0);
    CompanyViewPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-company-view",
            template: __webpack_require__(/*! raw-loader!./company-view.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/company-view/company-view.page.html"),
            styles: [__webpack_require__(/*! ../../home/home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            src_app_services_env_service__WEBPACK_IMPORTED_MODULE_6__["EnvService"],
            _services_products_service__WEBPACK_IMPORTED_MODULE_3__["ProductsService"],
            src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], CompanyViewPage);
    return CompanyViewPage;
}());



/***/ }),

/***/ "./src/app/services/products.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/products.service.ts ***!
  \**********************************************/
/*! exports provided: ProductsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsService", function() { return ProductsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _env_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./env.service */ "./src/app/services/env.service.ts");




var ProductsService = /** @class */ (function () {
    function ProductsService(route, env) {
        this.route = route;
        this.env = env;
    }
    ProductsService.prototype.getProductsFromCategory = function (id, index, accountStatus) {
        return this.route.get(this.env.API_URL + 'category/' + id + '/products?index=' + index + "&accountStatus=" + accountStatus);
    };
    ProductsService.prototype.getProductsFromCompany = function (id, index, accountStatus) {
        return this.route.get(this.env.API_URL + 'company/' + id + '/products?index=' + index + "&accountStatus=" + accountStatus);
    };
    ProductsService.prototype.getCategories = function () {
        return this.route.get(this.env.API_URL + 'category');
    };
    ProductsService.prototype.getCompanies = function () {
        return this.route.get(this.env.API_URL + 'branch');
    };
    ProductsService.prototype.getDisplayItems = function (index) {
        return this.route.get(this.env.API_URL + 'product/displays?index=' + index);
    };
    ProductsService.prototype.getAuctionItems = function (index) {
        return this.route.get(this.env.API_URL + 'product/auctions?index=' + index);
    };
    ProductsService.prototype.getAuctionItemDetails = function (id) {
        return this.route.get(this.env.API_URL + 'product/' + id + '/auction');
    };
    ProductsService.prototype.getAuctionItemBiddings = function (id, userID) {
        return this.route.get(this.env.API_URL + 'product/' + id + '/biddings?userID=' + userID);
    };
    ProductsService.prototype.postBid = function (id, userID, amount) {
        return this.route.post(this.env.API_URL + 'product/' + id + '/bid', {
            userID: userID, amount: amount
        });
    };
    ProductsService.prototype.getDisplayItemDetails = function (id, userID) {
        return this.route.get(this.env.API_URL + 'product/' + id + '/display?userID=' + userID);
    };
    ProductsService.prototype.postRate = function (id, userID, rate) {
        return this.route.post(this.env.API_URL + 'product/' + id + '/rate?userID=' + userID, rate);
    };
    ProductsService.prototype.getSearchProduct = function (query) {
        return this.route.get(this.env.API_URL + 'product/search?query=' + query);
    };
    ProductsService.prototype.getUserBiddings = function (userID) {
        return this.route.get(this.env.API_URL + 'bidders/biddings?userID=' + userID);
    };
    ProductsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"] }
    ]; };
    ProductsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"]])
    ], ProductsService);
    return ProductsService;
}());



/***/ })

}]);
//# sourceMappingURL=pages-company-view-company-view-module-es5.js.map