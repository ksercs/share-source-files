!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/axes/datetime_breaks.js"], ["../../core/utils/date"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/axes/datetime_breaks.js", ["../../core/utils/date"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.generateDateBreaks = generateDateBreaks;
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var days = [0, 1, 2, 3, 4, 5, 6];
  function getWeekendDays(workdays) {
    return days.filter(function (day) {
      return !workdays.some(function (workDay) {
        return workDay === day;
      });
    });
  }
  function getNextDayIndex(dayIndex) {
    return (dayIndex + 1) % 7;
  }
  function dayBetweenWeekend(weekend, day) {
    var start = weekend.start;
    var end = weekend.end;
    while (start !== end) {
      if (start === day) {
        return true;
      }
      start = getNextDayIndex(start);
    }
    return false;
  }
  function getDaysDistance(day, end) {
    var length = 0;
    while (day !== end) {
      day = getNextDayIndex(day);
      length++;
    }
    return length;
  }
  function separateBreak(scaleBreak, day) {
    var result = [];
    var dayEnd = new Date(day);
    dayEnd.setDate(day.getDate() + 1);
    if (day > scaleBreak.from) {
      result.push({
        from: scaleBreak.from,
        to: day
      });
    }
    if (dayEnd < scaleBreak.to) {
      result.push({
        from: dayEnd,
        to: scaleBreak.to
      });
    }
    return result;
  }
  function getWeekEndDayIndices(workDays) {
    var indices = getWeekendDays(workDays);
    if (indices.length < 7) {
      while (getNextDayIndex(indices[indices.length - 1]) === indices[0]) {
        indices.unshift(indices.pop());
      }
    }
    return indices;
  }
  function generateDateBreaksForWeekend(min, max, weekendDayIndices) {
    var day = min.getDate();
    var breaks = [];
    var weekends = weekendDayIndices.reduce(function (obj, day) {
      var currentWeekEnd = obj[1];
      if (currentWeekEnd.start === undefined) {
        currentWeekEnd = {
          start: day,
          end: getNextDayIndex(day)
        };
        obj[0].push(currentWeekEnd);
        return [obj[0], currentWeekEnd];
      } else if (currentWeekEnd.end === day) {
        currentWeekEnd.end = getNextDayIndex(day);
        return obj;
      }
      currentWeekEnd = {
        start: day,
        end: getNextDayIndex(day)
      };
      obj[0].push(currentWeekEnd);
      return [obj[0], currentWeekEnd];
    }, [[], {}]);
    weekends[0].forEach(function (weekend) {
      var currentDate = new Date(min);
      currentDate = _date.default.trimTime(currentDate);
      while (currentDate < max) {
        day = currentDate.getDay();
        var date = currentDate.getDate();
        if (dayBetweenWeekend(weekend, day)) {
          var from = new Date(currentDate);
          currentDate.setDate(date + getDaysDistance(day, weekend.end));
          var to = new Date(currentDate);
          breaks.push({
            from: from,
            to: to
          });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return breaks;
  }
  function excludeWorkDaysFromWeekEndBreaks(breaks, exactWorkDays) {
    var result = breaks.slice();
    var i;
    var processWorkDay = function processWorkDay(workday) {
      workday = _date.default.trimTime(new Date(workday));
      if (result[i].from <= workday && result[i].to > workday) {
        var separatedBreak = separateBreak(result[i], workday);
        if (separatedBreak.length === 2) {
          result.splice(i, 1, separatedBreak[0], separatedBreak[1]);
        } else if (separatedBreak.length === 1) {
          result.splice(i, 1, separatedBreak[0]);
        } else {
          result.splice(i, 1);
        }
      }
    };
    for (i = 0; i < result.length; i++) {
      exactWorkDays.forEach(processWorkDay);
    }
    return result;
  }
  function generateBreaksForHolidays(min, max, holidays, weekendDayIndices) {
    var day;
    var dayInWeekend = function dayInWeekend(dayIndex) {
      return dayIndex === day;
    };
    var adjustedMin = _date.default.trimTime(min);
    var adjustedMax = _date.default.trimTime(max);
    adjustedMax.setDate(max.getDate() + 1);
    return holidays.reduce(function (breaks, holiday) {
      var holidayStart;
      var holidayEnd;
      holiday = new Date(holiday);
      day = holiday.getDay();
      if (!weekendDayIndices.some(dayInWeekend) && holiday >= adjustedMin && holiday <= adjustedMax) {
        holidayStart = _date.default.trimTime(holiday);
        holidayEnd = new Date(holidayStart);
        holidayEnd.setDate(holidayStart.getDate() + 1);
        breaks.push({
          from: holidayStart,
          to: holidayEnd
        });
      }
      return breaks;
    }, []);
  }
  function calculateGaps(breaks) {
    return breaks.map(function (b) {
      return {
        from: b.from,
        to: b.to,
        gapSize: _date.default.convertMillisecondsToDateUnits(b.to - b.from)
      };
    });
  }
  function generateDateBreaks(min, max, workWeek, singleWorkdays, holidays) {
    var weekendDayIndices = getWeekEndDayIndices(workWeek);
    var breaks = generateDateBreaksForWeekend(min, max, weekendDayIndices);
    breaks.push.apply(breaks, generateBreaksForHolidays(min, max, holidays || [], weekendDayIndices));
    return calculateGaps(excludeWorkDaysFromWeekEndBreaks(breaks, singleWorkdays || []));
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/date"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/date"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=datetime_breaks.js.map