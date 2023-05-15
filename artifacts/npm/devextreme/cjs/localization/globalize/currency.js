/**
* DevExtreme (cjs/localization/globalize/currency.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _open_xml_currency_format = _interopRequireDefault(require("../open_xml_currency_format"));
require("./core");
require("./number");
require("../currency");
require("globalize/currency");
var _globalize = _interopRequireDefault(require("globalize"));
var _config = _interopRequireDefault(require("../../core/config"));
var _number2 = _interopRequireDefault(require("../number"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var CURRENCY_STYLES = ['symbol', 'accounting'];
if (_globalize.default && _globalize.default.formatCurrency) {
  if (_globalize.default.locale().locale === 'en') {
    _globalize.default.locale('en');
  }
  var formattersCache = {};
  var getFormatter = function getFormatter(currency, format) {
    var formatter;
    var formatCacheKey;
    if (_typeof(format) === 'object') {
      formatCacheKey = _globalize.default.locale().locale + ':' + currency + ':' + JSON.stringify(format);
    } else {
      formatCacheKey = _globalize.default.locale().locale + ':' + currency + ':' + format;
    }
    formatter = formattersCache[formatCacheKey];
    if (!formatter) {
      formatter = formattersCache[formatCacheKey] = _globalize.default.currencyFormatter(currency, format);
    }
    return formatter;
  };
  var globalizeCurrencyLocalization = {
    _formatNumberCore: function _formatNumberCore(value, format, formatConfig) {
      if (format === 'currency') {
        var currency = formatConfig && formatConfig.currency || (0, _config.default)().defaultCurrency;
        return getFormatter(currency, this._normalizeFormatConfig(format, formatConfig, value))(value);
      }
      return this.callBase.apply(this, arguments);
    },
    _normalizeFormatConfig: function _normalizeFormatConfig(format, formatConfig, value) {
      var normalizedConfig = this.callBase(format, formatConfig, value);
      if (format === 'currency') {
        var _formatConfig$useCurr;
        var useAccountingStyle = (_formatConfig$useCurr = formatConfig.useCurrencyAccountingStyle) !== null && _formatConfig$useCurr !== void 0 ? _formatConfig$useCurr : (0, _config.default)().defaultUseCurrencyAccountingStyle;
        normalizedConfig.style = CURRENCY_STYLES[+useAccountingStyle];
      }
      return normalizedConfig;
    },
    format: function format(value, _format) {
      if (typeof value !== 'number') {
        return value;
      }
      _format = this._normalizeFormat(_format);
      if (_format) {
        if (_format.currency === 'default') {
          _format.currency = (0, _config.default)().defaultCurrency;
        }
        if (_format.type === 'currency') {
          return this._formatNumber(value, this._parseNumberFormatString('currency'), _format);
        } else if (!_format.type && _format.currency) {
          return getFormatter(_format.currency, _format)(value);
        }
      }
      return this.callBase.apply(this, arguments);
    },
    getCurrencySymbol: function getCurrencySymbol(currency) {
      if (!currency) {
        currency = (0, _config.default)().defaultCurrency;
      }
      return _globalize.default.cldr.main('numbers/currencies/' + currency);
    },
    getOpenXmlCurrencyFormat: function getOpenXmlCurrencyFormat(currency) {
      var currencySymbol = this.getCurrencySymbol(currency).symbol;
      var accountingFormat = _globalize.default.cldr.main('numbers/currencyFormats-numberSystem-latn').accounting;
      return (0, _open_xml_currency_format.default)(currencySymbol, accountingFormat);
    }
  };
  _number2.default.inject(globalizeCurrencyLocalization);
}
