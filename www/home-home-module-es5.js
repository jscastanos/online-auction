(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/home.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"{{user.statusColor}}\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-badge color=\"light\" *ngIf=\"user.status == 0\" [routerLink]=\"['/profile']\">\n        Unverified</ion-badge>\n      <ion-button fill=\"clear\">\n        <ion-icon slot=\"icon-only\" name=\"notifications\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n\n  <ion-toolbar color=\"{{user.statusColor}}\">\n    <ion-searchbar placeholder=\"Search Items\" [(ngModel)]=\"searchQuery\" (ionChange)=\"search(searchQuery)\">\n    </ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<div class=\"searchResult\" *ngIf=\"searchResults.length > 0\">\n  <ion-list>\n    <ion-item *ngFor=\"let result of searchResults\">\n      {{result.name}}\n    </ion-item>\n  </ion-list>\n</div>\n\n<ion-content>\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>browse by categories</ion-label>\n    </ion-list-header>\n    <app-slider [options]=\"categorySliderOpts\"></app-slider>\n  </ion-list>\n\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>browse by company</ion-label>\n    </ion-list-header>\n    <app-slider [options]=\"companySliderOpts\"></app-slider>\n  </ion-list>\n\n  <ion-list lines=\"none\" class=\"itemList\">\n    <ion-segment value=\"auction\" (ionChange)=\"segmentChanged($event)\" color=\"primary\">\n      <ion-segment-button size-xs=\"6\" value=\"auction\" *ngIf=\"user.status != 0\">\n        <ion-label>Auction</ion-label>\n      </ion-segment-button>\n      <ion-segment-button size-xs=\"6\" value=\"display\">\n        <ion-label>On Display</ion-label>\n      </ion-segment-button>\n    </ion-segment>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col size-xs=\"6\" *ngFor=\"let items of activeItems\" class=\"item\">\n          <div class=\"badgeHolder\">\n            <div class=\"bidBadge\" *ngIf=\"items.NoOfBidders != null\">\n              {{items.NoOfBidders + ' Bidders'}}\n            </div>\n          </div>\n          <img src=\"../../assets/shapes.svg\" onerror=\"this.onerror = null; this.src = '../assets/placeholder.png'\" />\n          <ion-text>\n            <h1>\n              <ion-icon name=\"star\"></ion-icon>\n              <ion-icon name=\"star\"></ion-icon>\n              <ion-icon name=\"star\"></ion-icon>\n              <ion-icon name=\"star\"></ion-icon>\n              <ion-icon name=\"star-half\"></ion-icon>\n            </h1>\n            <h5>{{items.ProductName}}</h5>\n            <h5 class=\"price\"> {{items.CurrentBidPrice | currency : '&#8369; '}}</h5>\n          </ion-text>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n\n  <ion-infinite-scroll threshold=\"10px\" (ionInfinite)=\"loadData()\">\n    <ion-infinite-scroll-content style=\"padding-top: 10px;\" loadingSpinner=\"crescent\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>"

/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/components.module */ "./src/app/components/components.module.ts");








var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                    }
                ])
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_products_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/products.service */ "./src/app/services/products.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/common.service */ "./src/app/services/common.service.ts");






var HomePage = /** @class */ (function () {
    function HomePage(productsService, auth, common) {
        this.productsService = productsService;
        this.auth = auth;
        this.common = common;
        this.displayItems = [];
        this.auctionItems = [];
        this.activeItems = [];
        this.lazyLoadIndex = {
            auction: 0,
            display: 0
        };
        this.currItemStatus = 1;
        this.categorySliderOpts = {
            sliderOpts: {
                slidesPerView: 2,
            },
            style: 'box',
            sliderBrowseAllText: 'See all categories',
            slideRedirect: '/category-view',
            sliderId: 1,
            requestUrl: '/category?id=0&key=',
            dataObject: {
                id: 'CategoryId',
                name: 'CategoryName'
            }
        };
        this.companySliderOpts = {
            sliderOpts: {
                slidesPerView: 3,
            },
            style: 'circle',
            sliderBrowseAllText: 'See all companies',
            slideRedirect: '/company-view',
            sliderId: 2,
            requestUrl: '/branch',
            dataObject: {
                id: 'BranchId',
                name: 'BranchName'
            }
        };
        this.searchResults = [];
        this.user = this.common.user;
    }
    HomePage.prototype.search = function (q) {
        if (q != "")
            this.searchResults.push(q);
        else
            this.searchResults = [];
    };
    HomePage.prototype.ngOnInit = function () {
        this.fetchAuction();
        this.fetchDisplay();
    };
    HomePage.prototype.loadData = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.currItemStatus == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchDisplay()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.fetchAuction()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.infiniteScroll.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.fetchDisplay = function () {
        var _this = this;
        this.fetchDisplayService = this.productsService.getDisplayItems(this.lazyLoadIndex.display)
            .subscribe(function (data) {
            for (var index in data) {
                _this.displayItems.push(data[index]);
                _this.lazyLoadIndex.display = data[index]["rowNum"];
            }
            _this.activeItems = _this.displayItems;
            _this.fetchDisplayService.unsubscribe();
        });
    };
    ;
    HomePage.prototype.fetchAuction = function () {
        var _this = this;
        this.fetchAuctionService = this.productsService.getAuctionItems(this.lazyLoadIndex.auction)
            .subscribe(function (data) {
            for (var index in data) {
                _this.auctionItems.push(data[index]);
                _this.lazyLoadIndex.auction = data[index]["rowNum"];
            }
            _this.activeItems = _this.auctionItems;
            _this.fetchAuctionService.unsubscribe();
        });
    };
    ;
    HomePage.prototype.segmentChanged = function (e) {
        if (e.detail.value == 'display') {
            this.activeItems = this.displayItems;
            this.currItemStatus = 0;
        }
        else {
            this.activeItems = this.auctionItems;
            this.currItemStatus = 1;
        }
    };
    HomePage.prototype.ngOnDestroy = function () {
        this.fetchDisplayService.unsubscribe();
        this.fetchAuctionService.unsubscribe();
    };
    HomePage.ctorParameters = function () { return [
        { type: _services_products_service__WEBPACK_IMPORTED_MODULE_2__["ProductsService"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
        { type: _services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonInfiniteScroll"], { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonInfiniteScroll"])
    ], HomePage.prototype, "infiniteScroll", void 0);
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_products_service__WEBPACK_IMPORTED_MODULE_2__["ProductsService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module-es5.js.map