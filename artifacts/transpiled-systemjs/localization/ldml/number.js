!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/localization/ldml/number.js"], ["../../core/utils/math","../utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/localization/ldml/number.js", ["../../core/utils/math", "../utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.getFormat = getFormat;
  exports.getFormatter = getFormatter;
  var _math = $__require("../../core/utils/math");
  var _utils = $__require("../utils");
  var DEFAULT_CONFIG = {
    thousandsSeparator: ',',
    decimalSeparator: '.'
  };
  var ESCAPING_CHAR = '\'';
  var MAXIMUM_NUMBER_LENGTH = 15;
  var PERCENT_EXPONENT_SHIFT = 2; // '1e2'

  function getGroupSizes(formatString) {
    return formatString.split(',').slice(1).map(function (str) {
      var singleQuotesLeft = 0;
      return str.split('').filter(function (char, index) {
        singleQuotesLeft += char === '\'';
        var isDigit = char === '#' || char === '0';
        var isInStub = singleQuotesLeft % 2;
        return isDigit && !isInStub;
      }).length;
    });
  }
  function getSignParts(format) {
    var signParts = format.split(';');
    if (signParts.length === 1) {
      signParts.push('-' + signParts[0]);
    }
    return signParts;
  }
  function reverseString(str) {
    return str.toString().split('').reverse().join('');
  }
  function isPercentFormat(format) {
    return format.indexOf('%') !== -1 && !format.match(/'[^']*%[^']*'/g);
  }
  function removeStubs(str) {
    return str.replace(/'.+'/g, '');
  }
  function getNonRequiredDigitCount(floatFormat) {
    if (!floatFormat) return 0;
    var format = removeStubs(floatFormat);
    return format.length - format.replace(/[#]/g, '').length;
  }
  function getRequiredDigitCount(floatFormat) {
    if (!floatFormat) return 0;
    var format = removeStubs(floatFormat);
    return format.length - format.replace(/[0]/g, '').length;
  }
  function normalizeValueString(valuePart, minDigitCount, maxDigitCount) {
    if (!valuePart) return '';
    if (valuePart.length > maxDigitCount) {
      valuePart = valuePart.substr(0, maxDigitCount);
    }
    while (valuePart.length > minDigitCount && valuePart.slice(-1) === '0') {
      valuePart = valuePart.substr(0, valuePart.length - 1);
    }
    while (valuePart.length < minDigitCount) {
      valuePart += '0';
    }
    return valuePart;
  }
  function applyGroups(valueString, groupSizes, thousandsSeparator) {
    if (!groupSizes.length) return valueString;
    var groups = [];
    var index = 0;
    while (valueString) {
      var groupSize = groupSizes[index];
      if (!groupSize) {
        break;
      }
      groups.push(valueString.slice(0, groupSize));
      valueString = valueString.slice(groupSize);
      if (index < groupSizes.length - 1) {
        index++;
      }
    }
    return groups.join(thousandsSeparator);
  }
  function formatNumberPart(format, valueString) {
    return format.split(ESCAPING_CHAR).map(function (formatPart, escapeIndex) {
      var isEscape = escapeIndex % 2;
      if (!formatPart && isEscape) {
        return ESCAPING_CHAR;
      }
      return isEscape ? formatPart : formatPart.replace(/[,#0]+/, valueString);
    }).join('');
  }
  function getFloatPointIndex(format) {
    var isEscape = false;
    for (var index = 0; index < format.length; index++) {
      if (format[index] === '\'') {
        isEscape = !isEscape;
      }
      if (format[index] === '.' && !isEscape) {
        return index;
      }
    }
    return format.length;
  }
  function getFormatter(format, config) {
    config = config || DEFAULT_CONFIG;
    return function (value) {
      if (typeof value !== 'number' || isNaN(value)) return '';
      var signFormatParts = getSignParts(format);
      var isPositiveZero = 1 / value === Infinity;
      var isPositive = value > 0 || isPositiveZero;
      var numberFormat = signFormatParts[isPositive ? 0 : 1];
      var floatPointIndex = getFloatPointIndex(numberFormat);
      var floatFormatParts = [numberFormat.substr(0, floatPointIndex), numberFormat.substr(floatPointIndex + 1)];
      var minFloatPrecision = getRequiredDigitCount(floatFormatParts[1]);
      var maxFloatPrecision = minFloatPrecision + getNonRequiredDigitCount(floatFormatParts[1]);
      if (isPercentFormat(numberFormat)) {
        value = (0, _math.multiplyInExponentialForm)(value, PERCENT_EXPONENT_SHIFT);
      }
      if (!isPositive) {
        value = -value;
      }
      var minIntegerPrecision = getRequiredDigitCount(floatFormatParts[0]);
      var maxIntegerPrecision = getNonRequiredDigitCount(floatFormatParts[0]) || config.unlimitedIntegerDigits ? undefined : minIntegerPrecision;
      var integerLength = Math.floor(value).toString().length;
      var floatPrecision = (0, _math.fitIntoRange)(maxFloatPrecision, 0, MAXIMUM_NUMBER_LENGTH - integerLength);
      var groupSizes = getGroupSizes(floatFormatParts[0]).reverse();
      var valueParts = (0, _utils.toFixed)(value, floatPrecision < 0 ? 0 : floatPrecision).split('.');
      var valueIntegerPart = normalizeValueString(reverseString(valueParts[0]), minIntegerPrecision, maxIntegerPrecision);
      var valueFloatPart = normalizeValueString(valueParts[1], minFloatPrecision, maxFloatPrecision);
      valueIntegerPart = applyGroups(valueIntegerPart, groupSizes, config.thousandsSeparator);
      var integerString = reverseString(formatNumberPart(reverseString(floatFormatParts[0]), valueIntegerPart));
      var floatString = maxFloatPrecision ? formatNumberPart(floatFormatParts[1], valueFloatPart) : '';
      var result = integerString + (floatString.match(/\d/) ? config.decimalSeparator : '') + floatString;
      return result;
    };
  }
  function parseValue(text, isPercent, isNegative) {
    var value = (isPercent ? 0.01 : 1) * parseFloat(text) || 0;
    return isNegative ? -value : value;
  }
  function prepareValueText(valueText, formatter, isPercent, isIntegerPart) {
    var nextValueText = valueText;
    var char;
    var text;
    var nextText;
    do {
      if (nextText) {
        char = text.length === nextText.length ? '0' : '1';
        valueText = isIntegerPart ? char + valueText : valueText + char;
      }
      text = nextText || formatter(parseValue(nextValueText, isPercent));
      nextValueText = isIntegerPart ? '1' + nextValueText : nextValueText + '1';
      nextText = formatter(parseValue(nextValueText, isPercent));
    } while (text !== nextText && (isIntegerPart ? text.length === nextText.length : text.length <= nextText.length));
    if (isIntegerPart && nextText.length > text.length) {
      var hasGroups = formatter(12345).indexOf('12345') === -1;
      do {
        valueText = '1' + valueText;
      } while (hasGroups && parseValue(valueText, isPercent) < 100000);
    }
    return valueText;
  }
  function getFormatByValueText(valueText, formatter, isPercent, isNegative) {
    var format = formatter(parseValue(valueText, isPercent, isNegative));
    var valueTextParts = valueText.split('.');
    var valueTextWithModifiedFloat = valueTextParts[0] + '.3' + valueTextParts[1].slice(1);
    var valueWithModifiedFloat = parseValue(valueTextWithModifiedFloat, isPercent, isNegative);
    var decimalSeparatorIndex = formatter(valueWithModifiedFloat).indexOf('3') - 1;
    format = format.replace(/(\d)\D(\d)/g, '$1,$2');
    if (decimalSeparatorIndex >= 0) {
      format = format.slice(0, decimalSeparatorIndex) + '.' + format.slice(decimalSeparatorIndex + 1);
    }
    format = format.replace(/1+/, '1').replace(/1/g, '#');
    if (!isPercent) {
      format = format.replace('%', '\'%\''); // lgtm[js/incomplete-sanitization]
    }

    return format;
  }
  function getFormat(formatter) {
    var valueText = '.';
    var isPercent = formatter(1).indexOf('100') >= 0;
    valueText = prepareValueText(valueText, formatter, isPercent, true);
    valueText = prepareValueText(valueText, formatter, isPercent, false);
    var positiveFormat = getFormatByValueText(valueText, formatter, isPercent, false);
    var negativeFormat = getFormatByValueText(valueText, formatter, isPercent, true);
    return negativeFormat === '-' + positiveFormat ? positiveFormat : positiveFormat + ';' + negativeFormat;
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/math","../utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/math"), require("../utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=number.js.map