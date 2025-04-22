/**
* DevExtreme (cjs/__internal/core/m_config.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _errors = _interopRequireDefault(require("../../core/errors"));
var _extend = require("../../core/utils/extend");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* global DevExpress */

const config = {
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
      optionsString = `{${optionsString}}`;
    }
    try {
      return JSON.parse(optionsString);
    } catch (ex) {
      try {
        return JSON.parse(normalizeToJSONString(optionsString));
      } catch (exNormalize) {
        throw _errors.default.Error('E3018', ex, optionsString);
      }
    }
  }
};
const normalizeToJSONString = optionsString => optionsString.replace(/'/g, '"') // replace all ' to "
.replace(/,\s*([\]}])/g, '$1') // remove trailing commas
.replace(/([{,])\s*([^":\s]+)\s*:/g, '$1"$2":'); // add quotes for unquoted keys
const deprecatedFields = ['decimalSeparator', 'thousandsSeparator'];
// @ts-expect-error not all code paths return value
const configMethod = function () {
  if (!arguments.length) {
    return config;
  }
  const newConfig = arguments.length <= 0 ? undefined : arguments[0];
  deprecatedFields.forEach(deprecatedField => {
    if (newConfig[deprecatedField]) {
      const message = `Now, the ${deprecatedField} is selected based on the specified locale.`;
      _errors.default.log('W0003', 'config', deprecatedField, '19.2', message);
    }
  });
  (0, _extend.extend)(config, newConfig);
};
// @ts-expect-error typescript cant see global
if (typeof DevExpress !== 'undefined' && DevExpress.config) {
  // @ts-expect-error typescript cant see global
  configMethod(DevExpress.config);
}
var _default = exports.default = configMethod;
