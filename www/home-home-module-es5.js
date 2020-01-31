(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/components/category-slider/category-slider.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/category-slider/category-slider.component.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-slides [options]=\"categorySlideOpts\" *ngIf=\"Categories != null; else NoData\">\n  <ion-slide *ngFor=\"let c of Categories\" (click)=\"selectCategory(c)\">\n    <ion-card class=\"category\">\n      <ion-header>\n        <img src=\"https://dummyimage.com/sqrpop\" alt=\"\"\n          onerror=\"this.onerror=null; this.src='../assets/placeholder.png'\">\n        <ion-card-title>{{c.CategoryName}}</ion-card-title>\n      </ion-header>\n    </ion-card>\n  </ion-slide>\n\n  <ion-slide (click)=\"browseAll(1)\">\n    <ion-card class=\"category\">\n      <ion-header>\n        <img src=\"../../../assets/plus.png\" />\n        <ion-card-title>See all categories</ion-card-title>\n      </ion-header>\n    </ion-card>\n  </ion-slide>\n</ion-slides>\n\n<ng-template #NoData>\n  <ion-item>\n    No data\n  </ion-item>\n</ng-template>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/company-slider/company-slider.component.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/company-slider/company-slider.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-slides [options]=\"companySlideOpts\">\n  <ion-slide *ngFor=\"let c of Companies\">\n    <ion-card (click)=\"openCompanyDetails(c)\" class=\"company\">\n      <ion-header>\n        <img src=\"https://dummyimage.com/sqrpop\" alt=\"\"\n          onerror=\"this.onerror=null;this.src='../assets/placeholder.png'\">\n        <ion-card-title>{{c.companyName}}</ion-card-title>\n      </ion-header>\n    </ion-card>\n  </ion-slide>\n  <ion-slide>\n    <ion-card class=\"company\" (click)=\"browseAll(2)\">\n      <ion-header>\n        <img src=\"../../../assets/plus.png\" />\n        <ion-card-title>See all companies</ion-card-title>\n      </ion-header>\n    </ion-card>\n  </ion-slide>\n</ion-slides>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/home/home.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-buttons slot=\"end\">\n      <ion-button fill=\"clear\">\n        <ion-icon slot=\"icon-only\" name=\"notifications\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n  <ion-toolbar color=\"primary\">\n    <ion-searchbar placeholder=\"Search Items\"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>browse by categories</ion-label>\n    </ion-list-header>\n    <app-category-slider></app-category-slider>\n  </ion-list>\n\n  <ion-list lines=\"none\">\n    <ion-list-header>\n      <ion-label>browse by company</ion-label>\n    </ion-list-header>\n    <app-company-slider></app-company-slider>\n  </ion-list>\n\n  <ion-list lines=\"none\" class=\"itemList\">\n    <ion-segment value=\"auction\" (ionChange)=\"segmentChanged($event)\" color=\"primary\">\n      <ion-segment-button size-xs=\"6\" value=\"auction\">\n        <ion-label>Auction</ion-label>\n      </ion-segment-button>\n      <ion-segment-button size-xs=\"6\" value=\"display\">\n        <ion-label>On Display</ion-label>\n      </ion-segment-button>\n    </ion-segment>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col size-xs=\"6\" *ngFor=\"let items of displayItems\" class=\"item\">\n          <div class=\"badgeHolder\">\n            <div class=\"bidBadge\">\n              {{items.NoOfBidders ? (items.NoOfBidders + ' Bidders') : (items.NoOfDays + ' Days Left')}}\n            </div>\n          </div>\n          <img src=\"../../assets/shapes.svg\" />\n          <ion-text>\n            <h5>{{items.itemName}}</h5>\n            <h5 class=\"price\"> {{items.CurrentBidPrice | currency : '&#8369; '}}</h5>\n          </ion-text>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n</ion-content>"

/***/ }),

/***/ "./src/app/components/category-slider/category-slider.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/category-slider/category-slider.component.ts ***!
  \*************************************************************************/
/*! exports provided: CategorySliderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategorySliderComponent", function() { return CategorySliderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_category_products_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/category-products.service */ "./src/app/services/category-products.service.ts");




