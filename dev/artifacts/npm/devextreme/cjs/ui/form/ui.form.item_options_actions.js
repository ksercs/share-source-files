/**
* DevExtreme (cjs/ui/form/ui.form.item_options_actions.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _uiForm = _interopRequireDefault(require("./ui.form.item_option_action"));
var _element_data = require("../../core/element_data");
var _extend = require("../../core/utils/extend");
var _uiForm2 = require("./ui.form.utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var WidgetOptionItemOptionAction = /*#__PURE__*/function (_ItemOptionAction) {
  _inheritsLoose(WidgetOptionItemOptionAction, _ItemOptionAction);
  function WidgetOptionItemOptionAction() {
    return _ItemOptionAction.apply(this, arguments) || this;
  }
  var _proto = WidgetOptionItemOptionAction.prototype;
  _proto.tryExecute = function tryExecute() {
    var value = this._options.value;
    var instance = this.findInstance();
    if (instance) {
      instance.option(value);
      return true;
    }
    return false;
  };
  return WidgetOptionItemOptionAction;
}(_uiForm.default);
var TabOptionItemOptionAction = /*#__PURE__*/function (_ItemOptionAction2) {
  _inheritsLoose(TabOptionItemOptionAction, _ItemOptionAction2);
  function TabOptionItemOptionAction() {
    return _ItemOptionAction2.apply(this, arguments) || this;
  }
  var _proto2 = TabOptionItemOptionAction.prototype;
  _proto2.tryExecute = function tryExecute() {
    var tabPanel = this.findInstance();
    if (tabPanel) {
      var _this$_options = this._options,
        optionName = _this$_options.optionName,
        item = _this$_options.item,
        value = _this$_options.value;
      var itemIndex = this._itemsRunTimeInfo.findItemIndexByItem(item);
      if (itemIndex >= 0) {
        tabPanel.option((0, _uiForm2.getFullOptionName)("items[".concat(itemIndex, "]"), optionName), value);
        return true;
      }
    }
    return false;
  };
  return TabOptionItemOptionAction;
}(_uiForm.default);
var SimpleItemTemplateChangedAction = /*#__PURE__*/function (_ItemOptionAction3) {
  _inheritsLoose(SimpleItemTemplateChangedAction, _ItemOptionAction3);
  function SimpleItemTemplateChangedAction() {
    return _ItemOptionAction3.apply(this, arguments) || this;
  }
  var _proto3 = SimpleItemTemplateChangedAction.prototype;
  _proto3.tryExecute = function tryExecute() {
    return false;
  };
  return SimpleItemTemplateChangedAction;
}(_uiForm.default);
var GroupItemTemplateChangedAction = /*#__PURE__*/function (_ItemOptionAction4) {
  _inheritsLoose(GroupItemTemplateChangedAction, _ItemOptionAction4);
  function GroupItemTemplateChangedAction() {
    return _ItemOptionAction4.apply(this, arguments) || this;
  }
  var _proto4 = GroupItemTemplateChangedAction.prototype;
  _proto4.tryExecute = function tryExecute() {
    var preparedItem = this.findPreparedItem();
    if (preparedItem != null && preparedItem._prepareGroupItemTemplate && preparedItem._renderGroupContentTemplate) {
      preparedItem._prepareGroupItemTemplate(this._options.item.template);
      preparedItem._renderGroupContentTemplate();
      return true;
    }
    return false;
  };
  return GroupItemTemplateChangedAction;
}(_uiForm.default);
var TabsOptionItemOptionAction = /*#__PURE__*/function (_ItemOptionAction5) {
  _inheritsLoose(TabsOptionItemOptionAction, _ItemOptionAction5);
  function TabsOptionItemOptionAction() {
    return _ItemOptionAction5.apply(this, arguments) || this;
  }
  var _proto5 = TabsOptionItemOptionAction.prototype;
  _proto5.tryExecute = function tryExecute() {
    var tabPanel = this.findInstance();
    if (tabPanel) {
      var value = this._options.value;
      tabPanel.option('dataSource', value);
      return true;
    }
    return false;
  };
  return TabsOptionItemOptionAction;
}(_uiForm.default);
var ValidationRulesItemOptionAction = /*#__PURE__*/function (_ItemOptionAction6) {
  _inheritsLoose(ValidationRulesItemOptionAction, _ItemOptionAction6);
  function ValidationRulesItemOptionAction() {
    return _ItemOptionAction6.apply(this, arguments) || this;
  }
  var _proto6 = ValidationRulesItemOptionAction.prototype;
  _proto6.tryExecute = function tryExecute() {
    var item = this._options.item;
    var instance = this.findInstance();
    var validator = instance && (0, _element_data.data)(instance.$element()[0], 'dxValidator');
    if (validator && item) {
      var filterRequired = function filterRequired(item) {
        return item.type === 'required';
      };
      var oldContainsRequired = (validator.option('validationRules') || []).some(filterRequired);
      var newContainsRequired = (item.validationRules || []).some(filterRequired);
      if (!oldContainsRequired && !newContainsRequired || oldContainsRequired && newContainsRequired) {
        validator.option('validationRules', item.validationRules);
        return true;
      }
    }
    return false;
  };
  return ValidationRulesItemOptionAction;
}(_uiForm.default);
var CssClassItemOptionAction = /*#__PURE__*/function (_ItemOptionAction7) {
  _inheritsLoose(CssClassItemOptionAction, _ItemOptionAction7);
  function CssClassItemOptionAction() {
    return _ItemOptionAction7.apply(this, arguments) || this;
  }
  var _proto7 = CssClassItemOptionAction.prototype;
  _proto7.tryExecute = function tryExecute() {
    var $itemContainer = this.findItemContainer();
    var _this$_options2 = this._options,
      previousValue = _this$_options2.previousValue,
      value = _this$_options2.value;
    if ($itemContainer) {
      $itemContainer.removeClass(previousValue).addClass(value);
      return true;
    }
    return false;
  };
  return CssClassItemOptionAction;
}(_uiForm.default);
var tryCreateItemOptionAction = function tryCreateItemOptionAction(optionName, itemActionOptions) {
  switch (optionName) {
    case 'editorOptions': // SimpleItem/#editorOptions
    case 'buttonOptions':
      // ButtonItem/#buttonOptions
      return new WidgetOptionItemOptionAction(itemActionOptions);
    case 'validationRules':
      // SimpleItem/#validationRules
      return new ValidationRulesItemOptionAction(itemActionOptions);
    case 'cssClass':
      // ButtonItem/#cssClass or EmptyItem/#cssClass or GroupItem/#cssClass or SimpleItem/#cssClass or TabbedItem/#cssClass
      return new CssClassItemOptionAction(itemActionOptions);
    case 'badge': // TabbedItem/tabs/#badge
    case 'disabled': // TabbedItem/tabs/#disabled
    case 'icon': // TabbedItem/tabs/#icon
    case 'tabTemplate': // TabbedItem/tabs/#tabTemplate
    case 'title':
      // TabbedItem/tabs/#title
      return new TabOptionItemOptionAction((0, _extend.extend)(itemActionOptions, {
        optionName
      }));
    case 'tabs':
      // TabbedItem/tabs
      return new TabsOptionItemOptionAction(itemActionOptions);
    case 'template':
      {
        var _itemActionOptions$it, _itemActionOptions$it2, _itemActionOptions$it3;
        // TabbedItem/tabs/#template or SimpleItem/#template or GroupItem/#template
        var itemType = (_itemActionOptions$it = itemActionOptions === null || itemActionOptions === void 0 ? void 0 : (_itemActionOptions$it2 = itemActionOptions.item) === null || _itemActionOptions$it2 === void 0 ? void 0 : _itemActionOptions$it2.itemType) !== null && _itemActionOptions$it !== void 0 ? _itemActionOptions$it : (_itemActionOptions$it3 = itemActionOptions.itemsRunTimeInfo.findPreparedItemByItem(itemActionOptions === null || itemActionOptions === void 0 ? void 0 : itemActionOptions.item)) === null || _itemActionOptions$it3 === void 0 ? void 0 : _itemActionOptions$it3.itemType;
        if (itemType === 'simple') {
          return new SimpleItemTemplateChangedAction(itemActionOptions);
        } else if (itemType === 'group') {
          return new GroupItemTemplateChangedAction(itemActionOptions);
        }
        return new TabOptionItemOptionAction((0, _extend.extend)(itemActionOptions, {
          optionName
        }));
      }
    default:
      return null;
  }
};
var _default = tryCreateItemOptionAction;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
