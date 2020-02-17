(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/@ionic/core/dist/esm/cubic-bezier-2812fda3.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/cubic-bezier-2812fda3.js ***!
  \********************************************************************/
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
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
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
const getTimeGivenProgression = (p0, p1, p2, p3, progression) => {
    const tValues = solveCubicBezier(p0.y, p1.y, p2.y, p3.y, progression);
    return solveCubicParametricEquation(p0.x, p1.x, p2.x, p3.x, tValues[0]); // TODO: Add better strategy for dealing with multiple solutions
};
/**
 * Solve a cubic equation in one dimension (time)
 */
const solveCubicParametricEquation = (p0, p1, p2, p3, t) => {
    const partA = (3 * p1) * Math.pow(t - 1, 2);
    const partB = (-3 * p2 * t) + (3 * p2) + (p3 * t);
    const partC = p0 * Math.pow(t - 1, 3);
    return t * (partA + (t * partB)) - partC;
};
/**
 * Find the `t` value for a cubic bezier using Cardano's formula
 */
const solveCubicBezier = (p0, p1, p2, p3, refPoint) => {
    p0 -= refPoint;
    p1 -= refPoint;
    p2 -= refPoint;
    p3 -= refPoint;
    const roots = solveCubicEquation(p3 - 3 * p2 + 3 * p1 - p0, 3 * p2 - 6 * p1 + 3 * p0, 3 * p1 - 3 * p0, p0);
    return roots.filter(root => root >= 0 && root <= 1);
};
const solveQuadraticEquation = (a, b, c) => {
    const discriminant = b * b - 4 * a * c;
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
const solveCubicEquation = (a, b, c, d) => {
    if (a === 0) {
        return solveQuadraticEquation(b, c, d);
    }
    b /= a;
    c /= a;
    d /= a;
    const p = (3 * c - b * b) / 3;
    const q = (2 * b * b * b - 9 * b * c + 27 * d) / 27;
    if (p === 0) {
        return [Math.pow(-q, 1 / 3)];
    }
    else if (q === 0) {
        return [Math.sqrt(-p), -Math.sqrt(-p)];
    }
    const discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);
    if (discriminant === 0) {
        return [Math.pow(q / 2, 1 / 2) - b / 3];
    }
    else if (discriminant > 0) {
        return [Math.pow(-(q / 2) + Math.sqrt(discriminant), 1 / 3) - Math.pow((q / 2) + Math.sqrt(discriminant), 1 / 3) - b / 3];
    }
    const r = Math.sqrt(Math.pow(-(p / 3), 3));
    const phi = Math.acos(-(q / (2 * Math.sqrt(Math.pow(-(p / 3), 3)))));
    const s = 2 * Math.pow(r, 1 / 3);
    return [
        s * Math.cos(phi / 3) - b / 3,
        s * Math.cos((phi + 2 * Math.PI) / 3) - b / 3,
        s * Math.cos((phi + 4 * Math.PI) / 3) - b / 3
    ];
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/framework-delegate-c2e2e1f4.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/framework-delegate-c2e2e1f4.js ***!
  \**************************************************************************/
/*! exports provided: a, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attachComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return detachComponent; });
const attachComponent = async (delegate, container, component, cssClasses, componentProps) => {
    if (delegate) {
        return delegate.attachViewToDom(container, component, componentProps, cssClasses);
    }
    if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
        throw new Error('framework delegate is missing');
    }
    const el = (typeof component === 'string')
        ? container.ownerDocument && container.ownerDocument.createElement(component)
        : component;
    if (cssClasses) {
        cssClasses.forEach(c => el.classList.add(c));
    }
    if (componentProps) {
        Object.assign(el, componentProps);
    }
    container.appendChild(el);
    if (el.componentOnReady) {
        await el.componentOnReady();
    }
    return el;
};
const detachComponent = (delegate, element) => {
    if (element) {
        if (delegate) {
            const container = element.parentElement;
            return delegate.removeViewFromDom(container, element);
        }
        element.remove();
    }
    return Promise.resolve();
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/haptic-c8f1473e.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/haptic-c8f1473e.js ***!
  \**************************************************************/
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
const hapticSelection = () => {
    const engine = window.TapticEngine;
    if (engine) {
        engine.selection();
    }
};
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
const hapticSelectionStart = () => {
    const engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionStart();
    }
};
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
const hapticSelectionChanged = () => {
    const engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionChanged();
    }
};
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
const hapticSelectionEnd = () => {
    const engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionEnd();
    }
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/index-3476b023.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/index-3476b023.js ***!
  \*************************************************************/
