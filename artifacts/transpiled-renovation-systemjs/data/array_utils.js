!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/data/array_utils.js"], ["../core/utils/type","../core/config","../core/guid","../core/utils/extend","./errors","../core/utils/object","../core/utils/data","./utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/data/array_utils.js", ["../core/utils/type", "../core/config", "../core/guid", "../core/utils/extend", "./errors", "../core/utils/object", "../core/utils/data", "./utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.applyBatch = applyBatch;
  exports.applyChanges = applyChanges;
  exports.createObjectWithChanges = createObjectWithChanges;
  exports.indexByKey = indexByKey;
  exports.insert = insert;
  exports.remove = remove;
  exports.update = update;
  var _type = $__require("../core/utils/type");
  var _config = _interopRequireDefault($__require("../core/config"));
  var _guid = _interopRequireDefault($__require("../core/guid"));
  var _extend = $__require("../core/utils/extend");
  var _errors = $__require("./errors");
  var _object = $__require("../core/utils/object");
  var _data = $__require("../core/utils/data");
  var _utils = $__require("./utils");
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
  function hasKey(target, keyOrKeys) {
    var key;
    var keys = typeof keyOrKeys === 'string' ? keyOrKeys.split() : keyOrKeys.slice();
    while (keys.length) {
      key = keys.shift();
      if (key in target) {
        return true;
      }
    }
    return false;
  }
  function findItems(keyInfo, items, key, groupCount) {
    var childItems;
    var result;
    if (groupCount) {
      for (var i = 0; i < items.length; i++) {
        childItems = items[i].items || items[i].collapsedItems || [];
        result = findItems(keyInfo, childItems || [], key, groupCount - 1);
        if (result) {
          return result;
        }
      }
    } else if (indexByKey(keyInfo, items, key) >= 0) {
      return items;
    }
  }
  function getItems(keyInfo, items, key, groupCount) {
    if (groupCount) {
      return findItems(keyInfo, items, key, groupCount) || [];
    }
    return items;
  }
  function generateDataByKeyMap(keyInfo, array) {
    if (keyInfo.key() && (!array._dataByKeyMap || array._dataByKeyMapLength !== array.length)) {
      var dataByKeyMap = {};
      var arrayLength = array.length;
      for (var i = 0; i < arrayLength; i++) {
        dataByKeyMap[JSON.stringify(keyInfo.keyOf(array[i]))] = array[i];
      }
      array._dataByKeyMap = dataByKeyMap;
      array._dataByKeyMapLength = arrayLength;
    }
  }
  function getCacheValue(array, key) {
    if (array._dataByKeyMap) {
      return array._dataByKeyMap[JSON.stringify(key)];
    }
  }
  function getHasKeyCacheValue(array, key) {
    if (array._dataByKeyMap) {
      return array._dataByKeyMap[JSON.stringify(key)];
    }
    return true;
  }
  function setDataByKeyMapValue(array, key, data) {
    if (array._dataByKeyMap) {
      array._dataByKeyMap[JSON.stringify(key)] = data;
      array._dataByKeyMapLength += data ? 1 : -1;
    }
  }
  function cloneInstanceWithChangedPaths(instance, changes, clonedInstances) {
    clonedInstances = clonedInstances || new WeakMap();
    var result = instance ? Object.create(Object.getPrototypeOf(instance)) : {};
    if (instance) {
      clonedInstances.set(instance, result);
    }
    var instanceWithoutPrototype = _extends({}, instance);
    (0, _object.deepExtendArraySafe)(result, instanceWithoutPrototype, true, true);
    for (var name in instanceWithoutPrototype) {
      var value = instanceWithoutPrototype[name];
      var change = changes === null || changes === void 0 ? void 0 : changes[name];
      if ((0, _type.isObject)(value) && !(0, _type.isPlainObject)(value) && (0, _type.isObject)(change) && !clonedInstances.has(value)) {
        result[name] = cloneInstanceWithChangedPaths(value, change, clonedInstances);
      }
    }
    for (var _name in result) {
      var prop = result[_name];
      if ((0, _type.isObject)(prop) && clonedInstances.has(prop)) {
        result[_name] = clonedInstances.get(prop);
      }
    }
    return result;
  }
  function createObjectWithChanges(target, changes) {
    var result = cloneInstanceWithChangedPaths(target, changes);
    return (0, _object.deepExtendArraySafe)(result, changes, true, true);
  }
  function applyBatch(_ref) {
    var keyInfo = _ref.keyInfo,
        data = _ref.data,
        changes = _ref.changes,
        groupCount = _ref.groupCount,
        useInsertIndex = _ref.useInsertIndex,
        immutable = _ref.immutable,
        disableCache = _ref.disableCache,
        logError = _ref.logError,
        skipCopying = _ref.skipCopying;
    var resultItems = immutable === true ? _toConsumableArray(data) : data;
    changes.forEach(function (item) {
      var items = item.type === 'insert' ? resultItems : getItems(keyInfo, resultItems, item.key, groupCount);
      !disableCache && generateDataByKeyMap(keyInfo, items);
      switch (item.type) {
        case 'update':
          update(keyInfo, items, item.key, item.data, true, immutable, logError);
          break;
        case 'insert':
          insert(keyInfo, items, item.data, useInsertIndex && (0, _type.isDefined)(item.index) ? item.index : -1, true, logError, skipCopying);
          break;
        case 'remove':
          remove(keyInfo, items, item.key, true, logError);
          break;
      }
    });
    return resultItems;
  }
  function getErrorResult(isBatch, logError, errorCode) {
    return !isBatch ? (0, _utils.rejectedPromise)(_errors.errors.Error(errorCode)) : logError && _errors.errors.log(errorCode);
  }
  function applyChanges(data, changes) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _options$keyExpr = options.keyExpr,
        keyExpr = _options$keyExpr === void 0 ? 'id' : _options$keyExpr,
        _options$immutable = options.immutable,
        immutable = _options$immutable === void 0 ? true : _options$immutable;
    var keyGetter = (0, _data.compileGetter)(keyExpr);
    var keyInfo = {
      key: function key() {
        return keyExpr;
      },
      keyOf: function keyOf(obj) {
        return keyGetter(obj);
      }
    };
    return applyBatch({
      keyInfo: keyInfo,
      data: data,
      changes: changes,
      immutable: immutable,
      disableCache: true,
      logError: true
    });
  }
  function update(keyInfo, array, key, data, isBatch, immutable, logError) {
    var target;
    var extendComplexObject = true;
    var keyExpr = keyInfo.key();
    if (keyExpr) {
      if (hasKey(data, keyExpr) && !(0, _utils.keysEqual)(keyExpr, key, keyInfo.keyOf(data))) {
        return getErrorResult(isBatch, logError, 'E4017');
      }
      target = getCacheValue(array, key);
      if (!target) {
        var index = indexByKey(keyInfo, array, key);
        if (index < 0) {
          return getErrorResult(isBatch, logError, 'E4009');
        }
        target = array[index];
        if (immutable === true && (0, _type.isDefined)(target)) {
          var newTarget = createObjectWithChanges(target, data);
          array[index] = newTarget;
          return !isBatch && (0, _utils.trivialPromise)(newTarget, key);
        }
      }
    } else {
      target = key;
    }
    (0, _object.deepExtendArraySafe)(target, data, extendComplexObject);
    if (!isBatch) {
      if ((0, _config.default)().useLegacyStoreResult) {
        return (0, _utils.trivialPromise)(key, data);
      } else {
        return (0, _utils.trivialPromise)(target, key);
      }
    }
  }
  function insert(keyInfo, array, data, index, isBatch, logError, skipCopying) {
    var keyValue;
    var keyExpr = keyInfo.key();
    var obj = (0, _type.isPlainObject)(data) && !skipCopying ? (0, _extend.extend)({}, data) : data;
    if (keyExpr) {
      keyValue = keyInfo.keyOf(obj);
      if (keyValue === undefined || _typeof(keyValue) === 'object' && (0, _type.isEmptyObject)(keyValue)) {
        if (Array.isArray(keyExpr)) {
          throw _errors.errors.Error('E4007');
        }
        keyValue = obj[keyExpr] = String(new _guid.default());
      } else {
        if (array[indexByKey(keyInfo, array, keyValue)] !== undefined) {
          return getErrorResult(isBatch, logError, 'E4008');
        }
      }
    } else {
      keyValue = obj;
    }
    if (index >= 0) {
      array.splice(index, 0, obj);
    } else {
      array.push(obj);
    }
    setDataByKeyMapValue(array, keyValue, obj);
    if (!isBatch) {
      return (0, _utils.trivialPromise)((0, _config.default)().useLegacyStoreResult ? data : obj, keyValue);
    }
  }
  function remove(keyInfo, array, key, isBatch, logError) {
    var index = indexByKey(keyInfo, array, key);
    if (index > -1) {
      array.splice(index, 1);
      setDataByKeyMapValue(array, key, null);
    }
    if (!isBatch) {
      return (0, _utils.trivialPromise)(key);
    } else if (index < 0) {
      return getErrorResult(isBatch, logError, 'E4009');
    }
  }
  function indexByKey(keyInfo, array, key) {
    var keyExpr = keyInfo.key();
    if (!getHasKeyCacheValue(array, key)) {
      return -1;
    }
    for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
      if ((0, _utils.keysEqual)(keyExpr, keyInfo.keyOf(array[i]), key)) {
        return i;
      }
    }
    return -1;
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/type","../core/config","../core/guid","../core/utils/extend","./errors","../core/utils/object","../core/utils/data","./utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/type"), require("../core/config"), require("../core/guid"), require("../core/utils/extend"), require("./errors"), require("../core/utils/object"), require("../core/utils/data"), require("./utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=array_utils.js.map