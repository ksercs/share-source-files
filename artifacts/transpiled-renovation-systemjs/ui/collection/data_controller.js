!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/collection/data_controller.js"], ["../../core/utils/common","../../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/collection/data_controller.js", ["../../core/utils/common", "../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _common = $__require("../../core/utils/common");
  var _deferred = $__require("../../core/utils/deferred");
  var DataControllerMock = {
    load: function load() {
      return (0, _deferred.Deferred)().reject();
    },
    loadSingle: function loadSingle() {
      return (0, _deferred.Deferred)().reject();
    },
    loadFromStore: function loadFromStore() {
      return (0, _deferred.Deferred)().reject();
    },
    loadNextPage: function loadNextPage() {
      return (0, _deferred.Deferred)().reject();
    },
    loadOptions: _common.noop,
    userData: _common.noop,
    cancel: _common.noop,
    cancelAll: _common.noop,
    filter: _common.noop,
    addSearchFilter: _common.noop,
    group: _common.noop,
    paginate: _common.noop,
    pageSize: _common.noop,
    pageIndex: _common.noop,
    resetDataSourcePageIndex: _common.noop,
    totalCount: _common.noop,
    isLastPage: _common.noop,
    isLoading: _common.noop,
    isLoaded: _common.noop,
    searchValue: _common.noop,
    searchOperation: _common.noop,
    searchExpr: _common.noop,
    select: _common.noop,
    key: _common.noop,
    keyOf: _common.noop,
    store: _common.noop,
    items: _common.noop,
    applyMapFunction: _common.noop,
    getDataSource: _common.noop,
    reload: _common.noop,
    on: _common.noop,
    off: _common.noop
  };
  var DataController = /*#__PURE__*/function () {
    function DataController(dataSource) {
      if (!dataSource) {
        return DataControllerMock;
      }
      this._dataSource = dataSource;
    }
    var _proto = DataController.prototype;
    _proto.load = function load() {
      return this._dataSource.load();
    };
    _proto.loadSingle = function loadSingle(propName, propValue) {
      if (arguments.length < 2) {
        propValue = propName;
        propName = this.key();
      }
      return this._dataSource.loadSingle(propName, propValue);
    };
    _proto.loadFromStore = function loadFromStore(loadOptions) {
      return this.store().load(loadOptions);
    };
    _proto.loadNextPage = function loadNextPage() {
      this.pageIndex(1 + this.pageIndex());
      return this.load();
    };
    _proto.loadOptions = function loadOptions() {
      return this._dataSource.loadOptions();
    };
    _proto.userData = function userData() {
      return this._dataSource._userData;
    };
    _proto.cancel = function cancel(operationId) {
      this._dataSource.cancel(operationId);
    };
    _proto.cancelAll = function cancelAll() {
      this._dataSource.cancelAll();
    };
    _proto.filter = function filter(_filter) {
      return this._dataSource.filter(_filter);
    };
    _proto.addSearchFilter = function addSearchFilter(storeLoadOptions) {
      this._dataSource._addSearchFilter(storeLoadOptions);
    };
    _proto.group = function group(_group) {
      return this._dataSource.group(_group);
    };
    _proto.paginate = function paginate() {
      return this._dataSource.paginate();
    };
    _proto.pageSize = function pageSize() {
      return this._dataSource._pageSize;
    };
    _proto.pageIndex = function pageIndex(_pageIndex) {
      return this._dataSource.pageIndex(_pageIndex);
    };
    _proto.resetDataSourcePageIndex = function resetDataSourcePageIndex() {
      if (this.pageIndex()) {
        this.pageIndex(0);
        this.load();
      }
    };
    _proto.totalCount = function totalCount() {
      return this._dataSource.totalCount();
    };
    _proto.isLastPage = function isLastPage() {
      return this._dataSource.isLastPage() || !this._dataSource._pageSize;
    };
    _proto.isLoading = function isLoading() {
      return this._dataSource.isLoading();
    };
    _proto.isLoaded = function isLoaded() {
      return this._dataSource.isLoaded();
    };
    _proto.searchValue = function searchValue(value) {
      if (!arguments.length) {
        return this._dataSource.searchValue();
      }
      return this._dataSource.searchValue(value);
    };
    _proto.searchOperation = function searchOperation(operation) {
      return this._dataSource.searchOperation(operation);
    };
    _proto.searchExpr = function searchExpr(expr) {
      if (!arguments.length) {
        return this._dataSource.searchExpr();
      }
      return this._dataSource.searchExpr(expr);
    };
    _proto.select = function select() {
      var _this$_dataSource;
      return (_this$_dataSource = this._dataSource).select.apply(_this$_dataSource, arguments);
    };
    _proto.key = function key() {
      return this._dataSource.key();
    };
    _proto.keyOf = function keyOf(item) {
      return this.store().keyOf(item);
    };
    _proto.store = function store() {
      return this._dataSource.store();
    };
    _proto.items = function items() {
      return this._dataSource.items();
    };
    _proto.applyMapFunction = function applyMapFunction(data) {
      return this._dataSource._applyMapFunction(data);
    };
    _proto.getDataSource = function getDataSource() {
      return this._dataSource || null;
    };
    _proto.reload = function reload() {
      return this._dataSource.reload();
    };
    _proto.on = function on(event, handler) {
      this._dataSource.on(event, handler);
    };
    _proto.off = function off(event, handler) {
      this._dataSource.off(event, handler);
    };
    return DataController;
  }();
  var _default = DataController;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/common","../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/common"), require("../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=data_controller.js.map