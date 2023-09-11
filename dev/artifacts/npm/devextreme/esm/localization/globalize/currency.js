/**
* DevExtreme (esm/localization/globalize/currency.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import openXmlCurrencyFormat from '../open_xml_currency_format';
import './core';
import './number';
import '../currency';
// eslint-disable-next-line no-restricted-imports, import/no-unresolved
import 'globalize/currency';
// eslint-disable-next-line no-restricted-imports
import Globalize from 'globalize';
import config from '../../core/config';
import numberLocalization from '../number';
var CURRENCY_STYLES = ['symbol', 'accounting'];
if (Globalize && Globalize.formatCurrency) {
  if (Globalize.locale().locale === 'en') {
    Globalize.locale('en');
  }
  var formattersCache = {};
  var getFormatter = (currency, format) => {
    var formatter;
    var formatCacheKey;
    if (typeof format === 'object') {
      formatCacheKey = Globalize.locale().locale + ':' + currency + ':' + JSON.stringify(format);
    } else {
      formatCacheKey = Globalize.locale().locale + ':' + currency + ':' + format;
    }
    formatter = formattersCache[formatCacheKey];
    if (!formatter) {
      formatter = formattersCache[formatCacheKey] = Globalize.currencyFormatter(currency, format);
    }
    return formatter;
  };
  var globalizeCurrencyLocalization = {
    _formatNumberCore: function _formatNumberCore(value, format, formatConfig) {
      if (format === 'currency') {
        var currency = formatConfig && formatConfig.currency || config().defaultCurrency;
        return getFormatter(currency, this._normalizeFormatConfig(format, formatConfig, value))(value);
      }
      return this.callBase.apply(this, arguments);
    },
    _normalizeFormatConfig: function _normalizeFormatConfig(format, formatConfig, value) {
      var normalizedConfig = this.callBase(format, formatConfig, value);
      if (format === 'currency') {
        var _formatConfig$useCurr;
        var useAccountingStyle = (_formatConfig$useCurr = formatConfig.useCurrencyAccountingStyle) !== null && _formatConfig$useCurr !== void 0 ? _formatConfig$useCurr : config().defaultUseCurrencyAccountingStyle;
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
          _format.currency = config().defaultCurrency;
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
        currency = config().defaultCurrency;
      }
      return Globalize.cldr.main('numbers/currencies/' + currency);
    },
    getOpenXmlCurrencyFormat: function getOpenXmlCurrencyFormat(currency) {
      var currencySymbol = this.getCurrencySymbol(currency).symbol;
      var accountingFormat = Globalize.cldr.main('numbers/currencyFormats-numberSystem-latn').accounting;
      return openXmlCurrencyFormat(currencySymbol, accountingFormat);
    }
  };
  numberLocalization.inject(globalizeCurrencyLocalization);
}
