/**
* DevExtreme (esm/localization/default_date_names.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { map } from '../core/utils/iterator';
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var PERIODS = ['AM', 'PM'];
var QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

// TODO: optimize
var cutCaptions = (captions, format) => {
  var lengthByFormat = {
    abbreviated: 3,
    short: 2,
    narrow: 1
  };
  return map(captions, caption => {
    return caption.substr(0, lengthByFormat[format]);
  });
};
export default {
  getMonthNames: function getMonthNames(format) {
    return cutCaptions(MONTHS, format);
  },
  getDayNames: function getDayNames(format) {
    return cutCaptions(DAYS, format);
  },
  getQuarterNames: function getQuarterNames(format) {
    return QUARTERS;
  },
  getPeriodNames: function getPeriodNames(format) {
    return PERIODS;
  }
};
