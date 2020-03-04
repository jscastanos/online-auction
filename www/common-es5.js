(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/@ionic/core/dist/esm-es5/cubic-bezier-2812fda3.js":
/*!************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/cubic-bezier-2812fda3.js ***!
  \************************************************************************/
/*! exports provided: P, g */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return Point; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getTimeGivenProgression; });
/**
 * Based on:
 * https://stackoverflow.com/questions/7348009/y-coordinate-for-a-given-x-cubic-bezier
 * https://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves
 * TODO: Reduce rounding error
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
/**
 * Given a cubic-bezier curve, get the x value (time) given
 * the y value (progression).
 * Ex: cubic-bezier(0.32, 0.72, 0, 1);
 * P0: (0, 0)
 * P1: (0.32, 0.72)
 * P2: (0, 1)
 * P3: (1, 1)
 *
 * If you give a cubic bezier curve that never reaches the
 * provided progression, this function will return NaN.
 */
var getTimeGivenProgression = function (p0, p1, p2, p3, progression) {
    var tValues = solveCubicBezier(p0.y, p1.y, p2.y, p3.y, progression);
    return solveCubicParametricEquation(p0.x, p1.x, p2.x, p3.x, tValues[0]); // TODO: Add better strategy for dealing with multiple solutions
};
/**
 * Solve a cubic equation in one dimension (time)
 */
var solveCubicParametricEquation = function (p0, p1, p2, p3, t) {
    var partA = (3 * p1) * Math.pow(t - 1, 2);
    var partB = (-3 * p2 * t) + (3 * p2) + (p3 * t);
    var partC = p0 * Math.pow(t - 1, 3);
    return t * (partA + (t * partB)) - partC;
};
/**
 * Find the `t` value for a cubic bezier using Cardano's formula
 */
var solveCubicBezier = function (p0, p1, p2, p3, refPoint) {
    p0 -= refPoint;
    p1 -= refPoint;
    p2 -= refPoint;
    p3 -= refPoint;
    var roots = solveCubicEquation(p3 - 3 * p2 + 3 * p1 - p0, 3 * p2 - 6 * p1 + 3 * p0, 3 * p1 - 3 * p0, p0);
    return roots.filter(function (root) { return root >= 0 && root <= 1; });
};
var solveQuadraticEquation = function (a, b, c) {
    var discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return [];
    }
    else {
        return [
            (-b + Math.sqrt(discriminant)) / (2 * a),
            (-b - Math.sqrt(discriminant)) / (2 * a)
        ];
    }
};
var solveCubicEquation = function (a, b, c, d) {
    if (a === 0) {
        return solveQuadraticEquation(b, c, d);
    }
    b /= a;
    c /= a;
    d /= a;
    var p = (3 * c - b * b) / 3;
    var q = (2 * b * b * b - 9 * b * c + 27 * d) / 27;
    if (p === 0) {
        return [Math.pow(-q, 1 / 3)];
    }
    else if (q === 0) {
        return [Math.sqrt(-p), -Math.sqrt(-p)];
    }
    var discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);
    if (discriminant === 0) {
        return [Math.pow(q / 2, 1 / 2) - b / 3];
    }
    else if (discriminant > 0) {
        return [Math.pow(-(q / 2) + Math.sqrt(discriminant), 1 / 3) - Math.pow((q / 2) + Math.sqrt(discriminant), 1 / 3) - b / 3];
    }
    var r = Math.sqrt(Math.pow(-(p / 3), 3));
    var phi = Math.acos(-(q / (2 * Math.sqrt(Math.pow(-(p / 3), 3)))));
    var s = 2 * Math.pow(r, 1 / 3);
    return [
        s * Math.cos(phi / 3) - b / 3,
        s * Math.cos((phi + 2 * Math.PI) / 3) - b / 3,
        s * Math.cos((phi + 4 * Math.PI) / 3) - b / 3
    ];
};



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/haptic-c8f1473e.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/haptic-c8f1473e.js ***!
  \******************************************************************/
/*! exports provided: a, b, c, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hapticSelectionStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hapticSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hapticSelectionEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hapticSelection; });
/**
 * Check to see if the Haptic Plugin is available
 * @return Returns `true` or false if the plugin is available
 */
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
var hapticSelection = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.selection();
    }
};
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
var hapticSelectionStart = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionStart();
    }
};
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
var hapticSelectionChanged = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionChanged();
    }
};
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
var hapticSelectionEnd = function () {
    var engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionEnd();
    }
};



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/index-3476b023.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/index-3476b023.js ***!
  \*****************************************************************/
