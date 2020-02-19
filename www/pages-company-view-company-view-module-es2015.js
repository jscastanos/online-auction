(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-company-view-company-view-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/company-view/company-view.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/company-view/company-view.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"{{user.statusColor}}\">\n    <ion-buttons slot=\"start\">\n      <ion-button [routerLink]=\"['/home']\">\n        <ion-icon name=\"arrow-back\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-title>{{ companyName }}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list lines=\"none\" class=\"itemList\">\n    <ion-grid>\n      <ion-row *ngIf=\"products.length > 0; else nodata\">\n        <ion-col size-xs=\"6\" *ngFor=\"let items of products\" class=\"item\" (click)=\"goToView(items)\">\n          <div class=\"badgeHolder\">\n            <div class=\"bidBadge\" [ngClass]=\"{'badge-success' : items.Status == 1}\">\n              {{items.Status == 1 ? \"On Auction\" : \"For Display\"}}\n            </div>\n          </div>\n          <img src=\"{{url}}/image/image.png\" onerror=\"this.onerror = null; this.src = '../assets/placeholder.png'\" />\n          <ion-text>\n            <h5>{{items.ProductName}}</h5>\n          </ion-text>\n        </ion-col>\n      </ion-row>\n      <ng-template #nodata>\n        <ion-row>\n          <ion-col>No Items</ion-col>\n        </ion-row>\n      </ng-template>\n    </ion-grid>\n  </ion-list>\n\n  <ion-infinite-scroll threshold=\"10px\" (ionInfinite)=\"loadData()\">\n    <ion-infinite-scroll-content style=\"padding-top: 10px;\" loadingSpinner=\"crescent\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>"

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _company_view_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./company-view.page */ "./src/app/pages/company-view/company-view.page.ts");




const routes = [
    {
        path: '',
        component: _company_view_page__WEBPACK_IMPORTED_MODULE_3__["CompanyViewPage"]
    }
];
let CompanyViewPageRoutingModule = class CompanyViewPageRoutingModule {
};
CompanyViewPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], CompanyViewPageRoutingModule);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _company_view_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./company-view-routing.module */ "./src/app/pages/company-view/company-view-routing.module.ts");
/* harmony import */ var _company_view_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./company-view.page */ "./src/app/pages/company-view/company-view.page.ts");







let CompanyViewPageModule = class CompanyViewPageModule {
};
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_products_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/products.service */ "./src/app/services/products.service.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_services_env_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/env.service */ "./src/app/services/env.service.ts");







let CompanyViewPage = class CompanyViewPage {
    constructor(nav, route, router, env, productsService, common) {
        this.nav = nav;
        this.route = route;
        this.router = router;
        this.env = env;
        this.productsService = productsService;
        this.common = common;
        this.products = [];
        this.index = 0;
        this.route.queryParams.subscribe(params => {
            let data = JSON.parse(params.q.toString());
            this.companyId = data.id;
            this.companyName = data.name;
        });
        this.url = this.env.URL;
        this.user = this.common.user;
        this.router.events.subscribe((ev) => {
            if (ev instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]) {
                if ((ev.url).includes("/company-view"))
                    this.getProducts();
                else {
                    this.products = [];
                    this.index = 0;
                    this.fetchProductsService.unsubscribe();
                }
            }
        });
    }
    ngOnInit() {
        this.index = 0;
        this.getProducts();
    }
    loadData() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.getProducts();
            this.infiniteScroll.complete();
        });
    }
    getProducts() {
        this.fetchProductsService = this.productsService.getProductsFromCompany(this.companyId, this.index, this.user.status)
            .subscribe(data => {
            for (let index of Object.keys(data)) {
                this.products.push(data[index]);
                this.index = data[Object.keys(data).length - 1].recNo;
            }
            this.fetchProductsService.unsubscribe();
        });
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
};
CompanyViewPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_services_env_service__WEBPACK_IMPORTED_MODULE_6__["EnvService"] },
    { type: _services_products_service__WEBPACK_IMPORTED_MODULE_3__["ProductsService"] },
    { type: src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonInfiniteScroll"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonInfiniteScroll"])
], CompanyViewPage.prototype, "infiniteScroll", void 0);
CompanyViewPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-company-view',
        template: __webpack_require__(/*! raw-loader!./company-view.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/company-view/company-view.page.html"),
        styles: [__webpack_require__(/*! ../../home/home.page.scss */ "./src/app/home/home.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], src_app_services_env_service__WEBPACK_IMPORTED_MODULE_6__["EnvService"], _services_products_service__WEBPACK_IMPORTED_MODULE_3__["ProductsService"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
], CompanyViewPage);



/***/ })

}]);
//# sourceMappingURL=pages-company-view-company-view-module-es2015.js.map