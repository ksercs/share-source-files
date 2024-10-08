/**
* DevExtreme (cjs/viz/series/helpers/display_format_parser.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.processDisplayFormat = processDisplayFormat;
var _localization = require("../../../localization");
var startPlaceHolderChar = '{';
var endPlaceHolderChar = '}';
var placeholderFormatDelimiter = ':';
function formatValue(value, format) {
  if (format) {
    if (value instanceof Date) {
      return (0, _localization.formatDate)(value, format);
    }
    if (typeof value === 'number') {
      return (0, _localization.formatNumber)(value, format);
    }
  }
  return value;
}
function getValueByPlaceHolder(placeHolder, pointInfo) {
  var customFormat = '';
  var customFormatIndex = placeHolder.indexOf(placeholderFormatDelimiter);
  if (customFormatIndex > 0) {
    customFormat = placeHolder.substr(customFormatIndex + 1);
    placeHolder = placeHolder.substr(0, customFormatIndex);
  }
  return formatValue(pointInfo[placeHolder], customFormat);
}
function processDisplayFormat(displayFormat, pointInfo) {
  var actualText = displayFormat;
  var continueProcess = true;
  while (continueProcess) {
    var startBracketIndex = actualText.indexOf(startPlaceHolderChar);
    var endBracketIndex = actualText.indexOf(endPlaceHolderChar);
    if (startBracketIndex >= 0 && endBracketIndex > 0) {
      var placeHolder = actualText.substring(startBracketIndex + 1, endBracketIndex);
      var value = getValueByPlaceHolder(placeHolder, pointInfo);
      actualText = actualText.substr(0, startBracketIndex) + value + actualText.substr(endBracketIndex + 1);
    } else {
      continueProcess = false;
    }
  }
  return actualText;
}
