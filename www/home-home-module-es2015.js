(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/home.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"{{user.statusColor}}\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-badge color=\"light\" *ngIf=\"user.status == 0\" [routerLink]=\"['/profile']\">\n        Unverified</ion-badge>\n      <ion-button fill=\"clear\">\n        <ion-icon slot=\"icon-only\" name=\"notifications\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n\n  <ion-toolbar color=\"{{user.statusColor}}\">\n    <ion-searchbar placeholder=\"Search Items\" [(ngModel)]=\"searchQuery\" (ionChange)=\"search(searchQuery)\">\n    </ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<div class=\"searchResult\" *ngIf=\"didUserSearch\">\n  <ion-list>\n    <div *ngIf=\"searchResults.length > 0; else noresult\">\n      <ion-item *ngFor=\"let result of searchResults\" (click)=\"goToView(result)\">\n        {{result.ProductName}}\n      </ion-item>\n    </div>\n    <ng-template #noresult>\n      <ion-item>\n        No Result\n      </ion-item>\n    </ng-template>\n  </ion-list>\n</div>\n\n<ion-content>\n  <ion-item *ngIf=\"user.status == 0\">\n    <ion-text>\n      Your account is unverified. Unverified account is limited to viewing only.\n      <a routerLink=\"/profile\">Go to Details</a>\n    </ion-text>\n  </ion-item>\n\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>browse by categories</ion-label>\n    </ion-list-header>\n    <app-slider [options]=\"categorySliderOpts\"></app-slider>\n  </ion-list>\n\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>browse by company</ion-label>\n    </ion-list-header>\n    <app-slider [options]=\"companySliderOpts\"></app-slider>\n  </ion-list>\n\n  <ion-list lines=\"none\" class=\"itemList\">\n    <ion-segment value=\"auction\" (ionChange)=\"segmentChanged($event)\" color=\"primary\">\n      <ion-segment-button size-xs=\"6\" value=\"auction\" *ngIf=\"user.status != 0\">\n        <ion-label>Auction</ion-label>\n      </ion-segment-button>\n      <ion-segment-button size-xs=\"6\" value=\"display\">\n        <ion-label>On Display</ion-label>\n      </ion-segment-button>\n    </ion-segment>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col size-xs=\"6\" *ngFor=\"let item of activeItems\" class=\"item\" (click)=\"goToView(item)\">\n          <div class=\"badgeHolder\" *ngIf=\"item.DateTimeLimit != null\">\n            <div class=\"bidBadge\">\n              Until {{item.DateTimeLimit}}\n            </div>\n          </div>\n          <img src=\"{{url}}/Product/RetrieveImage?id={{item.ProductId}}\"\n            onerror=\"this.onerror = null; this.src = '../assets/placeholder.png'\" />\n          <ion-text>\n            <h5>{{item.ProductName}}</h5>\n            <h2 *ngIf=\"item.rate != null\">\n              <ion-label *ngFor=\"let rate of item.ratingStars\" style=\"display: inline; color: gold\">\n                <ion-icon name=\"{{rate}}\"></ion-icon>\n              </ion-label>\n              <ion-label style=\"font-size: 15px; text-transform: lowercase;\">{{item.rate | number : '1.2-2'}} rating\n              </ion-label>\n            </h2>\n            <h5 class=\"price\" *ngIf=\"item.CurrentBidPrice != null || item.AskPrice != null\">\n              {{(item.CurrentBidPrice != null ? item.CurrentBidPrice : item.AskPrice) | currency : '&#8369; '}}\n            </h5>\n          </ion-text>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n\n  <ion-infinite-scroll threshold=\"10px\" (ionInfinite)=\"loadData()\">\n    <ion-infinite-scroll-content style=\"padding-top: 10px;\" loadingSpinner=\"crescent\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>"

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/components.module */ "./src/app/components/components.module.ts");








let HomePageModule = class HomePageModule {
};
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_products_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/products.service */ "./src/app/services/products.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _services_env_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/env.service */ "./src/app/services/env.service.ts");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _services_profile_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/profile.service */ "./src/app/services/profile.service.ts");









