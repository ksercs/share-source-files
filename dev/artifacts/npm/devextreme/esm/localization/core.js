/**
* DevExtreme (esm/localization/core.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dependencyInjector from '../core/utils/dependency_injector';
import parentLocales from './cldr-data/parent_locales';
import getParentLocale from './parentLocale';
var DEFAULT_LOCALE = 'en';
export default dependencyInjector({
  locale: (() => {
    var currentLocale = DEFAULT_LOCALE;
    return locale => {
      if (!locale) {
        return currentLocale;
      }
      currentLocale = locale;
    };
  })(),
  getValueByClosestLocale: function getValueByClosestLocale(getter) {
    var locale = this.locale();
    var value = getter(locale);
    var isRootLocale;
    while (!value && !isRootLocale) {
      locale = getParentLocale(parentLocales, locale);
      if (locale) {
        value = getter(locale);
      } else {
        isRootLocale = true;
      }
    }
    if (value === undefined && locale !== DEFAULT_LOCALE) {
      return getter(DEFAULT_LOCALE);
    }
    return value;
  }
});
