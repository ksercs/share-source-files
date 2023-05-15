!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/data_helper.js"], ["./data/data_source/data_source","./core/utils/extend","./data/data_source/utils","./ui/collection/data_controller"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/data_helper.js", ["./data/data_source/data_source", "./core/utils/extend", "./data/data_source/utils", "./ui/collection/data_controller"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _data_source = $__require("./data/data_source/data_source");
  var _extend = $__require("./core/utils/extend");
  var _utils = $__require("./data/data_source/utils");
  var _data_controller = _interopRequireDefault($__require("./ui/collection/data_controller"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DATA_SOURCE_OPTIONS_METHOD = '_dataSourceOptions';
  var DATA_SOURCE_CHANGED_METHOD = '_dataSourceChangedHandler';
  var DATA_SOURCE_LOAD_ERROR_METHOD = '_dataSourceLoadErrorHandler';
  var DATA_SOURCE_LOADING_CHANGED_METHOD = '_dataSourceLoadingChangedHandler';
  var DATA_SOURCE_FROM_URL_LOAD_MODE_METHOD = '_dataSourceFromUrlLoadMode';
  var SPECIFIC_DATA_SOURCE_OPTION = '_getSpecificDataSourceOption';
  var NORMALIZE_DATA_SOURCE = '_normalizeDataSource';
  var DataHelperMixin = {
    postCtor: function postCtor() {
      this.on('disposing', function () {
        this._disposeDataSource();
      }.bind(this));
    },
    _refreshDataSource: function _refreshDataSource() {
      this._initDataSource();
      this._loadDataSource();
    },
    _initDataSource: function _initDataSource() {
      var dataSourceOptions = SPECIFIC_DATA_SOURCE_OPTION in this ? this[SPECIFIC_DATA_SOURCE_OPTION]() : this.option('dataSource');
      var widgetDataSourceOptions;
      var dataSourceType;
      this._disposeDataSource();
      if (dataSourceOptions) {
        if (dataSourceOptions instanceof _data_source.DataSource) {
          this._isSharedDataSource = true;
          this._dataSource = dataSourceOptions;
        } else {
          widgetDataSourceOptions = DATA_SOURCE_OPTIONS_METHOD in this ? this[DATA_SOURCE_OPTIONS_METHOD]() : {};
          dataSourceType = this._dataSourceType ? this._dataSourceType() : _data_source.DataSource;
          dataSourceOptions = (0, _utils.normalizeDataSourceOptions)(dataSourceOptions, {
            fromUrlLoadMode: DATA_SOURCE_FROM_URL_LOAD_MODE_METHOD in this && this[DATA_SOURCE_FROM_URL_LOAD_MODE_METHOD]()
          });
          this._dataSource = new dataSourceType((0, _extend.extend)(true, {}, widgetDataSourceOptions, dataSourceOptions));
        }
        if (NORMALIZE_DATA_SOURCE in this) {
          this._dataSource = this[NORMALIZE_DATA_SOURCE](this._dataSource);
        }
        this._addDataSourceHandlers();
        this._initDataController();
      }
    },
    _initDataController: function _initDataController() {
      var _this$option;
      var dataController = (_this$option = this.option) === null || _this$option === void 0 ? void 0 : _this$option.call(this, '_dataController');
      var dataSource = this._dataSource;
      if (dataController) {
        this._dataController = dataController;
      } else {
        this._dataController = new _data_controller.default(dataSource);
      }
    },
    _addDataSourceHandlers: function _addDataSourceHandlers() {
      if (DATA_SOURCE_CHANGED_METHOD in this) {
        this._addDataSourceChangeHandler();
      }
      if (DATA_SOURCE_LOAD_ERROR_METHOD in this) {
        this._addDataSourceLoadErrorHandler();
      }
      if (DATA_SOURCE_LOADING_CHANGED_METHOD in this) {
        this._addDataSourceLoadingChangedHandler();
      }
      this._addReadyWatcher();
    },
    _addReadyWatcher: function _addReadyWatcher() {
      this._dataSource.on('loadingChanged', function (isLoading) {
        this._ready && this._ready(!isLoading);
      }.bind(this));
    },
    _addDataSourceChangeHandler: function _addDataSourceChangeHandler() {
      var dataSource = this._dataSource;
      this._proxiedDataSourceChangedHandler = function (e) {
        this[DATA_SOURCE_CHANGED_METHOD](dataSource.items(), e);
      }.bind(this);
      dataSource.on('changed', this._proxiedDataSourceChangedHandler);
    },
    _addDataSourceLoadErrorHandler: function _addDataSourceLoadErrorHandler() {
      this._proxiedDataSourceLoadErrorHandler = this[DATA_SOURCE_LOAD_ERROR_METHOD].bind(this);
      this._dataSource.on('loadError', this._proxiedDataSourceLoadErrorHandler);
    },
    _addDataSourceLoadingChangedHandler: function _addDataSourceLoadingChangedHandler() {
      this._proxiedDataSourceLoadingChangedHandler = this[DATA_SOURCE_LOADING_CHANGED_METHOD].bind(this);
      this._dataSource.on('loadingChanged', this._proxiedDataSourceLoadingChangedHandler);
    },
    _loadDataSource: function _loadDataSource() {
      var dataSource = this._dataSource;
      if (dataSource) {
        if (dataSource.isLoaded()) {
          this._proxiedDataSourceChangedHandler && this._proxiedDataSourceChangedHandler();
        } else {
          dataSource.load();
        }
      }
    },
    _loadSingle: function _loadSingle(key, value) {
      key = key === 'this' ? this._dataSource.key() || 'this' : key;
      return this._dataSource.loadSingle(key, value);
    },
    _isLastPage: function _isLastPage() {
      return !this._dataSource || this._dataSource.isLastPage() || !this._dataSource._pageSize;
    },
    _isDataSourceLoading: function _isDataSourceLoading() {
      return this._dataSource && this._dataSource.isLoading();
    },
    _disposeDataSource: function _disposeDataSource() {
      if (this._dataSource) {
        if (this._isSharedDataSource) {
          delete this._isSharedDataSource;
          this._proxiedDataSourceChangedHandler && this._dataSource.off('changed', this._proxiedDataSourceChangedHandler);
          this._proxiedDataSourceLoadErrorHandler && this._dataSource.off('loadError', this._proxiedDataSourceLoadErrorHandler);
          this._proxiedDataSourceLoadingChangedHandler && this._dataSource.off('loadingChanged', this._proxiedDataSourceLoadingChangedHandler);
        } else {
          this._dataSource.dispose();
        }
        delete this._dataSource;
        delete this._proxiedDataSourceChangedHandler;
        delete this._proxiedDataSourceLoadErrorHandler;
        delete this._proxiedDataSourceLoadingChangedHandler;
      }
    },
    getDataSource: function getDataSource() {
      return this._dataSource || null;
    }
  };
  var _default = DataHelperMixin;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./data/data_source/data_source","./core/utils/extend","./data/data_source/utils","./ui/collection/data_controller"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./data/data_source/data_source"), require("./core/utils/extend"), require("./data/data_source/utils"), require("./ui/collection/data_controller"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=data_helper.js.map