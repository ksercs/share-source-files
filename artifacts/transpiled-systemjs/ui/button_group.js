!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/button_group.js"], ["../core/renderer","./widget/ui.widget","./button","./collection/ui.collection_widget.edit","../core/component_registrator","../core/utils/extend","../core/utils/type","../core/templates/bindable_template"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/button_group.js", ["../core/renderer", "./widget/ui.widget", "./button", "./collection/ui.collection_widget.edit", "../core/component_registrator", "../core/utils/extend", "../core/utils/type", "../core/templates/bindable_template"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _ui = _interopRequireDefault($__require("./widget/ui.widget"));
  var _button = _interopRequireDefault($__require("./button"));
  var _uiCollection_widget = _interopRequireDefault($__require("./collection/ui.collection_widget.edit"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _extend = $__require("../core/utils/extend");
  var _type = $__require("../core/utils/type");
  var _bindable_template = $__require("../core/templates/bindable_template");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE buttonGroup

  var BUTTON_GROUP_CLASS = 'dx-buttongroup';
  var BUTTON_GROUP_WRAPPER_CLASS = BUTTON_GROUP_CLASS + '-wrapper';
  var BUTTON_GROUP_ITEM_CLASS = BUTTON_GROUP_CLASS + '-item';
  var BUTTON_GROUP_FIRST_ITEM_CLASS = BUTTON_GROUP_CLASS + '-first-item';
  var BUTTON_GROUP_LAST_ITEM_CLASS = BUTTON_GROUP_CLASS + '-last-item';
  var BUTTON_GROUP_ITEM_HAS_WIDTH = BUTTON_GROUP_ITEM_CLASS + '-has-width';
  var SHAPE_STANDARD_CLASS = 'dx-shape-standard';
  var ButtonCollection = _uiCollection_widget.default.inherit({
    _initTemplates: function _initTemplates() {
      var _this = this;
      this.callBase();
      /**
       * @name dxButtonGroupItem.html
       * @hidden
       */
      this._templateManager.addDefaultTemplates({
        item: new _bindable_template.BindableTemplate(function ($container, data, model) {
          _this._prepareItemStyles($container);
          var template = _this.option('buttonTemplate');
          _this._createComponent($container, _button.default, (0, _extend.extend)({}, model, data, _this._getBasicButtonOptions(), {
            _templateData: _this._hasCustomTemplate(template) ? model : {},
            template: model.template || template
          }));
        }, ['text', 'type', 'icon', 'disabled', 'visible', 'hint'], this.option('integrationOptions.watchMethod'))
      });
    },
    _getBasicButtonOptions: function _getBasicButtonOptions() {
      return {
        focusStateEnabled: false,
        onClick: null,
        hoverStateEnabled: this.option('hoverStateEnabled'),
        activeStateEnabled: this.option('activeStateEnabled'),
        stylingMode: this.option('stylingMode')
      };
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        itemTemplateProperty: null
      });
    },
    _hasCustomTemplate: function _hasCustomTemplate(template) {
      return (0, _type.isFunction)(template) || this.option('integrationOptions.templates')[template];
    },
    _prepareItemStyles: function _prepareItemStyles($item) {
      var itemIndex = $item.data('dxItemIndex');
      itemIndex === 0 && $item.addClass(BUTTON_GROUP_FIRST_ITEM_CLASS);
      var items = this.option('items');
      items && itemIndex === items.length - 1 && $item.addClass(BUTTON_GROUP_LAST_ITEM_CLASS);
      $item.addClass(SHAPE_STANDARD_CLASS);
    },
    _renderItemContent: function _renderItemContent(args) {
      args.container = (0, _renderer.default)(args.container).parent();
      return this.callBase(args);
    },
    _setAriaSelectionAttribute: function _setAriaSelectionAttribute($target, value) {
      this.setAria('pressed', value, $target);
    },
    _renderItemContentByNode: function _renderItemContentByNode(args, $node) {
      args.container = (0, _renderer.default)(args.container.children().first());
      return this.callBase(args, $node);
    },
    _focusTarget: function _focusTarget() {
      return this.$element().parent();
    },
    _keyboardEventBindingTarget: function _keyboardEventBindingTarget() {
      return this._focusTarget();
    },
    _refreshContent: function _refreshContent() {
      this._prepareContent();
      this._renderContent();
    },
    _itemClass: function _itemClass() {
      return BUTTON_GROUP_ITEM_CLASS;
    },
    _itemSelectHandler: function _itemSelectHandler(e) {
      if (this.option('selectionMode') === 'single' && this.isItemSelected(e.currentTarget)) {
        return;
      }
      this.callBase(e);
    }
  });
  var ButtonGroup = _ui.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        hoverStateEnabled: true,
        focusStateEnabled: true,
        selectionMode: 'single',
        selectedItems: [],
        selectedItemKeys: [],
        stylingMode: 'contained',
        keyExpr: 'text',
        items: [],
        buttonTemplate: 'content',
        onSelectionChanged: null,
        onItemClick: null
      });
    },
    _init: function _init() {
      this.callBase();
      this._createItemClickAction();
    },
    _createItemClickAction: function _createItemClickAction() {
      this._itemClickAction = this._createActionByOption('onItemClick');
    },
    _initMarkup: function _initMarkup() {
      this.setAria('role', 'group');
      this.$element().addClass(BUTTON_GROUP_CLASS);
      this._renderButtons();
      this._syncSelectionOptions();
      this.callBase();
    },
    _fireSelectionChangeEvent: function _fireSelectionChangeEvent(addedItems, removedItems) {
      this._createActionByOption('onSelectionChanged', {
        excludeValidators: ['disabled', 'readOnly']
      })({
        addedItems: addedItems,
        removedItems: removedItems
      });
    },
    _renderButtons: function _renderButtons() {
      var _this2 = this;
      var $buttons = (0, _renderer.default)('<div>').addClass(BUTTON_GROUP_WRAPPER_CLASS).appendTo(this.$element());
      var selectedItems = this.option('selectedItems');
      var options = {
        selectionMode: this.option('selectionMode'),
        items: this.option('items'),
        keyExpr: this.option('keyExpr'),
        buttonTemplate: this.option('buttonTemplate'),
        scrollingEnabled: false,
        selectedItemKeys: this.option('selectedItemKeys'),
        focusStateEnabled: this.option('focusStateEnabled'),
        hoverStateEnabled: this.option('hoverStateEnabled'),
        activeStateEnabled: this.option('activeStateEnabled'),
        stylingMode: this.option('stylingMode'),
        accessKey: this.option('accessKey'),
        tabIndex: this.option('tabIndex'),
        noDataText: '',
        selectionRequired: false,
        onItemRendered: function onItemRendered(e) {
          var width = _this2.option('width');
          (0, _type.isDefined)(width) && (0, _renderer.default)(e.itemElement).addClass(BUTTON_GROUP_ITEM_HAS_WIDTH);
        },
        onSelectionChanged: function onSelectionChanged(e) {
          _this2._syncSelectionOptions();
          _this2._fireSelectionChangeEvent(e.addedItems, e.removedItems);
        },
        onItemClick: function onItemClick(e) {
          _this2._itemClickAction(e);
        }
      };
      if ((0, _type.isDefined)(selectedItems) && selectedItems.length) {
        options.selectedItems = selectedItems;
      }
      this._buttonsCollection = this._createComponent($buttons, ButtonCollection, options);
    },
    _syncSelectionOptions: function _syncSelectionOptions() {
      this._setOptionWithoutOptionChange('selectedItems', this._buttonsCollection.option('selectedItems'));
      this._setOptionWithoutOptionChange('selectedItemKeys', this._buttonsCollection.option('selectedItemKeys'));
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'stylingMode':
        case 'selectionMode':
        case 'keyExpr':
        case 'buttonTemplate':
        case 'items':
        case 'activeStateEnabled':
        case 'focusStateEnabled':
        case 'hoverStateEnabled':
        case 'tabIndex':
          this._invalidate();
          break;
        case 'selectedItemKeys':
        case 'selectedItems':
          this._buttonsCollection.option(args.name, args.value);
          break;
        case 'onItemClick':
          this._createItemClickAction();
          break;
        case 'onSelectionChanged':
          break;
        case 'width':
          this.callBase(args);
          this._buttonsCollection.itemElements().toggleClass(BUTTON_GROUP_ITEM_HAS_WIDTH, !!args.value);
          break;
        default:
          this.callBase(args);
      }
    }
  });
  (0, _component_registrator.default)('dxButtonGroup', ButtonGroup);
  var _default = ButtonGroup;
  /**
   * @name dxButtonGroupItem
   * @inherits CollectionWidgetItem
   * @type object
   */
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","./widget/ui.widget","./button","./collection/ui.collection_widget.edit","../core/component_registrator","../core/utils/extend","../core/utils/type","../core/templates/bindable_template"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("./widget/ui.widget"), require("./button"), require("./collection/ui.collection_widget.edit"), require("../core/component_registrator"), require("../core/utils/extend"), require("../core/utils/type"), require("../core/templates/bindable_template"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=button_group.js.map