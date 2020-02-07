(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-company-view-company-view-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/company-view/company-view.page.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/company-view/company-view.page.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>{{ companyName}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  {{ companyId }}\n</ion-content>"

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

/***/ "./src/app/pages/company-view/company-view.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/company-view/company-view.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvbXBhbnktdmlldy9jb21wYW55LXZpZXcucGFnZS5zY3NzIn0= */"

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



var CompanyViewPage = /** @class */ (function () {
    function CompanyViewPage(route) {
        var _this = this;
        this.route = route;
        this.route.queryParams.subscribe(function (params) {
            var data = JSON.parse(params.q.toString());
            _this.companyId = data.id;
            _this.companyName = data.name;
        });
    }
    CompanyViewPage.prototype.ngOnInit = function () {
    };
    CompanyViewPage.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
    ]; };
    CompanyViewPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-company-view',
            template: __webpack_require__(/*! raw-loader!./company-view.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/company-view/company-view.page.html"),
            styles: [__webpack_require__(/*! ./company-view.page.scss */ "./src/app/pages/company-view/company-view.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], CompanyViewPage);
    return CompanyViewPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-company-view-company-view-module-es5.js.map