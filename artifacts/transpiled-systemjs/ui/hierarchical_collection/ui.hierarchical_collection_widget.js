!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/hierarchical_collection/ui.hierarchical_collection_widget.js"], ["../../core/renderer","../../core/utils/data","../../core/utils/extend","../../core/utils/iterator","../../core/devices","../../core/utils/icon","./ui.data_adapter","../collection/ui.collection_widget.edit","../../core/templates/bindable_template","../../core/utils/type","../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/hierarchical_collection/ui.hierarchical_collection_widget.js", ["../../core/renderer", "../../core/utils/data", "../../core/utils/extend", "../../core/utils/iterator", "../../core/devices", "../../core/utils/icon", "./ui.data_adapter", "../collection/ui.collection_widget.edit", "../../core/templates/bindable_template", "../../core/utils/type", "../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _data = $__require("../../core/utils/data");
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _icon = $__require("../../core/utils/icon");
  var _ui = _interopRequireDefault($__require("./ui.data_adapter"));
  var _uiCollection_widget = _interopRequireDefault($__require("../collection/ui.collection_widget.edit"));
  var _bindable_template = $__require("../../core/templates/bindable_template");
  var _type = $__require("../../core/utils/type");
  var _common = $__require("../../core/utils/common");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DISABLED_STATE_CLASS = 'dx-state-disabled';
  var HierarchicalCollectionWidget = _uiCollection_widget.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        keyExpr: 'id',
        displayExpr: 'text',
        selectedExpr: 'selected',
        disabledExpr: 'disabled',
        itemsExpr: 'items',
        hoverStateEnabled: true,
        parentIdExpr: 'parentId',
        expandedExpr: 'expanded'
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }]);
    },
    _init: function _init() {
      this.callBase();
      this._initAccessors();
      this._initDataAdapter();
      this._initDynamicTemplates();
    },
    _initDataSource: function _initDataSource() {
      this.callBase();
      this._dataSource && this._dataSource.paginate(false);
    },
    _initDataAdapter: function _initDataAdapter() {
      var accessors = this._createDataAdapterAccessors();
      this._dataAdapter = new _ui.default((0, _extend.extend)({
        dataAccessors: {
          getters: accessors.getters,
          setters: accessors.setters
        },
        items: this.option('items')
      }, this._getDataAdapterOptions()));
    },
    _getDataAdapterOptions: _common.noop,
    _getItemExtraPropNames: _common.noop,
    _initDynamicTemplates: function _initDynamicTemplates() {
      var fields = ['text', 'html', 'items', 'icon'].concat(this._getItemExtraPropNames());
      this._templateManager.addDefaultTemplates({
        item: new _bindable_template.BindableTemplate(this._addContent.bind(this), fields, this.option('integrationOptions.watchMethod'), {
          'text': this._displayGetter,
          'items': this._itemsGetter
        })
      });
    },
    _addContent: function _addContent($container, itemData) {
      $container.html(itemData.html).append(this._getIconContainer(itemData)).append(this._getTextContainer(itemData));
    },
    _getIconContainer: function _getIconContainer(itemData) {
      return itemData.icon ? (0, _icon.getImageContainer)(itemData.icon) : undefined;
    },
    _getTextContainer: function _getTextContainer(itemData) {
      return (0, _renderer.default)('<span>').text(itemData.text);
    },
    _initAccessors: function _initAccessors() {
      var that = this;
      (0, _iterator.each)(this._getAccessors(), function (_, accessor) {
        that._compileAccessor(accessor);
      });
      this._compileDisplayGetter();
    },
    _getAccessors: function _getAccessors() {
      return ['key', 'selected', 'items', 'disabled', 'parentId', 'expanded'];
    },
    _getChildNodes: function _getChildNodes(node) {
      var that = this;
      var arr = [];
      (0, _iterator.each)(node.internalFields.childrenKeys, function (_, key) {
        var childNode = that._dataAdapter.getNodeByKey(key);
        arr.push(childNode);
      });
      return arr;
    },
    _hasChildren: function _hasChildren(node) {
      return node && node.internalFields.childrenKeys.length;
    },
    _compileAccessor: function _compileAccessor(optionName) {
      var getter = '_' + optionName + 'Getter';
      var setter = '_' + optionName + 'Setter';
      var optionExpr = this.option(optionName + 'Expr');
      if (!optionExpr) {
        this[getter] = _common.noop;
        this[setter] = _common.noop;
        return;
      } else if ((0, _type.isFunction)(optionExpr)) {
        this[setter] = function (obj, value) {
          obj[optionExpr()] = value;
        };
        this[getter] = function (obj) {
          return obj[optionExpr()];
        };
        return;
      }
      this[getter] = (0, _data.compileGetter)(optionExpr);
      this[setter] = (0, _data.compileSetter)(optionExpr);
    },
    _createDataAdapterAccessors: function _createDataAdapterAccessors() {
      var that = this;
      var accessors = {
        getters: {},
        setters: {}
      };
      (0, _iterator.each)(this._getAccessors(), function (_, accessor) {
        var getterName = '_' + accessor + 'Getter';
        var setterName = '_' + accessor + 'Setter';
        var newAccessor = accessor === 'parentId' ? 'parentKey' : accessor;
        accessors.getters[newAccessor] = that[getterName];
        accessors.setters[newAccessor] = that[setterName];
      });
      accessors.getters['display'] = !this._displayGetter ? function (itemData) {
        return itemData.text;
      } : this._displayGetter;
      return accessors;
    },
    _initMarkup: function _initMarkup() {
      this.callBase();
      this._addWidgetClass();
    },
    _addWidgetClass: function _addWidgetClass() {
      this._focusTarget().addClass(this._widgetClass());
    },
    _widgetClass: _common.noop,
    _renderItemFrame: function _renderItemFrame(index, itemData) {
      var $itemFrame = this.callBase.apply(this, arguments);
      $itemFrame.toggleClass(DISABLED_STATE_CLASS, !!this._disabledGetter(itemData));
      return $itemFrame;
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'displayExpr':
        case 'keyExpr':
          this._initAccessors();
          this._initDynamicTemplates();
          this.repaint();
          break;
        case 'itemsExpr':
        case 'selectedExpr':
        case 'disabledExpr':
        case 'expandedExpr':
        case 'parentIdExpr':
          this._initAccessors();
          this._initDataAdapter();
          this.repaint();
          break;
        case 'items':
          this._initDataAdapter();
          this.callBase(args);
          break;
        default:
          this.callBase(args);
      }
    }
  });
  var _default = HierarchicalCollectionWidget;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/data","../../core/utils/extend","../../core/utils/iterator","../../core/devices","../../core/utils/icon","./ui.data_adapter","../collection/ui.collection_widget.edit","../../core/templates/bindable_template","../../core/utils/type","../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/data"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../../core/devices"), require("../../core/utils/icon"), require("./ui.data_adapter"), require("../collection/ui.collection_widget.edit"), require("../../core/templates/bindable_template"), require("../../core/utils/type"), require("../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.hierarchical_collection_widget.js.map