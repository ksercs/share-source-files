/**
* DevExtreme (cjs/__internal/ui/tabs/item.js)
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
var _item = _interopRequireDefault(require("../../ui/collection/item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TABS_ITEM_BADGE_CLASS = 'dx-tabs-item-badge';
const BADGE_CLASS = 'dx-badge';
class TabsItem extends _item.default {
  _renderWatchers() {
    super._renderWatchers();
    this._startWatcher('badge', this._renderBadge.bind(this));
  }
  _renderBadge(badge) {
    this._$element.children(`.${BADGE_CLASS}`).remove();
    if (!badge) {
      return;
    }
    const $badge = (0, _renderer.default)('<div>').addClass(TABS_ITEM_BADGE_CLASS).addClass(BADGE_CLASS).text(badge);
    this._$element.append($badge);
  }
}
var _default = exports.default = TabsItem;
