/**
* DevExtreme (esm/viz/translators/datetime_translator.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../core/utils/date';
function parse(value) {
  return value !== null ? new Date(value) : value;
}
export default {
  fromValue: parse,
  toValue: parse,
  _add: dateUtils.addDateInterval,
  convert: dateUtils.dateToMilliseconds
};
