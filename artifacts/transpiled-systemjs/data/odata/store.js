!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/data/odata/store.js"], ["../../core/utils/type","../../core/config","./utils","../errors","../query","../abstract_store","./request_dispatcher","../../core/utils/deferred","./query_adapter"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/data/odata/store.js", ["../../core/utils/type", "../../core/config", "./utils", "../errors", "../query", "../abstract_store", "./request_dispatcher", "../../core/utils/deferred", "./query_adapter"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _type = $__require("../../core/utils/type");
  var _config = _interopRequireDefault($__require("../../core/config"));
  var _utils = $__require("./utils");
  var _errors = $__require("../errors");
  var _query = _interopRequireDefault($__require("../query"));
  var _abstract_store = _interopRequireDefault($__require("../abstract_store"));
  var _request_dispatcher = _interopRequireDefault($__require("./request_dispatcher"));
  var _deferred = $__require("../../core/utils/deferred");
  $__require("./query_adapter");
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var ANONYMOUS_KEY_NAME = '5d46402c-7899-4ea9-bd81-8b73c47c7683';
  var expandKeyType = function expandKeyType(key, keyType) {
    return _defineProperty({}, key, keyType);
  };
  var mergeFieldTypesWithKeyType = function mergeFieldTypesWithKeyType(fieldTypes, keyType) {
    var result = {};
    for (var field in fieldTypes) {
      result[field] = fieldTypes[field];
    }
    for (var keyName in keyType) {
      if (keyName in result) {
        if (result[keyName] !== keyType[keyName]) {
          _errors.errors.log('W4001', keyName);
        }
      } else {
        result[keyName] = keyType[keyName];
      }
    }
    return result;
  };
  var ODataStore = _abstract_store.default.inherit({
    ctor: function ctor(options) {
      this.callBase(options);
      this._requestDispatcher = new _request_dispatcher.default(options);
      var key = this.key();
      var fieldTypes = options.fieldTypes;
      var keyType = options.keyType;
      if (keyType) {
        var keyTypeIsString = typeof keyType === 'string';
        if (!key) {
          key = keyTypeIsString ? ANONYMOUS_KEY_NAME : Object.keys(keyType);
          this._legacyAnonymousKey = key;
        }
        if (keyTypeIsString) {
          keyType = expandKeyType(key, keyType);
        }
        fieldTypes = mergeFieldTypesWithKeyType(fieldTypes, keyType);
      }
      this._fieldTypes = fieldTypes || {};
      if (this.version() === 2) {
        this._updateMethod = 'MERGE';
      } else {
        this._updateMethod = 'PATCH';
      }
    },
    _customLoadOptions: function _customLoadOptions() {
      return ['expand', 'customQueryParams'];
    },
    _byKeyImpl: function _byKeyImpl(key, extraOptions) {
      var params = {};
      if (extraOptions) {
        params['$expand'] = (0, _utils.generateExpand)(this.version(), extraOptions.expand, extraOptions.select) || undefined;
        params['$select'] = (0, _utils.generateSelect)(this.version(), extraOptions.select) || undefined;
      }
      return this._requestDispatcher.sendRequest(this._byKeyUrl(key), 'GET', params);
    },
    createQuery: function createQuery(loadOptions) {
      var _loadOptions$urlOverr;
      var url;
      var queryOptions = {
        adapter: 'odata',
        beforeSend: this._requestDispatcher.beforeSend,
        errorHandler: this._errorHandler,
        jsonp: this._requestDispatcher.jsonp,
        version: this._requestDispatcher.version,
        withCredentials: this._requestDispatcher._withCredentials,
        expand: loadOptions === null || loadOptions === void 0 ? void 0 : loadOptions.expand,
        requireTotalCount: loadOptions === null || loadOptions === void 0 ? void 0 : loadOptions.requireTotalCount,
        deserializeDates: this._requestDispatcher._deserializeDates,
        fieldTypes: this._fieldTypes
      };

      // NOTE: For AppBuilder, do not remove
      url = (_loadOptions$urlOverr = loadOptions === null || loadOptions === void 0 ? void 0 : loadOptions.urlOverride) !== null && _loadOptions$urlOverr !== void 0 ? _loadOptions$urlOverr : this._requestDispatcher.url;
      if ((0, _type.isDefined)(this._requestDispatcher.filterToLower)) {
        queryOptions.filterToLower = this._requestDispatcher.filterToLower;
      }
      if (loadOptions !== null && loadOptions !== void 0 && loadOptions.customQueryParams) {
        var params = (0, _utils.escapeServiceOperationParams)(loadOptions === null || loadOptions === void 0 ? void 0 : loadOptions.customQueryParams, this.version());
        if (this.version() === 4) {
          url = (0, _utils.formatFunctionInvocationUrl)(url, params);
        } else {
          queryOptions.params = params;
        }
      }
      return (0, _query.default)(url, queryOptions);
    },
    _insertImpl: function _insertImpl(values) {
      var _this = this;
      this._requireKey();
      var d = new _deferred.Deferred();
      (0, _deferred.when)(this._requestDispatcher.sendRequest(this._requestDispatcher.url, 'POST', null, values)).done(function (serverResponse) {
        return d.resolve(serverResponse && !(0, _config.default)().useLegacyStoreResult ? serverResponse : values, _this.keyOf(serverResponse));
      }).fail(d.reject);
      return d.promise();
    },
    _updateImpl: function _updateImpl(key, values) {
      var d = new _deferred.Deferred();
      (0, _deferred.when)(this._requestDispatcher.sendRequest(this._byKeyUrl(key), this._updateMethod, null, values)).done(function (serverResponse) {
        return (0, _config.default)().useLegacyStoreResult ? d.resolve(key, values) : d.resolve(serverResponse || values, key);
      }).fail(d.reject);
      return d.promise();
    },
    _removeImpl: function _removeImpl(key) {
      var d = new _deferred.Deferred();
      (0, _deferred.when)(this._requestDispatcher.sendRequest(this._byKeyUrl(key), 'DELETE')).done(function () {
        return d.resolve(key);
      }).fail(d.reject);
      return d.promise();
    },
    _convertKey: function _convertKey(value) {
      var result = value;
      var fieldTypes = this._fieldTypes;
      var key = this.key() || this._legacyAnonymousKey;
      if (Array.isArray(key)) {
        result = {};
        for (var i = 0; i < key.length; i++) {
          var keyName = key[i];
          result[keyName] = (0, _utils.convertPrimitiveValue)(fieldTypes[keyName], value[keyName]);
        }
      } else if (fieldTypes[key]) {
        result = (0, _utils.convertPrimitiveValue)(fieldTypes[key], value);
      }
      return result;
    },
    _byKeyUrl: function _byKeyUrl(value) {
      var baseUrl = this._requestDispatcher.url;
      var convertedKey = this._convertKey(value);
      return "".concat(baseUrl, "(").concat(encodeURIComponent((0, _utils.serializeKey)(convertedKey, this.version())), ")");
    },
    version: function version() {
      return this._requestDispatcher.version;
    }
  }, 'odata');
  var _default = ODataStore;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/config","./utils","../errors","../query","../abstract_store","./request_dispatcher","../../core/utils/deferred","./query_adapter"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/config"), require("./utils"), require("../errors"), require("../query"), require("../abstract_store"), require("./request_dispatcher"), require("../../core/utils/deferred"), require("./query_adapter"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=store.js.map