/**
* DevExtreme (esm/__internal/ui/context_menu/m_menu_base.edit.strategy.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { map } from '../../../core/utils/iterator';
import PlainEditStrategy from '../../ui/collection/m_collection_widget.edit.strategy.plain';
class MenuBaseEditStrategy extends PlainEditStrategy {
  _getPlainItems() {
    return map(this._collectionWidget.option('items'), function getMenuItems(item) {
      return item.items ? [item].concat(map(item.items, getMenuItems)) : item;
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
      result = $(template).text();
    } else {
      result = template.toString();
    }
    return result;
  }
}
export default MenuBaseEditStrategy;