var CategorySliderComponent = /** @class */ (function () {
    function CategorySliderComponent(router, categoryService) {
        this.router = router;
        this.categoryService = categoryService;
        this.categorySlideOpts = {
            slidesPerView: 2,
        };
    }
    CategorySliderComponent.prototype.ngOnInit = function () {
        this.getCategories();
    };
    CategorySliderComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoryService.getCategories()
            .subscribe(function (data) {
            _this.Categories = data;
        });
    };
    CategorySliderComponent.prototype.selectCategory = function (c) {
        var data = {
            queryParams: {
                categoryId: c.CategoryId,
                categoryName: c.CategoryName
            }
        };
        this.router.navigate(['/category-view'], data);
    };
    CategorySliderComponent.prototype.browseAll = function (id) {
        var data = {
            queryParams: {
                browseId: id
            }
        };
        this.router.navigate(['/browse-by-all'], data);
    };
    CategorySliderComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _services_category_products_service__WEBPACK_IMPORTED_MODULE_3__["CategoryProductsService"] }
    ]; };
    CategorySliderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-category-slider',
            template: __webpack_require__(/*! raw-loader!./category-slider.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/category-slider/category-slider.component.html"),
            styles: [__webpack_require__(/*! ../components.scss */ "./src/app/components/components.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _services_category_products_service__WEBPACK_IMPORTED_MODULE_3__["CategoryProductsService"]])
    ], CategorySliderComponent);
    return CategorySliderComponent;
}());



/***/ }),

/***/ "./src/app/components/company-slider/company-slider.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/components/company-slider/company-slider.component.ts ***!
  \***********************************************************************/
/*! exports provided: CompanySliderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompanySliderComponent", function() { return CompanySliderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var CompanySliderComponent = /** @class */ (function () {
    function CompanySliderComponent(router) {
        this.router = router;
        this.companySlideOpts = {
            slidesPerView: 3
        };
        this.Companies = [{
                companyId: 1,
                companyName: "company1 qweqwe qweqwe "
            }, {
                companyId: 2,
                companyName: "company2 qweqwe qwe qwe"
            }, {
                companyId: 3,
                companyName: "company3 qweqwe qwe qwqwq w"
            }, {
                companyId: 4,
                companyName: "company4 asd asd asd asda sd"
            }, {
                companyId: 5,
                companyName: "company5 asd asd asda sdas"
            }, {
                companyId: 6,
                companyName: "company6 asd asda sdasd"
            },];
    }
    CompanySliderComponent.prototype.ngOnInit = function () { };
    CompanySliderComponent.prototype.openCompanyDetails = function (c) {
        var data = {
            queryParams: {
                companyId: c.companyId,
                companyName: c.companyName
            }
        };
        this.router.navigate(['/company-view'], data);
    };
    CompanySliderComponent.prototype.browseAll = function (id) {
        var data = {
            queryParams: {
                browseId: id
            }
        };
        this.router.navigate(['/browse-by-all'], data);
    };
    CompanySliderComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    CompanySliderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-company-slider',
            template: __webpack_require__(/*! raw-loader!./company-slider.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/company-slider/company-slider.component.html"),
            styles: [__webpack_require__(/*! ../components.scss */ "./src/app/components/components.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], CompanySliderComponent);
    return CompanySliderComponent;
}());



/***/ }),

/***/ "./src/app/components/components.module.ts":
/*!*************************************************!*\
  !*** ./src/app/components/components.module.ts ***!
  \*************************************************/
/*! exports provided: ComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function() { return ComponentsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _category_slider_category_slider_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category-slider/category-slider.component */ "./src/app/components/category-slider/category-slider.component.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _company_slider_company_slider_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./company-slider/company-slider.component */ "./src/app/components/company-slider/company-slider.component.ts");






var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_category_slider_category_slider_component__WEBPACK_IMPORTED_MODULE_2__["CategorySliderComponent"], _company_slider_company_slider_component__WEBPACK_IMPORTED_MODULE_5__["CompanySliderComponent"]],
            exports: [_category_slider_category_slider_component__WEBPACK_IMPORTED_MODULE_2__["CategorySliderComponent"], _company_slider_company_slider_component__WEBPACK_IMPORTED_MODULE_5__["CompanySliderComponent"]],
            imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());



/***/ }),

