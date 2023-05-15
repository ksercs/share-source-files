/**
* DevExtreme (cjs/localization/open_xml_currency_format.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _default = function _default(currencySymbol, accountingFormat) {
  if (!accountingFormat) {
    return;
  }
  var encodedCurrencySymbol = currencySymbol;
  if (typeof currencySymbol === 'string') {
    encodedCurrencySymbol = '';
    for (var i = 0; i < currencySymbol.length; i++) {
      if (currencySymbol[i] !== '$') {
        encodedCurrencySymbol += '\\';
      }
      encodedCurrencySymbol += currencySymbol[i];
    }
  }
  var encodeSymbols = {
    '.00': '{0}',
    '\'': '\\\'',
    '\\(': '\\(',
    '\\)': '\\)',
    ' ': '\\ ',
    '"': '&quot;',
    '\\¤': encodedCurrencySymbol
  };
  var result = accountingFormat.split(';');
  for (var _i = 0; _i < result.length; _i++) {
    for (var symbol in encodeSymbols) {
      if (Object.prototype.hasOwnProperty.call(encodeSymbols, symbol)) {
        result[_i] = result[_i].replace(new RegExp(symbol, 'g'), encodeSymbols[symbol]);
      }
    }
  }
  return result.length === 2 ? result[0] + '_);' + result[1] : result[0];
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
