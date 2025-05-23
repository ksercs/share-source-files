/**
* DevExtreme (esm/ui/form/ui.form.items_runtime_info.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Guid from '../../core/guid';
import { each } from '../../core/utils/iterator';
import { extend } from '../../core/utils/extend';
import { isString } from '../../core/utils/type';
export default class FormItemsRunTimeInfo {
  constructor() {
    this._map = {};
  }
  _findWidgetInstance(condition) {
    var result;
    each(this._map, function (guid, _ref) {
      var {
        widgetInstance,
        item
      } = _ref;
      if (condition(item)) {
        result = widgetInstance;
        return false;
      }
    });
    return result;
  }
  _findFieldByCondition(callback, valueExpr) {
    var result;
    each(this._map, function (key, value) {
      if (callback(value)) {
        result = valueExpr === 'guid' ? key : value[valueExpr];
        return false;
      }
    });
    return result;
  }
  clear() {
    this._map = {};
  }
  removeItemsByItems(itemsRunTimeInfo) {
    each(itemsRunTimeInfo.getItems(), guid => this.removeItemByKey(guid));
  }
  removeItemByKey(key) {
    delete this._map[key];
  }
  add(options) {
    var key = options.guid || new Guid();
    this._map[key] = options;
    return key;
  }
  addItemsOrExtendFrom(itemsRunTimeInfo) {
    itemsRunTimeInfo.each((key, itemRunTimeInfo) => {
      if (this._map[key]) {
        if (itemRunTimeInfo.widgetInstance) {
          this._map[key].widgetInstance = itemRunTimeInfo.widgetInstance;
        }
        this._map[key].$itemContainer = itemRunTimeInfo.$itemContainer;
      } else {
        this.add({
          item: itemRunTimeInfo.item,
          widgetInstance: itemRunTimeInfo.widgetInstance,
          guid: key,
          $itemContainer: itemRunTimeInfo.$itemContainer
        });
      }
    });
  }
  extendRunTimeItemInfoByKey(key, options) {
    if (this._map[key]) {
      this._map[key] = extend(this._map[key], options);
    }
  }
  findWidgetInstanceByItem(item) {
    return this._findWidgetInstance(storedItem => storedItem === item);
  }
  findGroupOrTabLayoutManagerByPath(targetPath) {
    return this._findFieldByCondition(_ref2 => {
      var {
        path
      } = _ref2;
      return path === targetPath;
    }, 'layoutManager');
  }
  findKeyByPath(targetPath) {
    return this._findFieldByCondition(_ref3 => {
      var {
        path
      } = _ref3;
      return path === targetPath;
    }, 'guid');
  }
  findWidgetInstanceByName(name) {
    return this._findWidgetInstance(item => name === item.name);
  }
  findWidgetInstanceByDataField(dataField) {
    return this._findWidgetInstance(item => dataField === (isString(item) ? item : item.dataField));
  }
  findItemContainerByItem(item) {
    for (var key in this._map) {
      if (this._map[key].item === item) {
        return this._map[key].$itemContainer;
      }
    }
    return null;
  }
  findItemIndexByItem(targetItem) {
    return this._findFieldByCondition(_ref4 => {
      var {
        item
      } = _ref4;
      return item === targetItem;
    }, 'itemIndex');
  }
  findPreparedItemByItem(item) {
    return this._findFieldByCondition(_ref5 => {
      var {
        item: currentItem
      } = _ref5;
      return currentItem === item;
    }, 'preparedItem');
  }
  getItems() {
    return this._map;
  }
  each(handler) {
    each(this._map, function (key, itemRunTimeInfo) {
      handler(key, itemRunTimeInfo);
    });
  }
  removeItemsByPathStartWith(path) {
    var keys = Object.keys(this._map);
    var filteredKeys = keys.filter(key => {
      if (this._map[key].path) {
        return this._map[key].path.indexOf(path, 0) > -1;
      }
      return false;
    });
    filteredKeys.forEach(key => this.removeItemByKey(key));
  }
}