/***/ "./src/app/components/components.scss":
/*!********************************************!*\
  !*** ./src/app/components/components.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-card {\n  box-shadow: none !important;\n}\nion-card ion-card-title {\n  font-size: 14px;\n  padding: 10px 0px;\n}\nion-card.company img {\n  border-radius: 50%;\n  width: 100%;\n  border: 2px solid #c9c9c9;\n}\nion-card.category img {\n  border-radius: 5px;\n  width: 100%;\n  border: 2px solid #c9c9c9;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9EOlxcbGFic1xcaW9uaWNcXEF1Y3Rpb25BcHAvc3JjXFxhcHBcXGNvbXBvbmVudHNcXGNvbXBvbmVudHMuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9jb21wb25lbnRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwyQkFBQTtBQ0NKO0FEQ0k7RUFDSSxlQUFBO0VBQ0EsaUJBQUE7QUNDUjtBREVJO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7QUNBUjtBREdJO0VBQ0ksa0JBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7QUNEUiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvY29tcG9uZW50cy5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNhcmR7XHJcbiAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XHJcbiAgICBcclxuICAgIGlvbi1jYXJkLXRpdGxle1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICBwYWRkaW5nOiAxMHB4IDBweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJi5jb21wYW55ICBpbWd7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNjOWM5Yzk7XHJcbiAgICB9XHJcblxyXG4gICAgJi5jYXRlZ29yeSAgaW1ne1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjYzljOWM5O1xyXG4gICAgfVxyXG59IiwiaW9uLWNhcmQge1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG5pb24tY2FyZCBpb24tY2FyZC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgcGFkZGluZzogMTBweCAwcHg7XG59XG5pb24tY2FyZC5jb21wYW55IGltZyB7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNjOWM5Yzk7XG59XG5pb24tY2FyZC5jYXRlZ29yeSBpbWcge1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDJweCBzb2xpZCAjYzljOWM5O1xufSJdfQ== */"

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

module.exports = ".itemList ion-grid {\n  background-color: #f5f5f5;\n}\n.itemList .item {\n  background-color: #fff;\n  border: 4px solid #f5f5f5;\n}\n.itemList .item ion-text {\n  padding: 0 5px;\n}\n.itemList .item ion-text h5 {\n  margin: 2px auto;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  font-size: 1em;\n}\n.itemList .item .price {\n  color: firebrick;\n}\n.itemList .badgeHolder {\n  position: absolute;\n}\n.itemList .badgeHolder .bidBadge {\n  position: relative;\n  font-size: 12px;\n  top: 0;\n  left: 0;\n  padding: 5px 10px;\n  color: white;\n  background-color: firebrick;\n  z-index: 2;\n}\n.itemList .badgeHolder .bidBadge::after {\n  content: \" \";\n  position: absolute;\n  background-color: firebrick;\n  top: 12;\n  margin-left: 2px;\n  height: 16px;\n  width: 16px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  z-index: -1;\n}\nion-list ion-label {\n  text-transform: uppercase;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9EOlxcbGFic1xcaW9uaWNcXEF1Y3Rpb25BcHAvc3JjXFxhcHBcXGhvbWVcXGhvbWUucGFnZS5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0UseUJBQUE7QUNBSjtBREdFO0VBQ0Usc0JBQUE7RUFDQSx5QkFBQTtBQ0RKO0FER0k7RUFDRSxjQUFBO0FDRE47QURFTTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLDRCQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0FDQVI7QURHSTtFQUNFLGdCQUFBO0FDRE47QURLRTtFQUNFLGtCQUFBO0FDSEo7QURLSTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxVQUFBO0FDSE47QURNSTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsT0FBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxnQ0FBQTtVQUFBLHdCQUFBO0VBQ0EsV0FBQTtBQ0pOO0FEV0U7RUFDRSx5QkFBQTtBQ1JKIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pdGVtTGlzdHtcbiAgaW9uLWdyaWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG4gIH1cblxuICAuaXRlbXtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIGJvcmRlcjogNHB4IHNvbGlkICNmNWY1ZjU7XG5cbiAgICBpb24tdGV4dHtcbiAgICAgIHBhZGRpbmc6IDAgNXB4O1xuICAgICAgaDV7XG4gICAgICAgIG1hcmdpbjogMnB4IGF1dG87XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgICAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsOyAgXG4gICAgICAgIC13ZWJraXQtbGluZS1jbGFtcDogMjtcbiAgICAgICAgZm9udC1zaXplOiAxZW07XG4gICAgICB9XG4gICAgfVxuICAgIC5wcmljZXtcbiAgICAgIGNvbG9yOiBmaXJlYnJpY2s7XG4gICAgfVxuICB9XG5cbiAgLmJhZGdlSG9sZGVye1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcblxuICAgIC5iaWRCYWRnZXtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGZpcmVicmljaztcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuXG4gICAgLmJpZEJhZGdlOjphZnRlcntcbiAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogZmlyZWJyaWNrO1xuICAgICAgdG9wOiAxMjtcbiAgICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gICAgICBoZWlnaHQ6IDE2cHg7XG4gICAgICB3aWR0aDogMTZweDtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgIHotaW5kZXg6IC0xO1xuICAgIH1cbiAgfVxuICBcbn1cblxuaW9uLWxpc3R7XG4gIGlvbi1sYWJlbHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICB9XG59IiwiLml0ZW1MaXN0IGlvbi1ncmlkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbn1cbi5pdGVtTGlzdCAuaXRlbSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJvcmRlcjogNHB4IHNvbGlkICNmNWY1ZjU7XG59XG4uaXRlbUxpc3QgLml0ZW0gaW9uLXRleHQge1xuICBwYWRkaW5nOiAwIDVweDtcbn1cbi5pdGVtTGlzdCAuaXRlbSBpb24tdGV4dCBoNSB7XG4gIG1hcmdpbjogMnB4IGF1dG87XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAtd2Via2l0LWxpbmUtY2xhbXA6IDI7XG4gIGZvbnQtc2l6ZTogMWVtO1xufVxuLml0ZW1MaXN0IC5pdGVtIC5wcmljZSB7XG4gIGNvbG9yOiBmaXJlYnJpY2s7XG59XG4uaXRlbUxpc3QgLmJhZGdlSG9sZGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuLml0ZW1MaXN0IC5iYWRnZUhvbGRlciAuYmlkQmFkZ2Uge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBmaXJlYnJpY2s7XG4gIHotaW5kZXg6IDI7XG59XG4uaXRlbUxpc3QgLmJhZGdlSG9sZGVyIC5iaWRCYWRnZTo6YWZ0ZXIge1xuICBjb250ZW50OiBcIiBcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBmaXJlYnJpY2s7XG4gIHRvcDogMTI7XG4gIG1hcmdpbi1sZWZ0OiAycHg7XG4gIGhlaWdodDogMTZweDtcbiAgd2lkdGg6IDE2cHg7XG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgei1pbmRleDogLTE7XG59XG5cbmlvbi1saXN0IGlvbi1sYWJlbCB7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59Il19 */"

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


