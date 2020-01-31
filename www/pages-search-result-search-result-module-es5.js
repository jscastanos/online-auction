(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-search-result-search-result-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/search-result/search-result.page.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/search-result/search-result.page.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>searchResult</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/search-result/search-result-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/search-result/search-result-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: SearchResultPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchResultPageRoutingModule", function() { return SearchResultPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _search_result_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search-result.page */ "./src/app/pages/search-result/search-result.page.ts");




var routes = [
    {
        path: '',
        component: _search_result_page__WEBPACK_IMPORTED_MODULE_3__["SearchResultPage"]
    }
];
var SearchResultPageRoutingModule = /** @class */ (function () {
    function SearchResultPageRoutingModule() {
    }
    SearchResultPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], SearchResultPageRoutingModule);
    return SearchResultPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/search-result/search-result.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/search-result/search-result.module.ts ***!
  \*************************************************************/
/*! exports provided: SearchResultPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchResultPageModule", function() { return SearchResultPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _search_result_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search-result-routing.module */ "./src/app/pages/search-result/search-result-routing.module.ts");
/* harmony import */ var _search_result_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search-result.page */ "./src/app/pages/search-result/search-result.page.ts");







var SearchResultPageModule = /** @class */ (function () {
    function SearchResultPageModule() {
    }
    SearchResultPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _search_result_routing_module__WEBPACK_IMPORTED_MODULE_5__["SearchResultPageRoutingModule"]
            ],
            declarations: [_search_result_page__WEBPACK_IMPORTED_MODULE_6__["SearchResultPage"]]
        })
    ], SearchResultPageModule);
    return SearchResultPageModule;
}());



/***/ }),

/***/ "./src/app/pages/search-result/search-result.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/pages/search-result/search-result.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3NlYXJjaC1yZXN1bHQvc2VhcmNoLXJlc3VsdC5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/search-result/search-result.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/search-result/search-result.page.ts ***!
  \***********************************************************/
/*! exports provided: SearchResultPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchResultPage", function() { return SearchResultPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SearchResultPage = /** @class */ (function () {
    function SearchResultPage() {
    }
    SearchResultPage.prototype.ngOnInit = function () {
    };
    SearchResultPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-search-result',
            template: __webpack_require__(/*! raw-loader!./search-result.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/search-result/search-result.page.html"),
            styles: [__webpack_require__(/*! ./search-result.page.scss */ "./src/app/pages/search-result/search-result.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SearchResultPage);
    return SearchResultPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-search-result-search-result-module-es5.js.map