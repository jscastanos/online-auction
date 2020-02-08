(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/home.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"{{statusColor}}\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-badge color=\"light\" *ngIf=\"status == 0\">Unverified</ion-badge>\n      <ion-button fill=\"clear\">\n        <ion-icon slot=\"icon-only\" name=\"notifications\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n\n  <ion-toolbar color=\"{{statusColor}}\">\n    <ion-searchbar placeholder=\"Search Items\"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n<ion-content>\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>browse by categories</ion-label>\n    </ion-list-header>\n    <app-slider [options]=\"categorySliderOpts\"></app-slider>\n  </ion-list>\n\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>browse by company</ion-label>\n    </ion-list-header>\n    <app-slider [options]=\"companySliderOpts\"></app-slider>\n  </ion-list>\n\n  <ion-list lines=\"none\" class=\"itemList\">\n    <ion-segment value=\"auction\" (ionChange)=\"segmentChanged($event)\" color=\"primary\">\n      <ion-segment-button size-xs=\"6\" value=\"auction\" *ngIf=\"status != 0\">\n        <ion-label>Auction</ion-label>\n      </ion-segment-button>\n      <ion-segment-button size-xs=\"6\" value=\"display\">\n        <ion-label>On Display</ion-label>\n      </ion-segment-button>\n    </ion-segment>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col size-xs=\"6\" *ngFor=\"let items of activeItems\" class=\"item\">\n          <div class=\"badgeHolder\">\n            <div class=\"bidBadge\">\n              {{items.NoOfBidders ? (items.NoOfBidders + ' Bidders') : (items.NoOfDays + ' Days Left')}}\n            </div>\n          </div>\n          <img src=\"../../assets/shapes.svg\" onerror=\"this.onerror = null; this.src = '../assets/placeholder.png'\" />\n          <ion-text>\n            <h1>{{items.rowNum}}</h1>\n            <h5>{{items.productName}}</h5>\n            <h5 class=\"price\"> {{items.CurrentBidPrice | currency : '&#8369; '}}</h5>\n          </ion-text>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n\n  <ion-infinite-scroll threshold=\"10px\" (ionInfinite)=\"loadData()\">\n    <ion-infinite-scroll-content style=\"padding-top: 10px;\" loadingSpinner=\"crescent\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>"

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

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".itemList ion-grid {\n  background-color: #f5f5f5;\n}\n.itemList .item {\n  background-color: #fff;\n  border: 4px solid #f5f5f5;\n}\n.itemList .item ion-text {\n  padding: 0 5px;\n}\n.itemList .item ion-text h5 {\n  margin: 2px auto;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  font-size: 1em;\n}\n.itemList .item .price {\n  color: firebrick;\n}\n.itemList .badgeHolder {\n  position: absolute;\n}\n.itemList .badgeHolder .bidBadge {\n  position: relative;\n  font-size: 12px;\n  top: 0;\n  left: 0;\n  padding: 5px 10px;\n  color: white;\n  background-color: firebrick;\n  z-index: 2;\n}\n.itemList .badgeHolder .bidBadge::after {\n  content: \" \";\n  position: absolute;\n  background-color: firebrick;\n  top: 12;\n  margin-left: 2px;\n  height: 16px;\n  width: 16px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  z-index: -1;\n}\nion-list ion-label {\n  text-transform: uppercase;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9EOlxcd29ya1xcUHJvamVjdHNcXEFjY1JlYWxTb2Z0XFxNb2JpbGVcXG9ubGluZWF1Y3Rpb25hcHAvc3JjXFxhcHBcXGhvbWVcXGhvbWUucGFnZS5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0UseUJBQUE7QUNBSjtBREdFO0VBQ0Usc0JBQUE7RUFDQSx5QkFBQTtBQ0RKO0FER0k7RUFDRSxjQUFBO0FDRE47QURFTTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLDRCQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0FDQVI7QURHSTtFQUNFLGdCQUFBO0FDRE47QURLRTtFQUNFLGtCQUFBO0FDSEo7QURLSTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxVQUFBO0FDSE47QURNSTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsT0FBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxnQ0FBQTtVQUFBLHdCQUFBO0VBQ0EsV0FBQTtBQ0pOO0FEV0U7RUFDRSx5QkFBQTtBQ1JKIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pdGVtTGlzdHtcbiAgaW9uLWdyaWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG4gIH1cblxuICAuaXRlbXtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIGJvcmRlcjogNHB4IHNvbGlkICNmNWY1ZjU7XG5cbiAgICBpb24tdGV4dHtcbiAgICAgIHBhZGRpbmc6IDAgNXB4O1xuICAgICAgaDV7XG4gICAgICAgIG1hcmdpbjogMnB4IGF1dG87XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgICAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsOyAgXG4gICAgICAgIC13ZWJraXQtbGluZS1jbGFtcDogMjtcbiAgICAgICAgZm9udC1zaXplOiAxZW07XG4gICAgICB9XG4gICAgfVxuICAgIC5wcmljZXtcbiAgICAgIGNvbG9yOiBmaXJlYnJpY2s7XG4gICAgfVxuICB9XG5cbiAgLmJhZGdlSG9sZGVye1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcblxuICAgIC5iaWRCYWRnZXtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGZpcmVicmljaztcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuXG4gICAgLmJpZEJhZGdlOjphZnRlcntcbiAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogZmlyZWJyaWNrO1xuICAgICAgdG9wOiAxMjtcbiAgICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gICAgICBoZWlnaHQ6IDE2cHg7XG4gICAgICB3aWR0aDogMTZweDtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgIHotaW5kZXg6IC0xO1xuICAgIH1cbiAgfVxuICBcbn1cblxuaW9uLWxpc3R7XG4gIGlvbi1sYWJlbHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICB9XG59IiwiLml0ZW1MaXN0IGlvbi1ncmlkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbn1cbi5pdGVtTGlzdCAuaXRlbSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogNHB4IHNvbGlkICNmNWY1ZjU7XG59XG4uaXRlbUxpc3QgLml0ZW0gaW9uLXRleHQge1xuICBwYWRkaW5nOiAwIDVweDtcbn1cbi5pdGVtTGlzdCAuaXRlbSBpb24tdGV4dCBoNSB7XG4gIG1hcmdpbjogMnB4IGF1dG87XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAtd2Via2l0LWxpbmUtY2xhbXA6IDI7XG4gIGZvbnQtc2l6ZTogMWVtO1xufVxuLml0ZW1MaXN0IC5pdGVtIC5wcmljZSB7XG4gIGNvbG9yOiBmaXJlYnJpY2s7XG59XG4uaXRlbUxpc3QgLmJhZGdlSG9sZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuLml0ZW1MaXN0IC5iYWRnZUhvbGRlciAuYmlkQmFkZ2Uge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBmaXJlYnJpY2s7XG4gIHotaW5kZXg6IDI7XG59XG4uaXRlbUxpc3QgLmJhZGdlSG9sZGVyIC5iaWRCYWRnZTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBmaXJlYnJpY2s7XG4gIHRvcDogMTI7XG4gIG1hcmdpbi1sZWZ0OiAycHg7XG4gIGhlaWdodDogMTZweDtcbiAgd2lkdGg6IDE2cHg7XG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgei1pbmRleDogLTE7XG59XG5cbmlvbi1saXN0IGlvbi1sYWJlbCB7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59Il19 */"

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





var HomePage = /** @class */ (function () {
    function HomePage(productsService, auth) {
        this.productsService = productsService;
        this.auth = auth;
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
            requestUrl: '/category',
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
            requestUrl: '/company',
            dataObject: {
                id: 'BranchId',
                name: 'BranchName'
            }
        };
        this.statusColor = "medium";
        this.fetchDisplay();
        this.fetchAuction();
        this.init();
    }
    HomePage.prototype.init = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var data;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.auth.checkId()];
                    case 1:
                        data = _a.sent();
                        this.userID = data["id"];
                        this.status = data["status"];
                        if (this.status == 0) {
                            this.statusColor = "danger";
                        }
                        else {
                            this.statusColor = "primary";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.loadData = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.currItemStatus == 0)
                _this.fetchDisplay();
            else
                _this.fetchAuction();
            _this.infiniteScroll.complete();
        }, 300);
    };
    HomePage.prototype.fetchDisplay = function () {
        var _this = this;
        this.productsService.getDisplayItems(this.lazyLoadIndex.display)
            .subscribe(function (data) {
            for (var index in data) {
                _this.displayItems.push(data[index]);
                _this.lazyLoadIndex.display = data[index]["rowNum"];
            }
            _this.activeItems = _this.displayItems;
        });
    };
    ;
    HomePage.prototype.fetchAuction = function () {
        var _this = this;
        this.productsService.getAuctionItems(this.lazyLoadIndex.auction)
            .subscribe(function (data) {
            for (var index in data) {
                _this.auctionItems.push(data[index]);
                _this.lazyLoadIndex.auction = data[index]["rowNum"];
            }
            _this.activeItems = _this.auctionItems;
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
    HomePage.ctorParameters = function () { return [
        { type: _services_products_service__WEBPACK_IMPORTED_MODULE_2__["ProductsService"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] }
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
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_products_service__WEBPACK_IMPORTED_MODULE_2__["ProductsService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module-es5.js.map