/*! exports provided: s */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return sanitizeDOMString; });
/**
 * Does a simple sanitization of all elements
 * in an untrusted string
 */
const sanitizeDOMString = (untrustedString) => {
    try {
        if (typeof untrustedString !== 'string' || untrustedString === '') {
            return untrustedString;
        }
        /**
         * Create a document fragment
         * separate from the main DOM,
         * create a div to do our work in
         */
        const documentFragment = document.createDocumentFragment();
        const workingDiv = document.createElement('div');
        documentFragment.appendChild(workingDiv);
        workingDiv.innerHTML = untrustedString;
        /**
         * Remove any elements
         * that are blocked
         */
        blockedTags.forEach(blockedTag => {
            const getElementsToRemove = documentFragment.querySelectorAll(blockedTag);
            for (let elementIndex = getElementsToRemove.length - 1; elementIndex >= 0; elementIndex--) {
                const element = getElementsToRemove[elementIndex];
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                else {
                    documentFragment.removeChild(element);
                }
                /**
                 * We still need to sanitize
                 * the children of this element
                 * as they are left behind
                 */
                const childElements = getElementChildren(element);
                /* tslint:disable-next-line */
                for (let childIndex = 0; childIndex < childElements.length; childIndex++) {
                    sanitizeElement(childElements[childIndex]);
                }
            }
        });
        /**
         * Go through remaining elements and remove
         * non-allowed attribs
         */
        // IE does not support .children on document fragments, only .childNodes
        const dfChildren = getElementChildren(documentFragment);
        /* tslint:disable-next-line */
        for (let childIndex = 0; childIndex < dfChildren.length; childIndex++) {
            sanitizeElement(dfChildren[childIndex]);
        }
        // Append document fragment to div
        const fragmentDiv = document.createElement('div');
        fragmentDiv.appendChild(documentFragment);
        // First child is always the div we did our work in
        const getInnerDiv = fragmentDiv.querySelector('div');
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
const sanitizeElement = (element) => {
    // IE uses childNodes, so ignore nodes that are not elements
    if (element.nodeType && element.nodeType !== 1) {
        return;
    }
    for (let i = element.attributes.length - 1; i >= 0; i--) {
        const attribute = element.attributes.item(i);
        const attributeName = attribute.name;
        // remove non-allowed attribs
        if (!allowedAttributes.includes(attributeName.toLowerCase())) {
            element.removeAttribute(attributeName);
            continue;
        }
        // clean up any allowed attribs
        // that attempt to do any JS funny-business
        const attributeValue = attribute.value;
        /* tslint:disable-next-line */
        if (attributeValue != null && attributeValue.toLowerCase().includes('javascript:')) {
            element.removeAttribute(attributeName);
        }
    }
    /**
     * Sanitize any nested children
     */
    const childElements = getElementChildren(element);
    /* tslint:disable-next-line */
    for (let i = 0; i < childElements.length; i++) {
        sanitizeElement(childElements[i]);
    }
};
/**
 * IE doesn't always support .children
 * so we revert to .childNodes instead
 */
const getElementChildren = (el) => {
    return (el.children != null) ? el.children : el.childNodes;
};
const allowedAttributes = ['class', 'id', 'href', 'src', 'name', 'slot'];
const blockedTags = ['script', 'style', 'iframe', 'meta', 'link', 'object', 'embed'];




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/index-6826f2f6.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/index-6826f2f6.js ***!
  \*************************************************************/
/*! exports provided: d, g, l, s, t */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return deepReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getIonPageElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return lifecycle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return setPageHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return transition; });
/* harmony import */ var _core_ca0488fc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core-ca0488fc.js */ "./node_modules/@ionic/core/dist/esm/core-ca0488fc.js");
/* harmony import */ var _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants-3c3e1099.js */ "./node_modules/@ionic/core/dist/esm/constants-3c3e1099.js");



