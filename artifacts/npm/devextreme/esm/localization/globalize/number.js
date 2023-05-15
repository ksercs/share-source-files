/**
* DevExtreme (esm/localization/globalize/number.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import './core';
// eslint-disable-next-line no-restricted-imports
import Globalize from 'globalize';
import numberLocalization from '../number';
import errors from '../../core/errors';

// eslint-disable-next-line no-restricted-imports, import/no-unresolved
import 'globalize/number';
var MAX_FRACTION_DIGITS = 20;
if (Globalize && Globalize.formatNumber) {
  if (Globalize.locale().locale === 'en') {
    Globalize.locale('en');
  }
  var formattersCache = {};
  var getFormatter = format => {
    var formatter;
    var formatCacheKey;
    if (typeof format === 'object') {
      formatCacheKey = Globalize.locale().locale + ':' + JSON.stringify(format);
    } else {
      formatCacheKey = Globalize.locale().locale + ':' + format;
    }
    formatter = formattersCache[formatCacheKey];
    if (!formatter) {
      formatter = formattersCache[formatCacheKey] = Globalize.numberFormatter(format);
    }
    return formatter;
  };
  var globalizeNumberLocalization = {
    engine: function engine() {
      return 'globalize';
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
        config = {
          minimumIntegerDigits: formatConfig.precision || 1,
          useGrouping: false,
          minimumFractionDigits: 0,
          maximumFractionDigits: MAX_FRACTION_DIGITS,
          round: value < 0 ? 'ceil' : 'floor'
        };
      } else {
        config = this._getPrecisionConfig(formatConfig.precision);
      }
      if (format === 'percent') {
        config.style = 'percent';
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
      if (typeof value !== 'number') {
        return value;
      }
      _format = this._normalizeFormat(_format);
      if (!_format || typeof _format !== 'function' && !_format.type && !_format.formatter) {
        return getFormatter(_format)(value);
      }
      return this.callBase.apply(this, arguments);
    },
    parse: function parse(text, format) {
      if (!text) {
        return;
      }
      if (format && (format.parser || typeof format === 'string')) {
        return this.callBase.apply(this, arguments);
      }
      if (format) {
        // Current parser functionality provided as-is and is independent of the most of capabilities of formatter.
        errors.log('W0011');
      }
      var result = Globalize.parseNumber(text);
      if (isNaN(result)) {
        result = this.callBase.apply(this, arguments);
      }
      return result;
    }
  };
  numberLocalization.resetInjection();
  numberLocalization.inject(globalizeNumberLocalization);
}