const { PushNotifications, Modals } = _capacitor_core__WEBPACK_IMPORTED_MODULE_7__["Plugins"];
let HomePage = class HomePage {
    constructor(profileService, nav, env, productsService, auth, common) {
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
        this.user = this.common.user;
        this.url = this.env.URL;
        this.setToDefault();
    }
    search(q) {
        this.searchResults = [];
        if (q != "") {
            this.searchProduct = this.productsService.getSearchProduct(q).subscribe(data => {
                this.didUserSearch = true;
                if (Object.keys(data).length > 0) {
                    for (let d in data) {
                        this.searchResults.push(data[d]);
                    }
                }
            });
        }
        else {
            this.didUserSearch = false;
        }
    }
    ngOnInit() {
        this.fetchDisplay();
        if (this.user.status != 0)
            this.fetchAuction();
        PushNotifications.register();
        PushNotifications.addListener('registration', (token) => {
            console.log('Push registration success, token: ' + token.value);
            //check token
            this.profileService.checkTokenValidity(this.user.id, token.value).subscribe(result => {
                if (!result) {
                    //register token
                    this.profileService.registerFCMToken(this.user.id, token.value).subscribe();
                }
            });
        });
        PushNotifications.addListener('registrationError', (error) => {
            alert('Error on registration: ' + JSON.stringify(error));
        });
        PushNotifications.addListener('pushNotificationReceived', (notification) => {
            var audio = new Audio("assets/audio.mp3");
            audio.play();
            let pn = Modals.alert({
                title: notification.title,
                message: notification.body
            });
        });
        PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
            this.nav.navigateRoot("/notification");
        });
    }
    loadData() {
        if (this.user.status == 0)
            this.fetchDisplay();
        else {
            if (this.currItemStatus == 0)
                this.fetchDisplay();
            else
                this.fetchAuction();
        }
        this.infiniteScroll.complete();
    }
    fetchDisplay() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.fetchDisplayService = yield this.productsService.getDisplayItems(this.lazyLoadIndex.display)
                .subscribe(data => {
                for (let index in data) {
                    //rating stars
                    data[index]["ratingStars"] = this.computeRating(data[index]["rate"]);
                    data[index]["Status"] = 0;
                    this.displayItems.push(data[index]);
                    this.lazyLoadIndex.display = data[index]["recNo"];
                }
                this.activeItems = this.displayItems;
            });
        });
    }
    ;
    fetchAuction() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.fetchAuctionService = yield this.productsService.getAuctionItems(this.lazyLoadIndex.auction)
                .subscribe(data => {
                for (let index in data) {
                    data[index]["DateTimeLimit"] = data[index]["DateTimeLimit"].split("T")[0];
                    data[index]["Status"] = 1;
                    this.auctionItems.push(data[index]);
                    this.lazyLoadIndex.auction = data[index]["recNo"];
                }
                this.activeItems = this.auctionItems;
            });
        });
    }
    ;
    segmentChanged(e) {
        if (e.detail.value == 'display') {
            this.activeItems = this.displayItems;
            this.currItemStatus = 0;
        }
        else {
            this.activeItems = this.auctionItems;
            this.currItemStatus = 1;
        }
    }
    computeRating(rate) {
        let whole, half, none, array = [];
        whole = Math.trunc(rate);
        half = Math.ceil(rate - whole);
        none = Math.trunc(5 - (whole + half));
        //construct data
        for (const index of [].constructor(whole))
            array.push("star");
        for (const index of [].constructor(half))
            array.push("star-half");
        for (const index of [].constructor(none))
            array.push("star-outline");
        return array;
    }
    goToView(item) {
        let data = {
            name: item.ProductName,
            id: item.ProductId,
            status: item.Status
        };
        let params = {
            queryParams: {
                q: JSON.stringify(data)
            }
        };
        this.nav.navigateRoot(["/item-view"], params);
    }
    setToDefault() {
        this.displayItems = [];
        this.auctionItems = [];
        this.activeItems = [];
    }
    ngOnDestroy() {
        this.setToDefault();
        this.fetchDisplayService.unsubscribe();
        if (this.fetchAuctionService != null)
            this.fetchAuctionService.unsubscribe();
        if (this.searchProduct != null)
            this.searchProduct.unsubscribe();
    }
};
HomePage.ctorParameters = () => [
    { type: _services_profile_service__WEBPACK_IMPORTED_MODULE_8__["ProfileService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"] },
    { type: _services_env_service__WEBPACK_IMPORTED_MODULE_6__["EnvService"] },
    { type: _services_products_service__WEBPACK_IMPORTED_MODULE_2__["ProductsService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] }
];
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
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_profile_service__WEBPACK_IMPORTED_MODULE_8__["ProfileService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"], _services_env_service__WEBPACK_IMPORTED_MODULE_6__["EnvService"], _services_products_service__WEBPACK_IMPORTED_MODULE_2__["ProductsService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
], HomePage);



/***/ })

}]);
//# sourceMappingURL=home-home-module-es2015.js.map