const iosTransitionAnimation = () => __webpack_require__.e(/*! import() | ios-transition-071bd421-js */ "ios-transition-071bd421-js").then(__webpack_require__.bind(null, /*! ./ios.transition-071bd421.js */ "./node_modules/@ionic/core/dist/esm/ios.transition-071bd421.js"));
const mdTransitionAnimation = () => __webpack_require__.e(/*! import() | md-transition-15a81b08-js */ "md-transition-15a81b08-js").then(__webpack_require__.bind(null, /*! ./md.transition-15a81b08.js */ "./node_modules/@ionic/core/dist/esm/md.transition-15a81b08.js"));
const transition = (opts) => {
    return new Promise((resolve, reject) => {
        Object(_core_ca0488fc_js__WEBPACK_IMPORTED_MODULE_0__["w"])(() => {
            beforeTransition(opts);
            runTransition(opts).then(result => {
                if (result.animation) {
                    result.animation.destroy();
                }
                afterTransition(opts);
                resolve(result);
            }, error => {
                afterTransition(opts);
                reject(error);
            });
        });
    });
};
const beforeTransition = (opts) => {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    setZIndex(enteringEl, leavingEl, opts.direction);
    if (opts.showGoBack) {
        enteringEl.classList.add('can-go-back');
    }
    else {
        enteringEl.classList.remove('can-go-back');
    }
    setPageHidden(enteringEl, false);
    if (leavingEl) {
        setPageHidden(leavingEl, false);
    }
};
const runTransition = async (opts) => {
    const animationBuilder = await getAnimationBuilder(opts);
    const ani = (animationBuilder)
        ? animation(animationBuilder, opts)
        : noAnimation(opts); // fast path for no animation
    return ani;
};
const afterTransition = (opts) => {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    enteringEl.classList.remove('ion-page-invisible');
    if (leavingEl !== undefined) {
        leavingEl.classList.remove('ion-page-invisible');
    }
};
const getAnimationBuilder = async (opts) => {
    if (!opts.leavingEl || !opts.animated || opts.duration === 0) {
        return undefined;
    }
    if (opts.animationBuilder) {
        return opts.animationBuilder;
    }
    const getAnimation = (opts.mode === 'ios')
        ? (await iosTransitionAnimation()).iosTransitionAnimation
        : (await mdTransitionAnimation()).mdTransitionAnimation;
    return getAnimation;
};
const animation = async (animationBuilder, opts) => {
    await waitForReady(opts, true);
    let trans;
    try {
        const mod = await __webpack_require__.e(/*! import() | index-69c37885-js */ "index-69c37885-js").then(__webpack_require__.bind(null, /*! ./index-69c37885.js */ "./node_modules/@ionic/core/dist/esm/index-69c37885.js"));
        trans = await mod.create(animationBuilder, opts.baseEl, opts);
    }
    catch (err) {
        trans = animationBuilder(opts.baseEl, opts);
    }
    fireWillEvents(opts.enteringEl, opts.leavingEl);
    const didComplete = await playTransition(trans, opts);
    if (opts.progressCallback) {
        opts.progressCallback(undefined);
    }
    if (didComplete) {
        fireDidEvents(opts.enteringEl, opts.leavingEl);
    }
    return {
        hasCompleted: didComplete,
        animation: trans
    };
};
const noAnimation = async (opts) => {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    await waitForReady(opts, false);
    fireWillEvents(enteringEl, leavingEl);
    fireDidEvents(enteringEl, leavingEl);
    return {
        hasCompleted: true
    };
};
const waitForReady = async (opts, defaultDeep) => {
    const deep = opts.deepWait !== undefined ? opts.deepWait : defaultDeep;
    const promises = deep ? [
        deepReady(opts.enteringEl),
        deepReady(opts.leavingEl),
    ] : [
        shallowReady(opts.enteringEl),
        shallowReady(opts.leavingEl),
    ];
    await Promise.all(promises);
    await notifyViewReady(opts.viewIsReady, opts.enteringEl);
};
const notifyViewReady = async (viewIsReady, enteringEl) => {
    if (viewIsReady) {
        await viewIsReady(enteringEl);
    }
};
const playTransition = (trans, opts) => {
    const progressCallback = opts.progressCallback;
    // TODO: Remove AnimationBuilder
    const promise = new Promise(resolve => {
        trans.onFinish((currentStep) => {
            if (typeof currentStep === 'number') {
                resolve(currentStep === 1);
            }
            else if (trans.hasCompleted !== undefined) {
                resolve(trans.hasCompleted);
            }
        });
    });
    // cool, let's do this, start the transition
    if (progressCallback) {
        // this is a swipe to go back, just get the transition progress ready
        // kick off the swipe animation start
        trans.progressStart(true);
        progressCallback(trans);
    }
    else {
        // only the top level transition should actually start "play"
        // kick it off and let it play through
        // ******** DOM WRITE ****************
        trans.play();
    }
    // create a callback for when the animation is done
    return promise;
};
const fireWillEvents = (enteringEl, leavingEl) => {
    lifecycle(leavingEl, _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_1__["b"]);
    lifecycle(enteringEl, _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_1__["L"]);
};
const fireDidEvents = (enteringEl, leavingEl) => {
    lifecycle(enteringEl, _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_1__["a"]);
    lifecycle(leavingEl, _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_1__["c"]);
};
const lifecycle = (el, eventName) => {
    if (el) {
        const ev = new CustomEvent(eventName, {
            bubbles: false,
            cancelable: false,
        });
        el.dispatchEvent(ev);
    }
};
const shallowReady = (el) => {
    if (el && el.componentOnReady) {
        return el.componentOnReady();
    }
    return Promise.resolve();
};
const deepReady = async (el) => {
    const element = el;
    if (element) {
        if (element.componentOnReady != null) {
            const stencilEl = await element.componentOnReady();
            if (stencilEl != null) {
                return;
            }
        }
        await Promise.all(Array.from(element.children).map(deepReady));
    }
};
const setPageHidden = (el, hidden) => {
    if (hidden) {
        el.setAttribute('aria-hidden', 'true');
        el.classList.add('ion-page-hidden');
    }
    else {
        el.hidden = false;
        el.removeAttribute('aria-hidden');
        el.classList.remove('ion-page-hidden');
    }
};
const setZIndex = (enteringEl, leavingEl, direction) => {
    if (enteringEl !== undefined) {
        enteringEl.style.zIndex = (direction === 'back')
            ? '99'
            : '101';
    }
    if (leavingEl !== undefined) {
        leavingEl.style.zIndex = '100';
    }
};
const getIonPageElement = (element) => {
    if (element.classList.contains('ion-page')) {
        return element;
    }
    const ionPage = element.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs');
    if (ionPage) {
        return ionPage;
    }
    // idk, return the original element so at least something animates and we don't have a null pointer
    return element;
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/theme-18cbe2cc.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/theme-18cbe2cc.js ***!
  \*************************************************************/
/*! exports provided: c, g, h, o */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return openURL; });
const hostContext = (selector, el) => {
    return el.closest(selector) !== null;
};
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
const createColorClasses = (color) => {
    return (typeof color === 'string' && color.length > 0) ? {
        'ion-color': true,
        [`ion-color-${color}`]: true
    } : undefined;
};
const getClassList = (classes) => {
    if (classes !== undefined) {
        const array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(c => c != null)
            .map(c => c.trim())
            .filter(c => c !== '');
    }
    return [];
};
const getClassMap = (classes) => {
    const map = {};
    getClassList(classes).forEach(c => map[c] = true);
    return map;
};
const SCHEME = /^[a-z][a-z0-9+\-.]*:/;
const openURL = async (url, ev, direction) => {
    if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
        const router = document.querySelector('ion-router');
        if (router) {
            if (ev != null) {
                ev.preventDefault();
            }
            return router.push(url, direction);
        }
    }
    return false;
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/watch-options-2af96011.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/watch-options-2af96011.js ***!
  \*********************************************************************/
