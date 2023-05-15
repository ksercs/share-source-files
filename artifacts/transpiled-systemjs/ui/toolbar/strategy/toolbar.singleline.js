!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/toolbar/strategy/toolbar.singleline.js"], ["../../../core/utils/size","../../../core/renderer","../../../core/utils/iterator","../../../core/utils/common","../../../core/utils/extend","../internal/ui.toolbar.menu","../../../core/utils/data"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/toolbar/strategy/toolbar.singleline.js", ["../../../core/utils/size", "../../../core/renderer", "../../../core/utils/iterator", "../../../core/utils/common", "../../../core/utils/extend", "../internal/ui.toolbar.menu", "../../../core/utils/data"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.SingleLineStrategy = void 0;
  var _size = $__require("../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _iterator = $__require("../../../core/utils/iterator");
  var _common = $__require("../../../core/utils/common");
  var _extend = $__require("../../../core/utils/extend");
  var _uiToolbar = _interopRequireDefault($__require("../internal/ui.toolbar.menu"));
  var _data = $__require("../../../core/utils/data");
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
  var INVISIBLE_STATE_CLASS = 'dx-state-invisible';
  var TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS = 'dx-toolbar-menu-container';
  var TOOLBAR_BUTTON_CLASS = 'dx-toolbar-button';
  var TOOLBAR_AUTO_HIDE_ITEM_CLASS = 'dx-toolbar-item-auto-hide';
  var TOOLBAR_HIDDEN_ITEM = 'dx-toolbar-item-invisible';
  var SingleLineStrategy = /*#__PURE__*/function () {
    function SingleLineStrategy(toolbar) {
      this._toolbar = toolbar;
    }
    var _proto = SingleLineStrategy.prototype;
    _proto._initMarkup = function _initMarkup() {
      var _this = this;
      (0, _common.deferRender)(function () {
        _this._renderOverflowMenu();
        _this._renderMenuItems();
      });
    };
    _proto._renderOverflowMenu = function _renderOverflowMenu() {
      var _this2 = this;
      if (!this._hasVisibleMenuItems()) {
        return;
      }
      this._renderMenuButtonContainer();
      var $menu = (0, _renderer.default)('<div>').appendTo(this._overflowMenuContainer());
      var itemClickAction = this._toolbar._createActionByOption('onItemClick');
      var menuItemTemplate = this._toolbar._getTemplateByOption('menuItemTemplate');
      this._menu = this._toolbar._createComponent($menu, _uiToolbar.default, {
        disabled: this._toolbar.option('disabled'),
        itemTemplate: function itemTemplate() {
          return menuItemTemplate;
        },
        onItemClick: function onItemClick(e) {
          itemClickAction(e);
        },
        container: this._toolbar.option('menuContainer'),
        onOptionChanged: function onOptionChanged(_ref) {
          var name = _ref.name,
              value = _ref.value;
          if (name === 'opened') {
            _this2._toolbar.option('overflowMenuVisible', value);
          }
          if (name === 'items') {
            _this2._updateMenuVisibility(value);
          }
        }
      });
    };
    _proto.renderMenuItems = function renderMenuItems() {
      if (!this._menu) {
        this._renderOverflowMenu();
      }
      this._menu && this._menu.option('items', this._getMenuItems());
      if (this._menu && !this._menu.option('items').length) {
        this._menu.option('opened', false);
      }
    };
    _proto._renderMenuButtonContainer = function _renderMenuButtonContainer() {
      this._$overflowMenuContainer = (0, _renderer.default)('<div>').appendTo(this._toolbar._$afterSection).addClass(TOOLBAR_BUTTON_CLASS).addClass(TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS);
    };
    _proto._overflowMenuContainer = function _overflowMenuContainer() {
      return this._$overflowMenuContainer;
    };
    _proto._updateMenuVisibility = function _updateMenuVisibility(menuItems) {
      var items = menuItems !== null && menuItems !== void 0 ? menuItems : this._getMenuItems();
      var isMenuVisible = items.length && this._hasVisibleMenuItems(items);
      this._toggleMenuVisibility(isMenuVisible);
    };
    _proto._toggleMenuVisibility = function _toggleMenuVisibility(value) {
      if (!this._overflowMenuContainer()) {
        return;
      }
      this._overflowMenuContainer().toggleClass(INVISIBLE_STATE_CLASS, !value);
    };
    _proto._renderMenuItems = function _renderMenuItems() {
      var _this3 = this;
      (0, _common.deferRender)(function () {
        _this3.renderMenuItems();
      });
    };
    _proto._dimensionChanged = function _dimensionChanged() {
      this.renderMenuItems();
    };
    _proto._getToolbarItems = function _getToolbarItems() {
      var _this$_toolbar$option,
          _this4 = this;
      return (0, _common.grep)((_this$_toolbar$option = this._toolbar.option('items')) !== null && _this$_toolbar$option !== void 0 ? _this$_toolbar$option : [], function (item) {
        return !_this4._toolbar._isMenuItem(item);
      });
    };
    _proto._getMenuItems = function _getMenuItems() {
      var _this$_toolbar$option2,
          _this5 = this,
          _this$_restoreItems;
      var menuItems = (0, _common.grep)((_this$_toolbar$option2 = this._toolbar.option('items')) !== null && _this$_toolbar$option2 !== void 0 ? _this$_toolbar$option2 : [], function (item) {
        return _this5._toolbar._isMenuItem(item);
      });
      var $hiddenItems = this._toolbar._itemContainer().children(".".concat(TOOLBAR_AUTO_HIDE_ITEM_CLASS, ".").concat(TOOLBAR_HIDDEN_ITEM)).not(".".concat(INVISIBLE_STATE_CLASS));
      this._restoreItems = (_this$_restoreItems = this._restoreItems) !== null && _this$_restoreItems !== void 0 ? _this$_restoreItems : [];
      var overflowItems = [].slice.call($hiddenItems).map(function (item) {
        var itemData = _this5._toolbar._getItemData(item);
        var $itemContainer = (0, _renderer.default)(item);
        var $itemMarkup = $itemContainer.children();
        return (0, _extend.extend)({
          menuItemTemplate: function menuItemTemplate() {
            _this5._restoreItems.push({
              container: $itemContainer,
              item: $itemMarkup
            });
            var $container = (0, _renderer.default)('<div>').addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
            return $container.append($itemMarkup);
          }
        }, itemData);
      });
      return [].concat(_toConsumableArray(overflowItems), _toConsumableArray(menuItems));
    };
    _proto._hasVisibleMenuItems = function _hasVisibleMenuItems(items) {
      var menuItems = items !== null && items !== void 0 ? items : this._toolbar.option('items');
      var result = false;
      var optionGetter = (0, _data.compileGetter)('visible');
      var overflowGetter = (0, _data.compileGetter)('locateInMenu');
      (0, _iterator.each)(menuItems, function (index, item) {
        var itemVisible = optionGetter(item, {
          functionsAsIs: true
        });
        var itemOverflow = overflowGetter(item, {
          functionsAsIs: true
        });
        if (itemVisible !== false && (itemOverflow === 'auto' || itemOverflow === 'always') || item.location === 'menu') {
          result = true;
        }
      });
      return result;
    };
    _proto._arrangeItems = function _arrangeItems() {
      var _this$_restoreItems2;
      this._toolbar._$centerSection.css({
        margin: '0 auto',
        float: 'none'
      });
      (0, _iterator.each)((_this$_restoreItems2 = this._restoreItems) !== null && _this$_restoreItems2 !== void 0 ? _this$_restoreItems2 : [], function (_, obj) {
        (0, _renderer.default)(obj.container).append(obj.item);
      });
      this._restoreItems = [];
      var elementWidth = (0, _size.getWidth)(this._toolbar.$element());
      this._hideOverflowItems(elementWidth);
      return elementWidth;
    };
    _proto._hideOverflowItems = function _hideOverflowItems(elementWidth) {
      var _elementWidth;
      var overflowItems = this._toolbar.$element().find(".".concat(TOOLBAR_AUTO_HIDE_ITEM_CLASS));
      if (!overflowItems.length) {
        return;
      }
      elementWidth = (_elementWidth = elementWidth) !== null && _elementWidth !== void 0 ? _elementWidth : (0, _size.getWidth)(this._toolbar.$element());
      (0, _renderer.default)(overflowItems).removeClass(TOOLBAR_HIDDEN_ITEM);
      var itemsWidth = this._getItemsWidth();
      while (overflowItems.length && elementWidth < itemsWidth) {
        var $item = overflowItems.eq(-1);
        itemsWidth -= (0, _size.getOuterWidth)($item);
        $item.addClass(TOOLBAR_HIDDEN_ITEM);
        overflowItems.splice(-1, 1);
      }
    };
    _proto._getItemsWidth = function _getItemsWidth() {
      return this._toolbar._getSummaryItemsWidth([this._toolbar._$beforeSection, this._toolbar._$centerSection, this._toolbar._$afterSection]);
    };
    _proto._itemOptionChanged = function _itemOptionChanged(item, property, value) {
      if (this._toolbar._isMenuItem(item)) {
        if (property === 'disabled' || property === 'options.disabled') {
          var _this$_menu;
          (_this$_menu = this._menu) === null || _this$_menu === void 0 ? void 0 : _this$_menu._itemOptionChanged(item, property, value);
          return;
        }
      }
      this.renderMenuItems();
    };
    _proto._renderItem = function _renderItem(item, itemElement) {
      if (item.locateInMenu === 'auto') {
        itemElement.addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
      }
    };
    _proto._optionChanged = function _optionChanged(name, value) {
      var _this$_menu2, _this$_menu3, _this$_menu4, _this$_menu5, _this$_menu6;
      switch (name) {
        case 'disabled':
          (_this$_menu2 = this._menu) === null || _this$_menu2 === void 0 ? void 0 : _this$_menu2.option(name, value);
          break;
        case 'overflowMenuVisible':
          (_this$_menu3 = this._menu) === null || _this$_menu3 === void 0 ? void 0 : _this$_menu3.option('opened', value);
          break;
        case 'onItemClick':
          (_this$_menu4 = this._menu) === null || _this$_menu4 === void 0 ? void 0 : _this$_menu4.option(name, value);
          break;
        case 'menuContainer':
          (_this$_menu5 = this._menu) === null || _this$_menu5 === void 0 ? void 0 : _this$_menu5.option('container', value);
          break;
        case 'menuItemTemplate':
          (_this$_menu6 = this._menu) === null || _this$_menu6 === void 0 ? void 0 : _this$_menu6.option('itemTemplate', value);
          break;
      }
    };
    return SingleLineStrategy;
  }();
  exports.SingleLineStrategy = SingleLineStrategy;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/size","../../../core/renderer","../../../core/utils/iterator","../../../core/utils/common","../../../core/utils/extend","../internal/ui.toolbar.menu","../../../core/utils/data"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/size"), require("../../../core/renderer"), require("../../../core/utils/iterator"), require("../../../core/utils/common"), require("../../../core/utils/extend"), require("../internal/ui.toolbar.menu"), require("../../../core/utils/data"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=toolbar.singleline.js.map