/*! exports provided: s */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return sanitizeDOMString; });
/**
 * Does a simple sanitization of all elements
 * in an untrusted string
 */
var sanitizeDOMString = function (untrustedString) {
    try {
        if (typeof untrustedString !== 'string' || untrustedString === '') {
            return untrustedString;
        }
        /**
         * Create a document fragment
         * separate from the main DOM,
         * create a div to do our work in
         */
        var documentFragment_1 = document.createDocumentFragment();
        var workingDiv = document.createElement('div');
        documentFragment_1.appendChild(workingDiv);
        workingDiv.innerHTML = untrustedString;
        /**
         * Remove any elements
         * that are blocked
         */
        blockedTags.forEach(function (blockedTag) {
            var getElementsToRemove = documentFragment_1.querySelectorAll(blockedTag);
            for (var elementIndex = getElementsToRemove.length - 1; elementIndex >= 0; elementIndex--) {
                var element = getElementsToRemove[elementIndex];
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                else {
                    documentFragment_1.removeChild(element);
                }
                /**
                 * We still need to sanitize
                 * the children of this element
                 * as they are left behind
                 */
                var childElements = getElementChildren(element);
                /* tslint:disable-next-line */
                for (var childIndex = 0; childIndex < childElements.length; childIndex++) {
                    sanitizeElement(childElements[childIndex]);
                }
            }
        });
        /**
         * Go through remaining elements and remove
         * non-allowed attribs
         */
        // IE does not support .children on document fragments, only .childNodes
        var dfChildren = getElementChildren(documentFragment_1);
        /* tslint:disable-next-line */
        for (var childIndex = 0; childIndex < dfChildren.length; childIndex++) {
            sanitizeElement(dfChildren[childIndex]);
        }
        // Append document fragment to div
        var fragmentDiv = document.createElement('div');
        fragmentDiv.appendChild(documentFragment_1);
        // First child is always the div we did our work in
        var getInnerDiv = fragmentDiv.querySelector('div');
        return (getInnerDiv !== null) ? getInnerDiv.innerHTML : fragmentDiv.innerHTML;
    }
    catch (err) {
        console.error(err);
        return '';
    }
};
/**
 * Clean up current element based on allowed attributes
 * and then recursively dig down into any child elements to
 * clean those up as well
 */
var sanitizeElement = function (element) {
    // IE uses childNodes, so ignore nodes that are not elements
    if (element.nodeType && element.nodeType !== 1) {
        return;
    }
    for (var i = element.attributes.length - 1; i >= 0; i--) {
        var attribute = element.attributes.item(i);
        var attributeName = attribute.name;
        // remove non-allowed attribs
        if (!allowedAttributes.includes(attributeName.toLowerCase())) {
            element.removeAttribute(attributeName);
            continue;
        }
        // clean up any allowed attribs
        // that attempt to do any JS funny-business
        var attributeValue = attribute.value;
        /* tslint:disable-next-line */
        if (attributeValue != null && attributeValue.toLowerCase().includes('javascript:')) {
            element.removeAttribute(attributeName);
        }
    }
    /**
     * Sanitize any nested children
     */
    var childElements = getElementChildren(element);
    /* tslint:disable-next-line */
    for (var i = 0; i < childElements.length; i++) {
        sanitizeElement(childElements[i]);
    }
};
/**
 * IE doesn't always support .children
 * so we revert to .childNodes instead
 */
var getElementChildren = function (el) {
    return (el.children != null) ? el.children : el.childNodes;
};
var allowedAttributes = ['class', 'id', 'href', 'src', 'name', 'slot'];
var blockedTags = ['script', 'style', 'iframe', 'meta', 'link', 'object', 'embed'];



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/theme-18cbe2cc.js ***!
  \*****************************************************************/