/*! exports provided: f, w */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return findCheckedOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return watchForOptions; });
const watchForOptions = (containerEl, tagName, onChange) => {
    const mutation = new MutationObserver(mutationList => {
        onChange(getSelectedOption(mutationList, tagName));
    });
    mutation.observe(containerEl, {
        childList: true,
        subtree: true
    });
    return mutation;
};
const getSelectedOption = (mutationList, tagName) => {
    let newOption;
    mutationList.forEach(mut => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < mut.addedNodes.length; i++) {
            newOption = findCheckedOption(mut.addedNodes[i], tagName) || newOption;
        }
    });
    return newOption;
};
const findCheckedOption = (el, tagName) => {
    if (el.nodeType !== 1) {
        return undefined;
    }
    const options = (el.tagName === tagName.toUpperCase())
        ? [el]
        : Array.from(el.querySelectorAll(tagName));
    return options.find((o) => o.checked === true);
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _slider_slider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slider/slider.component */ "./src/app/components/slider/slider.component.ts");





let ComponentsModule = class ComponentsModule {
};
ComponentsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_slider_slider_component__WEBPACK_IMPORTED_MODULE_4__["SliderComponent"],],
        exports: [_slider_slider_component__WEBPACK_IMPORTED_MODULE_4__["SliderComponent"]],
        imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]]
    })
], ComponentsModule);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_slider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/slider.service */ "./src/app/services/slider.service.ts");




