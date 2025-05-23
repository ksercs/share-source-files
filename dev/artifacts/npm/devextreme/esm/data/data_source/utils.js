/**
* DevExtreme (esm/data/data_source/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["items"];
import ajaxUtils from '../../core/utils/ajax';
import Store from '../abstract_store';
import ArrayStore from '../array_store';
import { each, map } from '../../core/utils/iterator';
import CustomStore from '../custom_store';
import { extend } from '../../core/utils/extend';
import { isPlainObject } from '../../core/utils/type';
import { normalizeSortingInfo } from '../utils';
export var CANCELED_TOKEN = 'canceled';
export var isPending = deferred => deferred.state() === 'pending';
export var normalizeStoreLoadOptionAccessorArguments = originalArguments => {
  switch (originalArguments.length) {
    case 0:
      return undefined;
    case 1:
      return originalArguments[0];
  }
  return [].slice.call(originalArguments);
};
var mapGroup = (group, level, mapper) => map(group, item => {
  var restItem = _objectWithoutPropertiesLoose(item, _excluded);
  return _extends({}, restItem, {
    items: mapRecursive(item.items, level - 1, mapper)
  });
});
var mapRecursive = (items, level, mapper) => {
  if (!Array.isArray(items)) return items;
  return level ? mapGroup(items, level, mapper) : map(items, mapper);
};
export var mapDataRespectingGrouping = (items, mapper, groupInfo) => {
  var level = groupInfo ? normalizeSortingInfo(groupInfo).length : 0;
  return mapRecursive(items, level, mapper);
};
export var normalizeLoadResult = (data, extra) => {
  var _data;
  if ((_data = data) !== null && _data !== void 0 && _data.data) {
    extra = data;
    data = data.data;
  }
  if (!Array.isArray(data)) {
    data = [data];
  }
  return {
    data,
    extra
  };
};
var createCustomStoreFromLoadFunc = options => {
  var storeConfig = {};
  each(['useDefaultSearch', 'key', 'load', 'loadMode', 'cacheRawData', 'byKey', 'lookup', 'totalCount', 'insert', 'update', 'remove'], function () {
    storeConfig[this] = options[this];
    delete options[this];
  });
  return new CustomStore(storeConfig);
};
var createStoreFromConfig = storeConfig => {
  var alias = storeConfig.type;
  delete storeConfig.type;
  return Store.create(alias, storeConfig);
};
var createCustomStoreFromUrl = (url, normalizationOptions) => new CustomStore({
  load: () => ajaxUtils.sendRequest({
    url,
    dataType: 'json'
  }),
  loadMode: normalizationOptions === null || normalizationOptions === void 0 ? void 0 : normalizationOptions.fromUrlLoadMode
});
export var normalizeDataSourceOptions = (options, normalizationOptions) => {
  var store;
  if (typeof options === 'string') {
    options = {
      paginate: false,
      store: createCustomStoreFromUrl(options, normalizationOptions)
    };
  }
  if (options === undefined) {
    options = [];
  }
  if (Array.isArray(options) || options instanceof Store) {
    options = {
      store: options
    };
  } else {
    options = extend({}, options);
  }
  if (options.store === undefined) {
    options.store = [];
  }
  store = options.store;
  if ('load' in options) {
    store = createCustomStoreFromLoadFunc(options);
  } else if (Array.isArray(store)) {
    store = new ArrayStore(store);
  } else if (isPlainObject(store)) {
    store = createStoreFromConfig(extend({}, store));
  }
  options.store = store;
  return options;
};
