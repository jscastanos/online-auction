(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/home.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"{{user.statusColor}}\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-badge color=\"light\" *ngIf=\"user.status == 0\" [routerLink]=\"['/profile']\">\n        Unverified</ion-badge>\n\n      <ion-button id=\"notification-button\" fill=\"clear\" [routerLink]=\"['/notification']\">\n        <ion-badge color=\"danger\" *ngIf=\"notifCount != null || notifCount != 0\">{{notifCount}}</ion-badge>\n        <ion-icon name=\"notifications\"></ion-icon>\n      </ion-button>\n\n    </ion-buttons>\n  </ion-toolbar>\n\n  <ion-toolbar color=\"{{user.statusColor}}\">\n    <ion-searchbar placeholder=\"Search Items\" [(ngModel)]=\"searchQuery\" (ionChange)=\"search(searchQuery)\">\n    </ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<div class=\"searchResult\" *ngIf=\"didUserSearch\">\n  <ion-list>\n    <div *ngIf=\"searchResults.length > 0; else noresult\">\n      <ion-item *ngFor=\"let result of searchResults\" (click)=\"goToView(result)\">\n        {{result.ProductName}}\n      </ion-item>\n    </div>\n    <ng-template #noresult>\n      <ion-item>\n        No Result\n      </ion-item>\n    </ng-template>\n  </ion-list>\n</div>\n\n<ion-content>\n  <ion-item *ngIf=\"user.status == 0\">\n    <ion-text>\n      Your account is unverified. Unverified account is limited to viewing only.\n      <a routerLink=\"/profile\">Go to Details</a>\n    </ion-text>\n  </ion-item>\n\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>browse by categories</ion-label>\n    </ion-list-header>\n    <app-slider [options]=\"categorySliderOpts\"></app-slider>\n  </ion-list>\n\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>browse by company</ion-label>\n    </ion-list-header>\n    <app-slider [options]=\"companySliderOpts\"></app-slider>\n  </ion-list>\n\n  <ion-list lines=\"none\" class=\"itemList\">\n    <ion-segment value=\"auction\" (ionChange)=\"segmentChanged($event)\" color=\"primary\">\n      <ion-segment-button size-xs=\"6\" value=\"auction\" *ngIf=\"user.status != 0\">\n        <ion-label>Auction</ion-label>\n      </ion-segment-button>\n      <ion-segment-button size-xs=\"6\" value=\"display\">\n        <ion-label>On Display</ion-label>\n      </ion-segment-button>\n    </ion-segment>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col size-xs=\"6\" *ngFor=\"let item of activeItems\" class=\"item\" (click)=\"goToView(item)\">\n          <div class=\"badgeHolder\" *ngIf=\"item.DateTimeLimit != null\">\n            <div class=\"bidBadge\">\n              Until {{item.DateTimeLimit}}\n            </div>\n          </div>\n          <img src=\"{{url}}/Product/RetrieveImage?id={{item.ProductId}}\"\n            onerror=\"this.onerror = null; this.src = '../assets/placeholder.png'\" />\n          <ion-text>\n            <h5>{{item.ProductName}}</h5>\n            <h2 *ngIf=\"item.rate != null\">\n              <ion-label *ngFor=\"let rate of item.ratingStars\" style=\"display: inline; color: gold\">\n                <ion-icon name=\"{{rate}}\"></ion-icon>\n              </ion-label>\n              <ion-label style=\"font-size: 15px; text-transform: lowercase;\">{{item.rate | number : '1.2-2'}} rating\n              </ion-label>\n            </h2>\n            <h5 class=\"price\" *ngIf=\"item.CurrentBidPrice != null || item.AskPrice != null\">\n              {{(item.CurrentBidPrice != null ? item.CurrentBidPrice : item.AskPrice) | currency : '&#8369; '}}\n            </h5>\n          </ion-text>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n\n  <ion-infinite-scroll threshold=\"10px\" (ionInfinite)=\"loadData()\">\n    <ion-infinite-scroll-content style=\"padding-top: 10px;\" loadingSpinner=\"crescent\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>"

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
/* harmony import */ var _services_env_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/env.service */ "./src/app/services/env.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _services_profile_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/profile.service */ "./src/app/services/profile.service.ts");









var PushNotifications = _capacitor_core__WEBPACK_IMPORTED_MODULE_7__["Plugins"].PushNotifications, Modals = _capacitor_core__WEBPACK_IMPORTED_MODULE_7__["Plugins"].Modals;
var HomePage = /** @class */ (function () {
    function HomePage(profileService, nav, env, productsService, auth, common) {
        this.profileService = profileService;
        this.nav = nav;
        this.env = env;
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
        this.searchResults = [];
        this.didUserSearch = false;
        this.currItemStatus = 1;
        this.categorySliderOpts = {
            sliderOpts: {
                slidesPerView: 2
            },
            style: "box",
            sliderBrowseAllText: "See all categories",
            slideRedirect: "/category-view",
            sliderId: 1,
            requestUrl: "/category?id=0&key=",
            dataObject: {
                id: "CategoryId",
                name: "CategoryName"
            }
        };
        this.companySliderOpts = {
            sliderOpts: {
                slidesPerView: 3
            },
            style: "circle",
            sliderBrowseAllText: "See all companies",
            slideRedirect: "/company-view",
            sliderId: 2,
            requestUrl: "/branch",
            dataObject: {
                id: "BranchId",
                name: "BranchName"
            }
        };
        this.user = this.common.user;
        this.url = this.env.URL;
        this.setToDefault();
    }
    HomePage.prototype.search = function (q) {
        var _this = this;
        this.searchResults = [];
        if (q != "") {
            this.searchProduct = this.productsService
                .getSearchProduct(q)
                .subscribe(function (data) {
                _this.didUserSearch = true;
                if (Object.keys(data).length > 0) {
                    for (var d in data) {
                        _this.searchResults.push(data[d]);
                    }
                }
            });
        }
        else {
            this.didUserSearch = false;
        }
    };
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchDisplay();
        this.fetchNotifCount();
        if (this.user.status != 0)
            this.fetchAuction();
        PushNotifications.register();
        PushNotifications.addListener("registration", function (token) {
            console.log("Push registration success, token: " + token.value);
            //check token
            _this.profileService
                .checkTokenValidity(_this.user.id, token.value)
                .subscribe(function (result) {
                if (!result) {
                    //register token
                    _this.profileService
                        .registerFCMToken(_this.user.id, token.value)
                        .subscribe();
                }
            });
        });
        PushNotifications.addListener("registrationError", function (error) {
            alert("Error on registration: " + JSON.stringify(error));
        });
        PushNotifications.addListener("pushNotificationReceived", function (notification) {
            var audio = new Audio("assets/audio.mp3");
            audio.play();
            var pn = Modals.alert({
                title: notification.title,
                message: notification.body
            });
        });
        PushNotifications.addListener("pushNotificationActionPerformed", function (notification) {
            _this.nav.navigateRoot("/notification");
        });
    };
    HomePage.prototype.loadData = function () {
        if (this.user.status == 0)
            this.fetchDisplay();
        else {
            if (this.currItemStatus == 0)
                this.fetchDisplay();
            else
                this.fetchAuction();
        }
        this.infiniteScroll.complete();
    };
    HomePage.prototype.fetchNotifCount = function () {
        var _this = this;
        this.fetchNotif = this.profileService
            .notifs(this.user.id)
            .subscribe(function (data) {
            _this.notifCount = Object.keys(data).length;
        });
    };
    HomePage.prototype.fetchDisplay = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.productsService
                                .getDisplayItems(this.lazyLoadIndex.display)
                                .subscribe(function (data) {
                                for (var index in data) {
                                    //rating stars
                                    data[index]["ratingStars"] = _this.computeRating(data[index]["rate"]);
                                    data[index]["Status"] = 0;
                                    _this.displayItems.push(data[index]);
                                    _this.lazyLoadIndex.display = data[index]["recNo"];
                                }
                                _this.activeItems = _this.displayItems;
                            })];
                    case 1:
                        _a.fetchDisplayService = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.fetchAuction = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.productsService
                                .getAuctionItems(this.lazyLoadIndex.auction)
                                .subscribe(function (data) {
                                for (var index in data) {
                                    data[index]["DateTimeLimit"] = data[index]["DateTimeLimit"].split("T")[0];
                                    data[index]["Status"] = 1;
                                    _this.auctionItems.push(data[index]);
                                    _this.lazyLoadIndex.auction = data[index]["recNo"];
                                }
                                _this.activeItems = _this.auctionItems;
                            })];
                    case 1:
                        _a.fetchAuctionService = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.segmentChanged = function (e) {
        if (e.detail.value == "display") {
            this.activeItems = this.displayItems;
            this.currItemStatus = 0;
        }
        else {
            this.activeItems = this.auctionItems;
            this.currItemStatus = 1;
        }
    };
    HomePage.prototype.computeRating = function (rate) {
        var whole, half, none, array = [];
        whole = Math.trunc(rate);
        half = Math.ceil(rate - whole);
        none = Math.trunc(5 - (whole + half));
        //construct data
        for (var _i = 0, _a = [].constructor(whole); _i < _a.length; _i++) {
            var index = _a[_i];
            array.push("star");
        }
        for (var _b = 0, _c = [].constructor(half); _b < _c.length; _b++) {
            var index = _c[_b];
            array.push("star-half");
        }
        for (var _d = 0, _e = [].constructor(none); _d < _e.length; _d++) {
            var index = _e[_d];
            array.push("star-outline");
        }
        return array;
    };
    HomePage.prototype.goToView = function (item) {
        var data = {
            name: item.ProductName,
            id: item.ProductId,
            status: item.Status
        };
        var params = {
            queryParams: {
                q: JSON.stringify(data)
            }
        };
        if (item.Status == 1) {
            this.nav.navigateRoot(["/auction-view"], params);
        }
        else {
            this.nav.navigateRoot(["/item-view"], params);
        }
    };
    HomePage.prototype.setToDefault = function () {
        this.displayItems = [];
        this.auctionItems = [];
        this.activeItems = [];
    };
    HomePage.prototype.ionViewDidLeave = function () {
        this.setToDefault();
        this.fetchDisplayService.unsubscribe();
        if (this.fetchAuctionService != null)
            this.fetchAuctionService.unsubscribe();
        if (this.searchProduct != null)
            this.searchProduct.unsubscribe();
    };
    HomePage.ctorParameters = function () { return [
        { type: _services_profile_service__WEBPACK_IMPORTED_MODULE_8__["ProfileService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"] },
        { type: _services_env_service__WEBPACK_IMPORTED_MODULE_6__["EnvService"] },
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
            selector: "app-home",
            template: __webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_profile_service__WEBPACK_IMPORTED_MODULE_8__["ProfileService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"],
            _services_env_service__WEBPACK_IMPORTED_MODULE_6__["EnvService"],
            _services_products_service__WEBPACK_IMPORTED_MODULE_2__["ProductsService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], HomePage);
    return HomePage;
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
//# sourceMappingURL=home-home-module-es5.js.map