(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-browse-by-all-browse-by-all-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/browse-by-all/browse-by-all.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/browse-by-all/browse-by-all.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>{{itemId}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/browse-by-all/browse-by-all-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/browse-by-all/browse-by-all-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: BrowseByAllPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowseByAllPageRoutingModule", function() { return BrowseByAllPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _browse_by_all_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./browse-by-all.page */ "./src/app/pages/browse-by-all/browse-by-all.page.ts");




var routes = [
    {
        path: '',
        component: _browse_by_all_page__WEBPACK_IMPORTED_MODULE_3__["BrowseByAllPage"]
    }
];
var BrowseByAllPageRoutingModule = /** @class */ (function () {
    function BrowseByAllPageRoutingModule() {
    }
    BrowseByAllPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], BrowseByAllPageRoutingModule);
    return BrowseByAllPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/browse-by-all/browse-by-all.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/browse-by-all/browse-by-all.module.ts ***!
  \*************************************************************/
/*! exports provided: BrowseByAllPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowseByAllPageModule", function() { return BrowseByAllPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _browse_by_all_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./browse-by-all-routing.module */ "./src/app/pages/browse-by-all/browse-by-all-routing.module.ts");
/* harmony import */ var _browse_by_all_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./browse-by-all.page */ "./src/app/pages/browse-by-all/browse-by-all.page.ts");







var BrowseByAllPageModule = /** @class */ (function () {
    function BrowseByAllPageModule() {
    }
    BrowseByAllPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _browse_by_all_routing_module__WEBPACK_IMPORTED_MODULE_5__["BrowseByAllPageRoutingModule"]
            ],
            declarations: [_browse_by_all_page__WEBPACK_IMPORTED_MODULE_6__["BrowseByAllPage"]]
        })
    ], BrowseByAllPageModule);
    return BrowseByAllPageModule;
}());



/***/ }),

/***/ "./src/app/pages/browse-by-all/browse-by-all.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/pages/browse-by-all/browse-by-all.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Jyb3dzZS1ieS1hbGwvYnJvd3NlLWJ5LWFsbC5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/browse-by-all/browse-by-all.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/browse-by-all/browse-by-all.page.ts ***!
  \***********************************************************/
/*! exports provided: BrowseByAllPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowseByAllPage", function() { return BrowseByAllPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var BrowseByAllPage = /** @class */ (function () {
    function BrowseByAllPage(route) {
        var _this = this;
        this.route = route;
        this.route.queryParams.subscribe(function (params) {
            _this.itemId = params.browseId;
        });
    }
    BrowseByAllPage.prototype.ngOnInit = function () {
    };
    BrowseByAllPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
    ]; };
    BrowseByAllPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-browse-by-all',
            template: __webpack_require__(/*! raw-loader!./browse-by-all.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/browse-by-all/browse-by-all.page.html"),
            styles: [__webpack_require__(/*! ./browse-by-all.page.scss */ "./src/app/pages/browse-by-all/browse-by-all.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], BrowseByAllPage);
    return BrowseByAllPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-browse-by-all-browse-by-all-module-es5.js.map