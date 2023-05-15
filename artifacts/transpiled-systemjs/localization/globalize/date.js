!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/localization/globalize/date.js"], ["./core","./number","globalize/date","globalize","../date","../../core/utils/type","../../core/utils/iterator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/localization/globalize/date.js", ["./core", "./number", "globalize/date", "globalize", "../date", "../../core/utils/type", "../../core/utils/iterator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  $__require("./core");
  $__require("./number");
  $__require("globalize/date");
  var _globalize = _interopRequireDefault($__require("globalize"));
  var _date2 = _interopRequireDefault($__require("../date"));
  var _type = $__require("../../core/utils/type");
  var iteratorUtils = _interopRequireWildcard($__require("../../core/utils/iterator"));
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return { default: obj };
    }var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {
      return cache.get(obj);
    }var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }newObj.default = obj;if (cache) {
      cache.set(obj, newObj);
    }return newObj;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // eslint-disable-next-line no-restricted-imports, import/no-unresolved

  var ACCEPTABLE_JSON_FORMAT_PROPERTIES = ['skeleton', 'date', 'time', 'datetime', 'raw'];
  var RTL_MARKS_REGEX = /[\u200E\u200F]/g;

  // eslint-disable-next-line no-restricted-imports

  if (_globalize.default && _globalize.default.formatDate) {
    if (_globalize.default.locale().locale === 'en') {
      _globalize.default.locale('en');
    }
    var formattersCache = {};
    var FORMATS_TO_GLOBALIZE_MAP = {
      'shortdate': {
        path: 'dateTimeFormats/availableFormats/yMd'
      },
      'shorttime': {
        path: 'timeFormats/short'
      },
      'longdate': {
        path: 'dateFormats/full'
      },
      'longtime': {
        path: 'timeFormats/medium'
      },
      'monthandday': {
        path: 'dateTimeFormats/availableFormats/MMMMd'
      },
      'monthandyear': {
        path: 'dateTimeFormats/availableFormats/yMMMM'
      },
      'quarterandyear': {
        path: 'dateTimeFormats/availableFormats/yQQQ'
      },
      'day': {
        path: 'dateTimeFormats/availableFormats/d'
      },
      'year': {
        path: 'dateTimeFormats/availableFormats/y'
      },
      'shortdateshorttime': {
        path: 'dateTimeFormats/short',
        parts: ['shorttime', 'shortdate']
      },
      'longdatelongtime': {
        path: 'dateTimeFormats/medium',
        parts: ['longtime', 'longdate']
      },
      'month': {
        pattern: 'LLLL'
      },
      'shortyear': {
        pattern: 'yy'
      },
      'dayofweek': {
        pattern: 'EEEE'
      },
      'quarter': {
        pattern: 'QQQ'
      },
      'millisecond': {
        pattern: 'SSS'
      },
      'hour': {
        pattern: 'HH'
      },
      'minute': {
        pattern: 'mm'
      },
      'second': {
        pattern: 'ss'
      }
    };
    var globalizeDateLocalization = {
      engine: function engine() {
        return 'globalize';
      },
      _getPatternByFormat: function _getPatternByFormat(format) {
        var that = this;
        var lowerFormat = format.toLowerCase();
        var globalizeFormat = FORMATS_TO_GLOBALIZE_MAP[lowerFormat];
        if (lowerFormat === 'datetime-local') {
          return 'yyyy-MM-ddTHH\':\'mm\':\'ss';
        }
        if (!globalizeFormat) {
          return;
        }
        var result = globalizeFormat.path && that._getFormatStringByPath(globalizeFormat.path) || globalizeFormat.pattern;
        if (globalizeFormat.parts) {
          iteratorUtils.each(globalizeFormat.parts, function (index, part) {
            result = result.replace('{' + index + '}', that._getPatternByFormat(part));
          });
        }
        return result;
      },
      _getFormatStringByPath: function _getFormatStringByPath(path) {
        return _globalize.default.locale().main('dates/calendars/gregorian/' + path);
      },
      getPeriodNames: function getPeriodNames(format, type) {
        format = format || 'wide';
        type = type === 'format' ? type : 'stand-alone';
        var json = _globalize.default.locale().main("dates/calendars/gregorian/dayPeriods/".concat(type, "/").concat(format));
        return [json['am'], json['pm']];
      },
      getMonthNames: function getMonthNames(format, type) {
        var months = _globalize.default.locale().main('dates/calendars/gregorian/months/' + (type === 'format' ? type : 'stand-alone') + '/' + (format || 'wide'));
        return iteratorUtils.map(months, function (month) {
          return month;
        });
      },
      getDayNames: function getDayNames(format) {
        var days = _globalize.default.locale().main('dates/calendars/gregorian/days/stand-alone/' + (format || 'wide'));
        return iteratorUtils.map(days, function (day) {
          return day;
        });
      },
      getTimeSeparator: function getTimeSeparator() {
        return _globalize.default.locale().main('numbers/symbols-numberSystem-latn/timeSeparator');
      },
      removeRtlMarks: function removeRtlMarks(text) {
        return text.replace(RTL_MARKS_REGEX, '');
      },
      format: function format(date, _format) {
        if (!date) {
          return;
        }
        if (!_format) {
          return date;
        }
        var formatter;
        var formatCacheKey;
        if (typeof _format === 'function') {
          return _format(date);
        }
        if (_format.formatter) {
          return _format.formatter(date);
        }
        _format = _format.type || _format;
        if (typeof _format === 'string') {
          formatCacheKey = _globalize.default.locale().locale + ':' + _format;
          formatter = formattersCache[formatCacheKey];
          if (!formatter) {
            _format = {
              raw: this._getPatternByFormat(_format) || _format
            };
            formatter = formattersCache[formatCacheKey] = _globalize.default.dateFormatter(_format);
          }
        } else {
          if (!this._isAcceptableFormat(_format)) {
            return;
          }
          formatter = _globalize.default.dateFormatter(_format);
        }
        return this.removeRtlMarks(formatter(date));
      },
      parse: function parse(text, format) {
        if (!text) {
          return;
        }
        if (!format || typeof format === 'function' || (0, _type.isObject)(format) && !this._isAcceptableFormat(format)) {
          if (format) {
            var parsedValue = this.callBase(text, format);
            if (parsedValue) {
              return parsedValue;
            }
          }
          return _globalize.default.parseDate(text);
        }
        if (format.parser) {
          return format.parser(text);
        }
        if (typeof format === 'string') {
          format = {
            raw: this._getPatternByFormat(format) || format
          };
        }
        var parsedDate = _globalize.default.parseDate(text, format);
        return parsedDate ? parsedDate : this.callBase(text, format);
      },
      _isAcceptableFormat: function _isAcceptableFormat(format) {
        if (format.parser) {
          return true;
        }
        for (var i = 0; i < ACCEPTABLE_JSON_FORMAT_PROPERTIES.length; i++) {
          if (Object.prototype.hasOwnProperty.call(format, ACCEPTABLE_JSON_FORMAT_PROPERTIES[i])) {
            return true;
          }
        }
      },
      firstDayOfWeekIndex: function firstDayOfWeekIndex() {
        var firstDay = _globalize.default.locale().supplemental.weekData.firstDay();
        return this._getDayKeys().indexOf(firstDay);
      },
      _getDayKeys: function _getDayKeys() {
        var days = _globalize.default.locale().main('dates/calendars/gregorian/days/format/short');
        return iteratorUtils.map(days, function (day, key) {
          return key;
        });
      }
    };
    _date2.default.resetInjection();
    _date2.default.inject(globalizeDateLocalization);
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./core","./number","globalize/date","globalize","../date","../../core/utils/type","../../core/utils/iterator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./core"), require("./number"), require("globalize/date"), require("globalize"), require("../date"), require("../../core/utils/type"), require("../../core/utils/iterator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=date.js.map