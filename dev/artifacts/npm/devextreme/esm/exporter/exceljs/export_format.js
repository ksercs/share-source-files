/**
* DevExtreme (esm/exporter/exceljs/export_format.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { format as stringFormat } from '../../core/utils/string';
import numberFormatter from '../../localization/number';
import dateLocalization from '../../localization/date';
import { isDefined, isString, isObject, isNumeric } from '../../core/utils/type';
import { getFormat } from '../../localization/ldml/date.format';
import { getLanguageId } from '../../localization/language_codes';
import { extend } from '../../core/utils/extend';
import '../../localization/currency';
var ARABIC_ZERO_CODE = 1632;
var DEFINED_NUMBER_FORMTATS = {
  thousands: '#,##0{0},&quot;K&quot;',
  millions: '#,##0{0},,&quot;M&quot;',
  billions: '#,##0{0},,,&quot;B&quot;',
  trillions: '#,##0{0},,,,&quot;T&quot;',
  percent: '0{0}%',
  decimal: '#{0}',
  'fixedpoint': '#,##0{0}',
  exponential: '0{0}E+00',
  currency: ' '
};
var PERIOD_REGEXP = /a+/g;
var DAY_REGEXP = /E/g;
var DO_REGEXP = /dE+/g;
var STANDALONE_MONTH_REGEXP = /L/g;
var HOUR_REGEXP = /h/g;
var ANY_REGEXP = /./g;
function _applyPrecision(format, precision) {
  var result;
  var i;
  if (precision > 0) {
    result = format !== 'decimal' ? '.' : '';
    for (i = 0; i < precision; i++) {
      result = result + '0';
    }
    return result;
  }
  return '';
}
function _hasArabicDigits(text) {
  var code;
  for (var i = 0; i < text.length; i++) {
    code = text.charCodeAt(i);
    if (code >= ARABIC_ZERO_CODE && code < ARABIC_ZERO_CODE + 10) {
      return true;
    }
  }
  return false;
}
function _convertDateFormat(format) {
  var formattedValue = (dateLocalization.format(new Date(2009, 8, 8, 6, 5, 4), format) || '').toString();
  var result = getFormat(value => dateLocalization.format(value, format));
  if (result) {
    result = _convertDateFormatToOpenXml(result);
    result = _getLanguageInfo(formattedValue) + result;
  }
  return result;
}
function _getLanguageInfo(defaultPattern) {
  var languageID = getLanguageId();
  var languageIDStr = languageID ? languageID.toString(16) : '';
  var languageInfo = '';
  if (_hasArabicDigits(defaultPattern)) {
    while (languageIDStr.length < 3) {
      languageIDStr = '0' + languageIDStr;
    }
    languageInfo = '[$-2010' + languageIDStr + ']';
  } else if (languageIDStr) {
    languageInfo = '[$-' + languageIDStr + ']';
  }
  return languageInfo;
}
function _convertDateFormatToOpenXml(format) {
  return format.split('/').join('\\/').split('\'').map(function (datePart, index) {
    if (index % 2 === 0) {
      return datePart.replace(PERIOD_REGEXP, 'AM/PM').replace(DO_REGEXP, 'd').replace(DAY_REGEXP, 'd').replace(STANDALONE_MONTH_REGEXP, 'M').replace(HOUR_REGEXP, 'H').split('[').join('\\[').split(']').join('\\]');
    }
    if (datePart) {
      return datePart.replace(ANY_REGEXP, '\\$&');
    }
    return '\'';
  }).join('');
}
function _convertNumberFormat(format, precision, currency) {
  var result;
  var excelFormat;
  if (format === 'currency') {
    excelFormat = numberFormatter.getOpenXmlCurrencyFormat(currency);
  } else {
    excelFormat = DEFINED_NUMBER_FORMTATS[format.toLowerCase()];
  }
  if (excelFormat) {
    result = stringFormat(excelFormat, _applyPrecision(format, precision));
  }
  return result;
}
function _hasCSVInjection(value) {
  if (!value || value.length < 2) {
    return false;
  }
  return _includesCSVExpression(value);
}
function _hasCSVQuotedInjection(value, textQualifier) {
  if (!value || value.length < 4 || value[0] !== textQualifier) {
    return false;
  }
  return _includesCSVExpression(value.substring(1, value.length - 1));
}
function _includesCSVExpression(value) {
  var injectionPrefix = /^[@=\t\r]/;
  var possibleInjectionPrefix = /^[+-]/;
  if (!value) {
    return false;
  }
  if (injectionPrefix.test(value)) {
    return true;
  }
  if (!possibleInjectionPrefix.test(value)) {
    return false;
  }
  return !isNumeric(value);
}
export var ExportFormat = {
  formatObjectConverter(format, dataType) {
    var result = {
      format: format,
      precision: format && format.precision,
      dataType: dataType
    };
    if (isObject(format)) {
      return extend(result, format, {
        format: format.formatter || format.type,
        currency: format.currency
      });
    }
    return result;
  },
  convertFormat(format, precision, type, currency) {
    if (isDefined(format)) {
      if (type === 'date') {
        return _convertDateFormat(format);
      } else {
        if (isString(format) && DEFINED_NUMBER_FORMTATS[format.toLowerCase()]) {
          return _convertNumberFormat(format, precision, currency);
        }
      }
    }
  },
  encode(value) {
    var textQualifier = '"';
    var escaped = false;
    if (_hasCSVInjection(value)) {
      escaped = true;
    } else if (_hasCSVQuotedInjection(value, textQualifier)) {
      value = value.substring(1, value.length - 1);
      escaped = true;
    }
    if (escaped) {
      var singleTextQualifier = textQualifier;
      var escapedTextQualifier = "".concat(textQualifier).concat(textQualifier);
      return textQualifier + '\'' + value.replaceAll(singleTextQualifier, escapedTextQualifier) + textQualifier;
    }
    return value;
  }
};
