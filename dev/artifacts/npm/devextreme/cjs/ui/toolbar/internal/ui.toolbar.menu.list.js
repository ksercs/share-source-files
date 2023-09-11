/**
* DevExtreme (cjs/ui/toolbar/internal/ui.toolbar.menu.list.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _iterator = require("../../../core/utils/iterator");
var _uiList = require("../../list/ui.list.base");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var TOOLBAR_MENU_ACTION_CLASS = 'dx-toolbar-menu-action';
var TOOLBAR_HIDDEN_BUTTON_CLASS = 'dx-toolbar-hidden-button';
var TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS = 'dx-toolbar-hidden-button-group';
var TOOLBAR_MENU_SECTION_CLASS = 'dx-toolbar-menu-section';
var TOOLBAR_MENU_CUSTOM_CLASS = 'dx-toolbar-menu-custom';
var TOOLBAR_MENU_LAST_SECTION_CLASS = 'dx-toolbar-menu-last-section';
var SCROLLVIEW_CONTENT_CLASS = 'dx-scrollview-content';
var ToolbarMenuList = /*#__PURE__*/function (_ListBase) {
  _inheritsLoose(ToolbarMenuList, _ListBase);
  function ToolbarMenuList() {
    return _ListBase.apply(this, arguments) || this;
  }
  var _proto = ToolbarMenuList.prototype;
  _proto._init = function _init() {
    _ListBase.prototype._init.call(this);
    this._activeStateUnit = ".".concat(TOOLBAR_MENU_ACTION_CLASS, ":not(.").concat(TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS, ")");
  };
  _proto._initMarkup = function _initMarkup() {
    this._renderSections();
    _ListBase.prototype._initMarkup.call(this);
    this._setMenuRole();
  };
  _proto._getSections = function _getSections() {
    return this._itemContainer().children();
  };
  _proto._itemElements = function _itemElements() {
    return this._getSections().children(this._itemSelector());
  };
  _proto._renderSections = function _renderSections() {
    var _this = this;
    var $container = this._itemContainer();
    (0, _iterator.each)(['before', 'center', 'after', 'menu'], function (_, section) {
      var sectionName = "_$".concat(section, "Section");
      if (!_this[sectionName]) {
        _this[sectionName] = (0, _renderer.default)('<div>').addClass(TOOLBAR_MENU_SECTION_CLASS);
      }
      _this[sectionName].appendTo($container);
    });
  };
  _proto._renderItems = function _renderItems() {
    _ListBase.prototype._renderItems.apply(this, arguments);
    this._updateSections();
  };
  _proto._setMenuRole = function _setMenuRole() {
    var $menuContainer = this.$element().find(".".concat(SCROLLVIEW_CONTENT_CLASS));
    $menuContainer.attr('role', 'menu');
  };
  _proto._updateSections = function _updateSections() {
    var $sections = this.$element().find(".".concat(TOOLBAR_MENU_SECTION_CLASS));
    $sections.removeClass(TOOLBAR_MENU_LAST_SECTION_CLASS);
    $sections.not(':empty').eq(-1).addClass(TOOLBAR_MENU_LAST_SECTION_CLASS);
  };
  _proto._renderItem = function _renderItem(index, item, itemContainer, $after) {
    var _item$location;
    var location = (_item$location = item.location) !== null && _item$location !== void 0 ? _item$location : 'menu';
    var $container = this["_$".concat(location, "Section")];
    var itemElement = _ListBase.prototype._renderItem.call(this, index, item, $container, $after);
    if (this._getItemTemplateName({
      itemData: item
    })) {
      itemElement.addClass(TOOLBAR_MENU_CUSTOM_CLASS);
    }
    if (location === 'menu' || item.widget === 'dxButton' || item.widget === 'dxButtonGroup' || item.isAction) {
      itemElement.addClass(TOOLBAR_MENU_ACTION_CLASS);
    }
    if (item.widget === 'dxButton') {
      itemElement.addClass(TOOLBAR_HIDDEN_BUTTON_CLASS);
    }
    if (item.widget === 'dxButtonGroup') {
      itemElement.addClass(TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS);
    }
    itemElement.addClass(item.cssClass);
    return itemElement;
  };
  _proto._getItemTemplateName = function _getItemTemplateName(args) {
    var template = _ListBase.prototype._getItemTemplateName.call(this, args);
    var data = args.itemData;
    var menuTemplate = data && data['menuItemTemplate'];
    return menuTemplate || template;
  };
  _proto._dataSourceOptions = function _dataSourceOptions() {
    return {
      paginate: false
    };
  };
  _proto._itemClickHandler = function _itemClickHandler(e, args, config) {
    if ((0, _renderer.default)(e.target).closest(".".concat(TOOLBAR_MENU_ACTION_CLASS)).length) {
      _ListBase.prototype._itemClickHandler.call(this, e, args, config);
    }
  };
  _proto._clean = function _clean() {
    this._getSections().empty();
    _ListBase.prototype._clean.call(this);
  };
  return ToolbarMenuList;
}(_uiList.ListBase);
exports.default = ToolbarMenuList;
module.exports = exports.default;
module.exports.default = exports.default;
