!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/exporter/exceljs/export_format.js"], ["../../core/utils/string","../../localization/number","../../localization/date","../../core/utils/type","../../localization/ldml/date.format","../../localization/language_codes","../../core/utils/extend","../../localization/currency"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/exporter/exceljs/export_format.js", ["../../core/utils/string", "../../localization/number", "../../localization/date", "../../core/utils/type", "../../localization/ldml/date.format", "../../localization/language_codes", "../../core/utils/extend", "../../localization/currency"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.ExportFormat = void 0;
  var _string = $__require("../../core/utils/string");
  var _number = _interopRequireDefault($__require("../../localization/number"));
  var _date = _interopRequireDefault($__require("../../localization/date"));
  var _type = $__require("../../core/utils/type");
  var _date2 = $__require("../../localization/ldml/date.format");
  var _language_codes = $__require("../../localization/language_codes");
  var _extend = $__require("../../core/utils/extend");
  $__require("../../localization/currency");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
    var formattedValue = (_date.default.format(new Date(2009, 8, 8, 6, 5, 4), format) || '').toString();
    var result = (0, _date2.getFormat)(function (value) {
      return _date.default.format(value, format);
    });
    if (result) {
      result = _convertDateFormatToOpenXml(result);
      result = _getLanguageInfo(formattedValue) + result;
    }
    return result;
  }
  function _getLanguageInfo(defaultPattern) {
    var languageID = (0, _language_codes.getLanguageId)();
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
      excelFormat = _number.default.getOpenXmlCurrencyFormat(currency);
    } else {
      excelFormat = DEFINED_NUMBER_FORMTATS[format.toLowerCase()];
    }
    if (excelFormat) {
      result = (0, _string.format)(excelFormat, _applyPrecision(format, precision));
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
    return !(0, _type.isNumeric)(value);
  }
  var ExportFormat = {
    formatObjectConverter: function formatObjectConverter(format, dataType) {
      var result = {
        format: format,
        precision: format && format.precision,
        dataType: dataType
      };
      if ((0, _type.isObject)(format)) {
        return (0, _extend.extend)(result, format, {
          format: format.formatter || format.type,
          currency: format.currency
        });
      }
      return result;
    },
    convertFormat: function convertFormat(format, precision, type, currency) {
      if ((0, _type.isDefined)(format)) {
        if (type === 'date') {
          return _convertDateFormat(format);
        } else {
          if ((0, _type.isString)(format) && DEFINED_NUMBER_FORMTATS[format.toLowerCase()]) {
            return _convertNumberFormat(format, precision, currency);
          }
        }
      }
    },
    encode: function encode(value) {
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
  exports.ExportFormat = ExportFormat;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/string","../../localization/number","../../localization/date","../../core/utils/type","../../localization/ldml/date.format","../../localization/language_codes","../../core/utils/extend","../../localization/currency"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/string"), require("../../localization/number"), require("../../localization/date"), require("../../core/utils/type"), require("../../localization/ldml/date.format"), require("../../localization/language_codes"), require("../../core/utils/extend"), require("../../localization/currency"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=export_format.js.map