/**
* DevExtreme (esm/localization/intl/number.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* globals Intl */
import dxConfig from '../../core/config';
import localizationCoreUtils from '../core';
import openXmlCurrencyFormat from '../open_xml_currency_format';
import accountingFormats from '../cldr-data/accounting_formats';
var CURRENCY_STYLES = ['standard', 'accounting'];
var MAX_FRACTION_DIGITS = 20;
var detectCurrencySymbolRegex = /([^\s0]+)?(\s*)0*[.,]*0*(\s*)([^\s0]+)?/;
var formattersCache = {};
var getFormatter = format => {
  var key = localizationCoreUtils.locale() + '/' + JSON.stringify(format);
  if (!formattersCache[key]) {
    formattersCache[key] = new Intl.NumberFormat(localizationCoreUtils.locale(), format).format;
  }
  return formattersCache[key];
};
var getCurrencyFormatter = currency => {
  return new Intl.NumberFormat(localizationCoreUtils.locale(), {
    style: 'currency',
    currency: currency
  });
};
export default {
  engine: function engine() {
    return 'intl';
  },
  _formatNumberCore: function _formatNumberCore(value, format, formatConfig) {
    if (format === 'exponential') {
      return this.callBase.apply(this, arguments);
    }
    return getFormatter(this._normalizeFormatConfig(format, formatConfig, value))(value);
  },
  _normalizeFormatConfig: function _normalizeFormatConfig(format, formatConfig, value) {
    var config;
    if (format === 'decimal') {
      var fractionDigits = String(value).split('.')[1];
      config = {
        minimumIntegerDigits: formatConfig.precision || undefined,
        useGrouping: false,
        maximumFractionDigits: fractionDigits && fractionDigits.length,
        round: value < 0 ? 'ceil' : 'floor'
      };
    } else {
      config = this._getPrecisionConfig(formatConfig.precision);
    }
    if (format === 'percent') {
      config.style = 'percent';
    } else if (format === 'currency') {
      var _formatConfig$useCurr;
      var useAccountingStyle = (_formatConfig$useCurr = formatConfig.useCurrencyAccountingStyle) !== null && _formatConfig$useCurr !== void 0 ? _formatConfig$useCurr : dxConfig().defaultUseCurrencyAccountingStyle;
      config.style = 'currency';
      config.currency = formatConfig.currency || dxConfig().defaultCurrency;
      config.currencySign = CURRENCY_STYLES[+useAccountingStyle];
    }
    return config;
  },
  _getPrecisionConfig: function _getPrecisionConfig(precision) {
    var config;
    if (precision === null) {
      config = {
        minimumFractionDigits: 0,
        maximumFractionDigits: MAX_FRACTION_DIGITS
      };
    } else {
      config = {
        minimumFractionDigits: precision || 0,
        maximumFractionDigits: precision || 0
      };
    }
    return config;
  },
  format: function format(value, _format) {
    if ('number' !== typeof value) {
      return value;
    }
    _format = this._normalizeFormat(_format);
    if (_format.currency === 'default') {
      _format.currency = dxConfig().defaultCurrency;
    }
    if (!_format || 'function' !== typeof _format && !_format.type && !_format.formatter) {
      return getFormatter(_format)(value);
    }
    return this.callBase.apply(this, arguments);
  },
  _getCurrencySymbolInfo: function _getCurrencySymbolInfo(currency) {
    var formatter = getCurrencyFormatter(currency);
    return this._extractCurrencySymbolInfo(formatter.format(0));
  },
  _extractCurrencySymbolInfo: function _extractCurrencySymbolInfo(currencyValueString) {
    var match = detectCurrencySymbolRegex.exec(currencyValueString) || [];
    var position = match[1] ? 'before' : 'after';
    var symbol = match[1] || match[4] || '';
    var delimiter = match[2] || match[3] || '';
    return {
      position: position,
      symbol: symbol,
      delimiter: delimiter
    };
  },
  getCurrencySymbol: function getCurrencySymbol(currency) {
    if (!currency) {
      currency = dxConfig().defaultCurrency;
    }
    var symbolInfo = this._getCurrencySymbolInfo(currency);
    return {
      'symbol': symbolInfo.symbol
    };
  },
  getOpenXmlCurrencyFormat: function getOpenXmlCurrencyFormat(currency) {
    var targetCurrency = currency || dxConfig().defaultCurrency;
    var currencySymbol = this._getCurrencySymbolInfo(targetCurrency).symbol;
    var closestAccountingFormat = localizationCoreUtils.getValueByClosestLocale(locale => accountingFormats[locale]);
    return openXmlCurrencyFormat(currencySymbol, closestAccountingFormat);
  }
};
