/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ApiService_ApiService__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Assertion_Assert__ = __webpack_require__(3);



/**
 * @name FormBuilder V1.0
 * @author Blake Connally with Sequoyah Technologies
 * @version 1.0.0
 * @summary This form builder was created to easily intertwine form creation with
 * AlpacaJS, Bootstrap and jQuery. Initially designed to solve the "no-framework"
 * event handling with forms. 
 * 
 * This frameworks primary functions include form building and data binding. 
 */
class FormBuild {

    /**
     * General configuration implementation
     * @param {object} config
     * @interface
     *  ComponentDirectory: String, //Manages the directory of components for quick selection
     *  EditorSelect: DOM Element, //Selects the editor holder for form implementation
     *      
     */
    constructor(config) {
        // Service management
        this.apiService = new __WEBPACK_IMPORTED_MODULE_0__ApiService_ApiService__["a" /* default */]();
        this.Assert = new __WEBPACK_IMPORTED_MODULE_1__Assertion_Assert__["a" /* default */]();
        this.config = config;
    }

    /**
     * Initial form setup
     * @param {AlpacaJS Object} config
     * @param {string} componentType
     * schema: http://www.alpacajs.org
     */
    setup(config, componentType) {
        this.get('/src/app/components/singles/hours/component.json', function (res) {
            console.log(res);
        });
    }

    /**
     * Clean the entire editing form
     */
    completeClean() {

    }

    /**
     * 
     * @param {string} componentType 
     * @param {function} callback 
     */
    fetch(componentType, callback = function () {}) {

    }

    /**
     * 
     * @param {form} form submit the entire form to save it's parameters 
     */
    submit(form) {

    }

}

var form = new FormBuild();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * API Service built to easily manage http requests using jQuery
 * Built and managed by Blake Connally
 */
class APIService {

    constructor() {

    }

    /**
     * 
     * @param {string} url url to query
     * @param {function} success function called on success
     * @param {function} error function called on error 
     * @param {string} dataType Response data type
     */
    get(url, success = function () {}, error = function () {}, dataType = 'JSON') {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: dataType,
            success: function (response) {
                success(response);
            },
            error: function (error) {
                error(error);
            }
        });
    }

    post() {

    }

    put() {

    }

    delete() {

    }

    test() {
        console.log('testing works');
    }
}

/* harmony default export */ __webpack_exports__["a"] = (APIService);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Configuration_Configuration__ = __webpack_require__(4);


/**
 * @name Assertion V1.0
 * @author Blake Connally with Sequoyah Technologies
 * @version 1.0.0
 * @summary This class is developed to provide Unit Testing on a basic level
 * with Javascript
 * 
 * This frameworks primary functions include form building and data binding. 
 */
class Assert {

    constructor() {
        // Services
        this.config = new __WEBPACK_IMPORTED_MODULE_0__Configuration_Configuration__["a" /* default */]();

        console.log(this.config.environment);
    }

    /**
     * Check if the value is a string
     * @param {string} arg 
     */
    isString(arg) {
        return typeof arg === 'string' ? true : false;
    }

    /**
     * Check if the value is a number
     * @param {number} arg 
     */
    isNumber(arg) {
        return typeof arg === 'number' ? true : false;
    }

    /**
     * Check if the value is a boolean
     * @param {boolean} arg 
     */
    isBoolean(arg) {
        return typeof arg === 'boolean' ? true : false;
    }

    /**
     * Check if the value is true
     * @param {boolean} arg 
     */
    isTrue(arg) {
        return arg === true ? true : false;
    }

    /**
     * Check if the value is false
     * @param {boolean} arg 
     */
    isFalse(arg) {
        return arg === false ? true : false;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Assert);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Configuration {
    constructor() {
        this.environment = 'prod'
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Configuration);

/***/ })
/******/ ]);