/*! exports provided: c, g, h, o */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return openURL; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var hostContext = function (selector, el) {
    return el.closest(selector) !== null;
};
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
var createColorClasses = function (color) {
    var _a;
    return (typeof color === 'string' && color.length > 0) ? (_a = {
            'ion-color': true
        },
        _a["ion-color-" + color] = true,
        _a) : undefined;
};
var getClassList = function (classes) {
    if (classes !== undefined) {
        var array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(function (c) { return c != null; })
            .map(function (c) { return c.trim(); })
            .filter(function (c) { return c !== ''; });
    }
    return [];
};
var getClassMap = function (classes) {
    var map = {};
    getClassList(classes).forEach(function (c) { return map[c] = true; });
    return map;
};
var SCHEME = /^[a-z][a-z0-9+\-.]*:/;
var openURL = function (url, ev, direction) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
    var router;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
            router = document.querySelector('ion-router');
            if (router) {
                if (ev != null) {
                    ev.preventDefault();
                }
                return [2 /*return*/, router.push(url, direction)];
            }
        }
        return [2 /*return*/, false];
    });
}); };



/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm-es5/watch-options-2af96011.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm-es5/watch-options-2af96011.js ***!
  \*************************************************************************/
/*! exports provided: f, w */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return findCheckedOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return watchForOptions; });
var watchForOptions = function (containerEl, tagName, onChange) {
    var mutation = new MutationObserver(function (mutationList) {
        onChange(getSelectedOption(mutationList, tagName));
    });
    mutation.observe(containerEl, {
        childList: true,
        subtree: true
    });
    return mutation;
};
var getSelectedOption = function (mutationList, tagName) {
    var newOption;
    mutationList.forEach(function (mut) {
        // tslint:disable-next-line: prefer-for-of
        for (var i = 0; i < mut.addedNodes.length; i++) {
            newOption = findCheckedOption(mut.addedNodes[i], tagName) || newOption;
        }
    });
    return newOption;
};
var findCheckedOption = function (el, tagName) {
    if (el.nodeType !== 1) {
        return undefined;
    }
    var options = (el.tagName === tagName.toUpperCase())
        ? [el]
        : Array.from(el.querySelectorAll(tagName));
    return options.find(function (o) { return o.checked === true; });
};



/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/slider/slider.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/slider/slider.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-slides [options]=\"options.sliderOpts\">\n  <ion-slide *ngFor=\"let i of items\">\n    <ion-card (click)=\"openDetails(i)\" [ngClass]='[options.style]'>\n      <ion-header>\n        <img src=\"\" alt=\"\" onerror=\"this.onerror=null;this.src='../assets/placeholder.png'\">\n        <ion-card-title>{{ i[options.dataObject.name] }}</ion-card-title>\n      </ion-header>\n    </ion-card>\n  </ion-slide>\n</ion-slides>\n\n<div *ngIf=\"items.length == 0\" style=\"text-align: center;\">\n  <ion-label>No data</ion-label>\n</div>"

/***/ }),