let SliderComponent = class SliderComponent {
    constructor(router, sliderService) {
        this.router = router;
        this.sliderService = sliderService;
        this.items = [];
    }
    ngOnInit() {
        this.sliderService.getData(this.options.requestUrl)
            .subscribe(data => {
            for (let d of Object.keys(data)) {
                this.items.push(data[d]);
            }
        });
    }
    openDetails(item) {
        let data = {
            id: item[this.options.dataObject.id],
            name: item[this.options.dataObject.name]
        };
        let params = {
            queryParams: {
                q: JSON.stringify(data)
            }
        };
        this.router.navigate([this.options.slideRedirect], params);
    }
    openAll() {
        this.router.navigate(['/browse-by-all']);
    }
};
SliderComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_services_slider_service__WEBPACK_IMPORTED_MODULE_3__["SliderService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SliderComponent.prototype, "options", void 0);
SliderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-slider',
        template: __webpack_require__(/*! raw-loader!./slider.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/slider/slider.component.html"),
        styles: [__webpack_require__(/*! ./slider.component.scss */ "./src/app/components/slider/slider.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], src_app_services_slider_service__WEBPACK_IMPORTED_MODULE_3__["SliderService"]])
], SliderComponent);



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".itemList ion-grid {\n  background-color: #f5f5f5;\n}\n.itemList .item {\n  background-color: #fff;\n  border: 4px solid #f5f5f5;\n}\n.itemList .item ion-text {\n  padding: 0 5px;\n}\n.itemList .item ion-text h5 {\n  margin: 2px auto;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  font-size: 1em;\n}\n.itemList .item .price {\n  color: firebrick;\n}\n.itemList .badgeHolder {\n  position: absolute;\n}\n.itemList .badgeHolder .bidBadge {\n  position: relative;\n  font-size: 12px;\n  top: 0;\n  left: 0;\n  padding: 5px 10px;\n  color: white;\n  background-color: firebrick;\n  z-index: 2;\n}\n.itemList .badgeHolder .bidBadge::after {\n  content: \" \";\n  position: absolute;\n  background-color: firebrick;\n  top: 12;\n  margin-left: 2px;\n  height: 16px;\n  width: 16px;\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  z-index: -1;\n}\n.itemList .badgeHolder .badge-success, .itemList .badgeHolder .badge-success::after {\n  background-color: seagreen !important;\n}\nion-list ion-label {\n  text-transform: uppercase;\n}\n.searchResult {\n  position: absolute !important;\n  z-index: 9999;\n  width: 100%;\n  top: 110px;\n  box-shadow: 5px 10px 8px #888888;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9EOlxcd29ya1xcUHJvamVjdHNcXEFjY1JlYWxTb2Z0XFxNb2JpbGVcXG9ubGluZWF1Y3Rpb25hcHAvc3JjXFxhcHBcXGhvbWVcXGhvbWUucGFnZS5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0UseUJBQUE7QUNBSjtBREdFO0VBQ0Usc0JBQUE7RUFDQSx5QkFBQTtBQ0RKO0FER0k7RUFDRSxjQUFBO0FDRE47QURFTTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLDRCQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0FDQVI7QURHSTtFQUNFLGdCQUFBO0FDRE47QURLRTtFQUNFLGtCQUFBO0FDSEo7QURLSTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxVQUFBO0FDSE47QURNSTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsT0FBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxnQ0FBQTtVQUFBLHdCQUFBO0VBQ0EsV0FBQTtBQ0pOO0FET0k7RUFDRSxxQ0FBQTtBQ0xOO0FEYUU7RUFDRSx5QkFBQTtBQ1ZKO0FEY0E7RUFDRSw2QkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLGdDQUFBO0FDWEYiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLml0ZW1MaXN0e1xuICBpb24tZ3JpZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbiAgfVxuXG4gIC5pdGVte1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgYm9yZGVyOiA0cHggc29saWQgI2Y1ZjVmNTtcblxuICAgIGlvbi10ZXh0e1xuICAgICAgcGFkZGluZzogMCA1cHg7XG4gICAgICBoNXtcbiAgICAgICAgbWFyZ2luOiAycHggYXV0bztcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7ICBcbiAgICAgICAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICAgICAgICBmb250LXNpemU6IDFlbTtcbiAgICAgIH1cbiAgICB9XG4gICAgLnByaWNle1xuICAgICAgY29sb3I6IGZpcmVicmljaztcbiAgICB9XG4gIH1cblxuICAuYmFkZ2VIb2xkZXJ7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuXG4gICAgLmJpZEJhZGdle1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgdG9wOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogZmlyZWJyaWNrO1xuICAgICAgei1pbmRleDogMjtcbiAgICB9XG5cbiAgICAuYmlkQmFkZ2U6OmFmdGVye1xuICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBmaXJlYnJpY2s7XG4gICAgICB0b3A6IDEyO1xuICAgICAgbWFyZ2luLWxlZnQ6IDJweDtcbiAgICAgIGhlaWdodDogMTZweDtcbiAgICAgIHdpZHRoOiAxNnB4O1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgei1pbmRleDogLTE7XG4gICAgfVxuXG4gICAgLmJhZGdlLXN1Y2Nlc3MsIC5iYWRnZS1zdWNjZXNzOjphZnRlcntcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHNlYWdyZWVuICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIFxuICB9XG4gIFxufVxuXG5pb24tbGlzdHtcbiAgaW9uLWxhYmVse1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIH1cbn1cblxuLnNlYXJjaFJlc3VsdHtcbiAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7IFxuICB6LWluZGV4OiA5OTk5OyBcbiAgd2lkdGg6IDEwMCU7IFxuICB0b3A6IDExMHB4O1xuICBib3gtc2hhZG93OiA1cHggMTBweCA4cHggIzg4ODg4ODtcbn0iLCIuaXRlbUxpc3QgaW9uLWdyaWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xufVxuLml0ZW1MaXN0IC5pdGVtIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiA0cHggc29saWQgI2Y1ZjVmNTtcbn1cbi5pdGVtTGlzdCAuaXRlbSBpb24tdGV4dCB7XG4gIHBhZGRpbmc6IDAgNXB4O1xufVxuLml0ZW1MaXN0IC5pdGVtIGlvbi10ZXh0IGg1IHtcbiAgbWFyZ2luOiAycHggYXV0bztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG4gIC13ZWJraXQtbGluZS1jbGFtcDogMjtcbiAgZm9udC1zaXplOiAxZW07XG59XG4uaXRlbUxpc3QgLml0ZW0gLnByaWNlIHtcbiAgY29sb3I6IGZpcmVicmljaztcbn1cbi5pdGVtTGlzdCAuYmFkZ2VIb2xkZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4uaXRlbUxpc3QgLmJhZGdlSG9sZGVyIC5iaWRCYWRnZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6IGZpcmVicmljaztcbiAgei1pbmRleDogMjtcbn1cbi5pdGVtTGlzdCAuYmFkZ2VIb2xkZXIgLmJpZEJhZGdlOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiIFwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJhY2tncm91bmQtY29sb3I6IGZpcmVicmljaztcbiAgdG9wOiAxMjtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbiAgaGVpZ2h0OiAxNnB4O1xuICB3aWR0aDogMTZweDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICB6LWluZGV4OiAtMTtcbn1cbi5pdGVtTGlzdCAuYmFkZ2VIb2xkZXIgLmJhZGdlLXN1Y2Nlc3MsIC5pdGVtTGlzdCAuYmFkZ2VIb2xkZXIgLmJhZGdlLXN1Y2Nlc3M6OmFmdGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogc2VhZ3JlZW4gIWltcG9ydGFudDtcbn1cblxuaW9uLWxpc3QgaW9uLWxhYmVsIHtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLnNlYXJjaFJlc3VsdCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xuICB6LWluZGV4OiA5OTk5O1xuICB3aWR0aDogMTAwJTtcbiAgdG9wOiAxMTBweDtcbiAgYm94LXNoYWRvdzogNXB4IDEwcHggOHB4ICM4ODg4ODg7XG59Il19 */"

