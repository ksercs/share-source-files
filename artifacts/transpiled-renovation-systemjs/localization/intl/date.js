!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/localization/intl/date.js"], ["../../core/utils/extend","../core"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/localization/intl/date.js", ["../../core/utils/extend", "../core"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _extend = $__require("../../core/utils/extend");
  var _core = _interopRequireDefault($__require("../core"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  var SYMBOLS_TO_REMOVE_REGEX = /[\u200E\u200F]/g;
  var NARROW_NO_BREAK_SPACE_REGEX = /[\u202F]/g;
  var getIntlFormatter = function getIntlFormatter(format) {
    return function (date) {
      // NOTE: Intl in some browsers formates dates with timezone offset which was at the moment for this date.
      // But the method "new Date" creates date using current offset. So, we decided to format dates in the UTC timezone.
      if (!format.timeZoneName) {
        var year = date.getFullYear();
        // NOTE: new Date(99,0,1) will return 1999 year, but 99 expected
        var recognizableAsTwentyCentury = String(year).length < 3;
        var safeYearShift = 400;
        var temporaryYearValue = recognizableAsTwentyCentury ? year + safeYearShift : year;
        var utcDate = new Date(Date.UTC(temporaryYearValue, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        if (recognizableAsTwentyCentury) {
          utcDate.setFullYear(year);
        }
        var utcFormat = (0, _extend.extend)({
          timeZone: 'UTC'
        }, format);
        return formatDateTime(utcDate, utcFormat);
      }
      return formatDateTime(date, format);
    };
  };
  var formattersCache = {};
  var getFormatter = function getFormatter(format) {
    var key = _core.default.locale() + '/' + JSON.stringify(format);
    if (!formattersCache[key]) {
      formattersCache[key] = new Intl.DateTimeFormat(_core.default.locale(), format).format;
    }
    return formattersCache[key];
  };
  function formatDateTime(date, format) {
    return getFormatter(format)(date).replace(SYMBOLS_TO_REMOVE_REGEX, '').replace(NARROW_NO_BREAK_SPACE_REGEX, ' ');
  }
  var formatNumber = function formatNumber(number) {
    return new Intl.NumberFormat(_core.default.locale()).format(number);
  };
  var getAlternativeNumeralsMap = function () {
    var numeralsMapCache = {};
    return function (locale) {
      if (!(locale in numeralsMapCache)) {
        if (formatNumber(0) === '0') {
          numeralsMapCache[locale] = false;
          return false;
        }
        numeralsMapCache[locale] = {};
        for (var i = 0; i < 10; ++i) {
          numeralsMapCache[locale][formatNumber(i)] = i;
        }
      }
      return numeralsMapCache[locale];
    };
  }();
  var normalizeNumerals = function normalizeNumerals(dateString) {
    var alternativeNumeralsMap = getAlternativeNumeralsMap(_core.default.locale());
    if (!alternativeNumeralsMap) {
      return dateString;
    }
    return dateString.split('').map(function (sign) {
      return sign in alternativeNumeralsMap ? String(alternativeNumeralsMap[sign]) : sign;
    }).join('');
  };
  var removeLeadingZeroes = function removeLeadingZeroes(str) {
    return str.replace(/(\D)0+(\d)/g, '$1$2');
  };
  var dateStringEquals = function dateStringEquals(actual, expected) {
    return removeLeadingZeroes(actual) === removeLeadingZeroes(expected);
  };
  var normalizeMonth = function normalizeMonth(text) {
    return text.replace("d\u2019", 'de '); // NOTE: For "ca" locale
  };

  var intlFormats = {
    'day': {
      day: 'numeric'
    },
    'dayofweek': {
      weekday: 'long'
    },
    'longdate': {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    'longdatelongtime': {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    },
    'longtime': {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    },
    'month': {
      month: 'long'
    },
    'monthandday': {
      month: 'long',
      day: 'numeric'
    },
    'monthandyear': {
      year: 'numeric',
      month: 'long'
    },
    'shortdate': {},
    'shorttime': {
      hour: 'numeric',
      minute: 'numeric'
    },
    'shortyear': {
      year: '2-digit'
    },
    'year': {
      year: 'numeric'
    }
  };
  Object.defineProperty(intlFormats, 'shortdateshorttime', {
    get: function get() {
      var defaultOptions = Intl.DateTimeFormat(_core.default.locale()).resolvedOptions();
      return {
        year: defaultOptions.year,
        month: defaultOptions.month,
        day: defaultOptions.day,
        hour: 'numeric',
        minute: 'numeric'
      };
    }
  });
  var getIntlFormat = function getIntlFormat(format) {
    return typeof format === 'string' && intlFormats[format.toLowerCase()];
  };
  var monthNameStrategies = {
    standalone: function standalone(monthIndex, monthFormat) {
      var date = new Date(1999, monthIndex, 13, 1);
      var dateString = getIntlFormatter({
        month: monthFormat
      })(date);
      return dateString;
    },
    format: function format(monthIndex, monthFormat) {
      var date = new Date(0, monthIndex, 13, 1);
      var dateString = normalizeMonth(getIntlFormatter({
        day: 'numeric',
        month: monthFormat
      })(date));
      var parts = dateString.split(' ').filter(function (part) {
        return part.indexOf('13') < 0;
      });
      if (parts.length === 1) {
        return parts[0];
      } else if (parts.length === 2) {
        return parts[0].length > parts[1].length ? parts[0] : parts[1]; // NOTE: For "lt" locale
      }

      return monthNameStrategies.standalone(monthIndex, monthFormat);
    }
  };
  var _default = {
    engine: function engine() {
      return 'intl';
    },
    getMonthNames: function getMonthNames(format, type) {
      var intlFormats = {
        wide: 'long',
        abbreviated: 'short',
        narrow: 'narrow'
      };
      var monthFormat = intlFormats[format || 'wide'];
      type = type === 'format' ? type : 'standalone';
      return Array.apply(null, new Array(12)).map(function (_, monthIndex) {
        return monthNameStrategies[type](monthIndex, monthFormat);
      });
    },
    getDayNames: function getDayNames(format) {
      var intlFormats = {
        wide: 'long',
        abbreviated: 'short',
        short: 'narrow',
        narrow: 'narrow'
      };
      var getIntlDayNames = function getIntlDayNames(format) {
        return Array.apply(null, new Array(7)).map(function (_, dayIndex) {
          return getIntlFormatter({
            weekday: format
          })(new Date(0, 0, dayIndex));
        });
      };
      var result = getIntlDayNames(intlFormats[format || 'wide']);
      return result;
    },
    getPeriodNames: function getPeriodNames() {
      var hour12Formatter = getIntlFormatter({
        hour: 'numeric',
        hour12: true
      });
      return [1, 13].map(function (hours) {
        var hourNumberText = formatNumber(1); // NOTE: For "bn" locale
        var timeParts = hour12Formatter(new Date(0, 0, 1, hours)).split(hourNumberText);
        if (timeParts.length !== 2) {
          return '';
        }
        var biggerPart = timeParts[0].length > timeParts[1].length ? timeParts[0] : timeParts[1];
        return biggerPart.trim();
      });
    },
    format: function format(date, _format) {
      if (!date) {
        return;
      }
      if (!_format) {
        return date;
      }

      // TODO: refactor (extract code form base)
      if (typeof _format !== 'function' && !_format.formatter) {
        _format = _format.type || _format;
      }
      var intlFormat = getIntlFormat(_format);
      if (intlFormat) {
        return getIntlFormatter(intlFormat)(date);
      }
      var formatType = _typeof(_format);
      if (_format.formatter || formatType === 'function' || formatType === 'string') {
        return this.callBase.apply(this, arguments);
      }
      return getIntlFormatter(_format)(date);
    },
    parse: function parse(dateString, format) {
      var _this = this;
      var formatter;
      if (format && !format.parser && typeof dateString === 'string') {
        dateString = normalizeMonth(dateString);
        formatter = function formatter(date) {
          return normalizeMonth(_this.format(date, format));
        };
      }
      return this.callBase(dateString, formatter || format);
    },
    _parseDateBySimpleFormat: function _parseDateBySimpleFormat(dateString, format) {
      var _this2 = this;
      dateString = normalizeNumerals(dateString);
      var formatParts = this.getFormatParts(format);
      var dateParts = dateString.split(/\D+/).filter(function (part) {
        return part.length > 0;
      });
      if (formatParts.length !== dateParts.length) {
        return;
      }
      var dateArgs = this._generateDateArgs(formatParts, dateParts);
      var constructDate = function constructDate(dateArgs, ampmShift) {
        var hoursShift = ampmShift ? 12 : 0;
        return new Date(dateArgs.year, dateArgs.month, dateArgs.day, (dateArgs.hours + hoursShift) % 24, dateArgs.minutes, dateArgs.seconds);
      };
      var constructValidDate = function constructValidDate(ampmShift) {
        var parsedDate = constructDate(dateArgs, ampmShift);
        if (dateStringEquals(normalizeNumerals(_this2.format(parsedDate, format)), dateString)) {
          return parsedDate;
        }
      };
      return constructValidDate(false) || constructValidDate(true);
    },
    _generateDateArgs: function _generateDateArgs(formatParts, dateParts) {
      var currentDate = new Date();
      var dateArgs = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        day: currentDate.getDate(),
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      formatParts.forEach(function (formatPart, index) {
        var datePart = dateParts[index];
        var parsed = parseInt(datePart, 10);
        if (formatPart === 'month') {
          parsed = parsed - 1;
        }
        dateArgs[formatPart] = parsed;
      });
      return dateArgs;
    },
    formatUsesMonthName: function formatUsesMonthName(format) {
      if (_typeof(format) === 'object' && !(format.type || format.format)) {
        return format.month === 'long';
      }
      return this.callBase.apply(this, arguments);
    },
    formatUsesDayName: function formatUsesDayName(format) {
      if (_typeof(format) === 'object' && !(format.type || format.format)) {
        return format.weekday === 'long';
      }
      return this.callBase.apply(this, arguments);
    },
    getTimeSeparator: function getTimeSeparator() {
      var formatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      };
      return normalizeNumerals(formatDateTime(new Date(2001, 1, 1, 11, 11), formatOptions)).replace(/\d/g, '');
    },
    getFormatParts: function getFormatParts(format) {
      if (typeof format === 'string') {
        return this.callBase(format);
      }
      var intlFormat = (0, _extend.extend)({}, intlFormats[format.toLowerCase()]);
      var date = new Date(2001, 2, 4, 5, 6, 7);
      var formattedDate = getIntlFormatter(intlFormat)(date);
      formattedDate = normalizeNumerals(formattedDate);
      var formatParts = [{
        name: 'year',
        value: 1
      }, {
        name: 'month',
        value: 3
      }, {
        name: 'day',
        value: 4
      }, {
        name: 'hours',
        value: 5
      }, {
        name: 'minutes',
        value: 6
      }, {
        name: 'seconds',
        value: 7
      }];
      return formatParts.map(function (part) {
        return {
          name: part.name,
          index: formattedDate.indexOf(part.value)
        };
      }).filter(function (part) {
        return part.index > -1;
      }).sort(function (a, b) {
        return a.index - b.index;
      }).map(function (part) {
        return part.name;
      });
    }
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=date.js.map