/***/ "./src/app/auth/auth.scss":
/*!********************************!*\
  !*** ./src/app/auth/auth.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "form {\n  height: 100vh !important;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  vertical-align: center;\n}\nform.register {\n  margin-top: 50px;\n}\nform h1 {\n  font-size: 45px;\n}\nform ion-text {\n  text-align: center !important;\n}\nform ion-icon {\n  margin-right: 10px;\n}\nform.getting-started h2 {\n  font-size: 18px;\n}\nform.getting-started h1 {\n  font-size: 25px;\n}\nion-fab {\n  margin-bottom: 20px;\n  margin-right: 20px;\n}\nion-fab ion-icon {\n  margin: 0;\n}\nimg {\n  border-radius: 50%;\n  width: 200px;\n  height: 200px;\n  border: 5px #3880FF dashed;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9EOlxcd29ya1xcUHJvamVjdHNcXEFjY1JlYWxTb2Z0XFxNb2JpbGVcXG9ubGluZWF1Y3Rpb25hcHAvc3JjXFxhcHBcXGF1dGhcXGF1dGguc2NzcyIsInNyYy9hcHAvYXV0aC9hdXRoLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFSSx3QkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxzQkFBQTtBQ0FKO0FERUk7RUFDSSxnQkFBQTtBQ0FSO0FER0k7RUFDSSxlQUFBO0FDRFI7QURJSTtFQUNJLDZCQUFBO0FDRlI7QURNSTtFQUNJLGtCQUFBO0FDSlI7QURRUTtFQUVJLGVBQUE7QUNQWjtBRFNRO0VBRUksZUFBQTtBQ1JaO0FEZ0JBO0VBQ0ksbUJBQUE7RUFDQSxrQkFBQTtBQ2JKO0FEZUk7RUFDSSxTQUFBO0FDYlI7QURpQkE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsMEJBQUE7QUNkSiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvYXV0aC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiZm9ybXtcclxuXHJcbiAgICBoZWlnaHQ6IDEwMHZoICFpbXBvcnRhbnQ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XHJcblxyXG4gICAgJi5yZWdpc3RlcntcclxuICAgICAgICBtYXJnaW4tdG9wOiA1MHB4O1xyXG4gICAgfVxyXG5cclxuICAgIGgxe1xyXG4gICAgICAgIGZvbnQtc2l6ZTogNDVweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaW9uLXRleHR7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlvbi1pY29ue1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweFxyXG4gICAgfVxyXG5cclxuICAgICYuZ2V0dGluZy1zdGFydGVke1xyXG4gICAgICAgIGgye1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBoMXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbmlvbi1mYWJ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gICAgXHJcbiAgICBpb24taWNvbntcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmltZ3tcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogMjAwcHg7XHJcbiAgICBib3JkZXI6IDVweCAjMzg4MEZGIGRhc2hlZDtcclxufSIsImZvcm0ge1xuICBoZWlnaHQ6IDEwMHZoICFpbXBvcnRhbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XG59XG5mb3JtLnJlZ2lzdGVyIHtcbiAgbWFyZ2luLXRvcDogNTBweDtcbn1cbmZvcm0gaDEge1xuICBmb250LXNpemU6IDQ1cHg7XG59XG5mb3JtIGlvbi10ZXh0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XG59XG5mb3JtIGlvbi1pY29uIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xufVxuZm9ybS5nZXR0aW5nLXN0YXJ0ZWQgaDIge1xuICBmb250LXNpemU6IDE4cHg7XG59XG5mb3JtLmdldHRpbmctc3RhcnRlZCBoMSB7XG4gIGZvbnQtc2l6ZTogMjVweDtcbn1cblxuaW9uLWZhYiB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbn1cbmlvbi1mYWIgaW9uLWljb24ge1xuICBtYXJnaW46IDA7XG59XG5cbmltZyB7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDIwMHB4O1xuICBoZWlnaHQ6IDIwMHB4O1xuICBib3JkZXI6IDVweCAjMzg4MEZGIGRhc2hlZDtcbn0iXX0= */"

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
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _slider_slider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slider/slider.component */ "./src/app/components/slider/slider.component.ts");





var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_slider_slider_component__WEBPACK_IMPORTED_MODULE_4__["SliderComponent"]],
            exports: [_slider_slider_component__WEBPACK_IMPORTED_MODULE_4__["SliderComponent"]],
            imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());



/***/ }),

/***/ "./src/app/components/slider/slider.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/components/slider/slider.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-card {\n  box-shadow: none !important;\n}\nion-card ion-card-title {\n  font-size: 14px;\n  padding: 10px 0px;\n}\nion-card.circle img {\n  border-radius: 50%;\n  width: 100%;\n  border: 2px solid #c9c9c9;\n}\nion-card.box img {\n  border-radius: 5px;\n  width: 100%;\n  border: 2px solid #c9c9c9;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zbGlkZXIvRDpcXHdvcmtcXFByb2plY3RzXFxBY2NSZWFsU29mdFxcTW9iaWxlXFxvbmxpbmVhdWN0aW9uYXBwL3NyY1xcYXBwXFxjb21wb25lbnRzXFxzbGlkZXJcXHNsaWRlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksMkJBQUE7QUNDSjtBRENJO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0FDQ1I7QURFSTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0FDQVI7QURHSTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0FDRFIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3NsaWRlci9zbGlkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY2FyZHtcclxuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcclxuICAgIFxyXG4gICAgaW9uLWNhcmQtdGl0bGV7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHggMHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAmLmNpcmNsZSAgaW1ne1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjYzljOWM5O1xyXG4gICAgfVxyXG5cclxuICAgICYuYm94ICBpbWd7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNjOWM5Yzk7XHJcbiAgICB9XHJcbn0iLCJpb24tY2FyZCB7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbmlvbi1jYXJkIGlvbi1jYXJkLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBwYWRkaW5nOiAxMHB4IDBweDtcbn1cbmlvbi1jYXJkLmNpcmNsZSBpbWcge1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDJweCBzb2xpZCAjYzljOWM5O1xufVxuaW9uLWNhcmQuYm94IGltZyB7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNjOWM5Yzk7XG59Il19 */"

