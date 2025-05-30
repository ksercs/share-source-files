/**
* DevExtreme (cjs/ui/tab_panel/item.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _item = _interopRequireDefault(require("../collection/item"));
var _common = require("../../core/utils/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var TabPanelItem = /*#__PURE__*/function (_CollectionWidgetItem) {
  _inheritsLoose(TabPanelItem, _CollectionWidgetItem);
  function TabPanelItem() {
    return _CollectionWidgetItem.apply(this, arguments) || this;
  }
  var _proto = TabPanelItem.prototype;
  _proto._renderWatchers = function _renderWatchers() {
    this._startWatcher('badge', _common.noop);
    return _CollectionWidgetItem.prototype._renderWatchers.call(this);
  };
  return TabPanelItem;
}(_item.default);
exports.default = TabPanelItem;
module.exports = exports.default;
module.exports.default = exports.default;
