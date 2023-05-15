!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/data/utils.js"], ["../core/utils/type","../core/dom_adapter","../core/utils/ready_callbacks","../core/utils/window","../core/utils/iterator","../core/utils/deferred","../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/data/utils.js", ["../core/utils/type", "../core/dom_adapter", "../core/utils/ready_callbacks", "../core/utils/window", "../core/utils/iterator", "../core/utils/deferred", "../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.errorMessageFromXhr = exports.base64_encode = exports.aggregators = exports.XHR_ERROR_UNLOAD = void 0;
  exports.isConjunctiveOperator = isConjunctiveOperator;
  exports.isDisjunctiveOperator = isDisjunctiveOperator;
  exports.rejectedPromise = exports.processRequestResultLock = exports.normalizeSortingInfo = exports.normalizeBinaryCriterion = exports.keysEqual = exports.isUnaryOperation = exports.isGroupCriterion = void 0;
  exports.throttleChanges = throttleChanges;
  exports.trivialPromise = void 0;
  var _type = $__require("../core/utils/type");
  var _dom_adapter = _interopRequireDefault($__require("../core/dom_adapter"));
  var _ready_callbacks = _interopRequireDefault($__require("../core/utils/ready_callbacks"));
  var _window = $__require("../core/utils/window");
  var _iterator = $__require("../core/utils/iterator");
  var _deferred = $__require("../core/utils/deferred");
  var _common = $__require("../core/utils/common");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  var ready = _ready_callbacks.default.add;
  var XHR_ERROR_UNLOAD = 'DEVEXTREME_XHR_ERROR_UNLOAD';
  exports.XHR_ERROR_UNLOAD = XHR_ERROR_UNLOAD;
  var normalizeBinaryCriterion = function normalizeBinaryCriterion(crit) {
    return [crit[0], crit.length < 3 ? '=' : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]];
  };
  exports.normalizeBinaryCriterion = normalizeBinaryCriterion;
  var normalizeSortingInfo = function normalizeSortingInfo(info) {
    if (!Array.isArray(info)) {
      info = [info];
    }
    return (0, _iterator.map)(info, function (i) {
      var result = {
        selector: (0, _type.isFunction)(i) || typeof i === 'string' ? i : i.getter || i.field || i.selector,
        desc: !!(i.desc || String(i.dir).charAt(0).toLowerCase() === 'd')
      };
      if (i.compare) {
        result.compare = i.compare;
      }
      return result;
    });
  };
  exports.normalizeSortingInfo = normalizeSortingInfo;
  var errorMessageFromXhr = function () {
    var textStatusMessages = {
      'timeout': 'Network connection timeout',
      'error': 'Unspecified network error',
      'parsererror': 'Unexpected server response'
    };

    ///#DEBUG
    var textStatusDetails = {
      'timeout': 'possible causes: the remote host is not accessible, overloaded or is not included into the domain white-list when being run in the native container',
      'error': 'if the remote host is located on another domain, make sure it properly supports cross-origin resource sharing (CORS), or use the JSONP approach instead',
      'parsererror': 'the remote host did not respond with valid JSON data'
    };
    ///#ENDDEBUG

    var explainTextStatus = function explainTextStatus(textStatus) {
      var result = textStatusMessages[textStatus];
      if (!result) {
        return textStatus;
      }

      ///#DEBUG
      result += ' (' + textStatusDetails[textStatus] + ')';
      ///#ENDDEBUG

      return result;
    };

    // T542570, https://stackoverflow.com/a/18170879
    var unloading;
    ready(function () {
      var window = (0, _window.getWindow)();
      _dom_adapter.default.listen(window, 'beforeunload', function () {
        unloading = true;
      });
    });
    return function (xhr, textStatus) {
      if (unloading) {
        return XHR_ERROR_UNLOAD;
      }
      if (xhr.status < 400) {
        return explainTextStatus(textStatus);
      }
      return xhr.statusText;
    };
  }();
  exports.errorMessageFromXhr = errorMessageFromXhr;
  var aggregators = {
    count: {
      seed: 0,
      step: function step(count) {
        return 1 + count;
      }
    },
    sum: {
      seed: 0,
      step: function step(sum, item) {
        return sum + item;
      }
    },
    min: {
      step: function step(min, item) {
        return item < min ? item : min;
      }
    },
    max: {
      step: function step(max, item) {
        return item > max ? item : max;
      }
    },
    avg: {
      seed: [0, 0],
      step: function step(pair, value) {
        return [pair[0] + value, pair[1] + 1];
      },
      finalize: function finalize(pair) {
        return pair[1] ? pair[0] / pair[1] : NaN;
      }
    }
  };
  exports.aggregators = aggregators;
  var processRequestResultLock = function () {
    var lockCount = 0;
    var lockDeferred;
    var obtain = function obtain() {
      if (lockCount === 0) {
        lockDeferred = new _deferred.Deferred();
      }
      lockCount++;
    };
    var release = function release() {
      lockCount--;
      if (lockCount < 1) {
        lockDeferred.resolve();
      }
    };
    var promise = function promise() {
      var deferred = lockCount === 0 ? new _deferred.Deferred().resolve() : lockDeferred;
      return deferred.promise();
    };
    var reset = function reset() {
      lockCount = 0;
      if (lockDeferred) {
        lockDeferred.resolve();
      }
    };
    return {
      obtain: obtain,
      release: release,
      promise: promise,
      reset: reset
    };
  }();
  exports.processRequestResultLock = processRequestResultLock;
  function isDisjunctiveOperator(condition) {
    return (/^(or|\|\||\|)$/i.test(condition)
    );
  }
  function isConjunctiveOperator(condition) {
    return (/^(and|&&|&)$/i.test(condition)
    );
  }
  var keysEqual = function keysEqual(keyExpr, key1, key2) {
    if (Array.isArray(keyExpr)) {
      var names = (0, _iterator.map)(key1, function (v, k) {
        return k;
      });
      var name;
      for (var i = 0; i < names.length; i++) {
        name = names[i];
        if (!(0, _common.equalByValue)(key1[name], key2[name], {
          strict: false
        })) {
          return false;
        }
      }
      return true;
    }
    return (0, _common.equalByValue)(key1, key2, {
      strict: false
    });
  };
  exports.keysEqual = keysEqual;
  var BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var base64_encode = function base64_encode(input) {
    if (!Array.isArray(input)) {
      input = stringToByteArray(String(input));
    }
    var result = '';
    function getBase64Char(index) {
      return BASE64_CHARS.charAt(index);
    }
    for (var i = 0; i < input.length; i += 3) {
      var octet1 = input[i];
      var octet2 = input[i + 1];
      var octet3 = input[i + 2];
      result += (0, _iterator.map)([octet1 >> 2, (octet1 & 3) << 4 | octet2 >> 4, isNaN(octet2) ? 64 : (octet2 & 15) << 2 | octet3 >> 6, isNaN(octet3) ? 64 : octet3 & 63], getBase64Char).join('');
    }
    return result;
  };
  exports.base64_encode = base64_encode;
  function stringToByteArray(str) {
    var bytes = [];
    var code;
    var i;
    for (i = 0; i < str.length; i++) {
      code = str.charCodeAt(i);
      if (code < 128) {
        bytes.push(code);
      } else if (code < 2048) {
        bytes.push(192 + (code >> 6), 128 + (code & 63));
      } else if (code < 65536) {
        bytes.push(224 + (code >> 12), 128 + (code >> 6 & 63), 128 + (code & 63));
      } else if (code < 2097152) {
        bytes.push(240 + (code >> 18), 128 + (code >> 12 & 63), 128 + (code >> 6 & 63), 128 + (code & 63));
      }
    }
    return bytes;
  }
  var isUnaryOperation = function isUnaryOperation(crit) {
    return crit[0] === '!' && Array.isArray(crit[1]);
  };
  exports.isUnaryOperation = isUnaryOperation;
  var isGroupOperator = function isGroupOperator(value) {
    return value === 'and' || value === 'or';
  };
  var isGroupCriterion = function isGroupCriterion(crit) {
    var first = crit[0];
    var second = crit[1];
    if (Array.isArray(first)) {
      return true;
    }
    if ((0, _type.isFunction)(first)) {
      if (Array.isArray(second) || (0, _type.isFunction)(second) || isGroupOperator(second)) {
        return true;
      }
    }
    return false;
  };
  exports.isGroupCriterion = isGroupCriterion;
  var trivialPromise = function trivialPromise() {
    var d = new _deferred.Deferred();
    return d.resolve.apply(d, arguments).promise();
  };
  exports.trivialPromise = trivialPromise;
  var rejectedPromise = function rejectedPromise() {
    var d = new _deferred.Deferred();
    return d.reject.apply(d, arguments).promise();
  };
  exports.rejectedPromise = rejectedPromise;
  function throttle(func, timeout) {
    var timeoutId;
    return function () {
      var _this = this;
      if (!timeoutId) {
        timeoutId = setTimeout(function () {
          timeoutId = undefined;
          func.call(_this);
        }, (0, _type.isFunction)(timeout) ? timeout() : timeout);
      }
      return timeoutId;
    };
  }
  function throttleChanges(func, timeout) {
    var cache = [];
    var throttled = throttle(function () {
      func.call(this, cache);
      cache = [];
    }, timeout);
    return function (changes) {
      if (Array.isArray(changes)) {
        var _cache;
        (_cache = cache).push.apply(_cache, _toConsumableArray(changes));
      }
      return throttled.call(this, cache);
    };
  }

  /**
  * @name Utils
  */
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/type","../core/dom_adapter","../core/utils/ready_callbacks","../core/utils/window","../core/utils/iterator","../core/utils/deferred","../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/type"), require("../core/dom_adapter"), require("../core/utils/ready_callbacks"), require("../core/utils/window"), require("../core/utils/iterator"), require("../core/utils/deferred"), require("../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.js.map