/***/ }),

/***/ "./src/app/components/slider/slider.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/slider/slider.component.ts ***!
  \*******************************************************/
/*! exports provided: SliderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderComponent", function() { return SliderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_slider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/slider.service */ "./src/app/services/slider.service.ts");




var SliderComponent = /** @class */ (function () {
    function SliderComponent(router, sliderService) {
        this.router = router;
        this.sliderService = sliderService;
        this.items = [];
    }
    SliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sliderService.getData(this.options.requestUrl).subscribe(function (data) {
            for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                var d = _a[_i];
                _this.items.push(data[d]);
            }
        });
    };
    SliderComponent.prototype.openDetails = function (item) {
        var data = {
            id: item[this.options.dataObject.id],
            name: item[this.options.dataObject.name]
        };
        var params = {
            queryParams: {
                q: JSON.stringify(data)
            }
        };
        this.router.navigate([this.options.slideRedirect], params);
    };
    SliderComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: src_app_services_slider_service__WEBPACK_IMPORTED_MODULE_3__["SliderService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SliderComponent.prototype, "options", void 0);
    SliderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-slider",
            template: __webpack_require__(/*! raw-loader!./slider.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/slider/slider.component.html"),
            styles: [__webpack_require__(/*! ./slider.component.scss */ "./src/app/components/slider/slider.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], src_app_services_slider_service__WEBPACK_IMPORTED_MODULE_3__["SliderService"]])
    ], SliderComponent);
    return SliderComponent;
}());



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".itemList ion-grid {\n  background-color: #f5f5f5;\n}\n.itemList .item {\n  background-color: #fff;\n  border: 4px solid #f5f5f5;\n}\n.itemList .item ion-text {\n  padding: 0 5px;\n}\n.itemList .item ion-text h5 {\n  margin: 2px auto;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  font-size: 1em;\n}\n.itemList .item .price {\n  color: firebrick;\n}\n.itemList .badgeHolder {\n  position: absolute;\n}\n.itemList .badgeHolder .bidBadge {\n  position: relative;\n  font-size: 12px;\n  top: 0;\n  left: 0;\n  padding: 5px 10px;\n  color: white;\n  background-color: firebrick;\n  z-index: 2;\n}\n.itemList .badgeHolder .bidBadge::after {\n  content: \" \";\n  position: absolute;\n  background-color: firebrick;\n  top: 12;\n  margin-left: 2px;\n  height: 16px;\n  width: 16px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  z-index: -1;\n}\n.itemList .badgeHolder .badge-success, .itemList .badgeHolder .badge-success::after {\n  background-color: seagreen !important;\n}\nion-list ion-label {\n  text-transform: uppercase;\n}\n.searchResult {\n  position: absolute !important;\n  z-index: 9999;\n  width: 100%;\n  top: 110px;\n  box-shadow: 5px 10px 8px #888888;\n}\n#notification-button ion-badge {\n  position: absolute;\n  top: -0.2rem;\n  right: 1rem;\n  border-radius: 50%;\n}\n#notification-button ion-badge ~ ion-icon {\n  margin-right: 1.2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9EOlxcd29ya1xcUHJvamVjdHNcXEFjY1JlYWxTb2Z0XFxNb2JpbGVcXG9ubGluZWF1Y3Rpb25hcHAvc3JjXFxhcHBcXGhvbWVcXGhvbWUucGFnZS5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0UseUJBQUE7QUNBSjtBREdFO0VBQ0Usc0JBQUE7RUFDQSx5QkFBQTtBQ0RKO0FER0k7RUFDRSxjQUFBO0FDRE47QURFTTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLDRCQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0FDQVI7QURHSTtFQUNFLGdCQUFBO0FDRE47QURLRTtFQUNFLGtCQUFBO0FDSEo7QURLSTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxVQUFBO0FDSE47QURNSTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsT0FBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxnQ0FBQTtVQUFBLHdCQUFBO0VBQ0EsV0FBQTtBQ0pOO0FET0k7RUFDRSxxQ0FBQTtBQ0xOO0FEYUU7RUFDRSx5QkFBQTtBQ1ZKO0FEY0E7RUFDRSw2QkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLGdDQUFBO0FDWEY7QURlQztFQUNDLGtCQUFBO0VBQ0EsWUFBQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtBQ1pKO0FEZUU7RUFDQyxvQkFBQTtBQ2JIIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pdGVtTGlzdHtcbiAgaW9uLWdyaWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG4gIH1cblxuICAuaXRlbXtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIGJvcmRlcjogNHB4IHNvbGlkICNmNWY1ZjU7XG5cbiAgICBpb24tdGV4dHtcbiAgICAgIHBhZGRpbmc6IDAgNXB4O1xuICAgICAgaDV7XG4gICAgICAgIG1hcmdpbjogMnB4IGF1dG87XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgICAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsOyAgXG4gICAgICAgIC13ZWJraXQtbGluZS1jbGFtcDogMjtcbiAgICAgICAgZm9udC1zaXplOiAxZW07XG4gICAgICB9XG4gICAgfVxuICAgIC5wcmljZXtcbiAgICAgIGNvbG9yOiBmaXJlYnJpY2s7XG4gICAgfVxuICB9XG5cbiAgLmJhZGdlSG9sZGVye1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcblxuICAgIC5iaWRCYWRnZXtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGZpcmVicmljaztcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgfVxuXG4gICAgLmJpZEJhZGdlOjphZnRlcntcbiAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogZmlyZWJyaWNrO1xuICAgICAgdG9wOiAxMjtcbiAgICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gICAgICBoZWlnaHQ6IDE2cHg7XG4gICAgICB3aWR0aDogMTZweDtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgIHotaW5kZXg6IC0xO1xuICAgIH1cblxuICAgIC5iYWRnZS1zdWNjZXNzLCAuYmFkZ2Utc3VjY2Vzczo6YWZ0ZXJ7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBzZWFncmVlbiAhaW1wb3J0YW50O1xuICAgIH1cbiAgICBcbiAgfVxuICBcbn1cblxuaW9uLWxpc3R7XG4gIGlvbi1sYWJlbHtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICB9XG59XG5cbi5zZWFyY2hSZXN1bHR7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50OyBcbiAgei1pbmRleDogOTk5OTsgXG4gIHdpZHRoOiAxMDAlOyBcbiAgdG9wOiAxMTBweDtcbiAgYm94LXNoYWRvdzogNXB4IDEwcHggOHB4ICM4ODg4ODg7XG59XG5cbiNub3RpZmljYXRpb24tYnV0dG9uIHtcblx0aW9uLWJhZGdlIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0dG9wOiAtMC4ycmVtO1xuICAgIHJpZ2h0OiAxcmVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBcblxuXHRcdCYgfiBpb24taWNvbiB7XG5cdFx0XHRtYXJnaW4tcmlnaHQ6IDEuMnJlbTtcblx0XHR9XG5cdH1cbn0iLCIuaXRlbUxpc3QgaW9uLWdyaWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xufVxuLml0ZW1MaXN0IC5pdGVtIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiA0cHggc29saWQgI2Y1ZjVmNTtcbn1cbi5pdGVtTGlzdCAuaXRlbSBpb24tdGV4dCB7XG4gIHBhZGRpbmc6IDAgNXB4O1xufVxuLml0ZW1MaXN0IC5pdGVtIGlvbi10ZXh0IGg1IHtcbiAgbWFyZ2luOiAycHggYXV0bztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gIC13ZWJraXQtbGluZS1jbGFtcDogMjtcbiAgZm9udC1zaXplOiAxZW07XG59XG4uaXRlbUxpc3QgLml0ZW0gLnByaWNlIHtcbiAgY29sb3I6IGZpcmVicmljaztcbn1cbi5pdGVtTGlzdCAuYmFkZ2VIb2xkZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4uaXRlbUxpc3QgLmJhZGdlSG9sZGVyIC5iaWRCYWRnZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IGZpcmVicmljaztcbiAgei1pbmRleDogMjtcbn1cbi5pdGVtTGlzdCAuYmFkZ2VIb2xkZXIgLmJpZEJhZGdlOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJhY2tncm91bmQtY29sb3I6IGZpcmVicmljaztcbiAgdG9wOiAxMjtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbiAgaGVpZ2h0OiAxNnB4O1xuICB3aWR0aDogMTZweDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICB6LWluZGV4OiAtMTtcbn1cbi5pdGVtTGlzdCAuYmFkZ2VIb2xkZXIgLmJhZGdlLXN1Y2Nlc3MsIC5pdGVtTGlzdCAuYmFkZ2VIb2xkZXIgLmJhZGdlLXN1Y2Nlc3M6OmFmdGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogc2VhZ3JlZW4gIWltcG9ydGFudDtcbn1cblxuaW9uLWxpc3QgaW9uLWxhYmVsIHtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLnNlYXJjaFJlc3VsdCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xuICB6LWluZGV4OiA5OTk5O1xuICB3aWR0aDogMTAwJTtcbiAgdG9wOiAxMTBweDtcbiAgYm94LXNoYWRvdzogNXB4IDEwcHggOHB4ICM4ODg4ODg7XG59XG5cbiNub3RpZmljYXRpb24tYnV0dG9uIGlvbi1iYWRnZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAtMC4ycmVtO1xuICByaWdodDogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuI25vdGlmaWNhdGlvbi1idXR0b24gaW9uLWJhZGdlIH4gaW9uLWljb24ge1xuICBtYXJnaW4tcmlnaHQ6IDEuMnJlbTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/services/profile.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/profile.service.ts ***!
  \*********************************************/
