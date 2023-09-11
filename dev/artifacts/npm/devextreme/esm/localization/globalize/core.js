/**
* DevExtreme (esm/localization/globalize/core.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import Globalize from 'globalize';
import coreLocalization from '../core';
import { enCldr } from '../cldr-data/en';
import { supplementalCldr } from '../cldr-data/supplemental';
if (Globalize && Globalize.load) {
  if (!Globalize.locale()) {
    Globalize.load(enCldr, supplementalCldr);
    Globalize.locale('en');
  }
  coreLocalization.inject({
    locale: function locale(_locale) {
      if (!_locale) {
        return Globalize.locale().locale;
      }
      Globalize.locale(_locale);
    }
  });
}
