/**
* DevExtreme (esm/common/core/localization/globalize/core.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
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
    locale: function (locale) {
      if (!locale) {
        return Globalize.locale().locale;
      }
      Globalize.locale(locale);
    }
  });
}