/*! exports provided: ProfileService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileService", function() { return ProfileService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _env_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./env.service */ "./src/app/services/env.service.ts");




var ProfileService = /** @class */ (function () {
    function ProfileService(http, env) {
        this.http = http;
        this.env = env;
    }
    ProfileService.prototype.register = function (user) {
        return this.http.post(this.env.API_URL + "bidder/register", {
            UserName: user.username,
            Password: user.password,
            Bdate: user.Bdate
        });
    };
    ProfileService.prototype.checkUsernameAvailability = function (username) {
        return this.http.get(this.env.API_URL + "bidder/username/check?username=" + username);
    };
    ProfileService.prototype.updateProfile = function (id, profile) {
        return this.http.put(this.env.API_URL + "bidder/profile/" + id + "/update/", profile);
    };
    ProfileService.prototype.saveImage = function (id, imageBase64, type) {
        return this.http.post(this.env.API_URL + "bidder/profile/" + id + "/image", {
            imageBase64: imageBase64,
            type: type
        });
    };
    ProfileService.prototype.getUserData = function (id) {
        return this.http.get(this.env.API_URL + "bidder/profile/" + id);
    };
    ProfileService.prototype.checkCardImage = function (id) {
        return this.http.get(this.env.API_URL + "bidder/checkcardimage?id=" + id);
    };
    ProfileService.prototype.updatePassword = function (id, oldPassword, newPassword) {
        return this.http.put(this.env.API_URL + "profile/" + id + "/updatePassword", {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    };
    ProfileService.prototype.checkTokenValidity = function (id, token) {
        return this.http.get(this.env.API_URL + "profile/" + id + "/checktoken?token=" + token);
    };
    ProfileService.prototype.registerFCMToken = function (id, token) {
        return this.http.post(this.env.API_URL + "profile/" + id + "/token", {
            token: token
        });
    };
    ProfileService.prototype.notifs = function (id) {
        return this.http.get(this.env.API_URL + "profile/" + id + "/notifs");
    };
    ProfileService.prototype.seen = function (id) {
        return this.http.post(this.env.API_URL + "seen", id);
    };
    ProfileService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"] }
    ]; };
    ProfileService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"]])
    ], ProfileService);
    return ProfileService;
}());



/***/ }),

/***/ "./src/app/services/slider.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/slider.service.ts ***!
  \********************************************/
/*! exports provided: SliderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderService", function() { return SliderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _env_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./env.service */ "./src/app/services/env.service.ts");




var SliderService = /** @class */ (function () {
    function SliderService(http, env) {
        this.http = http;
        this.env = env;
    }
    SliderService.prototype.getData = function (reqUrl) {
        return this.http.get(this.env.API_URL + reqUrl);
    };
    SliderService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"] }
    ]; };
    SliderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"]])
    ], SliderService);
    return SliderService;
}());



/***/ })

}]);
//# sourceMappingURL=common-es5.js.map