/***/ }),

/***/ "./src/app/services/products.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/products.service.ts ***!
  \**********************************************/
/*! exports provided: ProductsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsService", function() { return ProductsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _env_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./env.service */ "./src/app/services/env.service.ts");




let ProductsService = class ProductsService {
    constructor(route, env) {
        this.route = route;
        this.env = env;
    }
    getProductsFromCategory(id, index, accountStatus) {
        return this.route.get(this.env.API_URL + 'category/' + id + '/products?index=' + index + "&accountStatus=" + accountStatus);
    }
    getProductsFromCompany(id, index, accountStatus) {
        return this.route.get(this.env.API_URL + 'company/' + id + '/products?index=' + index + "&accountStatus=" + accountStatus);
    }
    getCategories() {
        return this.route.get(this.env.API_URL + 'category');
    }
    getCompanies() {
        return this.route.get(this.env.API_URL + 'branch');
    }
    getDisplayItems(index) {
        return this.route.get(this.env.API_URL + 'product/displays?index=' + index);
    }
    getAuctionItems(index) {
        return this.route.get(this.env.API_URL + 'product/auctions?index=' + index);
    }
    getAuctionItemDetails(id) {
        return this.route.get(this.env.API_URL + 'product/' + id + '/auction');
    }
    getAuctionItemBiddings(id, userID) {
        return this.route.get(this.env.API_URL + 'product/' + id + '/biddings?userID=' + userID);
    }
    postBid(id, userID, amount) {
        return this.route.post(this.env.API_URL + 'product/' + id + '/bid', {
            userID: userID, amount: amount
        });
    }
    getDisplayItemDetails(id, userID) {
        return this.route.get(this.env.API_URL + 'product/' + id + '/display?userID=' + userID);
    }
    postRate(id, userID, rate) {
        return this.route.post(this.env.API_URL + 'product/' + id + '/rate?userID=' + userID, rate);
    }
    getSearchProduct(query) {
        return this.route.get(this.env.API_URL + 'product/search?query=' + query);
    }
    getUserBiddings(userID) {
        return this.route.get(this.env.API_URL + 'bidders/biddings?userID=' + userID);
    }
};
ProductsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"] }
];
ProductsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"]])
], ProductsService);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _env_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./env.service */ "./src/app/services/env.service.ts");




