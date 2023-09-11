/**
* DevExtreme (esm/core/config.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* global DevExpress */

import { extend } from './utils/extend';
import errors from './errors';
var config = {
  rtlEnabled: false,
  defaultCurrency: 'USD',
  defaultUseCurrencyAccountingStyle: true,
  oDataFilterToLower: true,
  serverDecimalSeparator: '.',
  decimalSeparator: '.',
  thousandsSeparator: ',',
  forceIsoDateParsing: true,
  wrapActionsBeforeExecute: true,
  useLegacyStoreResult: false,
  /**
  * @name GlobalConfig.useJQuery
  * @type boolean
  * @hidden
  */
  useJQuery: undefined,
  editorStylingMode: undefined,
  useLegacyVisibleIndex: false,
  floatingActionButtonConfig: {
    icon: 'add',
    closeIcon: 'close',
    label: '',
    position: {
      at: 'right bottom',
      my: 'right bottom',
      offset: {
        x: -16,
        y: -16
      }
    },
    maxSpeedDialActionCount: 5,
    shading: false,
    direction: 'auto'
  },
  optionsParser: optionsString => {
    if (optionsString.trim().charAt(0) !== '{') {
      optionsString = '{' + optionsString + '}';
    }
    try {
      return JSON.parse(optionsString);
    } catch (ex) {
      try {
        return JSON.parse(normalizeToJSONString(optionsString));
      } catch (exNormalize) {
        throw errors.Error('E3018', ex, optionsString);
      }
    }
  }
};
var normalizeToJSONString = optionsString => {
  return optionsString.replace(/'/g, '"') // replace all ' to "
  .replace(/,\s*([\]}])/g, '$1') // remove trailing commas
  .replace(/([{,])\s*([^":\s]+)\s*:/g, '$1"$2":'); // add quotes for unquoted keys
};

var deprecatedFields = ['decimalSeparator', 'thousandsSeparator'];
var configMethod = function configMethod() {
  if (!arguments.length) {
    return config;
  }
  var newConfig = arguments.length <= 0 ? undefined : arguments[0];
  deprecatedFields.forEach(deprecatedField => {
    if (newConfig[deprecatedField]) {
      var message = "Now, the ".concat(deprecatedField, " is selected based on the specified locale.");
      errors.log('W0003', 'config', deprecatedField, '19.2', message);
    }
  });
  extend(config, newConfig);
};
if (typeof DevExpress !== 'undefined' && DevExpress.config) {
  configMethod(DevExpress.config);
}
export default configMethod;
