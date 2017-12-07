"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var object_1 = require("core-js/fn/object");
var RestangularHelper = (function () {
    function RestangularHelper() {
    }
    RestangularHelper.createRequestOptions = function (options) {
        var requestQueryParams = RestangularHelper.createRequestQueryParams(options.params);
        var requestHeaders = RestangularHelper.createRequestHeaders(options.headers);
        var methodName = options.method.charAt(0).toUpperCase() + options.method.substr(1).toLowerCase();
        var withCredentials = options.withCredentials || false;
        var requestOptions = new http_1.RequestOptions({
            method: http_1.RequestMethod[methodName],
            headers: requestHeaders,
            search: requestQueryParams,
            url: options.url,
            body: options.data,
            responseType: options.responseType,
            withCredentials: withCredentials
        });
        return requestOptions;
    };
    RestangularHelper.createRequestQueryParams = function (queryParams) {
        var requestQueryParams = object_1.assign({}, queryParams);
        var search = new http_1.URLSearchParams();
        var _loop_1 = function (key) {
            var value = requestQueryParams[key];
            if (Array.isArray(value)) {
                value.forEach(function (val) {
                    search.append(key, val);
                });
            }
            else {
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                search.append(key, value);
            }
        };
        for (var key in requestQueryParams) {
            _loop_1(key);
        }
        return search;
    };
    RestangularHelper.createRequestHeaders = function (headers) {
        for (var key in headers) {
            var value = headers[key];
            if (typeof value === 'undefined') {
                delete headers[key];
            }
        }
        return new http_1.Headers(object_1.assign({}, headers));
    };
    return RestangularHelper;
}());
exports.RestangularHelper = RestangularHelper;
//# sourceMappingURL=ngx-restangular-helper.js.map