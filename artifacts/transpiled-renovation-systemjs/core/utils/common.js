!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/core/utils/common.js"], ["../config","../guid","../utils/deferred","./data","./iterator","./type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/core/utils/common.js", ["../config", "../guid", "../utils/deferred", "./data", "./iterator", "./type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.splitPair = exports.pairToObject = exports.normalizeKey = exports.noop = exports.grep = exports.getKeyHash = exports.findBestMatches = exports.executeAsync = exports.escapeRegExp = exports.equalByValue = exports.ensureDefined = exports.denormalizeKey = exports.deferUpdater = exports.deferUpdate = exports.deferRenderer = exports.deferRender = exports.asyncNoop = exports.applyServerDecimalSeparator = void 0;
  var _config = _interopRequireDefault($__require("../config"));
  var _guid = _interopRequireDefault($__require("../guid"));
  var _deferred = $__require("../utils/deferred");
  var _data = $__require("./data");
  var _iterator = $__require("./iterator");
  var _type = $__require("./type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  var ensureDefined = function ensureDefined(value, defaultValue) {
    return (0, _type.isDefined)(value) ? value : defaultValue;
  };
  exports.ensureDefined = ensureDefined;
  var executeAsync = function executeAsync(action, context /* , internal */) {
    var deferred = new _deferred.Deferred();
    var normalizedContext = context || this;
    var task = {
      promise: deferred.promise(),
      abort: function abort() {
        clearTimeout(timerId);
        deferred.rejectWith(normalizedContext);
      }
    };
    var callback = function callback() {
      var result = action.call(normalizedContext);
      if (result && result.done && (0, _type.isFunction)(result.done)) {
        result.done(function () {
          deferred.resolveWith(normalizedContext);
        });
      } else {
        deferred.resolveWith(normalizedContext);
      }
    };
    var timerId = (arguments[2] || setTimeout)(callback, typeof context === 'number' ? context : 0);
    return task;
  };
  exports.executeAsync = executeAsync;
  var delayedFuncs = [];
  var delayedNames = [];
  var delayedDeferreds = [];
  var executingName;
  var deferExecute = function deferExecute(name, func, deferred) {
    if (executingName && executingName !== name) {
      delayedFuncs.push(func);
      delayedNames.push(name);
      deferred = deferred || new _deferred.Deferred();
      delayedDeferreds.push(deferred);
      return deferred;
    } else {
      var oldExecutingName = executingName;
      var currentDelayedCount = delayedDeferreds.length;
      executingName = name;
      var result = func();
      if (!result) {
        if (delayedDeferreds.length > currentDelayedCount) {
          result = _deferred.when.apply(this, delayedDeferreds.slice(currentDelayedCount));
        } else if (deferred) {
          deferred.resolve();
        }
      }
      executingName = oldExecutingName;
      if (deferred && result && result.done) {
        result.done(deferred.resolve).fail(deferred.reject);
      }
      if (!executingName && delayedFuncs.length) {
        (delayedNames.shift() === 'render' ? deferRender : deferUpdate)(delayedFuncs.shift(), delayedDeferreds.shift());
      }
      return result || (0, _deferred.when)();
    }
  };
  var deferRender = function deferRender(func, deferred) {
    return deferExecute('render', func, deferred);
  };
  exports.deferRender = deferRender;
  var deferUpdate = function deferUpdate(func, deferred) {
    return deferExecute('update', func, deferred);
  };
  exports.deferUpdate = deferUpdate;
  var deferRenderer = function deferRenderer(func) {
    return function () {
      var that = this;
      return deferExecute('render', function () {
        return func.call(that);
      });
    };
  };
  exports.deferRenderer = deferRenderer;
  var deferUpdater = function deferUpdater(func) {
    return function () {
      var that = this;
      return deferExecute('update', function () {
        return func.call(that);
      });
    };
  };
  exports.deferUpdater = deferUpdater;
  var findBestMatches = function findBestMatches(targetFilter, items, mapFn) {
    var bestMatches = [];
    var maxMatchCount = 0;
    (0, _iterator.each)(items, function (index, itemSrc) {
      var matchCount = 0;
      var item = mapFn ? mapFn(itemSrc) : itemSrc;
      (0, _iterator.each)(targetFilter, function (paramName, targetValue) {
        var value = item[paramName];
        if (value === undefined) {
          return;
        }
        if (match(value, targetValue)) {
          matchCount++;
          return;
        }
        matchCount = -1;
        return false;
      });
      if (matchCount < maxMatchCount) {
        return;
      }
      if (matchCount > maxMatchCount) {
        bestMatches.length = 0;
        maxMatchCount = matchCount;
      }
      bestMatches.push(itemSrc);
    });
    return bestMatches;
  };
  exports.findBestMatches = findBestMatches;
  var match = function match(value, targetValue) {
    if (Array.isArray(value) && Array.isArray(targetValue)) {
      var mismatch = false;
      (0, _iterator.each)(value, function (index, valueItem) {
        if (valueItem !== targetValue[index]) {
          mismatch = true;
          return false;
        }
      });
      if (mismatch) {
        return false;
      }
      return true;
    }
    if (value === targetValue) {
      return true;
    }
    return false;
  };
  var splitPair = function splitPair(raw) {
    var _raw$x, _raw$y;
    switch ((0, _type.type)(raw)) {
      case 'string':
        return raw.split(/\s+/, 2);
      case 'object':
        return [(_raw$x = raw.x) !== null && _raw$x !== void 0 ? _raw$x : raw.h, (_raw$y = raw.y) !== null && _raw$y !== void 0 ? _raw$y : raw.v];
      case 'number':
        return [raw];
      case 'array':
        return raw;
      default:
        return null;
    }
  };
  exports.splitPair = splitPair;
  var normalizeKey = function normalizeKey(id) {
    var key = (0, _type.isString)(id) ? id : id.toString();
    var arr = key.match(/[^a-zA-Z0-9_]/g);
    arr && (0, _iterator.each)(arr, function (_, sign) {
      key = key.replace(sign, '__' + sign.charCodeAt() + '__');
    });
    return key;
  };
  exports.normalizeKey = normalizeKey;
  var denormalizeKey = function denormalizeKey(key) {
    var arr = key.match(/__\d+__/g);
    arr && arr.forEach(function (char) {
      var charCode = parseInt(char.replace('__', ''));
      key = key.replace(char, String.fromCharCode(charCode));
    });
    return key;
  };
  exports.denormalizeKey = denormalizeKey;
  var pairToObject = function pairToObject(raw, preventRound) {
    var pair = splitPair(raw);
    var h = preventRound ? parseFloat(pair && pair[0]) : parseInt(pair && pair[0], 10);
    var v = preventRound ? parseFloat(pair && pair[1]) : parseInt(pair && pair[1], 10);
    if (!isFinite(h)) {
      h = 0;
    }
    if (!isFinite(v)) {
      v = h;
    }
    return {
      h: h,
      v: v
    };
  };
  exports.pairToObject = pairToObject;
  var getKeyHash = function getKeyHash(key) {
    if (key instanceof _guid.default) {
      return key.toString();
    } else if ((0, _type.isObject)(key) || Array.isArray(key)) {
      try {
        var keyHash = JSON.stringify(key);
        return keyHash === '{}' ? key : keyHash;
      } catch (e) {
        return key;
      }
    }
    return key;
  };
  exports.getKeyHash = getKeyHash;
  var escapeRegExp = function escapeRegExp(string) {
    return string.replace(/[[\]{}\-()*+?.\\^$|\s]/g, '\\$&');
  };
  exports.escapeRegExp = escapeRegExp;
  var applyServerDecimalSeparator = function applyServerDecimalSeparator(value) {
    var separator = (0, _config.default)().serverDecimalSeparator;
    if ((0, _type.isDefined)(value)) {
      value = value.toString().replace('.', separator);
    }
    return value;
  };
  exports.applyServerDecimalSeparator = applyServerDecimalSeparator;
  var noop = function noop() {};
  exports.noop = noop;
  var asyncNoop = function asyncNoop() {
    return new _deferred.Deferred().resolve().promise();
  };
  exports.asyncNoop = asyncNoop;
  var grep = function grep(elements, checkFunction, invert) {
    var result = [];
    var check;
    var expectedCheck = !invert;
    for (var i = 0; i < elements.length; i++) {
      check = !!checkFunction(elements[i], i);
      if (check === expectedCheck) {
        result.push(elements[i]);
      }
    }
    return result;
  };
  exports.grep = grep;
  var compareArrays = function compareArrays(array1, array2, depth, options) {
    if (array1.length !== array2.length) {
      return false;
    }
    return !array1.some(function (item, idx) {
      return !compareByValue(item, array2[idx], depth + 1, _extends({}, options, {
        strict: true
      }));
    });
  };
  var compareObjects = function compareObjects(object1, object2, depth, options) {
    var keys1 = Object.keys(object1);
    var keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    var keys2Set = new Set(keys2);
    return !keys1.some(function (key) {
      return !keys2Set.has(key) || !compareByValue(object1[key], object2[key], depth + 1, options);
    });
  };
  var DEFAULT_EQUAL_BY_VALUE_OPTS = {
    maxDepth: 3,
    strict: true
  };
  var compareByValue = function compareByValue(value1, value2, depth, options) {
    var strict = options.strict,
        maxDepth = options.maxDepth;
    var comparable1 = (0, _data.toComparable)(value1, true);
    var comparable2 = (0, _data.toComparable)(value2, true);
    var comparisonResult = strict ? comparable1 === comparable2
    // eslint-disable-next-line eqeqeq
    : comparable1 == comparable2;
    switch (true) {
      case comparisonResult:
      case depth >= maxDepth:
        return true;
      case (0, _type.isObject)(comparable1) && (0, _type.isObject)(comparable2):
        return compareObjects(comparable1, comparable2, depth, options);
      case Array.isArray(comparable1) && Array.isArray(comparable2):
        return compareArrays(comparable1, comparable2, depth, options);
      default:
        return false;
    }
  };
  var equalByValue = function equalByValue(value1, value2) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_EQUAL_BY_VALUE_OPTS;
    var compareOptions = _extends({}, DEFAULT_EQUAL_BY_VALUE_OPTS, options);
    return compareByValue(value1, value2, 0, compareOptions);
  };
  exports.equalByValue = equalByValue;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../config","../guid","../utils/deferred","./data","./iterator","./type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../config"), require("../guid"), require("../utils/deferred"), require("./data"), require("./iterator"), require("./type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=common.js.map