let ProfileService = class ProfileService {
    constructor(http, env) {
        this.http = http;
        this.env = env;
    }
    register(user) {
        return this.http.post(this.env.API_URL + 'bidder/register', {
            UserName: user.username,
            Password: user.password,
            Bdate: user.Bdate
        });
    }
    checkUsernameAvailability(username) {
        return this.http.get(this.env.API_URL + 'bidder/username/check?username=' + username);
    }
    updateProfile(id, profile) {
        return this.http.put(this.env.API_URL + 'bidder/profile/' + id + "/update/", profile);
    }
    saveImage(id, imageBase64, type) {
        return this.http.post(this.env.API_URL + "bidder/profile/" + id + "/image", {
            imageBase64: imageBase64,
            type: type
        });
    }
    getUserData(id) {
        return this.http.get(this.env.API_URL + 'bidder/profile/' + id);
    }
    checkCardImage(id) {
        return this.http.get(this.env.API_URL + 'bidder/checkcardimage?id=' + id);
    }
    updatePassword(id, oldPassword, newPassword) {
        return this.http.put(this.env.API_URL + 'profile/' + id + '/updatePassword', {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    }
    checkTokenValidity(id, token) {
        return this.http.get(this.env.API_URL + 'profile/' + id + '/checktoken?token=' + token);
    }
    registerFCMToken(id, token) {
        return this.http.post(this.env.API_URL + 'profile/' + id + '/token', {
            token: token
        });
    }
};
ProfileService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"] }
];
ProfileService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"]])
], ProfileService);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _env_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./env.service */ "./src/app/services/env.service.ts");




let SliderService = class SliderService {
    constructor(http, env) {
        this.http = http;
        this.env = env;
    }
    getData(reqUrl) {
        return this.http.get(this.env.API_URL + reqUrl);
    }
};
SliderService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"] }
];
SliderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _env_service__WEBPACK_IMPORTED_MODULE_3__["EnvService"]])
], SliderService);



/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map