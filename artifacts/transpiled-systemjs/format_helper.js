!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/format_helper.js"], ["./core/utils/type","./core/utils/date","./localization/number","./localization/date","./core/utils/dependency_injector","./localization/currency"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/format_helper.js", ["./core/utils/type", "./core/utils/date", "./localization/number", "./localization/date", "./core/utils/dependency_injector", "./localization/currency"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _type = $__require("./core/utils/type");
  var _date = _interopRequireDefault($__require("./core/utils/date"));
  var _number = _interopRequireDefault($__require("./localization/number"));
  var _date2 = _interopRequireDefault($__require("./localization/date"));
  var _dependency_injector = _interopRequireDefault($__require("./core/utils/dependency_injector"));
  $__require("./localization/currency");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var _default = (0, _dependency_injector.default)({
    format: function format(value, _format) {
      var formatIsValid = (0, _type.isString)(_format) && _format !== '' || (0, _type.isPlainObject)(_format) || (0, _type.isFunction)(_format);
      var valueIsValid = (0, _type.isNumeric)(value) || (0, _type.isDate)(value);
      if (!formatIsValid || !valueIsValid) {
        return (0, _type.isDefined)(value) ? value.toString() : '';
      }
      if ((0, _type.isFunction)(_format)) {
        return _format(value);
      }
      if ((0, _type.isString)(_format)) {
        _format = {
          type: _format
        };
      }
      if ((0, _type.isNumeric)(value)) {
        return _number.default.format(value, _format);
      }
      if ((0, _type.isDate)(value)) {
        return _date2.default.format(value, _format);
      }
    },
    getTimeFormat: function getTimeFormat(showSecond) {
      return showSecond ? 'longtime' : 'shorttime';
    },
    _normalizeFormat: function _normalizeFormat(format) {
      if (!Array.isArray(format)) {
        return format;
      }
      if (format.length === 1) {
        return format[0];
      }
      return function (date) {
        return format.map(function (formatPart) {
          return _date2.default.format(date, formatPart);
        }).join(' ');
      };
    },
    getDateFormatByDifferences: function getDateFormatByDifferences(dateDifferences, intervalFormat) {
      var resultFormat = [];
      var needSpecialSecondFormatter = intervalFormat && dateDifferences.millisecond && !(dateDifferences.year || dateDifferences.month || dateDifferences.day);
      if (needSpecialSecondFormatter) {
        var secondFormatter = function secondFormatter(date) {
          return date.getSeconds() + date.getMilliseconds() / 1000 + 's';
        };
        resultFormat.push(secondFormatter);
      } else if (dateDifferences.millisecond) {
        resultFormat.push('millisecond');
      }
      if (dateDifferences.hour || dateDifferences.minute || !needSpecialSecondFormatter && dateDifferences.second) {
        resultFormat.unshift(this.getTimeFormat(dateDifferences.second));
      }
      if (dateDifferences.year && dateDifferences.month && dateDifferences.day) {
        if (intervalFormat && intervalFormat === 'month') {
          return 'monthandyear';
        } else {
          resultFormat.unshift('shortdate');
          return this._normalizeFormat(resultFormat);
        }
      }
      if (dateDifferences.year && dateDifferences.month) {
        return 'monthandyear';
      }
      if (dateDifferences.year && dateDifferences.quarter) {
        return 'quarterandyear';
      }
      if (dateDifferences.year) {
        return 'year';
      }
      if (dateDifferences.quarter) {
        return 'quarter';
      }
      if (dateDifferences.month && dateDifferences.day) {
        if (intervalFormat) {
          var monthDayFormatter = function monthDayFormatter(date) {
            return _date2.default.getMonthNames('abbreviated')[date.getMonth()] + ' ' + _date2.default.format(date, 'day');
          };
          resultFormat.unshift(monthDayFormatter);
        } else {
          resultFormat.unshift('monthandday');
        }
        return this._normalizeFormat(resultFormat);
      }
      if (dateDifferences.month) {
        return 'month';
      }
      if (dateDifferences.day) {
        if (intervalFormat) {
          resultFormat.unshift('day');
        } else {
          var dayFormatter = function dayFormatter(date) {
            return _date2.default.format(date, 'dayofweek') + ', ' + _date2.default.format(date, 'day');
          };
          resultFormat.unshift(dayFormatter);
        }
        return this._normalizeFormat(resultFormat);
      }
      return this._normalizeFormat(resultFormat);
    },
    getDateFormatByTicks: function getDateFormatByTicks(ticks) {
      var maxDiff;
      var currentDiff;
      var i;
      if (ticks.length > 1) {
        maxDiff = _date.default.getDatesDifferences(ticks[0], ticks[1]);
        for (i = 1; i < ticks.length - 1; i++) {
          currentDiff = _date.default.getDatesDifferences(ticks[i], ticks[i + 1]);
          if (maxDiff.count < currentDiff.count) {
            maxDiff = currentDiff;
          }
        }
      } else {
        maxDiff = {
          year: true,
          month: true,
          day: true,
          hour: ticks[0].getHours() > 0,
          minute: ticks[0].getMinutes() > 0,
          second: ticks[0].getSeconds() > 0,
          millisecond: ticks[0].getMilliseconds() > 0
        };
      }
      var resultFormat = this.getDateFormatByDifferences(maxDiff);
      return resultFormat;
    },
    getDateFormatByTickInterval: function getDateFormatByTickInterval(startValue, endValue, tickInterval) {
      var dateUnitInterval;
      var dateDifferencesConverter = {
        week: 'day'
      };
      var correctDateDifferences = function correctDateDifferences(dateDifferences, tickInterval, value) {
        switch (tickInterval) {
          case 'year':
          case 'quarter':
            dateDifferences.month = value;
          /* falls through */
          case 'month':
            dateDifferences.day = value;
          /* falls through */
          case 'week':
          case 'day':
            dateDifferences.hour = value;
          /* falls through */
          case 'hour':
            dateDifferences.minute = value;
          /* falls through */
          case 'minute':
            dateDifferences.second = value;
          /* falls through */
          case 'second':
            dateDifferences.millisecond = value;
        }
      };
      var correctDifferencesByMaxDate = function correctDifferencesByMaxDate(differences, minDate, maxDate) {
        if (!maxDate.getMilliseconds() && maxDate.getSeconds()) {
          if (maxDate.getSeconds() - minDate.getSeconds() === 1) {
            differences.millisecond = true;
            differences.second = false;
          }
        } else if (!maxDate.getSeconds() && maxDate.getMinutes()) {
          if (maxDate.getMinutes() - minDate.getMinutes() === 1) {
            differences.second = true;
            differences.minute = false;
          }
        } else if (!maxDate.getMinutes() && maxDate.getHours()) {
          if (maxDate.getHours() - minDate.getHours() === 1) {
            differences.minute = true;
            differences.hour = false;
          }
        } else if (!maxDate.getHours() && maxDate.getDate() > 1) {
          if (maxDate.getDate() - minDate.getDate() === 1) {
            differences.hour = true;
            differences.day = false;
          }
        } else if (maxDate.getDate() === 1 && maxDate.getMonth()) {
          if (maxDate.getMonth() - minDate.getMonth() === 1) {
            differences.day = true;
            differences.month = false;
          }
        } else if (!maxDate.getMonth() && maxDate.getFullYear()) {
          if (maxDate.getFullYear() - minDate.getFullYear() === 1) {
            differences.month = true;
            differences.year = false;
          }
        }
      };
      tickInterval = (0, _type.isString)(tickInterval) ? tickInterval.toLowerCase() : tickInterval;
      var dateDifferences = _date.default.getDatesDifferences(startValue, endValue);
      if (startValue !== endValue) {
        correctDifferencesByMaxDate(dateDifferences, startValue > endValue ? endValue : startValue, startValue > endValue ? startValue : endValue);
      }
      dateUnitInterval = _date.default.getDateUnitInterval(dateDifferences);
      correctDateDifferences(dateDifferences, dateUnitInterval, true);
      dateUnitInterval = _date.default.getDateUnitInterval(tickInterval || 'second');
      correctDateDifferences(dateDifferences, dateUnitInterval, false);
      dateDifferences[dateDifferencesConverter[dateUnitInterval] || dateUnitInterval] = true;
      var resultFormat = this.getDateFormatByDifferences(dateDifferences);
      return resultFormat;
    }
  });
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./core/utils/type","./core/utils/date","./localization/number","./localization/date","./core/utils/dependency_injector","./localization/currency"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./core/utils/type"), require("./core/utils/date"), require("./localization/number"), require("./localization/date"), require("./core/utils/dependency_injector"), require("./localization/currency"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=format_helper.js.map