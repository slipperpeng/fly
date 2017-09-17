(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    type: function type(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase();
    },
    isObject: function isObject(ob, real) {
        if (real) {
            return this.type(ob) === "object";
        } else {
            return ob && (typeof ob === 'undefined' ? 'undefined' : _typeof(ob)) === 'object';
        }
    },
    isFormData: function isFormData(val) {
        return typeof FormData !== 'undefined' && val instanceof FormData;
    },
    trim: function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    encode: function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    },
    formatParams: function formatParams(data) {
        var arr = [];
        for (var name in data) {
            var value = data[name];
            if (this.isObject(value)) {
                value = JSON.stringify(value);
            }
            arr.push(this.encode(name) + "=" + this.encode(value));
        }
        return arr.join("&");
    },

    //不覆盖已存在的属性
    merge: function merge(a, b) {
        for (var key in b) {
            if (!a[key]) {
                a[key] = b[key];
            } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                this.merge(a[key], b[key]);
            }
        }
    }
};

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function KEEP(_,cb){cb();}
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * author: wendu
 * email: 824783146@qq.com
 **/
var trim = __webpack_require__(0).trim;
var type = __webpack_require__(0).type;
var log = console.log;
var adapter;

var AjaxEngine = function () {
    function AjaxEngine() {
        _classCallCheck(this, AjaxEngine);

        this.requestHeaders = {};
        this.readyState = 0;
        this.timeout = 0; //无超时
        this.responseURL = "";
        self.responseHeaders = {};
        this.onreadystatechange = this.onload = this.onerror = this.ontimeout = this.onloadend = null;
    }

    _createClass(AjaxEngine, [{
        key: '_changeReadyState',
        value: function _changeReadyState(state) {
            this.readyState = state;
            this.onreadystatechange && this.onreadystatechange();
        }
    }, {
        key: '_end',
        value: function _end() {
            this.onloadend && this.onloadend();
        }
    }, {
        key: 'open',
        value: function open(method, url) {
            this.method = method;
            if (!url) {
                url = location.href;
            } else {
                url = trim(url);
                if (url.indexOf("http") !== 0) {
                    //是浏览器环境
                    if (typeof document !== "undefined") {
                        var t = document.createElement("a");
                        t.href = url;
                        url = t.href;
                    }
                }
            }
            this.responseURL = url;
            this._changeReadyState(1);
        }
    }, {
        key: 'send',
        value: function send(arg) {
            arg = arg || null;
            var dataType = type(arg);
            if (["null", "object", "array", "string", "number"].indexOf(dataType) === -1) {
                this.abort('Sorry! an error occurred in function "send" of AjaxEngine ,' + dataType + ' is not supported yet!');
                return;
            }
            this.requestHeaders.cookie = document.cookie;
            var self = this;
            if (adapter) {
                var request = {
                    method: self.method,
                    url: self.responseURL,
                    headers: self.requestHeaders,
                    data: arg
                };
                self._changeReadyState(3);
                var timer;
                if (self.timeout > 0) {
                    timer = setTimeout(function () {
                        if (self.readyState === 3) {
                            self._end();
                            self._changeReadyState(0);
                            self.ontimeout && self.ontimeout();
                        }
                    }, self.timeout);
                }
                adapter(request, function (response) {
                    //超时了
                    if (self.readyState !== 3) return;
                    clearTimeout(timer);

                    self.status = response.statusCode - 0;
                    //网络错误,端上返回0时代表错误
                    if (self.status === 0) {
                        self.statusText = response.responseText;
                        self._onerror(response.errMsg);
                    } else {
                        var headers = {};
                        for (var field in response.headers) {

                            var value = response.headers[field];
                            var key = field.toLowerCase();
                            //是数组直接赋值
                            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object") {
                                headers[key] = value;
                            } else {
                                headers[key] = headers[key] || [];
                                headers[key].push(value);
                            }
                        }
                        var cookies = headers["set-cookie"];
                        if (cookies) {
                            cookies.forEach(function (e) {
                                document.cookie = e.replace(/;\s*httpOnly/g, "");
                            });
                        }
                        self.responseHeaders = headers;
                        //错误码信息,暂且为状态码
                        self.statusText = "" + self.status;
                        if (self.status >= 200 && self.status < 300) {
                            self.response = self.responseText = response.responseText;
                            var contentType = self.getResponseHeader("content-type");
                            //目前只支持json文档自动解析
                            if (contentType && contentType.indexOf('json') !== -1) {
                                self.response = JSON.parse(response.responseText);
                                //log(self.response)
                            }
                            //回调onload
                            self.onload && self.onload();
                        } else {
                            self._onerror();
                        }
                    }
                    self._changeReadyState(4);
                    self._end();
                });
            } else {
                console.error("Ajax require adapter");
            }
        }
    }, {
        key: 'setRequestHeader',
        value: function setRequestHeader(key, value) {
            this.requestHeaders[trim(key)] = value;
        }
    }, {
        key: 'getResponseHeader',
        value: function getResponseHeader(key) {
            return this.responseHeaders[key].toString();
        }
    }, {
        key: 'getAllResponseHeaders',
        value: function getAllResponseHeaders() {
            var str = "";
            for (var key in this.responseHeaders) {
                str += key + ":" + this.getResponseHeader(key) + "\r\n";
            }
            return str;
        }
    }, {
        key: 'abort',
        value: function abort(msg) {
            this._changeReadyState(0);
            this._onerror(msg);
            this._end();
        }
    }, {
        key: '_onerror',
        value: function _onerror() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            this.onerror && this.onerror({ msg: msg });
        }
    }], [{
        key: 'setAdapter',
        value: function setAdapter(requestAdapter) {
            adapter = requestAdapter;
        }
    }]);

    return AjaxEngine;
}();
//build环境定义全局变量


;
//非build环境则导出
KEEP("!build", function () {
    module.exports = AjaxEngine;
});

/***/ })
/******/ ]);
});