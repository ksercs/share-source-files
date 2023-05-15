!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/toolbar/internal/ui.toolbar.menu.js"], ["../../../core/utils/size","../../../core/renderer","../../../core/devices","../../../core/utils/extend","../../widget/ui.widget","../../button","./ui.toolbar.menu.list","../../themes","../../../core/templates/child_default_template","../ui.toolbar.utils","../../../core/utils/window","../../popup"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/toolbar/internal/ui.toolbar.menu.js", ["../../../core/utils/size", "../../../core/renderer", "../../../core/devices", "../../../core/utils/extend", "../../widget/ui.widget", "../../button", "./ui.toolbar.menu.list", "../../themes", "../../../core/templates/child_default_template", "../ui.toolbar.utils", "../../../core/utils/window", "../../popup"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _devices = _interopRequireDefault($__require("../../../core/devices"));
  var _extend = $__require("../../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("../../widget/ui.widget"));
  var _button = _interopRequireDefault($__require("../../button"));
  var _uiToolbarMenu = _interopRequireDefault($__require("./ui.toolbar.menu.list"));
  var _themes = $__require("../../themes");
  var _child_default_template = $__require("../../../core/templates/child_default_template");
  var _uiToolbar = $__require("../ui.toolbar.utils");
  var _window = $__require("../../../core/utils/window");
  $__require("../../popup");
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
  var DROP_DOWN_MENU_CLASS = 'dx-dropdownmenu';
  var DROP_DOWN_MENU_POPUP_CLASS = 'dx-dropdownmenu-popup';
  var DROP_DOWN_MENU_POPUP_WRAPPER_CLASS = 'dx-dropdownmenu-popup-wrapper';
  var DROP_DOWN_MENU_LIST_CLASS = 'dx-dropdownmenu-list';
  var DROP_DOWN_MENU_BUTTON_CLASS = 'dx-dropdownmenu-button';
  var POPUP_BOUNDARY_VERTICAL_OFFSET = 10;
  var POPUP_VERTICAL_OFFSET = 3;
  var DropDownMenu = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(DropDownMenu, _Widget);
    function DropDownMenu() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = DropDownMenu.prototype;
    _proto._supportedKeys = function _supportedKeys() {
      var extension = {};
      if (!this.option('opened') || !this._list.option('focusedElement')) {
        extension = this._button._supportedKeys();
      }
      return (0, _extend.extend)(_Widget.prototype._supportedKeys.call(this), extension, {
        tab: function tab() {
          this._popup && this._popup.hide();
        }
      });
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        items: [],
        onItemClick: null,
        dataSource: null,
        itemTemplate: 'item',
        onButtonClick: null,
        activeStateEnabled: true,
        hoverStateEnabled: true,
        opened: false,
        onItemRendered: null,
        closeOnClick: true,
        useInkRipple: false,
        container: undefined,
        animation: {
          show: {
            type: 'fade',
            from: 0,
            to: 1
          },
          hide: {
            type: 'fade',
            to: 0
          }
        }
      });
    };
    _proto._defaultOptionsRules = function _defaultOptionsRules() {
      return _Widget.prototype._defaultOptionsRules.call(this).concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }, {
        device: function device() {
          return (0, _themes.isMaterial)();
        },
        options: {
          useInkRipple: true,
          animation: {
            show: {
              type: 'pop',
              duration: 200,
              from: {
                scale: 0
              },
              to: {
                scale: 1
              }
            },
            hide: {
              type: 'pop',
              duration: 200,
              from: {
                scale: 1
              },
              to: {
                scale: 0
              }
            }
          }
        }
      }]);
    };
    _proto._init = function _init() {
      _Widget.prototype._init.call(this);
      this.$element().addClass(DROP_DOWN_MENU_CLASS);
      this._initItemClickAction();
      this._initButtonClickAction();
    };
    _proto._initItemClickAction = function _initItemClickAction() {
      this._itemClickAction = this._createActionByOption('onItemClick');
    };
    _proto._initButtonClickAction = function _initButtonClickAction() {
      this._buttonClickAction = this._createActionByOption('onButtonClick');
    };
    _proto._initTemplates = function _initTemplates() {
      this._templateManager.addDefaultTemplates({
        content: new _child_default_template.ChildDefaultTemplate('content')
      });
      _Widget.prototype._initTemplates.call(this);
    };
    _proto._initMarkup = function _initMarkup() {
      this._renderButton();
      _Widget.prototype._initMarkup.call(this);
    };
    _proto._render = function _render() {
      _Widget.prototype._render.call(this);
      this.setAria({
        'haspopup': true,
        'expanded': this.option('opened')
      });
    };
    _proto._renderContentImpl = function _renderContentImpl() {
      if (this.option('opened')) {
        this._renderPopup();
      }
    };
    _proto._clean = function _clean() {
      this._cleanFocusState();
      this._list && this._list.$element().remove();
      this._popup && this._popup.$element().remove();
      delete this._list;
      delete this._popup;
    };
    _proto._renderButton = function _renderButton() {
      var _this = this;
      var $button = this.$element().addClass(DROP_DOWN_MENU_BUTTON_CLASS);
      this._button = this._createComponent($button, _button.default, {
        icon: 'overflow',
        template: 'content',
        useInkRipple: this.option('useInkRipple'),
        hoverStateEnabled: false,
        focusStateEnabled: false,
        onClick: function onClick(e) {
          _this.option('opened', !_this.option('opened'));
          _this._buttonClickAction(e);
        }
      });
    };
    _proto._toggleActiveState = function _toggleActiveState($element, value, e) {
      this._button._toggleActiveState($element, value, e);
    };
    _proto._toggleMenuVisibility = function _toggleMenuVisibility(opened) {
      var state = opened !== null && opened !== void 0 ? opened : !this._popup.option('visible');
      if (opened) {
        this._renderPopup();
      }
      this._popup.toggle(state);
      this.setAria('expanded', state);
    };
    _proto._renderPopup = function _renderPopup() {
      var _this2 = this;
      if (this._$popup) {
        return;
      }
      this._$popup = (0, _renderer.default)('<div>').appendTo(this.$element());
      var _this$option = this.option(),
          rtlEnabled = _this$option.rtlEnabled,
          container = _this$option.container,
          animation = _this$option.animation;
      this._popup = this._createComponent(this._$popup, 'dxPopup', {
        onInitialized: function onInitialized(_ref) {
          var component = _ref.component;
          component.$wrapper().addClass(DROP_DOWN_MENU_POPUP_WRAPPER_CLASS).addClass(DROP_DOWN_MENU_POPUP_CLASS);
        },
        deferRendering: false,
        contentTemplate: function contentTemplate(contentElement) {
          return _this2._renderList(contentElement);
        },
        _ignoreFunctionValueDeprecation: true,
        maxHeight: function maxHeight() {
          return _this2._getMaxHeight();
        },
        position: {
          my: "top ".concat(rtlEnabled ? 'left' : 'right'),
          at: "bottom ".concat(rtlEnabled ? 'left' : 'right'),
          collision: 'fit flip',
          offset: {
            v: POPUP_VERTICAL_OFFSET
          },
          of: this.$element()
        },
        animation: animation,
        onOptionChanged: function onOptionChanged(_ref2) {
          var name = _ref2.name,
              value = _ref2.value;
          if (name === 'visible') {
            _this2.option('opened', value);
          }
        },
        container: container,
        autoResizeEnabled: false,
        height: 'auto',
        width: 'auto',
        hideOnOutsideClick: function hideOnOutsideClick(e) {
          return _this2._closeOutsideDropDownHandler(e);
        },
        hideOnParentScroll: true,
        shading: false,
        dragEnabled: false,
        showTitle: false,
        fullScreen: false,
        _fixWrapperPosition: true
      });
    };
    _proto._getMaxHeight = function _getMaxHeight() {
      var $element = this.$element();
      var offsetTop = $element.offset().top;
      var windowHeight = (0, _size.getOuterHeight)((0, _window.getWindow)());
      var maxHeight = Math.max(offsetTop, windowHeight - offsetTop - (0, _size.getOuterHeight)($element));
      return Math.min(windowHeight, maxHeight - POPUP_VERTICAL_OFFSET - POPUP_BOUNDARY_VERTICAL_OFFSET);
    };
    _proto._closeOutsideDropDownHandler = function _closeOutsideDropDownHandler(e) {
      var isOutsideClick = !(0, _renderer.default)(e.target).closest(this.$element()).length;
      return isOutsideClick;
    };
    _proto._renderList = function _renderList(contentElement) {
      var _this3 = this;
      var $content = (0, _renderer.default)(contentElement);
      $content.addClass(DROP_DOWN_MENU_LIST_CLASS);
      this._list = this._createComponent($content, _uiToolbarMenu.default, {
        dataSource: this._getListDataSource(),
        pageLoadMode: 'scrollBottom',
        indicateLoading: false,
        noDataText: '',
        itemTemplate: this.option('itemTemplate'),
        onItemClick: function onItemClick(e) {
          if (_this3.option('closeOnClick')) {
            _this3.option('opened', false);
          }
          _this3._itemClickAction(e);
        },
        tabIndex: -1,
        focusStateEnabled: false,
        activeStateEnabled: true,
        onItemRendered: this.option('onItemRendered'),
        _itemAttributes: {
          role: 'menuitem'
        }
      });
    };
    _proto._itemOptionChanged = function _itemOptionChanged(item, property, value) {
      var _this$_list;
      (_this$_list = this._list) === null || _this$_list === void 0 ? void 0 : _this$_list._itemOptionChanged(item, property, value);
      (0, _uiToolbar.toggleItemFocusableElementTabIndex)(this._list, item);
    };
    _proto._getListDataSource = function _getListDataSource() {
      var _this$option2;
      return (_this$option2 = this.option('dataSource')) !== null && _this$option2 !== void 0 ? _this$option2 : this.option('items');
    };
    _proto._setListDataSource = function _setListDataSource() {
      var _this$_list2;
      (_this$_list2 = this._list) === null || _this$_list2 === void 0 ? void 0 : _this$_list2.option('dataSource', this._getListDataSource());
      delete this._deferRendering;
    };
    _proto._getKeyboardListeners = function _getKeyboardListeners() {
      return _Widget.prototype._getKeyboardListeners.call(this).concat([this._list]);
    };
    _proto._toggleVisibility = function _toggleVisibility(visible) {
      _Widget.prototype._toggleVisibility.call(this, visible);
      this._button.option('visible', visible);
    };
    _proto._optionChanged = function _optionChanged(args) {
      var _this$_list3, _this$_list4, _this$_list5;
      var name = args.name,
          value = args.value;
      switch (name) {
        case 'items':
        case 'dataSource':
          if (!this.option('opened')) {
            this._deferRendering = true;
          } else {
            this._setListDataSource();
          }
          break;
        case 'itemTemplate':
          (_this$_list3 = this._list) === null || _this$_list3 === void 0 ? void 0 : _this$_list3.option(name, this._getTemplate(value));
          break;
        case 'onItemClick':
          this._initItemClickAction();
          break;
        case 'onButtonClick':
          this._buttonClickAction();
          break;
        case 'useInkRipple':
          this._invalidate();
          break;
        case 'focusStateEnabled':
          (_this$_list4 = this._list) === null || _this$_list4 === void 0 ? void 0 : _this$_list4.option(name, value);
          _Widget.prototype._optionChanged.call(this, args);
          break;
        case 'onItemRendered':
          (_this$_list5 = this._list) === null || _this$_list5 === void 0 ? void 0 : _this$_list5.option(name, value);
          break;
        case 'opened':
          if (this._deferRendering) {
            this._setListDataSource();
          }
          this._toggleMenuVisibility(value);
          this._updateFocusableItemsTabIndex();
          break;
        case 'closeOnClick':
          break;
        case 'container':
          this._popup && this._popup.option(name, value);
          break;
        case 'disabled':
          if (this._list) {
            this._updateFocusableItemsTabIndex();
          }
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    _proto._updateFocusableItemsTabIndex = function _updateFocusableItemsTabIndex() {
      var _this4 = this;
      this.option('items').forEach(function (item) {
        return (0, _uiToolbar.toggleItemFocusableElementTabIndex)(_this4._list, item);
      });
    };
    return DropDownMenu;
  }(_ui.default);
  exports.default = DropDownMenu;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/size","../../../core/renderer","../../../core/devices","../../../core/utils/extend","../../widget/ui.widget","../../button","./ui.toolbar.menu.list","../../themes","../../../core/templates/child_default_template","../ui.toolbar.utils","../../../core/utils/window","../../popup"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/size"), require("../../../core/renderer"), require("../../../core/devices"), require("../../../core/utils/extend"), require("../../widget/ui.widget"), require("../../button"), require("./ui.toolbar.menu.list"), require("../../themes"), require("../../../core/templates/child_default_template"), require("../ui.toolbar.utils"), require("../../../core/utils/window"), require("../../popup"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.toolbar.menu.js.map