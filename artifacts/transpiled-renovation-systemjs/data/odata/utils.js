!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/data/odata/utils.js"], ["../../core/class","../../core/utils/extend","../../core/utils/type","../../core/utils/iterator","../../core/utils/ajax","../../core/guid","../../core/utils/common","../../core/utils/deferred","../errors","../utils","../../core/utils/string"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/data/odata/utils.js", ["../../core/class", "../../core/utils/extend", "../../core/utils/type", "../../core/utils/iterator", "../../core/utils/ajax", "../../core/guid", "../../core/utils/common", "../../core/utils/deferred", "../errors", "../utils", "../../core/utils/string"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.serializeValue = exports.serializePropName = exports.serializeKey = exports.sendRequest = exports.keyConverters = exports.generateSelect = exports.generateExpand = exports.formatFunctionInvocationUrl = exports.escapeServiceOperationParams = exports.convertPrimitiveValue = exports.OData__internals = exports.EdmLiteral = void 0;
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _ajax = _interopRequireDefault($__require("../../core/utils/ajax"));
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _common = $__require("../../core/utils/common");
  var _deferred = $__require("../../core/utils/deferred");
  var _errors = $__require("../errors");
  var _utils = $__require("../utils");
  var _string = $__require("../../core/utils/string");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  var GUID_REGEX = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
  var VERBOSE_DATE_REGEX = /^\/Date\((-?\d+)((\+|-)?(\d+)?)\)\/$/;
  var ISO8601_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[-+]{1}\d{2}(:?)(\d{2})?)?$/;

  // Request processing
  var JSON_VERBOSE_MIME_TYPE = 'application/json;odata=verbose';
  var makeArray = function makeArray(value) {
    return (0, _type.type)(value) === 'string' ? value.split() : value;
  };
  var hasDot = function hasDot(x) {
    return (/\./.test(x)
    );
  };
  var pad = function pad(text, length, right) {
    text = String(text);
    while (text.length < length) {
      text = right ? "".concat(text, "0") : "0".concat(text);
    }
    return text;
  };
  var formatISO8601 = function formatISO8601(date, skipZeroTime, skipTimezone) {
    var bag = [];
    var isZeroTime = function isZeroTime() {
      return date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() < 1;
    };
    var padLeft2 = function padLeft2(text) {
      return pad(text, 2);
    };
    bag.push(date.getFullYear());
    bag.push('-');
    bag.push(padLeft2(date.getMonth() + 1));
    bag.push('-');
    bag.push(padLeft2(date.getDate()));
    if (!(skipZeroTime && isZeroTime())) {
      bag.push('T');
      bag.push(padLeft2(date.getHours()));
      bag.push(':');
      bag.push(padLeft2(date.getMinutes()));
      bag.push(':');
      bag.push(padLeft2(date.getSeconds()));
      if (date.getMilliseconds()) {
        bag.push('.');
        bag.push(pad(date.getMilliseconds(), 3));
      }
      if (!skipTimezone) {
        bag.push('Z');
      }
    }
    return bag.join('');
  };
  var parseISO8601 = function parseISO8601(isoString) {
    var result = new Date(new Date(0).getTimezoneOffset() * 60 * 1000);
    var chunks = isoString.replace('Z', '').split('T');
    var date = /(\d{4})-(\d{2})-(\d{2})/.exec(chunks[0]);
    var time = /(\d{2}):(\d{2}):(\d{2})\.?(\d{0,7})?/.exec(chunks[1]);
    result.setFullYear(Number(date[1]));
    result.setMonth(Number(date[2]) - 1);
    result.setDate(Number(date[3]));
    if (Array.isArray(time) && time.length) {
      result.setHours(Number(time[1]));
      result.setMinutes(Number(time[2]));
      result.setSeconds(Number(time[3]));
      var fractional = (time[4] || '').slice(0, 3);
      fractional = pad(fractional, 3, true);
      result.setMilliseconds(Number(fractional));
    }
    return result;
  };
  var isAbsoluteUrl = function isAbsoluteUrl(url) {
    return (/^(?:[a-z]+:)?\/{2,2}/i.test(url)
    );
  };
  var stripParams = function stripParams(url) {
    var index = url.indexOf('?');
    if (index > -1) {
      return url.substr(0, index);
    }
    return url;
  };
  var toAbsoluteUrl = function toAbsoluteUrl(basePath, relativePath) {
    var part;
    var baseParts = stripParams(basePath).split('/');
    var relativeParts = relativePath.split('/');
    baseParts.pop();
    while (relativeParts.length) {
      part = relativeParts.shift();
      if (part === '..') {
        baseParts.pop();
      } else {
        baseParts.push(part);
      }
    }
    return baseParts.join('/');
  };
  var param = function param(params) {
    var result = [];
    for (var name in params) {
      result.push(name + '=' + params[name]);
    }
    return result.join('&');
  };
  var ajaxOptionsForRequest = function ajaxOptionsForRequest(protocolVersion, request) {
    var _options$beforeSend;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var formatPayload = function formatPayload(payload) {
      return JSON.stringify(payload, function (key, value) {
        if (!(this[key] instanceof Date)) {
          return value;
        }
        value = formatISO8601(this[key]);
        switch (protocolVersion) {
          case 2:
            return value.substr(0, value.length - 1);
          case 3:
          case 4:
            return value;
          default:
            throw _errors.errors.Error('E4002');
        }
      });
    };
    request = (0, _extend.extend)({
      async: true,
      method: 'get',
      url: '',
      params: {},
      payload: null,
      headers: {},
      timeout: 30000
    }, request);
    (_options$beforeSend = options.beforeSend) === null || _options$beforeSend === void 0 ? void 0 : _options$beforeSend.call(options, request);
    var _request = request,
        async = _request.async,
        timeout = _request.timeout,
        headers = _request.headers;
    var _request2 = request,
        url = _request2.url,
        method = _request2.method;
    var jsonp = options.jsonp,
        withCredentials = options.withCredentials;
    method = (method || 'get').toLowerCase();
    var isGet = method === 'get';
    var useJsonp = isGet && jsonp;
    var params = (0, _extend.extend)({}, request.params);
    var ajaxData = isGet ? params : formatPayload(request.payload);
    var qs = !isGet && param(params);
    var contentType = !isGet && JSON_VERBOSE_MIME_TYPE;
    if (qs) {
      url += (url.indexOf('?') > -1 ? '&' : '?') + qs;
    }
    if (useJsonp) {
      ajaxData['$format'] = 'json';
    }
    return {
      url: url,
      data: ajaxData,
      dataType: useJsonp ? 'jsonp' : 'json',
      jsonp: useJsonp && '$callback',
      method: method,
      async: async,
      timeout: timeout,
      headers: headers,
      contentType: contentType,
      accepts: {
        json: [JSON_VERBOSE_MIME_TYPE, 'text/plain'].join()
      },
      xhrFields: {
        withCredentials: withCredentials
      }
    };
  };
  var sendRequest = function sendRequest(protocolVersion, request, options) {
    var deserializeDates = options.deserializeDates,
        fieldTypes = options.fieldTypes,
        countOnly = options.countOnly,
        isPaged = options.isPaged;
    var d = new _deferred.Deferred();
    var ajaxOptions = ajaxOptionsForRequest(protocolVersion, request, options);
    _ajax.default.sendRequest(ajaxOptions).always(function (obj, textStatus) {
      var transformOptions = {
        deserializeDates: deserializeDates,
        fieldTypes: fieldTypes
      };
      var tuple = interpretJsonFormat(obj, textStatus, transformOptions, ajaxOptions);
      var error = tuple.error,
          data = tuple.data,
          count = tuple.count;
      var nextUrl = tuple.nextUrl;
      if (error) {
        if (error.message !== _utils.XHR_ERROR_UNLOAD) {
          d.reject(error);
        }
      } else if (countOnly) {
        if (isFinite(count)) {
          d.resolve(count);
        } else {
          d.reject(new _errors.errors.Error('E4018'));
        }
      } else if (nextUrl && !isPaged) {
        if (!isAbsoluteUrl(nextUrl)) {
          nextUrl = toAbsoluteUrl(ajaxOptions.url, nextUrl);
        }
        sendRequest(protocolVersion, {
          url: nextUrl
        }, options).fail(d.reject).done(function (nextData) {
          return d.resolve(data.concat(nextData));
        });
      } else {
        var extra = isFinite(count) ? {
          totalCount: count
        } : undefined;
        d.resolve(data, extra);
      }
    });
    return d.promise();
  };
  exports.sendRequest = sendRequest;
  var formatDotNetError = function formatDotNetError(errorObj) {
    var message;
    var currentMessage;
    var currentError = errorObj;
    if ('message' in errorObj) {
      var _errorObj$message;
      message = ((_errorObj$message = errorObj.message) === null || _errorObj$message === void 0 ? void 0 : _errorObj$message.value) || errorObj.message;
    }
    while (currentError = currentError['innererror'] || currentError['internalexception']) {
      var _currentMessage;
      currentMessage = currentError.message;
      message = (_currentMessage = currentMessage) !== null && _currentMessage !== void 0 ? _currentMessage : message;
      if (currentError['internalexception'] && message.indexOf('inner exception') === -1) {
        break;
      }
    }
    return message;
  };

  // TODO split: decouple HTTP errors from OData errors
  var errorFromResponse = function errorFromResponse(obj, textStatus, ajaxOptions) {
    var _response, _response2, _response3, _response4;
    if (textStatus === 'nocontent') {
      return null; // workaround for http://bugs.jquery.com/ticket/13292
    }

    var message = 'Unknown error';
    var response = obj;
    var httpStatus = 200;
    var errorData = {
      requestOptions: ajaxOptions
    };
    if (textStatus !== 'success') {
      var status = obj.status,
          responseText = obj.responseText;
      httpStatus = status;
      message = (0, _utils.errorMessageFromXhr)(obj, textStatus);
      try {
        response = JSON.parse(responseText);
      } catch (x) {}
    }
    var errorObj = ((_response = response) === null || _response === void 0 ? void 0 : _response.then) || ((_response2 = response) === null || _response2 === void 0 ? void 0 : _response2.error) || ((_response3 = response) === null || _response3 === void 0 ? void 0 : _response3['odata.error']) || ((_response4 = response) === null || _response4 === void 0 ? void 0 : _response4['@odata.error']);
    // NOTE: $.Deferred rejected and response contain error message
    // NOTE: $.Deferred resolved with odata error

    if (errorObj) {
      message = formatDotNetError(errorObj) || message;
      errorData.errorDetails = errorObj;
      if (httpStatus === 200) {
        httpStatus = 500;
      }
      var customCode = Number(errorObj.code);
      if (isFinite(customCode) && customCode >= 400) {
        httpStatus = customCode;
      }
    }
    if (httpStatus >= 400 || httpStatus === 0) {
      errorData.httpStatus = httpStatus;
      return (0, _extend.extend)(Error(message), errorData);
    }
    return null;
  };
  var interpretJsonFormat = function interpretJsonFormat(obj, textStatus, transformOptions, ajaxOptions) {
    var error = errorFromResponse(obj, textStatus, ajaxOptions);
    if (error) {
      return {
        error: error
      };
    }
    if (!(0, _type.isPlainObject)(obj)) {
      return {
        data: obj
      };
    }
    var value = 'd' in obj && (Array.isArray(obj.d) || (0, _type.isObject)(obj.d)) ? interpretVerboseJsonFormat(obj) : interpretLightJsonFormat(obj);
    transformTypes(value, transformOptions);
    return value;
  };
  var interpretVerboseJsonFormat = function interpretVerboseJsonFormat(_ref) {
    var _data$results;
    var data = _ref.d;
    if (!(0, _type.isDefined)(data)) {
      return {
        error: Error('Malformed or unsupported JSON response received')
      };
    }
    return {
      data: (_data$results = data.results) !== null && _data$results !== void 0 ? _data$results : data,
      nextUrl: data.__next,
      count: parseInt(data.__count, 10)
    };
  };
  var interpretLightJsonFormat = function interpretLightJsonFormat(obj) {
    var _obj$value;
    return {
      data: (_obj$value = obj.value) !== null && _obj$value !== void 0 ? _obj$value : obj,
      nextUrl: obj['@odata.nextLink'],
      count: parseInt(obj['@odata.count'], 10)
    };
  };

  // Serialization and parsing

  var EdmLiteral = _class.default.inherit({
    /**
    * @name EdmLiteral.ctor
    * @publicName ctor(value)
    * @param1 value:string
    */
    ctor: function ctor(value) {
      this._value = value;
    },
    valueOf: function valueOf() {
      return this._value;
    }
  });
  exports.EdmLiteral = EdmLiteral;
  var transformTypes = function transformTypes(obj) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _iterator.each)(obj, function (key, value) {
      if (value !== null && _typeof(value) === 'object') {
        if ('results' in value) {
          obj[key] = value.results;
        }
        transformTypes(obj[key], options);
      } else if (typeof value === 'string') {
        var fieldTypes = options.fieldTypes,
            deserializeDates = options.deserializeDates;
        var canBeGuid = !fieldTypes || fieldTypes[key] !== 'String';
        if (canBeGuid && GUID_REGEX.test(value)) {
          obj[key] = new _guid.default(value);
        }
        if (deserializeDates !== false) {
          if (value.match(VERBOSE_DATE_REGEX)) {
            var date = new Date(Number(RegExp.$1) + RegExp.$2 * 60 * 1000);
            obj[key] = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
          } else if (ISO8601_DATE_REGEX.test(value)) {
            obj[key] = new Date(parseISO8601(obj[key]).valueOf());
          }
        }
      }
    });
  };
  var serializeDate = function serializeDate(date) {
    return "datetime'".concat(formatISO8601(date, true, true), "'");
  };
  var serializeString = function serializeString(value) {
    return "'".concat(value.replace(/'/g, '\'\''), "'");
  };
  var serializePropName = function serializePropName(propName) {
    return propName instanceof EdmLiteral ? propName.valueOf() : propName.replace(/\./g, '/');
  };
  exports.serializePropName = serializePropName;
  var serializeValueV4 = function serializeValueV4(value) {
    if (value instanceof Date) {
      return formatISO8601(value, false, false);
    }
    if (value instanceof _guid.default) {
      return value.valueOf();
    }
    if (Array.isArray(value)) {
      return "[".concat(value.map(function (item) {
        return serializeValueV4(item);
      }).join(','), "]");
    }
    return serializeValueV2(value);
  };
  var serializeValueV2 = function serializeValueV2(value) {
    if (value instanceof Date) {
      return serializeDate(value);
    }
    if (value instanceof _guid.default) {
      return "guid'".concat(value, "'");
    }
    if (value instanceof EdmLiteral) {
      return value.valueOf();
    }
    if (typeof value === 'string') {
      return serializeString(value);
    }
    return String(value);
  };
  var serializeValue = function serializeValue(value, protocolVersion) {
    switch (protocolVersion) {
      case 2:
      case 3:
        return serializeValueV2(value);
      case 4:
        return serializeValueV4(value);
      default:
        throw _errors.errors.Error('E4002');
    }
  };
  exports.serializeValue = serializeValue;
  var serializeKey = function serializeKey(key, protocolVersion) {
    if ((0, _type.isPlainObject)(key)) {
      var parts = [];
      (0, _iterator.each)(key, function (k, v) {
        return parts.push("".concat(serializePropName(k), "=").concat(serializeValue(v, protocolVersion)));
      });
      return parts.join();
    }
    return serializeValue(key, protocolVersion);
  };
  exports.serializeKey = serializeKey;
  var keyConverters = {
    String: function String(value) {
      return "".concat(value);
    },
    Int32: function Int32(value) {
      return Math.floor(value);
    },
    Int64: function Int64(value) {
      return value instanceof EdmLiteral ? value : new EdmLiteral("".concat(value, "L"));
    },
    Guid: function Guid(value) {
      return value instanceof _guid.default ? value : new _guid.default(value);
    },
    Boolean: function Boolean(value) {
      return !!value;
    },
    Single: function Single(value) {
      return value instanceof EdmLiteral ? value : new EdmLiteral(value + 'f');
    },
    Decimal: function Decimal(value) {
      return value instanceof EdmLiteral ? value : new EdmLiteral(value + 'm');
    }
  };
  exports.keyConverters = keyConverters;
  var convertPrimitiveValue = function convertPrimitiveValue(type, value) {
    if (value === null) return null;
    var converter = keyConverters[type];
    if (!converter) {
      throw _errors.errors.Error('E4014', type);
    }
    return converter(value);
  };
  exports.convertPrimitiveValue = convertPrimitiveValue;
  var generateSelect = function generateSelect(oDataVersion, select) {
    if (!select) {
      return;
    }
    return oDataVersion < 4 ? serializePropName(select.join()) : (0, _common.grep)(select, hasDot, true).join();
  };
  exports.generateSelect = generateSelect;
  var formatCore = function formatCore(hash) {
    var result = '';
    var selectValue = [];
    var expandValue = [];
    (0, _iterator.each)(hash, function (key, value) {
      if (Array.isArray(value)) {
        [].push.apply(selectValue, value);
      }
      if ((0, _type.isPlainObject)(value)) {
        expandValue.push("".concat(key).concat(formatCore(value)));
      }
    });
    if (selectValue.length || expandValue.length) {
      result += '(';
      if (selectValue.length) {
        result += "$select=".concat((0, _iterator.map)(selectValue, serializePropName).join());
      }
      if (expandValue.length) {
        if (selectValue.length) {
          result += ';';
        }
        result += "$expand=".concat((0, _iterator.map)(expandValue, serializePropName).join());
      }
      result += ')';
    }
    return result;
  };
  var format = function format(hash) {
    var result = [];
    (0, _iterator.each)(hash, function (key, value) {
      return result.push("".concat(key).concat(formatCore(value)));
    });
    return result.join();
  };
  var parseCore = function parseCore(exprParts, root, stepper) {
    var result = stepper(root, exprParts.shift(), exprParts);
    if (result === false) {
      return;
    }
    parseCore(exprParts, result, stepper);
  };
  var parseTree = function parseTree(exprs, root, stepper) {
    return (0, _iterator.each)(exprs, function (_, x) {
      return parseCore(x.split('.'), root, stepper);
    });
  };
  var generatorV2 = function generatorV2(expand, select) {
    var hash = {};
    if (expand) {
      (0, _iterator.each)(makeArray(expand), function () {
        hash[serializePropName(this)] = 1;
      });
    }
    if (select) {
      (0, _iterator.each)(makeArray(select), function () {
        var path = this.split('.');
        if (path.length < 2) {
          return;
        }
        path.pop();
        hash[serializePropName(path.join('.'))] = 1;
      });
    }
    return (0, _iterator.map)(hash, function (_, v) {
      return v;
    }).join();
  };
  var generatorV4 = function generatorV4(expand, select) {
    var hash = {};
    if (expand || select) {
      if (expand) {
        parseTree(makeArray(expand), hash, function (node, key, path) {
          node[key] = node[key] || {};
          return !path.length ? false : node[key];
        });
      }
      if (select) {
        parseTree((0, _common.grep)(makeArray(select), hasDot), hash, function (node, key, path) {
          if (!path.length) {
            node[key] = node[key] || [];
            node[key].push(key);
            return false;
          }
          return node[key] = node[key] || {};
        });
      }
      return format(hash);
    }
  };
  var generateExpand = function generateExpand(oDataVersion, expand, select) {
    return oDataVersion < 4 ? generatorV2(expand, select) : generatorV4(expand, select);
  };
  exports.generateExpand = generateExpand;
  var formatFunctionInvocationUrl = function formatFunctionInvocationUrl(baseUrl, args) {
    return (0, _string.format)('{0}({1})', baseUrl, (0, _iterator.map)(args || {}, function (value, key) {
      return (0, _string.format)('{0}={1}', key, value);
    }).join(','));
  };
  exports.formatFunctionInvocationUrl = formatFunctionInvocationUrl;
  var escapeServiceOperationParams = function escapeServiceOperationParams(params, version) {
    if (!params) {
      return params;
    }

    // From WCF Data Services docs:
    // The type of each parameter must be a primitive type.
    // Any data of a non-primitive type must be serialized and passed into a string parameter
    var result = {};
    (0, _iterator.each)(params, function (k, v) {
      result[k] = serializeValue(v, version);
    });
    return result;
  };

  ///#DEBUG
  exports.escapeServiceOperationParams = escapeServiceOperationParams;
  var OData__internals = {
    interpretJsonFormat: interpretJsonFormat
  };
  ///#ENDDEBUG
  exports.OData__internals = OData__internals;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/class","../../core/utils/extend","../../core/utils/type","../../core/utils/iterator","../../core/utils/ajax","../../core/guid","../../core/utils/common","../../core/utils/deferred","../errors","../utils","../../core/utils/string"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/class"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../core/utils/ajax"), require("../../core/guid"), require("../../core/utils/common"), require("../../core/utils/deferred"), require("../errors"), require("../utils"), require("../../core/utils/string"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.js.map