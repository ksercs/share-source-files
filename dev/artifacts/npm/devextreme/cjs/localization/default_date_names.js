/**
* DevExtreme (cjs/localization/default_date_names.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _iterator = require("../core/utils/iterator");
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var PERIODS = ['AM', 'PM'];
var QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

// TODO: optimize
var cutCaptions = function cutCaptions(captions, format) {
  var lengthByFormat = {
    abbreviated: 3,
    short: 2,
    narrow: 1
  };
  return (0, _iterator.map)(captions, function (caption) {
    return caption.substr(0, lengthByFormat[format]);
  });
};
var _default = {
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
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
