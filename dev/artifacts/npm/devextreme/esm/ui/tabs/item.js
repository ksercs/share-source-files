/**
* DevExtreme (esm/ui/tabs/item.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import CollectionWidgetItem from '../collection/item';
var TABS_ITEM_BADGE_CLASS = 'dx-tabs-item-badge';
var BADGE_CLASS = 'dx-badge';
var TabsItem = CollectionWidgetItem.inherit({
  _renderWatchers: function _renderWatchers() {
    this.callBase();
    this._startWatcher('badge', this._renderBadge.bind(this));
  },
  _renderBadge: function _renderBadge(badge) {
    this._$element.children('.' + BADGE_CLASS).remove();
    if (!badge) {
      return;
    }
    var $badge = $('<div>').addClass(TABS_ITEM_BADGE_CLASS).addClass(BADGE_CLASS).text(badge);
    this._$element.append($badge);
  }
});
export default TabsItem;
