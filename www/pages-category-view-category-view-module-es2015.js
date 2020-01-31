(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-category-view-category-view-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/category-view/category-view.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/category-view/category-view.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>{{ categoryName }}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-item *ngFor=\"let p of products\">\n    {{p.ProductName}}\n  </ion-item>\n</ion-content>"

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _category_view_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category-view.page */ "./src/app/pages/category-view/category-view.page.ts");




const routes = [
    {
        path: '',
        component: _category_view_page__WEBPACK_IMPORTED_MODULE_3__["CategoryViewPage"]
    }
];
let CategoryViewPageRoutingModule = class CategoryViewPageRoutingModule {
};
CategoryViewPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], CategoryViewPageRoutingModule);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _category_view_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./category-view-routing.module */ "./src/app/pages/category-view/category-view-routing.module.ts");
/* harmony import */ var _category_view_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./category-view.page */ "./src/app/pages/category-view/category-view.page.ts");







let CategoryViewPageModule = class CategoryViewPageModule {
};
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



/***/ }),

/***/ "./src/app/pages/category-view/category-view.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/pages/category-view/category-view.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NhdGVnb3J5LXZpZXcvY2F0ZWdvcnktdmlldy5wYWdlLnNjc3MifQ== */"

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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_category_products_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/category-products.service */ "./src/app/services/category-products.service.ts");




let CategoryViewPage = class CategoryViewPage {
    constructor(route, categoryService) {
        this.route = route;
        this.categoryService = categoryService;
        this.route.queryParams.subscribe(params => {
            this.categoryId = params.categoryId;
            this.categoryName = params.categoryName;
        });
    }
    ngOnInit() {
        this.getProducts();
    }
    getProducts() {
        this.categoryService.getProductsFromCategory(this.categoryId)
            .subscribe(data => {
            this.products = data;
        });
    }
};
CategoryViewPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _services_category_products_service__WEBPACK_IMPORTED_MODULE_3__["CategoryProductsService"] }
];
CategoryViewPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-category-view',
        template: __webpack_require__(/*! raw-loader!./category-view.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/category-view/category-view.page.html"),
        styles: [__webpack_require__(/*! ./category-view.page.scss */ "./src/app/pages/category-view/category-view.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _services_category_products_service__WEBPACK_IMPORTED_MODULE_3__["CategoryProductsService"]])
], CategoryViewPage);



/***/ })

}]);
//# sourceMappingURL=pages-category-view-category-view-module-es2015.js.map