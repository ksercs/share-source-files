import dateSerialization from '../../../../core/utils/date_serialization';
import { isDate, isFunction } from '../../../../core/utils/type';
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