(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["auth-register-register-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/auth/register/register.page.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/auth/register/register.page.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n  <div class=\"overlay\">\n    <form [formGroup]=\"registerForm\" (ngSubmit)=\"register(registerForm)\">\n      <ion-grid>\n        <ion-row>\n          <ion-col size-xs=\"12\">\n            <ion-text>\n              <h1>AUCTION</h1>\n            </ion-text>\n          </ion-col>\n          <ion-col>\n            <ion-text size-xs=\"12\">\n              <h5>Create an account</h5>\n            </ion-text>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col size-xs=\"12\" class=\"ion-align-self-center\">\n            <div class=\"ion-padding\">\n              <ion-item class=\"ion-margin-top\">\n                <ion-icon name=\"person\"></ion-icon>\n                <ion-input type=\"text\" required formControlName=\"username\" placeholder=\"Username\"\n                  (keyup)=\"updateValidation('username')\"></ion-input>\n              </ion-item>\n              <ion-label color=\"danger\" *ngIf=\"validations.username_available\">\n                * Username Not Available\n              </ion-label>\n              <br />\n              <ion-label color=\"danger\" *ngIf=\"validations.username\">\n                * Please Provide Username\n              </ion-label>\n\n\n              <ion-item class=\"ion-margin-top\">\n                <ion-icon name=\"key\"></ion-icon>\n                <ion-input type=\"password\" required formControlName=\"password\" placeholder=\"Password\"\n                  (keyup)=\"updateValidation('password')\"></ion-input>\n              </ion-item>\n              <ion-label color=\"danger\" *ngIf=\"validations.password\">\n                * Please Provide Password\n              </ion-label>\n              <ion-item class=\"ion-margin-top\">\n                <ion-icon name=\"key\"></ion-icon>\n                <ion-input type=\"password\" required formControlName=\"confirm_password\" placeholder=\"Confirm Password\"\n                  (keyup)=\"updateValidation('confirm_password')\">\n                </ion-input>\n              </ion-item>\n              <ion-label color=\"danger\" *ngIf=\"validations.confirm_password\">\n                * Please Re-Type Password\n              </ion-label>\n              <ion-label color=\"danger\"\n                *ngIf=\"!registerForm.get('confirm_password').errors && registerForm.hasError('passwordNotMatch')\">\n                * Password and Confirm Password don't match\n              </ion-label>\n\n              <ion-item class=\"ion-margin-top\">\n                <ion-icon name=\"calendar\"></ion-icon>\n                <ion-datetime displayFormat=\"D MMM YYYY\" formControlName=\"DOB\" placeholder=\"Date Of Birth\"\n                  (ionChange)=\"updateValidation('DOB')\">\n                </ion-datetime>\n              </ion-item>\n              <ion-label color=\"danger\" *ngIf=\"validations.DOB\">\n                * You must provide your date of birth\n              </ion-label>\n\n              <ion-label color=\"danger\" *ngIf=\"validations.underAge\">\n                * You are a minor. You can't join this app.\n              </ion-label>\n\n              <div style=\"margin-top: 50px;\">\n                <ion-label>\n                  <ion-checkbox formControlName=\"readTAC\" (ionChange)=\"updateValidation('readTAC')\"></ion-checkbox> I\n                  have read the terms and conditions\n                </ion-label>\n                <br />\n                <ion-label *ngIf=\"!validations.readTAC\" color=\"danger\">\n                  * You need to agree with our terms and conditions\n                </ion-label>\n              </div>\n\n            </div>\n\n            <div class=\"ion-padding\">\n              <ion-button color=\"primary\" shape=\"round\" size=\"md\" type=\"submit\" expand=\"full\">REGISTER</ion-button>\n            </div>\n          </ion-col>\n          <ion-col>\n            <ion-text>\n              <h5>Already have an account.\n                <a [routerLink]=\"['../login']\">Log In</a> </h5>\n            </ion-text>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </form>\n  </div>\n</ion-content>"

/***/ }),

/***/ "./src/app/auth/register/register-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/auth/register/register-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: RegisterPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageRoutingModule", function() { return RegisterPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register.page */ "./src/app/auth/register/register.page.ts");




const routes = [
    {
        path: '',
        component: _register_page__WEBPACK_IMPORTED_MODULE_3__["RegisterPage"]
    }
];
let RegisterPageRoutingModule = class RegisterPageRoutingModule {
};
RegisterPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], RegisterPageRoutingModule);



/***/ }),

/***/ "./src/app/auth/register/register.module.ts":
/*!**************************************************!*\
  !*** ./src/app/auth/register/register.module.ts ***!
  \**************************************************/
