/**
* DevExtreme (cjs/ui/tabs/item.js)
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
var TABS_ITEM_BADGE_CLASS = 'dx-tabs-item-badge';
var BADGE_CLASS = 'dx-badge';
var TabsItem = _item.default.inherit({
  _renderWatchers: function _renderWatchers() {
    this.callBase();
    this._startWatcher('badge', this._renderBadge.bind(this));
  },
  _renderBadge: function _renderBadge(badge) {
    this._$element.children('.' + BADGE_CLASS).remove();
    if (!badge) {
      return;
    }
    var $badge = (0, _renderer.default)('<div>').addClass(TABS_ITEM_BADGE_CLASS).addClass(BADGE_CLASS).text(badge);
    this._$element.append($badge);
  }
});
var _default = TabsItem;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
