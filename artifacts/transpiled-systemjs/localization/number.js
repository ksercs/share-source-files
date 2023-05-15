!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/localization/number.js"], ["../core/utils/dependency_injector","../core/utils/common","../core/utils/iterator","../core/utils/type","./ldml/number","../core/config","../core/errors","./utils","./currency","./intl/number"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/localization/number.js", ["../core/utils/dependency_injector", "../core/utils/common", "../core/utils/iterator", "../core/utils/type", "./ldml/number", "../core/config", "../core/errors", "./utils", "./currency", "./intl/number"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _dependency_injector = _interopRequireDefault($__require("../core/utils/dependency_injector"));
  var _common = $__require("../core/utils/common");
  var _iterator = $__require("../core/utils/iterator");
  var _type = $__require("../core/utils/type");
  var _number = $__require("./ldml/number");
  var _config = _interopRequireDefault($__require("../core/config"));
  var _errors = _interopRequireDefault($__require("../core/errors"));
  var _utils = $__require("./utils");
  var _currency = _interopRequireDefault($__require("./currency"));
  var _number2 = _interopRequireDefault($__require("./intl/number"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];if (null != _i) {
      var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;_n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  var hasIntl = typeof Intl !== 'undefined';
  var MAX_LARGE_NUMBER_POWER = 4;
  var DECIMAL_BASE = 10;
  var NUMERIC_FORMATS = ['currency', 'fixedpoint', 'exponential', 'percent', 'decimal'];
  var LargeNumberFormatPostfixes = {
    1: 'K',
    // kilo
    2: 'M',
    // mega
    3: 'B',
    // billions
    4: 'T' // tera
  };

  var LargeNumberFormatPowers = {
    'largenumber': 'auto',
    'thousands': 1,
    'millions': 2,
    'billions': 3,
    'trillions': 4
  };
  var numberLocalization = (0, _dependency_injector.default)({
    engine: function engine() {
      return 'base';
    },
    numericFormats: NUMERIC_FORMATS,
    defaultLargeNumberFormatPostfixes: LargeNumberFormatPostfixes,
    _parseNumberFormatString: function _parseNumberFormatString(formatType) {
      var formatObject = {};
      if (!formatType || typeof formatType !== 'string') return;
      var formatList = formatType.toLowerCase().split(' ');
      (0, _iterator.each)(formatList, function (index, value) {
        if (NUMERIC_FORMATS.includes(value)) {
          formatObject.formatType = value;
        } else if (value in LargeNumberFormatPowers) {
          formatObject.power = LargeNumberFormatPowers[value];
        }
      });
      if (formatObject.power && !formatObject.formatType) {
        formatObject.formatType = 'fixedpoint';
      }
      if (formatObject.formatType) {
        return formatObject;
      }
    },
    _calculateNumberPower: function _calculateNumberPower(value, base, minPower, maxPower) {
      var number = Math.abs(value);
      var power = 0;
      if (number > 1) {
        while (number && number >= base && (maxPower === undefined || power < maxPower)) {
          power++;
          number = number / base;
        }
      } else if (number > 0 && number < 1) {
        while (number < 1 && (minPower === undefined || power > minPower)) {
          power--;
          number = number * base;
        }
      }
      return power;
    },
    _getNumberByPower: function _getNumberByPower(number, power, base) {
      var result = number;
      while (power > 0) {
        result = result / base;
        power--;
      }
      while (power < 0) {
        result = result * base;
        power++;
      }
      return result;
    },
    _formatNumber: function _formatNumber(value, formatObject, formatConfig) {
      if (formatObject.power === 'auto') {
        formatObject.power = this._calculateNumberPower(value, 1000, 0, MAX_LARGE_NUMBER_POWER);
      }
      if (formatObject.power) {
        value = this._getNumberByPower(value, formatObject.power, 1000);
      }
      var powerPostfix = this.defaultLargeNumberFormatPostfixes[formatObject.power] || '';
      var result = this._formatNumberCore(value, formatObject.formatType, formatConfig);
      result = result.replace(/(\d|.$)(\D*)$/, '$1' + powerPostfix + '$2');
      return result;
    },
    _formatNumberExponential: function _formatNumberExponential(value, formatConfig) {
      var power = this._calculateNumberPower(value, DECIMAL_BASE);
      var number = this._getNumberByPower(value, power, DECIMAL_BASE);
      if (formatConfig.precision === undefined) {
        formatConfig.precision = 1;
      }
      if (number.toFixed(formatConfig.precision || 0) >= DECIMAL_BASE) {
        power++;
        number = number / DECIMAL_BASE;
      }
      var powString = (power >= 0 ? '+' : '') + power.toString();
      return this._formatNumberCore(number, 'fixedpoint', formatConfig) + 'E' + powString;
    },
    _addZeroes: function _addZeroes(value, precision) {
      var multiplier = Math.pow(10, precision);
      var sign = value < 0 ? '-' : '';
      value = (Math.abs(value) * multiplier >>> 0) / multiplier;
      var result = value.toString();
      while (result.length < precision) {
        result = '0' + result;
      }
      return sign + result;
    },
    _addGroupSeparators: function _addGroupSeparators(value) {
      var parts = value.toString().split('.');
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, (0, _config.default)().thousandsSeparator) + (parts[1] ? (0, _config.default)().decimalSeparator + parts[1] : '');
    },
    _formatNumberCore: function _formatNumberCore(value, format, formatConfig) {
      if (format === 'exponential') {
        return this._formatNumberExponential(value, formatConfig);
      }
      if (format !== 'decimal' && formatConfig.precision !== null) {
        formatConfig.precision = formatConfig.precision || 0;
      }
      if (format === 'percent') {
        value = value * 100;
      }
      if (formatConfig.precision !== undefined) {
        if (format === 'decimal') {
          value = this._addZeroes(value, formatConfig.precision);
        } else {
          value = formatConfig.precision === null ? value.toPrecision() : (0, _utils.toFixed)(value, formatConfig.precision);
        }
      }
      if (format !== 'decimal') {
        value = this._addGroupSeparators(value);
      } else {
        value = value.toString().replace('.', (0, _config.default)().decimalSeparator);
      }
      if (format === 'percent') {
        value += '%';
      }
      return value;
    },
    _normalizeFormat: function _normalizeFormat(format) {
      if (!format) {
        return {};
      }
      if (typeof format === 'function') {
        return format;
      }
      if (!(0, _type.isPlainObject)(format)) {
        format = {
          type: format
        };
      }
      return format;
    },
    _getSeparators: function _getSeparators() {
      return {
        decimalSeparator: this.getDecimalSeparator(),
        thousandsSeparator: this.getThousandsSeparator()
      };
    },
    getThousandsSeparator: function getThousandsSeparator() {
      return this.format(10000, 'fixedPoint')[2];
    },
    getDecimalSeparator: function getDecimalSeparator() {
      return this.format(1.2, {
        type: 'fixedPoint',
        precision: 1
      })[1];
    },
    convertDigits: function convertDigits(value, toStandard) {
      var digits = this.format(90, 'decimal');
      if (typeof value !== 'string' || digits[1] === '0') {
        return value;
      }
      var fromFirstDigit = toStandard ? digits[1] : '0';
      var toFirstDigit = toStandard ? '0' : digits[1];
      var fromLastDigit = toStandard ? digits[0] : '9';
      var regExp = new RegExp('[' + fromFirstDigit + '-' + fromLastDigit + ']', 'g');
      return value.replace(regExp, function (char) {
        return String.fromCharCode(char.charCodeAt(0) + (toFirstDigit.charCodeAt(0) - fromFirstDigit.charCodeAt(0)));
      });
    },
    getNegativeEtalonRegExp: function getNegativeEtalonRegExp(format) {
      var separators = this._getSeparators();
      var digitalRegExp = new RegExp('[0-9' + (0, _common.escapeRegExp)(separators.decimalSeparator + separators.thousandsSeparator) + ']+', 'g');
      var specialCharacters = ['\\', '(', ')', '[', ']', '*', '+', '$', '^', '?', '|', '{', '}'];
      var negativeEtalon = this.format(-1, format).replace(digitalRegExp, '1');
      specialCharacters.forEach(function (char) {
        negativeEtalon = negativeEtalon.replace(new RegExp("\\".concat(char), 'g'), "\\".concat(char));
      });
      negativeEtalon = negativeEtalon.replace(/ /g, '\\s');
      negativeEtalon = negativeEtalon.replace(/1/g, '.*');
      return new RegExp(negativeEtalon, 'g');
    },
    getSign: function getSign(text, format) {
      if (!format) {
        if (text.replace(/[^0-9-]/g, '').charAt(0) === '-') {
          return -1;
        }
        return 1;
      }
      var negativeEtalon = this.getNegativeEtalonRegExp(format);
      return text.match(negativeEtalon) ? -1 : 1;
    },
    format: function format(value, _format) {
      if (typeof value !== 'number') {
        return value;
      }
      if (typeof _format === 'number') {
        return value;
      }
      _format = _format && _format.formatter || _format;
      if (typeof _format === 'function') {
        return _format(value);
      }
      _format = this._normalizeFormat(_format);
      if (!_format.type) {
        _format.type = 'decimal';
      }
      var numberConfig = this._parseNumberFormatString(_format.type);
      if (!numberConfig) {
        var formatterConfig = this._getSeparators();
        formatterConfig.unlimitedIntegerDigits = _format.unlimitedIntegerDigits;
        return this.convertDigits((0, _number.getFormatter)(_format.type, formatterConfig)(value));
      }
      return this._formatNumber(value, numberConfig, _format);
    },
    parse: function parse(text, format) {
      if (!text) {
        return;
      }
      if (format && format.parser) {
        return format.parser(text);
      }
      text = this.convertDigits(text, true);
      if (format && typeof format !== 'string') {
        // Current parser functionality provided as-is and is independent of the most of capabilities of formatter.
        _errors.default.log('W0011');
      }
      var decimalSeparator = this.getDecimalSeparator();
      var regExp = new RegExp('[^0-9' + (0, _common.escapeRegExp)(decimalSeparator) + ']', 'g');
      var cleanedText = text.replace(regExp, '').replace(decimalSeparator, '.').replace(/\.$/g, '');
      if (cleanedText === '.' || cleanedText === '') {
        return null;
      }
      if (this._calcSignificantDigits(cleanedText) > 15) {
        return NaN;
      }
      var parsed = +cleanedText * this.getSign(text, format);
      format = this._normalizeFormat(format);
      var formatConfig = this._parseNumberFormatString(format.type);
      var power = formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.power;
      if (power) {
        if (power === 'auto') {
          var match = text.match(/\d(K|M|B|T)/);
          if (match) {
            power = Object.keys(LargeNumberFormatPostfixes).find(function (power) {
              return LargeNumberFormatPostfixes[power] === match[1];
            });
          }
        }
        parsed = parsed * Math.pow(10, 3 * power);
      }
      if ((formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.formatType) === 'percent') {
        parsed /= 100;
      }
      return parsed;
    },
    _calcSignificantDigits: function _calcSignificantDigits(text) {
      var _text$split = text.split('.'),
          _text$split2 = _slicedToArray(_text$split, 2),
          integer = _text$split2[0],
          fractional = _text$split2[1];
      var calcDigitsAfterLeadingZeros = function calcDigitsAfterLeadingZeros(digits) {
        var index = -1;
        for (var i = 0; i < digits.length; i++) {
          if (digits[i] !== '0') {
            index = i;
            break;
          }
        }
        return index > -1 ? digits.length - index : 0;
      };
      var result = 0;
      if (integer) {
        result += calcDigitsAfterLeadingZeros(integer.split(''));
      }
      if (fractional) {
        result += calcDigitsAfterLeadingZeros(fractional.split('').reverse());
      }
      return result;
    }
  });
  numberLocalization.inject(_currency.default);
  if (hasIntl) {
    numberLocalization.inject(_number2.default);
  }
  var _default = numberLocalization;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/dependency_injector","../core/utils/common","../core/utils/iterator","../core/utils/type","./ldml/number","../core/config","../core/errors","./utils","./currency","./intl/number"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/dependency_injector"), require("../core/utils/common"), require("../core/utils/iterator"), require("../core/utils/type"), require("./ldml/number"), require("../core/config"), require("../core/errors"), require("./utils"), require("./currency"), require("./intl/number"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=number.js.map