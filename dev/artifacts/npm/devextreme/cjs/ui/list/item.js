/**
* DevExtreme (cjs/ui/list/item.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _item = _interopRequireDefault(require("../collection/item"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var LIST_ITEM_BADGE_CONTAINER_CLASS = 'dx-list-item-badge-container';
var LIST_ITEM_BADGE_CLASS = 'dx-list-item-badge';
var BADGE_CLASS = 'dx-badge';
var LIST_ITEM_CHEVRON_CONTAINER_CLASS = 'dx-list-item-chevron-container';
var LIST_ITEM_CHEVRON_CLASS = 'dx-list-item-chevron';
var ListItem = _item.default.inherit({
  _renderWatchers: function _renderWatchers() {
    this.callBase();
    this._startWatcher('badge', this._renderBadge.bind(this));
    this._startWatcher('showChevron', this._renderShowChevron.bind(this));
  },
  _renderBadge: function _renderBadge(badge) {
    this._$element.children('.' + LIST_ITEM_BADGE_CONTAINER_CLASS).remove();
    if (!badge) {
      return;
    }
    var $badge = (0, _renderer.default)('<div>').addClass(LIST_ITEM_BADGE_CONTAINER_CLASS).append((0, _renderer.default)('<div>').addClass(LIST_ITEM_BADGE_CLASS).addClass(BADGE_CLASS).text(badge));
    var $chevron = this._$element.children('.' + LIST_ITEM_CHEVRON_CONTAINER_CLASS).first();
    $chevron.length > 0 ? $badge.insertBefore($chevron) : $badge.appendTo(this._$element);
  },
  _renderShowChevron: function _renderShowChevron(showChevron) {
    this._$element.children('.' + LIST_ITEM_CHEVRON_CONTAINER_CLASS).remove();
    if (!showChevron) {
      return;
    }
    var $chevronContainer = (0, _renderer.default)('<div>').addClass(LIST_ITEM_CHEVRON_CONTAINER_CLASS);
    var $chevron = (0, _renderer.default)('<div>').addClass(LIST_ITEM_CHEVRON_CLASS);
    $chevronContainer.append($chevron).appendTo(this._$element);
  }
});
var _default = ListItem;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