var HomePage = /** @class */ (function () {
    function HomePage() {
        this.itemNames = [
            {
                'itemID': 1,
                'itemName': 'Kawat na Cell phone 444 4444 asda  asd asd asd asd asd',
                'NoOfBidders': 14,
                'CurrentBidPrice': 23000
            }, {
                'itemID': 2,
                'itemName': 'Samsung Toilet',
                'NoOfBidders': 5,
                'CurrentBidPrice': 1000
            }, {
                'itemID': 3,
                'itemName': 'Lush Last Least',
                'NoOfBidders': 6,
                'CurrentBidPrice': 12000
            }, {
                'itemID': 4,
                'itemName': 'Kawat na Puso',
                'NoOfBidders': 14,
                'CurrentBidPrice': 23000
            }, {
                'itemID': 5,
                'itemName': 'Kawat na Pusa',
                'NoOfBidders': 14,
                'CurrentBidPrice': 23000
            },
        ];
        this.DisplayItems = [
            {
                'itemID': 1,
                'itemName': 'Display Something',
                'NoOfDays': 5
            }, {
                'itemID': 2,
                'itemName': 'Display Something 2',
                'NoOfDays': 25
            }, {
                'itemID': 3,
                'itemName': 'Display Something 5',
                'NoOfDays': 12
            }, {
                'itemID': 4,
                'itemName': 'Display Something 6',
                'NoOfDays': 15
            }, {
                'itemID': 5,
                'itemName': 'Kawat na Pusa',
                'NoOfDays': 69
            },
        ];
        this.displayItems = this.itemNames;
    }
    HomePage.prototype.segmentChanged = function (e) {
        if (e.detail.value == 'display')
            this.displayItems = this.DisplayItems;
        else
            this.displayItems = this.itemNames;
    };
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/index.js!./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module-es5.js.map