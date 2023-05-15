!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/localization/date.js"], ["../core/utils/dependency_injector","../core/utils/type","../core/utils/iterator","../core/errors","./ldml/date.formatter","./ldml/date.format","./ldml/date.parser","./default_date_names","./cldr-data/first_day_of_week_data","./core","./number","./intl/date"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/localization/date.js", ["../core/utils/dependency_injector", "../core/utils/type", "../core/utils/iterator", "../core/errors", "./ldml/date.formatter", "./ldml/date.format", "./ldml/date.parser", "./default_date_names", "./cldr-data/first_day_of_week_data", "./core", "./number", "./intl/date"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _dependency_injector = _interopRequireDefault($__require("../core/utils/dependency_injector"));
  var _type = $__require("../core/utils/type");
  var _iterator = $__require("../core/utils/iterator");
  var _errors = _interopRequireDefault($__require("../core/errors"));
  var _date = $__require("./ldml/date.formatter");
  var _date2 = $__require("./ldml/date.format");
  var _date3 = $__require("./ldml/date.parser");
  var _default_date_names = _interopRequireDefault($__require("./default_date_names"));
  var _first_day_of_week_data = _interopRequireDefault($__require("./cldr-data/first_day_of_week_data"));
  var _core = _interopRequireDefault($__require("./core"));
  var _number = _interopRequireDefault($__require("./number"));
  var _date4 = _interopRequireDefault($__require("./intl/date"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DEFAULT_DAY_OF_WEEK_INDEX = 0;
  var hasIntl = typeof Intl !== 'undefined';
  var FORMATS_TO_PATTERN_MAP = {
    'shortdate': 'M/d/y',
    'shorttime': 'h:mm a',
    'longdate': 'EEEE, MMMM d, y',
    'longtime': 'h:mm:ss a',
    'monthandday': 'MMMM d',
    'monthandyear': 'MMMM y',
    'quarterandyear': 'QQQ y',
    'day': 'd',
    'year': 'y',
    'shortdateshorttime': 'M/d/y, h:mm a',
    'longdatelongtime': 'EEEE, MMMM d, y, h:mm:ss a',
    'month': 'LLLL',
    'shortyear': 'yy',
    'dayofweek': 'EEEE',
    'quarter': 'QQQ',
    'hour': 'HH',
    'minute': 'mm',
    'second': 'ss',
    'millisecond': 'SSS',
    'datetime-local': 'yyyy-MM-ddTHH\':\'mm\':\'ss'
  };
  var possiblePartPatterns = {
    year: ['y', 'yy', 'yyyy'],
    day: ['d', 'dd'],
    month: ['M', 'MM', 'MMM', 'MMMM'],
    hours: ['H', 'HH', 'h', 'hh', 'ah'],
    minutes: ['m', 'mm'],
    seconds: ['s', 'ss'],
    milliseconds: ['S', 'SS', 'SSS']
  };
  var dateLocalization = (0, _dependency_injector.default)({
    engine: function engine() {
      return 'base';
    },
    _getPatternByFormat: function _getPatternByFormat(format) {
      return FORMATS_TO_PATTERN_MAP[format.toLowerCase()];
    },
    _expandPattern: function _expandPattern(pattern) {
      return this._getPatternByFormat(pattern) || pattern;
    },
    formatUsesMonthName: function formatUsesMonthName(format) {
      return this._expandPattern(format).indexOf('MMMM') !== -1;
    },
    formatUsesDayName: function formatUsesDayName(format) {
      return this._expandPattern(format).indexOf('EEEE') !== -1;
    },
    getFormatParts: function getFormatParts(format) {
      var pattern = this._getPatternByFormat(format) || format;
      var result = [];
      (0, _iterator.each)(pattern.split(/\W+/), function (_, formatPart) {
        (0, _iterator.each)(possiblePartPatterns, function (partName, possiblePatterns) {
          if (possiblePatterns.includes(formatPart)) {
            result.push(partName);
          }
        });
      });
      return result;
    },
    getMonthNames: function getMonthNames(format) {
      return _default_date_names.default.getMonthNames(format);
    },
    getDayNames: function getDayNames(format) {
      return _default_date_names.default.getDayNames(format);
    },
    getQuarterNames: function getQuarterNames(format) {
      return _default_date_names.default.getQuarterNames(format);
    },
    getPeriodNames: function getPeriodNames(format) {
      return _default_date_names.default.getPeriodNames(format);
    },
    getTimeSeparator: function getTimeSeparator() {
      return ':';
    },
    is24HourFormat: function is24HourFormat(format) {
      var amTime = new Date(2017, 0, 20, 11, 0, 0, 0);
      var pmTime = new Date(2017, 0, 20, 23, 0, 0, 0);
      var amTimeFormatted = this.format(amTime, format);
      var pmTimeFormatted = this.format(pmTime, format);
      for (var i = 0; i < amTimeFormatted.length; i++) {
        if (amTimeFormatted[i] !== pmTimeFormatted[i]) {
          return !isNaN(parseInt(amTimeFormatted[i]));
        }
      }
    },
    format: function format(date, _format) {
      if (!date) {
        return;
      }
      if (!_format) {
        return date;
      }
      var formatter;
      if (typeof _format === 'function') {
        formatter = _format;
      } else if (_format.formatter) {
        formatter = _format.formatter;
      } else {
        _format = _format.type || _format;
        if ((0, _type.isString)(_format)) {
          _format = FORMATS_TO_PATTERN_MAP[_format.toLowerCase()] || _format;
          return _number.default.convertDigits((0, _date.getFormatter)(_format, this)(date));
        }
      }
      if (!formatter) {
        // TODO: log warning or error
        return;
      }
      return formatter(date);
    },
    parse: function parse(text, format) {
      var that = this;
      var ldmlFormat;
      var formatter;
      if (!text) {
        return;
      }
      if (!format) {
        return this.parse(text, 'shortdate');
      }
      if (format.parser) {
        return format.parser(text);
      }
      if (typeof format === 'string' && !FORMATS_TO_PATTERN_MAP[format.toLowerCase()]) {
        ldmlFormat = format;
      } else {
        formatter = function formatter(value) {
          var text = that.format(value, format);
          return _number.default.convertDigits(text, true);
        };
        try {
          ldmlFormat = (0, _date2.getFormat)(formatter);
        } catch (e) {}
      }
      if (ldmlFormat) {
        text = _number.default.convertDigits(text, true);
        return (0, _date3.getParser)(ldmlFormat, this)(text);
      }
      _errors.default.log('W0012');
      var result = new Date(text);
      if (!result || isNaN(result.getTime())) {
        return;
      }
      return result;
    },
    firstDayOfWeekIndex: function firstDayOfWeekIndex() {
      var index = _core.default.getValueByClosestLocale(function (locale) {
        return _first_day_of_week_data.default[locale];
      });
      return index === undefined ? DEFAULT_DAY_OF_WEEK_INDEX : index;
    }
  });
  if (hasIntl) {
    dateLocalization.inject(_date4.default);
  }
  var _default = dateLocalization;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/dependency_injector","../core/utils/type","../core/utils/iterator","../core/errors","./ldml/date.formatter","./ldml/date.format","./ldml/date.parser","./default_date_names","./cldr-data/first_day_of_week_data","./core","./number","./intl/date"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/dependency_injector"), require("../core/utils/type"), require("../core/utils/iterator"), require("../core/errors"), require("./ldml/date.formatter"), require("./ldml/date.format"), require("./ldml/date.parser"), require("./default_date_names"), require("./cldr-data/first_day_of_week_data"), require("./core"), require("./number"), require("./intl/date"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=date.js.map