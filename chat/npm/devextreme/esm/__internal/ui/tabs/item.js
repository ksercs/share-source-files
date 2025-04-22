/**
* DevExtreme (esm/__internal/ui/tabs/item.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import CollectionItem from '../../ui/collection/item';
const TABS_ITEM_BADGE_CLASS = 'dx-tabs-item-badge';
const BADGE_CLASS = 'dx-badge';
class TabsItem extends CollectionItem {
  _renderWatchers() {
    super._renderWatchers();
    this._startWatcher('badge', this._renderBadge.bind(this));
  }
  _renderBadge(badge) {
    this._$element.children(`.${BADGE_CLASS}`).remove();
    if (!badge) {
      return;
    }
    const $badge = $('<div>').addClass(TABS_ITEM_BADGE_CLASS).addClass(BADGE_CLASS).text(badge);
    this._$element.append($badge);
  }
}
export default TabsItem;