/*! exports provided: RegisterPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _register_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./register-routing.module */ "./src/app/auth/register/register-routing.module.ts");
/* harmony import */ var _register_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./register.page */ "./src/app/auth/register/register.page.ts");







let RegisterPageModule = class RegisterPageModule {
};
RegisterPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _register_routing_module__WEBPACK_IMPORTED_MODULE_5__["RegisterPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_register_page__WEBPACK_IMPORTED_MODULE_6__["RegisterPage"]]
    })
], RegisterPageModule);



/***/ }),

/***/ "./src/app/auth/register/register.page.ts":
/*!************************************************!*\
  !*** ./src/app/auth/register/register.page.ts ***!
  \************************************************/
/*! exports provided: RegisterPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPage", function() { return RegisterPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var src_app_services_profile_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/profile.service */ "./src/app/services/profile.service.ts");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");







let RegisterPage = class RegisterPage {
    constructor(formBuilder, profileService, authService, toast, router) {
        this.formBuilder = formBuilder;
        this.profileService = profileService;
        this.authService = authService;
        this.toast = toast;
        this.router = router;
        this.validations = {
            username: false,
            username_available: false,
            password: false,
            confirm_password: false,
            DOB: false,
            readTAC: false,
            underAge: false
        };
        this.createForm();
    }
    ngOnInit() {
    }
    initToast(message, duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const initToast = yield this.toast.create({
                message: message,
                duration: duration
            });
            initToast.present();
        });
    }
    createForm() {
        this.registerForm = this.formBuilder.group({
            'username': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'password': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'confirm_password': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'DOB': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'readTAC': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false),
            'underAge': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false)
        }, {
            validators: [
                this.checkpassword.bind(this),
                this.checkUsernameAvailability.bind(this)
            ]
        });
    }
    checkpassword(formGroup) {
        const { value: password } = formGroup.get('password');
        const { value: confirm_password } = formGroup.get('confirm_password');
        return password === confirm_password ? null : { passwordNotMatch: true };
    }
    checkUsernameAvailability(formGroup) {
        const { value: username } = formGroup.get('username');
        if (username != null && username != "") {
            this.profileService.checkUsernameAvailability(username)
                .subscribe(data => {
                this.validations.username_available = !data;
            });
            return this.validations.username_available ? null : { usernameNotAvailable: true };
        }
        else {
            return null;
        }
    }
    defaultValues(validations) {
        for (let key in validations) {
            this.validations[key] = false;
        }
    }
    updateValidation(e) {
        if (e == "readTAC") {
            this.validations[e] = this.registerForm.value[e];
            return;
        }
        if (e == "DOB") {
            var age = this.getAge(this.registerForm.value[e]);
            if (age >= 18)
                this.validations["underAge"] = false;
            else
                this.validations["underAge"] = true;
            return;
        }
        this.validations[e] = this.registerForm.value[e].length > 0 ? false : true;
    }
    register(form) {
        //check validations 
        this.validations.username = !form.value.username ? true : false;
        this.validations.password = !form.value.password ? true : false;
        this.validations.confirm_password = !form.value.confirm_password ? true : false;
        this.validations.DOB = !form.value.DOB ? true : false;
        this.validations.readTAC = form.value.readTAC;
        if (form.value.username != "" &&
            form.value.password != "" &&
            form.value.confirm_password != "" &&
            form.value.DOB != "" &&
            form.value.readTAC &&
            this.validations.underAge == false) {
            this.userData = {
                username: form.value.username,
                password: form.value.password,
                Bdate: form.value.DOB
            };
            this.authService.register(this.userData).subscribe(data => {
                let params = {
                    queryParams: {
                        id: JSON.stringify(data)
                    }
                };
                this.defaultValues(this.validations);
                this.router.navigate(["/getting-started"], params);
            }, response => {
                this.initToast("Error in saving. Please try again", 2000);
            });
        }
        else {
            this.initToast("Please provide your information above", 2000);
        }
    }
    getAge(dob) {
        return Math.floor((new Date().getTime() - new Date(dob).getTime()) / 3.15576e+10);
    }
};
RegisterPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: src_app_services_profile_service__WEBPACK_IMPORTED_MODULE_3__["ProfileService"] },
    { type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
];
RegisterPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-register',
        template: __webpack_require__(/*! raw-loader!./register.page.html */ "./node_modules/raw-loader/index.js!./src/app/auth/register/register.page.html"),
        styles: [__webpack_require__(/*! ../auth.scss */ "./src/app/auth/auth.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], src_app_services_profile_service__WEBPACK_IMPORTED_MODULE_3__["ProfileService"], src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ToastController"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]])
], RegisterPage);



/***/ })

}]);
//# sourceMappingURL=auth-register-register-module-es2015.js.map