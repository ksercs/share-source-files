/**
* DevExtreme (cjs/common/core/localization/parentLocale.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
/* eslint-disable import/no-commonjs */
const PARENT_LOCALE_SEPARATOR = '-';
var _default = (parentLocales, locale) => {
  const parentLocale = parentLocales[locale];
  if (parentLocale) {
    return parentLocale !== 'root' && parentLocale;
  }
  return locale.substr(0, locale.lastIndexOf(PARENT_LOCALE_SEPARATOR));
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
