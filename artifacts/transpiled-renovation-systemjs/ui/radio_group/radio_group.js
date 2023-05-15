!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/radio_group/radio_group.js"], ["../../core/renderer","../../core/utils/extend","../../core/devices","../../core/utils/common","../../core/utils/type","../../core/component_registrator","../collection/ui.collection_widget.edit","../editor/ui.data_expression","../editor/editor","../../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/radio_group/radio_group.js", ["../../core/renderer", "../../core/utils/extend", "../../core/devices", "../../core/utils/common", "../../core/utils/type", "../../core/component_registrator", "../collection/ui.collection_widget.edit", "../editor/ui.data_expression", "../editor/editor", "../../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _uiCollection_widget = _interopRequireDefault($__require("../collection/ui.collection_widget.edit"));
  var _ui = _interopRequireDefault($__require("../editor/ui.data_expression"));
  var _editor = _interopRequireDefault($__require("../editor/editor"));
  var _deferred = $__require("../../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  // STYLE radioGroup

  var RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
  var RADIO_BUTTON_CLASS = 'dx-radiobutton';
  var RADIO_BUTTON_ICON_CHECKED_CLASS = 'dx-radiobutton-icon-checked';
  var RADIO_BUTTON_ICON_CLASS = 'dx-radiobutton-icon';
  var RADIO_BUTTON_ICON_DOT_CLASS = 'dx-radiobutton-icon-dot';
  var RADIO_GROUP_HORIZONTAL_CLASS = 'dx-radiogroup-horizontal';
  var RADIO_GROUP_VERTICAL_CLASS = 'dx-radiogroup-vertical';
  var RADIO_VALUE_CONTAINER_CLASS = 'dx-radio-value-container';
  var RADIO_GROUP_CLASS = 'dx-radiogroup';
  var RADIO_FEEDBACK_HIDE_TIMEOUT = 100;
  var RadioCollection = /*#__PURE__*/function (_CollectionWidget) {
    _inheritsLoose(RadioCollection, _CollectionWidget);
    function RadioCollection() {
      return _CollectionWidget.apply(this, arguments) || this;
    }
    var _proto = RadioCollection.prototype;
    _proto._focusTarget = function _focusTarget() {
      return this.$element().parent();
    };
    _proto._nullValueSelectionSupported = function _nullValueSelectionSupported() {
      return true;
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      var defaultOptions = _CollectionWidget.prototype._getDefaultOptions.call(this);
      return (0, _extend.extend)(defaultOptions, _ui.default._dataExpressionDefaultOptions(), {
        _itemAttributes: {
          role: 'radio'
        }
      });
    };
    _proto._initMarkup = function _initMarkup() {
      var _this = this;
      _CollectionWidget.prototype._initMarkup.call(this);
      (0, _common.deferRender)(function () {
        _this.itemElements().addClass(RADIO_BUTTON_CLASS);
      });
    };
    _proto._keyboardEventBindingTarget = function _keyboardEventBindingTarget() {
      return this._focusTarget();
    };
    _proto._postprocessRenderItem = function _postprocessRenderItem(args) {
      var html = args.itemData.html,
          itemElement = args.itemElement;
      if (!html) {
        var $radio = (0, _renderer.default)('<div>').addClass(RADIO_BUTTON_ICON_CLASS);
        (0, _renderer.default)('<div>').addClass(RADIO_BUTTON_ICON_DOT_CLASS).appendTo($radio);
        var $radioContainer = (0, _renderer.default)('<div>').append($radio).addClass(RADIO_VALUE_CONTAINER_CLASS);
        (0, _renderer.default)(itemElement).prepend($radioContainer);
      }
      _CollectionWidget.prototype._postprocessRenderItem.call(this, args);
    };
    _proto._processSelectableItem = function _processSelectableItem($itemElement, isSelected) {
      _CollectionWidget.prototype._processSelectableItem.call(this, $itemElement, isSelected);
      $itemElement.toggleClass(RADIO_BUTTON_CHECKED_CLASS, isSelected).find(".".concat(RADIO_BUTTON_ICON_CLASS)).first().toggleClass(RADIO_BUTTON_ICON_CHECKED_CLASS, isSelected);
      this.setAria('checked', isSelected, $itemElement);
    };
    _proto._refreshContent = function _refreshContent() {
      this._prepareContent();
      this._renderContent();
    };
    _proto._supportedKeys = function _supportedKeys() {
      var parent = _CollectionWidget.prototype._supportedKeys.call(this);
      return (0, _extend.extend)({}, parent, {
        enter: function enter(e) {
          e.preventDefault();
          return parent.enter.apply(this, arguments);
        },
        space: function space(e) {
          e.preventDefault();
          return parent.space.apply(this, arguments);
        }
      });
    };
    _proto._itemElements = function _itemElements() {
      return this._itemContainer().children(this._itemSelector());
    };
    _proto._setAriaSelectionAttribute = function _setAriaSelectionAttribute() {};
    return RadioCollection;
  }(_uiCollection_widget.default);
  var RadioGroup = /*#__PURE__*/function (_Editor) {
    _inheritsLoose(RadioGroup, _Editor);
    function RadioGroup() {
      return _Editor.apply(this, arguments) || this;
    }
    var _proto2 = RadioGroup.prototype;
    _proto2._dataSourceOptions = function _dataSourceOptions() {
      return {
        paginate: false
      };
    };
    _proto2._defaultOptionsRules = function _defaultOptionsRules() {
      var defaultOptionsRules = _Editor.prototype._defaultOptionsRules.call(this);
      return defaultOptionsRules.concat([{
        device: {
          tablet: true
        },
        options: {
          layout: 'horizontal'
        }
      }, {
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }]);
    };
    _proto2._fireContentReadyAction = function _fireContentReadyAction(force) {
      force && _Editor.prototype._fireContentReadyAction.call(this);
    };
    _proto2._focusTarget = function _focusTarget() {
      return this.$element();
    };
    _proto2._getAriaTarget = function _getAriaTarget() {
      return this.$element();
    };
    _proto2._getDefaultOptions = function _getDefaultOptions() {
      var defaultOptions = _Editor.prototype._getDefaultOptions.call(this);
      return (0, _extend.extend)(defaultOptions, (0, _extend.extend)(_ui.default._dataExpressionDefaultOptions(), {
        hoverStateEnabled: true,
        activeStateEnabled: true,
        layout: 'vertical'
      }));
    };
    _proto2._getItemValue = function _getItemValue(item) {
      return this._valueGetter ? this._valueGetter(item) : item.text;
    };
    _proto2._getSubmitElement = function _getSubmitElement() {
      return this._$submitElement;
    };
    _proto2._init = function _init() {
      _Editor.prototype._init.call(this);
      this._activeStateUnit = ".".concat(RADIO_BUTTON_CLASS);
      this._feedbackHideTimeout = RADIO_FEEDBACK_HIDE_TIMEOUT;
      this._initDataExpressions();
    };
    _proto2._initMarkup = function _initMarkup() {
      this.$element().addClass(RADIO_GROUP_CLASS);
      this._renderSubmitElement();
      this.setAria('role', 'radiogroup');
      this._renderRadios();
      this._renderLayout();
      _Editor.prototype._initMarkup.call(this);
    };
    _proto2._itemClickHandler = function _itemClickHandler(_ref) {
      var itemElement = _ref.itemElement,
          event = _ref.event,
          itemData = _ref.itemData;
      if (this.itemElements().is(itemElement)) {
        var newValue = this._getItemValue(itemData);
        if (newValue !== this.option('value')) {
          this._saveValueChangeEvent(event);
          this.option('value', newValue);
        }
      }
    };
    _proto2._getSelectedItemKeys = function _getSelectedItemKeys() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.option('value');
      var isNullSelectable = this.option('valueExpr') !== 'this';
      var shouldSelectValue = isNullSelectable && value === null || (0, _type.isDefined)(value);
      return shouldSelectValue ? [value] : [];
    };
    _proto2._setSelection = function _setSelection(currentValue) {
      var value = this._unwrappedValue(currentValue);
      this._setCollectionWidgetOption('selectedItemKeys', this._getSelectedItemKeys(value));
    };
    _proto2._optionChanged = function _optionChanged(args) {
      var name = args.name,
          value = args.value;
      this._dataExpressionOptionChanged(args);
      switch (name) {
        case 'dataSource':
          this._invalidate();
          break;
        case 'focusStateEnabled':
        case 'accessKey':
        case 'tabIndex':
          this._setCollectionWidgetOption(name, value);
          break;
        case 'disabled':
          _Editor.prototype._optionChanged.call(this, args);
          this._setCollectionWidgetOption(name, value);
          break;
        case 'valueExpr':
          this._setCollectionWidgetOption('keyExpr', this._getCollectionKeyExpr());
          break;
        case 'value':
          this._setSelection(value);
          this._setSubmitValue(value);
          _Editor.prototype._optionChanged.call(this, args);
          break;
        case 'items':
          this._setSelection(this.option('value'));
          break;
        case 'itemTemplate':
        case 'displayExpr':
          break;
        case 'layout':
          this._renderLayout();
          this._updateItemsSize();
          break;
        default:
          _Editor.prototype._optionChanged.call(this, args);
      }
    };
    _proto2._render = function _render() {
      _Editor.prototype._render.call(this);
      this._updateItemsSize();
    };
    _proto2._renderLayout = function _renderLayout() {
      var layout = this.option('layout');
      var $element = this.$element();
      $element.toggleClass(RADIO_GROUP_VERTICAL_CLASS, layout === 'vertical');
      $element.toggleClass(RADIO_GROUP_HORIZONTAL_CLASS, layout === 'horizontal');
    };
    _proto2._renderRadios = function _renderRadios() {
      var _this2 = this;
      this._areRadiosCreated = new _deferred.Deferred();
      var $radios = (0, _renderer.default)('<div>').appendTo(this.$element());
      var _this$option = this.option(),
          displayExpr = _this$option.displayExpr,
          accessKey = _this$option.accessKey,
          focusStateEnabled = _this$option.focusStateEnabled,
          itemTemplate = _this$option.itemTemplate,
          tabIndex = _this$option.tabIndex;
      this._createComponent($radios, RadioCollection, {
        onInitialized: function onInitialized(_ref2) {
          var component = _ref2.component;
          _this2._radios = component;
        },
        onContentReady: function onContentReady(e) {
          _this2._fireContentReadyAction(true);
        },
        onItemClick: this._itemClickHandler.bind(this),
        displayExpr: displayExpr,
        accessKey: accessKey,
        dataSource: this._dataSource,
        focusStateEnabled: focusStateEnabled,
        itemTemplate: itemTemplate,
        keyExpr: this._getCollectionKeyExpr(),
        noDataText: '',
        scrollingEnabled: false,
        selectByClick: false,
        selectionMode: 'single',
        selectedItemKeys: this._getSelectedItemKeys(),
        tabIndex: tabIndex
      });
      this._areRadiosCreated.resolve();
    };
    _proto2._renderSubmitElement = function _renderSubmitElement() {
      this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());
      this._setSubmitValue();
    };
    _proto2._setOptionsByReference = function _setOptionsByReference() {
      _Editor.prototype._setOptionsByReference.call(this);
      (0, _extend.extend)(this._optionsByReference, {
        value: true
      });
    };
    _proto2._setSubmitValue = function _setSubmitValue(value) {
      var _value;
      value = (_value = value) !== null && _value !== void 0 ? _value : this.option('value');
      var submitValue = this.option('valueExpr') === 'this' ? this._displayGetter(value) : value;
      this._$submitElement.val(submitValue);
    };
    _proto2._setCollectionWidgetOption = function _setCollectionWidgetOption() {
      this._areRadiosCreated.done(this._setWidgetOption.bind(this, '_radios', arguments));
    };
    _proto2._updateItemsSize = function _updateItemsSize() {
      if (this.option('layout') === 'horizontal') {
        this.itemElements().css('height', 'auto');
      } else {
        var itemsCount = this.option('items').length;
        this.itemElements().css('height', 100 / itemsCount + '%');
      }
    };
    _proto2.focus = function focus() {
      var _this$_radios;
      (_this$_radios = this._radios) === null || _this$_radios === void 0 ? void 0 : _this$_radios.focus();
    };
    _proto2.itemElements = function itemElements() {
      var _this$_radios2;
      return (_this$_radios2 = this._radios) === null || _this$_radios2 === void 0 ? void 0 : _this$_radios2.itemElements();
    };
    return RadioGroup;
  }(_editor.default);
  RadioGroup.include(_ui.default);
  (0, _component_registrator.default)('dxRadioGroup', RadioGroup);
  var _default = RadioGroup;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../../core/devices","../../core/utils/common","../../core/utils/type","../../core/component_registrator","../collection/ui.collection_widget.edit","../editor/ui.data_expression","../editor/editor","../../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/devices"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/component_registrator"), require("../collection/ui.collection_widget.edit"), require("../editor/ui.data_expression"), require("../editor/editor"), require("../../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=radio_group.js.map