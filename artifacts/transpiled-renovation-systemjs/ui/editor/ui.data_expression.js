!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/editor/ui.data_expression.js"], ["../../core/utils/variable_wrapper","../../core/utils/data","../../core/utils/common","../../core/utils/type","../../core/utils/extend","../../data_helper","../../data/data_source/data_source","../../data/array_store","../../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/editor/ui.data_expression.js", ["../../core/utils/variable_wrapper", "../../core/utils/data", "../../core/utils/common", "../../core/utils/type", "../../core/utils/extend", "../../data_helper", "../../data/data_source/data_source", "../../data/array_store", "../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _variable_wrapper = _interopRequireDefault($__require("../../core/utils/variable_wrapper"));
  var _data = $__require("../../core/utils/data");
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _data_helper = _interopRequireDefault($__require("../../data_helper"));
  var _data_source = $__require("../../data/data_source/data_source");
  var _array_store = _interopRequireDefault($__require("../../data/array_store"));
  var _deferred = $__require("../../core/utils/deferred");
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
  var DataExpressionMixin = (0, _extend.extend)({}, _data_helper.default, {
    _dataExpressionDefaultOptions: function _dataExpressionDefaultOptions() {
      return {
        items: [],
        dataSource: null,
        itemTemplate: 'item',
        value: null,
        valueExpr: 'this',
        displayExpr: undefined
      };
    },
    _initDataExpressions: function _initDataExpressions() {
      this._compileValueGetter();
      this._compileDisplayGetter();
      this._initDynamicTemplates();
      this._initDataSource();
      this._itemsToDataSource();
    },
    _itemsToDataSource: function _itemsToDataSource() {
      if (!this.option('dataSource')) {
        // TODO: try this.option("dataSource", new ...)
        this._dataSource = new _data_source.DataSource({
          store: new _array_store.default(this.option('items')),
          pageSize: 0
        });
        this._initDataController();
      }
    },
    _compileDisplayGetter: function _compileDisplayGetter() {
      this._displayGetter = (0, _data.compileGetter)(this._displayGetterExpr());
    },
    _displayGetterExpr: function _displayGetterExpr() {
      return this.option('displayExpr');
    },
    _compileValueGetter: function _compileValueGetter() {
      this._valueGetter = (0, _data.compileGetter)(this._valueGetterExpr());
    },
    _valueGetterExpr: function _valueGetterExpr() {
      return this.option('valueExpr') || 'this';
    },
    _loadValue: function _loadValue(value) {
      var deferred = new _deferred.Deferred();
      value = this._unwrappedValue(value);
      if (!(0, _type.isDefined)(value)) {
        return deferred.reject().promise();
      }
      this._loadSingle(this._valueGetterExpr(), value).done(function (item) {
        this._isValueEquals(this._valueGetter(item), value) ? deferred.resolve(item) : deferred.reject();
      }.bind(this)).fail(function () {
        deferred.reject();
      });
      this._loadValueDeferred = deferred;
      return deferred.promise();
    },
    _rejectValueLoading: function _rejectValueLoading() {
      var _this$_loadValueDefer;
      (_this$_loadValueDefer = this._loadValueDeferred) === null || _this$_loadValueDefer === void 0 ? void 0 : _this$_loadValueDefer.reject({
        shouldSkipCallback: true
      });
    },
    _getCurrentValue: function _getCurrentValue() {
      return this.option('value');
    },
    _unwrappedValue: function _unwrappedValue(value) {
      var _value;
      value = (_value = value) !== null && _value !== void 0 ? _value : this._getCurrentValue();
      if (value && this._dataSource && this._valueGetterExpr() === 'this') {
        value = this._getItemKey(value);
      }
      return _variable_wrapper.default.unwrap(value);
    },
    _getItemKey: function _getItemKey(value) {
      var key = this._dataSource.key();
      if (Array.isArray(key)) {
        var result = {};
        for (var i = 0, n = key.length; i < n; i++) {
          result[key[i]] = value[key[i]];
        }
        return result;
      }
      if (key && _typeof(value) === 'object') {
        value = value[key];
      }
      return value;
    },
    _isValueEquals: function _isValueEquals(value1, value2) {
      var dataSourceKey = this._dataSource && this._dataSource.key();
      var result = this._compareValues(value1, value2);
      if (!result && dataSourceKey && (0, _type.isDefined)(value1) && (0, _type.isDefined)(value2)) {
        if (Array.isArray(dataSourceKey)) {
          result = this._compareByCompositeKey(value1, value2, dataSourceKey);
        } else {
          result = this._compareByKey(value1, value2, dataSourceKey);
        }
      }
      return result;
    },
    _compareByCompositeKey: function _compareByCompositeKey(value1, value2, key) {
      var isObject = _type.isObject;
      if (!isObject(value1) || !isObject(value2)) {
        return false;
      }
      for (var i = 0, n = key.length; i < n; i++) {
        if (value1[key[i]] !== value2[key[i]]) {
          return false;
        }
      }
      return true;
    },
    _compareByKey: function _compareByKey(value1, value2, key) {
      var unwrapObservable = _variable_wrapper.default.unwrap;
      var valueKey1 = (0, _common.ensureDefined)(unwrapObservable(value1[key]), value1);
      var valueKey2 = (0, _common.ensureDefined)(unwrapObservable(value2[key]), value2);
      return this._compareValues(valueKey1, valueKey2);
    },
    _compareValues: function _compareValues(value1, value2) {
      return (0, _data.toComparable)(value1, true) === (0, _data.toComparable)(value2, true);
    },
    _initDynamicTemplates: _common.noop,
    _setCollectionWidgetItemTemplate: function _setCollectionWidgetItemTemplate() {
      this._initDynamicTemplates();
      this._setCollectionWidgetOption('itemTemplate', this.option('itemTemplate'));
    },
    _getCollectionKeyExpr: function _getCollectionKeyExpr() {
      var valueExpr = this.option('valueExpr');
      var isValueExprField = (0, _type.isString)(valueExpr) && valueExpr !== 'this' || (0, _type.isFunction)(valueExpr);
      return isValueExprField ? valueExpr : null;
    },
    _dataExpressionOptionChanged: function _dataExpressionOptionChanged(args) {
      switch (args.name) {
        case 'items':
          this._itemsToDataSource();
          this._setCollectionWidgetOption('items');
          break;
        case 'dataSource':
          this._initDataSource();
          break;
        case 'itemTemplate':
          this._setCollectionWidgetItemTemplate();
          break;
        case 'valueExpr':
          this._compileValueGetter();
          break;
        case 'displayExpr':
          this._compileDisplayGetter();
          this._initDynamicTemplates();
          this._setCollectionWidgetOption('displayExpr');
          break;
      }
    }
  });
  var _default = DataExpressionMixin;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/variable_wrapper","../../core/utils/data","../../core/utils/common","../../core/utils/type","../../core/utils/extend","../../data_helper","../../data/data_source/data_source","../../data/array_store","../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/variable_wrapper"), require("../../core/utils/data"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../data_helper"), require("../../data/data_source/data_source"), require("../../data/array_store"), require("../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.data_expression.js.map