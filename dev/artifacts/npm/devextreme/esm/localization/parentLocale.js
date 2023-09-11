/**
* DevExtreme (esm/localization/parentLocale.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable import/no-commonjs */
var PARENT_LOCALE_SEPARATOR = '-';
export default ((parentLocales, locale) => {
  var parentLocale = parentLocales[locale];
  if (parentLocale) {
    return parentLocale !== 'root' && parentLocale;
  }
  return locale.substr(0, locale.lastIndexOf(PARENT_LOCALE_SEPARATOR));
});
