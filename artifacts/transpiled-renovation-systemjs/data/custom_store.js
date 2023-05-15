!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/data/custom_store.js"], ["../core/renderer","./utils","./array_utils","../core/utils/type","../core/config","./errors","./abstract_store","./array_query","./store_helper","../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/data/custom_store.js", ["../core/renderer", "./utils", "./array_utils", "../core/utils/type", "../core/config", "./errors", "./abstract_store", "./array_query", "./store_helper", "../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _utils = $__require("./utils");
  var _array_utils = $__require("./array_utils");
  var _type = $__require("../core/utils/type");
  var _config = _interopRequireDefault($__require("../core/config"));
  var _errors = $__require("./errors");
  var _abstract_store = _interopRequireDefault($__require("./abstract_store"));
  var _array_query = _interopRequireDefault($__require("./array_query"));
  var _store_helper = _interopRequireDefault($__require("./store_helper"));
  var _deferred = $__require("../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var TOTAL_COUNT = 'totalCount';
  var LOAD = 'load';
  var BY_KEY = 'byKey';
  var INSERT = 'insert';
  var UPDATE = 'update';
  var REMOVE = 'remove';
  function isPromise(obj) {
    return obj && (0, _type.isFunction)(obj.then);
  }
  function trivialPromise(value) {
    return new _deferred.Deferred().resolve(value).promise();
  }
  function ensureRequiredFuncOption(name, obj) {
    if (!(0, _type.isFunction)(obj)) {
      throw _errors.errors.Error('E4011', name);
    }
  }
  function throwInvalidUserFuncResult(name) {
    throw _errors.errors.Error('E4012', name);
  }
  function createUserFuncFailureHandler(pendingDeferred) {
    function errorMessageFromXhr(promiseArguments) {
      var xhr = promiseArguments[0];
      var textStatus = promiseArguments[1];
      if (!xhr || !xhr.getResponseHeader) {
        return null;
      }
      return (0, _utils.errorMessageFromXhr)(xhr, textStatus);
    }
    return function (arg) {
      var error;
      if (arg instanceof Error) {
        error = arg;
      } else {
        error = new Error(errorMessageFromXhr(arguments) || arg && String(arg) || 'Unknown error');
      }
      if (error.message !== _utils.XHR_ERROR_UNLOAD) {
        pendingDeferred.reject(error);
      }
    };
  }
  function invokeUserLoad(store, options) {
    var userFunc = store._loadFunc;
    var userResult;
    ensureRequiredFuncOption(LOAD, userFunc);
    userResult = userFunc.apply(store, [options]);
    if (Array.isArray(userResult)) {
      userResult = trivialPromise(userResult);
    } else if (userResult === null || userResult === undefined) {
      userResult = trivialPromise([]);
    } else {
      if (!isPromise(userResult)) {
        throwInvalidUserFuncResult(LOAD);
      }
    }
    return (0, _deferred.fromPromise)(userResult);
  }
  function invokeUserTotalCountFunc(store, options) {
    var userFunc = store._totalCountFunc;
    var userResult;
    if (!(0, _type.isFunction)(userFunc)) {
      throw _errors.errors.Error('E4021');
    }
    userResult = userFunc.apply(store, [options]);
    if (!isPromise(userResult)) {
      userResult = Number(userResult);
      if (!isFinite(userResult)) {
        throwInvalidUserFuncResult(TOTAL_COUNT);
      }
      userResult = trivialPromise(userResult);
    }
    return (0, _deferred.fromPromise)(userResult);
  }
  function invokeUserByKeyFunc(store, key, extraOptions) {
    var userFunc = store._byKeyFunc;
    var userResult;
    ensureRequiredFuncOption(BY_KEY, userFunc);
    userResult = userFunc.apply(store, [key, extraOptions]);
    if (!isPromise(userResult)) {
      userResult = trivialPromise(userResult);
    }
    return (0, _deferred.fromPromise)(userResult);
  }
  function runRawLoad(pendingDeferred, store, userFuncOptions, continuation) {
    if (store.__rawData) {
      continuation(store.__rawData);
    } else {
      var loadPromise = store.__rawDataPromise || invokeUserLoad(store, userFuncOptions);
      if (store._cacheRawData) {
        store.__rawDataPromise = loadPromise;
      }
      loadPromise.always(function () {
        delete store.__rawDataPromise;
      }).done(function (rawData) {
        if (store._cacheRawData) {
          store.__rawData = rawData;
        }
        continuation(rawData);
      }).fail(createUserFuncFailureHandler(pendingDeferred));
    }
  }
  function runRawLoadWithQuery(pendingDeferred, store, options, countOnly) {
    options = options || {};
    var userFuncOptions = {};
    if ('userData' in options) {
      userFuncOptions.userData = options.userData;
    }
    runRawLoad(pendingDeferred, store, userFuncOptions, function (rawData) {
      var rawDataQuery = (0, _array_query.default)(rawData, {
        errorHandler: store._errorHandler
      });
      var itemsQuery;
      var totalCountQuery;
      var waitList = [];
      var items;
      var totalCount;
      if (!countOnly) {
        itemsQuery = _store_helper.default.queryByOptions(rawDataQuery, options);
        if (itemsQuery === rawDataQuery) {
          items = rawData.slice(0);
        } else {
          waitList.push(itemsQuery.enumerate().done(function (asyncResult) {
            items = asyncResult;
          }));
        }
      }
      if (options.requireTotalCount || countOnly) {
        totalCountQuery = _store_helper.default.queryByOptions(rawDataQuery, options, true);
        if (totalCountQuery === rawDataQuery) {
          totalCount = rawData.length;
        } else {
          waitList.push(totalCountQuery.count().done(function (asyncResult) {
            totalCount = asyncResult;
          }));
        }
      }
      _deferred.when.apply(_renderer.default, waitList).done(function () {
        if (countOnly) {
          pendingDeferred.resolve(totalCount);
        } else if (options.requireTotalCount) {
          pendingDeferred.resolve(items, {
            totalCount: totalCount
          });
        } else {
          pendingDeferred.resolve(items);
        }
      }).fail(function (x) {
        pendingDeferred.reject(x);
      });
    });
  }
  function runRawLoadWithKey(pendingDeferred, store, key) {
    runRawLoad(pendingDeferred, store, {}, function (rawData) {
      var keyExpr = store.key();
      var item;
      for (var i = 0, len = rawData.length; i < len; i++) {
        item = rawData[i];
        if ((0, _utils.keysEqual)(keyExpr, store.keyOf(rawData[i]), key)) {
          pendingDeferred.resolve(item);
          return;
        }
      }
      pendingDeferred.reject(_errors.errors.Error('E4009'));
    });
  }
  var CustomStore = _abstract_store.default.inherit({
    ctor: function ctor(options) {
      options = options || {};
      this.callBase(options);
      this._useDefaultSearch = !!options.useDefaultSearch || options.loadMode === 'raw';
      this._loadMode = options.loadMode;
      this._cacheRawData = options.cacheRawData !== false;
      this._loadFunc = options[LOAD];
      this._totalCountFunc = options[TOTAL_COUNT];
      this._byKeyFunc = options[BY_KEY];
      this._insertFunc = options[INSERT];
      this._updateFunc = options[UPDATE];
      this._removeFunc = options[REMOVE];
    },
    _clearCache: function _clearCache() {
      delete this.__rawData;
    },
    createQuery: function createQuery() {
      throw _errors.errors.Error('E4010');
    },
    clearRawDataCache: function clearRawDataCache() {
      this._clearCache();
    },
    _totalCountImpl: function _totalCountImpl(options) {
      var d = new _deferred.Deferred();
      if (this._loadMode === 'raw' && !this._totalCountFunc) {
        runRawLoadWithQuery(d, this, options, true);
      } else {
        invokeUserTotalCountFunc(this, options).done(function (count) {
          d.resolve(Number(count));
        }).fail(createUserFuncFailureHandler(d));
        d = this._addFailHandlers(d);
      }
      return d.promise();
    },
    _pushImpl: function _pushImpl(changes) {
      if (this.__rawData) {
        (0, _array_utils.applyBatch)({
          keyInfo: this,
          data: this.__rawData,
          changes: changes
        });
      }
    },
    _loadImpl: function _loadImpl(options) {
      var d = new _deferred.Deferred();
      if (this._loadMode === 'raw') {
        runRawLoadWithQuery(d, this, options, false);
      } else {
        invokeUserLoad(this, options).done(function (data, extra) {
          d.resolve(data, extra);
        }).fail(createUserFuncFailureHandler(d));
        d = this._addFailHandlers(d);
      }
      return d.promise();
    },
    _byKeyImpl: function _byKeyImpl(key, extraOptions) {
      var d = new _deferred.Deferred();
      if (this._byKeyViaLoad()) {
        this._requireKey();
        runRawLoadWithKey(d, this, key);
      } else {
        invokeUserByKeyFunc(this, key, extraOptions).done(function (obj) {
          d.resolve(obj);
        }).fail(createUserFuncFailureHandler(d));
      }
      return d.promise();
    },
    _byKeyViaLoad: function _byKeyViaLoad() {
      return this._loadMode === 'raw' && !this._byKeyFunc;
    },
    _insertImpl: function _insertImpl(values) {
      var that = this;
      var userFunc = that._insertFunc;
      var userResult;
      var d = new _deferred.Deferred();
      ensureRequiredFuncOption(INSERT, userFunc);
      userResult = userFunc.apply(that, [values]); // should return key or data

      if (!isPromise(userResult)) {
        userResult = trivialPromise(userResult);
      }
      (0, _deferred.fromPromise)(userResult).done(function (serverResponse) {
        if ((0, _config.default)().useLegacyStoreResult) {
          d.resolve(values, serverResponse);
        } else {
          d.resolve(serverResponse || values, that.keyOf(serverResponse));
        }
      }).fail(createUserFuncFailureHandler(d));
      return d.promise();
    },
    _updateImpl: function _updateImpl(key, values) {
      var userFunc = this._updateFunc;
      var userResult;
      var d = new _deferred.Deferred();
      ensureRequiredFuncOption(UPDATE, userFunc);
      userResult = userFunc.apply(this, [key, values]);
      if (!isPromise(userResult)) {
        userResult = trivialPromise(userResult);
      }
      (0, _deferred.fromPromise)(userResult).done(function (serverResponse) {
        if ((0, _config.default)().useLegacyStoreResult) {
          d.resolve(key, values);
        } else {
          d.resolve(serverResponse || values, key);
        }
      }).fail(createUserFuncFailureHandler(d));
      return d.promise();
    },
    _removeImpl: function _removeImpl(key) {
      var userFunc = this._removeFunc;
      var userResult;
      var d = new _deferred.Deferred();
      ensureRequiredFuncOption(REMOVE, userFunc);
      userResult = userFunc.apply(this, [key]);
      if (!isPromise(userResult)) {
        userResult = trivialPromise();
      }
      (0, _deferred.fromPromise)(userResult).done(function () {
        d.resolve(key);
      }).fail(createUserFuncFailureHandler(d));
      return d.promise();
    }
  });
  var _default = CustomStore;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","./utils","./array_utils","../core/utils/type","../core/config","./errors","./abstract_store","./array_query","./store_helper","../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("./utils"), require("./array_utils"), require("../core/utils/type"), require("../core/config"), require("./errors"), require("./abstract_store"), require("./array_query"), require("./store_helper"), require("../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=custom_store.js.map