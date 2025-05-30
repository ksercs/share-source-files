/**
* DevExtreme (cjs/__internal/ui/context_menu/m_menu_base.edit.strategy.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _iterator = require("../../../core/utils/iterator");
var _m_collection_widgetEditStrategy = _interopRequireDefault(require("../../ui/collection/m_collection_widget.edit.strategy.plain"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MenuBaseEditStrategy extends _m_collection_widgetEditStrategy.default {
  _getPlainItems() {
    return (0, _iterator.map)(this._collectionWidget.option('items'), function getMenuItems(item) {
      return item.items ? [item].concat((0, _iterator.map)(item.items, getMenuItems)) : item;
    });
  }
  _stringifyItem(item) {
    return JSON.stringify(item, (key, value) => {
      if (key === 'template') {
        return this._getTemplateString(value);
      }
      return value;
    });
  }
  _getTemplateString(template) {
    let result;
    if (typeof template === 'object') {
      result = (0, _renderer.default)(template).text();
    } else {
      result = template.toString();
    }
    return result;
  }
}
var _default = exports.default = MenuBaseEditStrategy;
