/**
* DevExtreme (cjs/ui/form/components/empty_item.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.FIELD_EMPTY_ITEM_CLASS = void 0;
exports.renderEmptyItem = renderEmptyItem;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var FIELD_EMPTY_ITEM_CLASS = 'dx-field-empty-item';
exports.FIELD_EMPTY_ITEM_CLASS = FIELD_EMPTY_ITEM_CLASS;
function renderEmptyItem(_ref) {
  var $parent = _ref.$parent,
    rootElementCssClassList = _ref.rootElementCssClassList;
  return (0, _renderer.default)('<div>').addClass(FIELD_EMPTY_ITEM_CLASS).html('&nbsp;').addClass(rootElementCssClassList.join(' ')).appendTo($parent);
}
