!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/date_box/ui.date_utils.js"], ["../../core/renderer","../../core/utils/date_serialization","../../core/utils/type","../../core/utils/iterator","../../localization/date"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/date_box/ui.date_utils.js", ["../../core/renderer", "../../core/utils/date_serialization", "../../core/utils/type", "../../core/utils/iterator", "../../localization/date"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _date_serialization = _interopRequireDefault($__require("../../core/utils/date_serialization"));
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _date = _interopRequireDefault($__require("../../localization/date"));
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
  var DATE_COMPONENTS = ['year', 'day', 'month', 'day'];
  var TIME_COMPONENTS = ['hours', 'minutes', 'seconds', 'milliseconds'];
  var ONE_MINUTE = 1000 * 60;
  var ONE_DAY = ONE_MINUTE * 60 * 24;
  var ONE_YEAR = ONE_DAY * 365;
  var getStringFormat = function getStringFormat(format) {
    var formatType = _typeof(format);
    if (formatType === 'string') {
      return 'format';
    }
    if (formatType === 'object' && format.type !== undefined) {
      return format.type;
    }
    return null;
  };
  var dateUtils = {
    SUPPORTED_FORMATS: ['date', 'time', 'datetime'],
    ONE_MINUTE: ONE_MINUTE,
    ONE_DAY: ONE_DAY,
    ONE_YEAR: ONE_YEAR,
    MIN_DATEVIEW_DEFAULT_DATE: new Date(1900, 0, 1),
    MAX_DATEVIEW_DEFAULT_DATE: function () {
      var newDate = new Date();
      return new Date(newDate.getFullYear() + 50, newDate.getMonth(), newDate.getDate(), 23, 59, 59);
    }(),
    FORMATS_INFO: {
      'date': {
        getStandardPattern: function getStandardPattern() {
          return 'yyyy-MM-dd';
        },
        components: DATE_COMPONENTS
      },
      'time': {
        getStandardPattern: function getStandardPattern() {
          return 'HH:mm';
        },
        components: TIME_COMPONENTS
      },
      'datetime': {
        getStandardPattern: function getStandardPattern() {
          var standardPattern;
          (function androidFormatDetection() {
            var androidFormatPattern = 'yyyy-MM-ddTHH:mmZ';
            var testDateString = '2000-01-01T01:01Z';
            var $input = (0, _renderer.default)('<input>').attr('type', 'datetime');
            $input.val(testDateString);
            if ($input.val()) {
              standardPattern = androidFormatPattern;
            }
          })();
          if (!standardPattern) {
            standardPattern = 'yyyy-MM-ddTHH:mm:ssZ';
          }
          dateUtils.FORMATS_INFO['datetime'].getStandardPattern = function () {
            return standardPattern;
          };
          return standardPattern;
        },
        components: [].concat(DATE_COMPONENTS, TIME_COMPONENTS)
      },
      'datetime-local': {
        getStandardPattern: function getStandardPattern() {
          return 'yyyy-MM-ddTHH:mm:ss';
        },
        components: [].concat(DATE_COMPONENTS, ['hours', 'minutes', 'seconds'])
      }
    },
    FORMATS_MAP: {
      'date': 'shortdate',
      'time': 'shorttime',
      'datetime': 'shortdateshorttime'
    },
    SUBMIT_FORMATS_MAP: {
      'date': 'date',
      'time': 'time',
      'datetime': 'datetime-local'
    },
    toStandardDateFormat: function toStandardDateFormat(date, type) {
      var pattern = dateUtils.FORMATS_INFO[type].getStandardPattern();
      return _date_serialization.default.serializeDate(date, pattern);
    },
    fromStandardDateFormat: function fromStandardDateFormat(text) {
      var date = _date_serialization.default.dateParser(text);
      return (0, _type.isDate)(date) ? date : undefined;
    },
    getMaxMonthDay: function getMaxMonthDay(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    mergeDates: function mergeDates(oldValue, newValue, format) {
      if (!newValue) {
        return newValue || null;
      }
      if (!oldValue || isNaN(oldValue.getTime())) {
        var now = new Date(null);
        oldValue = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      }
      var result = new Date(oldValue.valueOf());
      var formatInfo = dateUtils.FORMATS_INFO[format];
      (0, _iterator.each)(formatInfo.components, function () {
        var componentInfo = dateUtils.DATE_COMPONENTS_INFO[this];
        result[componentInfo.setter](newValue[componentInfo.getter]());
      });
      return result;
    },
    getLongestCaptionIndex: function getLongestCaptionIndex(captionArray) {
      var longestIndex = 0;
      var longestCaptionLength = 0;
      var i;
      for (i = 0; i < captionArray.length; ++i) {
        if (captionArray[i].length > longestCaptionLength) {
          longestIndex = i;
          longestCaptionLength = captionArray[i].length;
        }
      }
      return longestIndex;
    },
    formatUsesMonthName: function formatUsesMonthName(format) {
      return _date.default.formatUsesMonthName(format);
    },
    formatUsesDayName: function formatUsesDayName(format) {
      return _date.default.formatUsesDayName(format);
    },
    getLongestDate: function getLongestDate(format, monthNames, dayNames) {
      var stringFormat = getStringFormat(format);
      var month = 9;
      if (!stringFormat || dateUtils.formatUsesMonthName(stringFormat)) {
        month = dateUtils.getLongestCaptionIndex(monthNames);
      }
      var longestDate = new Date(1888, month, 21, 23, 59, 59, 999);
      if (!stringFormat || dateUtils.formatUsesDayName(stringFormat)) {
        var date = longestDate.getDate() - longestDate.getDay() + dateUtils.getLongestCaptionIndex(dayNames);
        longestDate.setDate(date);
      }
      return longestDate;
    },
    normalizeTime: function normalizeTime(date) {
      date.setSeconds(0);
      date.setMilliseconds(0);
    }
  };
  dateUtils.DATE_COMPONENTS_INFO = {
    'year': {
      getter: 'getFullYear',
      setter: 'setFullYear',
      formatter: function formatter(value, date) {
        var formatDate = new Date(date.getTime());
        formatDate.setFullYear(value);
        return _date.default.format(formatDate, 'yyyy');
      },
      startValue: undefined,
      endValue: undefined
    },
    'day': {
      getter: 'getDate',
      setter: 'setDate',
      formatter: function formatter(value, date) {
        var formatDate = new Date(date.getTime());
        formatDate.setDate(value);
        return _date.default.format(formatDate, 'd');
      },
      startValue: 1,
      endValue: undefined
    },
    'month': {
      getter: 'getMonth',
      setter: 'setMonth',
      formatter: function formatter(value) {
        return _date.default.getMonthNames()[value];
      },
      startValue: 0,
      endValue: 11
    },
    'hours': {
      getter: 'getHours',
      setter: 'setHours',
      formatter: function formatter(value) {
        return _date.default.format(new Date(0, 0, 0, value), 'hour');
      },
      startValue: 0,
      endValue: 23
    },
    'minutes': {
      getter: 'getMinutes',
      setter: 'setMinutes',
      formatter: function formatter(value) {
        return _date.default.format(new Date(0, 0, 0, 0, value), 'minute');
      },
      startValue: 0,
      endValue: 59
    },
    'seconds': {
      getter: 'getSeconds',
      setter: 'setSeconds',
      formatter: function formatter(value) {
        return _date.default.format(new Date(0, 0, 0, 0, 0, value), 'second');
      },
      startValue: 0,
      endValue: 59
    },
    'milliseconds': {
      getter: 'getMilliseconds',
      setter: 'setMilliseconds',
      formatter: function formatter(value) {
        return _date.default.format(new Date(0, 0, 0, 0, 0, 0, value), 'millisecond');
      },
      startValue: 0,
      endValue: 999
    }
  };
  var _default = dateUtils;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/date_serialization","../../core/utils/type","../../core/utils/iterator","../../localization/date"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/date_serialization"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../localization/date"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.date_utils.js.map