!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/data/abstract_store.js"], ["../core/class","../core/events_strategy","../core/utils/iterator","./errors","./utils","../core/utils/data","./store_helper","../core/utils/deferred","../core/utils/common","../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/data/abstract_store.js", ["../core/class", "../core/events_strategy", "../core/utils/iterator", "./errors", "./utils", "../core/utils/data", "./store_helper", "../core/utils/deferred", "../core/utils/common", "../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _class = _interopRequireDefault($__require("../core/class"));
  var _events_strategy = $__require("../core/events_strategy");
  var _iterator = $__require("../core/utils/iterator");
  var _errors = $__require("./errors");
  var _utils = $__require("./utils");
  var _data = $__require("../core/utils/data");
  var _store_helper = _interopRequireDefault($__require("./store_helper"));
  var _deferred = $__require("../core/utils/deferred");
  var _common = $__require("../core/utils/common");
  var _type = $__require("../core/utils/type");
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
  var abstract = _class.default.abstract;
  var queryByOptions = _store_helper.default.queryByOptions;
  var storeImpl = {};
  var Store = _class.default.inherit({
    _langParams: {},
    ctor: function ctor(options) {
      var that = this;
      options = options || {};
      this._eventsStrategy = new _events_strategy.EventsStrategy(this);
      (0, _iterator.each)(['onLoaded', 'onLoading', 'onInserted', 'onInserting', 'onUpdated', 'onUpdating', 'onPush', 'onRemoved', 'onRemoving', 'onModified', 'onModifying'], function (_, optionName) {
        if (optionName in options) {
          that.on(optionName.slice(2).toLowerCase(), options[optionName]);
        }
      });
      this._key = options.key;
      this._errorHandler = options.errorHandler;
      this._useDefaultSearch = true;
    },
    _clearCache: _common.noop,
    _customLoadOptions: function _customLoadOptions() {
      return null;
    },
    key: function key() {
      return this._key;
    },
    keyOf: function keyOf(obj) {
      if (!this._keyGetter) {
        this._keyGetter = (0, _data.compileGetter)(this.key());
      }
      return this._keyGetter(obj);
    },
    _requireKey: function _requireKey() {
      if (!this.key()) {
        throw _errors.errors.Error('E4005');
      }
    },
    load: function load(options) {
      var that = this;
      options = options || {};
      this._eventsStrategy.fireEvent('loading', [options]);
      return this._withLock(this._loadImpl(options)).done(function (result) {
        that._eventsStrategy.fireEvent('loaded', [result, options]);
      });
    },
    _loadImpl: function _loadImpl(options) {
      if (!(0, _type.isEmptyObject)(this._langParams)) {
        options = options || {};
        options._langParams = _extends({}, this._langParams, options._langParams);
      }
      return queryByOptions(this.createQuery(options), options).enumerate();
    },
    _withLock: function _withLock(task) {
      var result = new _deferred.Deferred();
      task.done(function () {
        var that = this;
        var args = arguments;
        _utils.processRequestResultLock.promise().done(function () {
          result.resolveWith(that, args);
        });
      }).fail(function () {
        result.rejectWith(this, arguments);
      });
      return result;
    },
    createQuery: abstract,
    totalCount: function totalCount(options) {
      return this._totalCountImpl(options);
    },
    _totalCountImpl: function _totalCountImpl(options) {
      return queryByOptions(this.createQuery(options), options, true).count();
    },
    byKey: function byKey(key, extraOptions) {
      return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)));
    },
    _byKeyImpl: abstract,
    insert: function insert(values) {
      var that = this;
      that._eventsStrategy.fireEvent('modifying');
      that._eventsStrategy.fireEvent('inserting', [values]);
      return that._addFailHandlers(that._insertImpl(values).done(function (callbackValues, callbackKey) {
        that._eventsStrategy.fireEvent('inserted', [callbackValues, callbackKey]);
        that._eventsStrategy.fireEvent('modified');
      }));
    },
    _insertImpl: abstract,
    update: function update(key, values) {
      var that = this;
      that._eventsStrategy.fireEvent('modifying');
      that._eventsStrategy.fireEvent('updating', [key, values]);
      return that._addFailHandlers(that._updateImpl(key, values).done(function () {
        that._eventsStrategy.fireEvent('updated', [key, values]);
        that._eventsStrategy.fireEvent('modified');
      }));
    },
    _updateImpl: abstract,
    push: function push(changes) {
      var _this = this;
      var beforePushArgs = {
        changes: changes,
        waitFor: []
      };
      this._eventsStrategy.fireEvent('beforePush', [beforePushArgs]);
      _deferred.when.apply(void 0, _toConsumableArray(beforePushArgs.waitFor)).done(function () {
        _this._pushImpl(changes);
        _this._eventsStrategy.fireEvent('push', [changes]);
      });
    },
    _pushImpl: _common.noop,
    remove: function remove(key) {
      var that = this;
      that._eventsStrategy.fireEvent('modifying');
      that._eventsStrategy.fireEvent('removing', [key]);
      return that._addFailHandlers(that._removeImpl(key).done(function (callbackKey) {
        that._eventsStrategy.fireEvent('removed', [callbackKey]);
        that._eventsStrategy.fireEvent('modified');
      }));
    },
    _removeImpl: abstract,
    _addFailHandlers: function _addFailHandlers(deferred) {
      return deferred.fail(this._errorHandler).fail(_errors.handleError);
    },
    on: function on(eventName, eventHandler) {
      this._eventsStrategy.on(eventName, eventHandler);
      return this;
    },
    off: function off(eventName, eventHandler) {
      this._eventsStrategy.off(eventName, eventHandler);
      return this;
    }
  });
  Store.create = function (alias, options) {
    if (!(alias in storeImpl)) {
      throw _errors.errors.Error('E4020', alias);
    }
    return new storeImpl[alias](options);
  };
  Store.registerClass = function (type, alias) {
    if (alias) {
      storeImpl[alias] = type;
    }
    return type;
  };
  Store.inherit = function (inheritor) {
    return function (members, alias) {
      var type = inheritor.apply(this, [members]);
      Store.registerClass(type, alias);
      return type;
    };
  }(Store.inherit);
  var _default = Store;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/class","../core/events_strategy","../core/utils/iterator","./errors","./utils","../core/utils/data","./store_helper","../core/utils/deferred","../core/utils/common","../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/class"), require("../core/events_strategy"), require("../core/utils/iterator"), require("./errors"), require("./utils"), require("../core/utils/data"), require("./store_helper"), require("../core/utils/deferred"), require("../core/utils/common"), require("../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=abstract_store.js.map