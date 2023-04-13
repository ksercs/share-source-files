/**
* DevExtreme (cjs/ui/toolbar/ui.toolbar.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _extend = require("../../core/utils/extend");
var _uiToolbar = _interopRequireDefault(require("./ui.toolbar.base"));
var _uiToolbar2 = require("./ui.toolbar.utils");
var _toolbar = require("./strategy/toolbar.multiline");
var _toolbar2 = require("./strategy/toolbar.singleline");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
// STYLE toolbar

var TOOLBAR_MULTILINE_CLASS = 'dx-toolbar-multiline';
var TOOLBAR_AUTO_HIDE_TEXT_CLASS = 'dx-toolbar-text-auto-hide';
var Toolbar = /*#__PURE__*/function (_ToolbarBase) {
  _inheritsLoose(Toolbar, _ToolbarBase);
  function Toolbar() {
    return _ToolbarBase.apply(this, arguments) || this;
  }
  var _proto = Toolbar.prototype;
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_ToolbarBase.prototype._getDefaultOptions.call(this), {
      menuItemTemplate: 'menuItem',
      menuContainer: undefined,
      overflowMenuVisible: false,
      multiline: false

      /**
      * @name dxToolbarOptions.selectedIndex
      * @type number
      * @default -1
      * @hidden
      */

      /**
      * @name dxToolbarOptions.activeStateEnabled
      * @hidden
      */

      /**
      * @name dxToolbarOptions.focusStateEnabled
      * @hidden
      */

      /**
      * @name dxToolbarOptions.accessKey
      * @hidden
      */

      /**
      * @name dxToolbarOptions.tabIndex
      * @hidden
      */

      /**
      * @name dxToolbarOptions.selectedItems
      * @hidden
      */

      /**
      * @name dxToolbarOptions.selectedItemKeys
      * @hidden
      */

      /**
      * @name dxToolbarOptions.keyExpr
      * @hidden
      */

      /**
      * @name dxToolbarOptions.selectedItem
      * @hidden
      */

      /**
      * @name dxToolbarOptions.height
      * @hidden
      */

      /**
      * @name dxToolbarOptions.onSelectionChanged
      * @action
      * @hidden
      */
    });
  };
  _proto._isMultiline = function _isMultiline() {
    return this.option('multiline');
  };
  _proto._dimensionChanged = function _dimensionChanged(dimension) {
    if (dimension === 'height') {
      return;
    }
    _ToolbarBase.prototype._dimensionChanged.call(this);
    this._layoutStrategy._dimensionChanged();
  };
  _proto._initMarkup = function _initMarkup() {
    _ToolbarBase.prototype._initMarkup.call(this);
    this._updateFocusableItemsTabIndex();
    this._layoutStrategy._initMarkup();
  };
  _proto._renderToolbar = function _renderToolbar() {
    _ToolbarBase.prototype._renderToolbar.call(this);
    this._renderLayoutStrategy();
  };
  _proto._itemContainer = function _itemContainer() {
    if (this._isMultiline()) {
      return this._$toolbarItemsContainer;
    }
    return _ToolbarBase.prototype._itemContainer.call(this);
  };
  _proto._renderLayoutStrategy = function _renderLayoutStrategy() {
    this.$element().toggleClass(TOOLBAR_MULTILINE_CLASS, this._isMultiline());
    this._layoutStrategy = this._isMultiline() ? new _toolbar.MultiLineStrategy(this) : new _toolbar2.SingleLineStrategy(this);
  };
  _proto._renderSections = function _renderSections() {
    if (this._isMultiline()) {
      return;
    }
    return _ToolbarBase.prototype._renderSections.call(this);
  };
  _proto._postProcessRenderItems = function _postProcessRenderItems() {
    this._layoutStrategy._hideOverflowItems();
    this._layoutStrategy._updateMenuVisibility();
    _ToolbarBase.prototype._postProcessRenderItems.call(this);
    this._layoutStrategy._renderMenuItems();
  };
  _proto._renderItem = function _renderItem(index, item, itemContainer, $after) {
    var itemElement = _ToolbarBase.prototype._renderItem.call(this, index, item, itemContainer, $after);
    this._layoutStrategy._renderItem(item, itemElement);
    var widget = item.widget,
      showText = item.showText;
    if (widget === 'dxButton' && showText === 'inMenu') {
      itemElement.toggleClass(TOOLBAR_AUTO_HIDE_TEXT_CLASS);
    }
    return itemElement;
  }

  // for filemanager
  ;
  _proto._getItemsWidth = function _getItemsWidth() {
    return this._layoutStrategy._getItemsWidth();
  }

  // for filemanager
  ;
  _proto._getMenuItems = function _getMenuItems() {
    return this._layoutStrategy._getMenuItems();
  };
  _proto._getToolbarItems = function _getToolbarItems() {
    return this._layoutStrategy._getToolbarItems();
  };
  _proto._arrangeItems = function _arrangeItems() {
    if (this.$element().is(':hidden')) {
      return;
    }
    var elementWidth = this._layoutStrategy._arrangeItems();
    if (!this._isMultiline()) {
      _ToolbarBase.prototype._arrangeItems.call(this, elementWidth);
    }
  };
  _proto._itemOptionChanged = function _itemOptionChanged(item, property, value) {
    this._layoutStrategy._itemOptionChanged(item, property, value);
    if (!this._isMenuItem(item)) {
      _ToolbarBase.prototype._itemOptionChanged.call(this, item, property, value);
    }
    if (property === 'disabled' || property === 'options.disabled') {
      (0, _uiToolbar2.toggleItemFocusableElementTabIndex)(this, item);
    }
    if (property === 'location') {
      this.repaint();
    }
  };
  _proto._updateFocusableItemsTabIndex = function _updateFocusableItemsTabIndex() {
    var _this = this;
    this._getToolbarItems().forEach(function (item) {
      return (0, _uiToolbar2.toggleItemFocusableElementTabIndex)(_this, item);
    });
  };
  _proto._isMenuItem = function _isMenuItem(itemData) {
    return itemData.location === 'menu' || itemData.locateInMenu === 'always';
  };
  _proto._isToolbarItem = function _isToolbarItem(itemData) {
    return itemData.location === undefined || itemData.locateInMenu === 'never';
  };
  _proto._optionChanged = function _optionChanged(_ref) {
    var name = _ref.name,
      value = _ref.value;
    this._layoutStrategy._optionChanged(name, value);
    switch (name) {
      case 'menuContainer':
      case 'menuItemTemplate':
      case 'overflowMenuVisible':
        break;
      case 'multiline':
        this._invalidate();
        break;
      case 'disabled':
        _ToolbarBase.prototype._optionChanged.apply(this, arguments);
        this._updateFocusableItemsTabIndex();
        break;
      default:
        _ToolbarBase.prototype._optionChanged.apply(this, arguments);
    }
  }

  /**
   * @name dxToolbar.registerKeyHandler
   * @publicName registerKeyHandler(key, handler)
   * @hidden
  */

  /**
   * @name dxToolbar.focus
   * @publicName focus()
   * @hidden
  */

  // it is not public
  ;
  _proto.updateDimensions = function updateDimensions() {
    this._dimensionChanged();
  };
  return Toolbar;
}(_uiToolbar.default);
(0, _component_registrator.default)('dxToolbar', Toolbar);
var _default = Toolbar;
/**
 * @name dxToolbarItem
 * @inherits CollectionWidgetItem
 * @type object
 */
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
