/**
* DevExtreme (esm/ui/grid_core/ui.grid_core.focus.utils.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDate, isFunction } from '../../core/utils/type';
import dateSerialization from '../../core/utils/date_serialization';

// TODO Vinogradov: Move it to ts and cover with unit tests.
var getSortFilterValue = (sortInfo, rowData, _ref) => {
  var {
    isRemoteFiltering,
    dateSerializationFormat,
    getSelector
  } = _ref;
  var {
    selector
  } = sortInfo;
  var getter = isFunction(selector) ? selector : getSelector(selector);
  var rawValue = getter ? getter(rowData) : rowData[selector];
  var safeValue = isRemoteFiltering && isDate(rawValue) ? dateSerialization.serializeDate(rawValue, dateSerializationFormat) : rawValue;
  return {
    getter,
    rawValue,
    safeValue
  };
};
export var UiGridCoreFocusUtils = {
  getSortFilterValue
};
