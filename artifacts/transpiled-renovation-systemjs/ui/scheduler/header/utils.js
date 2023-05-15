!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/header/utils.js"], ["../../../core/utils/date","../../../localization/date","../../../localization/message","../../../core/utils/inflector","../../../core/utils/type","../../../core/errors","../constants"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/header/utils.js", ["../../../core/utils/date", "../../../localization/date", "../../../localization/message", "../../../core/utils/inflector", "../../../core/utils/type", "../../../core/errors", "../constants"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.validateViews = exports.nextWeek = exports.isOneView = exports.getViewType = exports.getViewText = exports.getViewName = exports.getStep = exports.getNextIntervalDate = exports.getCaption = exports.formatViews = void 0;
  var _date = _interopRequireDefault($__require("../../../core/utils/date"));
  var _date2 = _interopRequireDefault($__require("../../../localization/date"));
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _inflector = $__require("../../../core/utils/inflector");
  var _type = $__require("../../../core/utils/type");
  var _errors = _interopRequireDefault($__require("../../../core/errors"));
  var _constants = $__require("../constants");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DAY_FORMAT = 'd';
  var DAYS_IN_WORK_WEEK = 5;
  var getPeriodStart = _date.default.correctDateWithUnitBeginning,
      getWeekStart = _date.default.getFirstWeekDate,
      getLastMonthDay = _date.default.getLastMonthDay,
      addDateInterval = _date.default.addDateInterval;
  var formatDate = _date2.default.format;
  var MS_DURATION = {
    milliseconds: 1
  };
  var DAY_DURATION = {
    days: 1
  };
  var WEEK_DURATION = {
    days: 7
  };
  var SATURDAY_INDEX = 6;
  var SUNDAY_INDEX = 0;
  var subMS = function subMS(date) {
    return addDateInterval(date, MS_DURATION, -1);
  };
  var addMS = function addMS(date) {
    return addDateInterval(date, MS_DURATION, 1);
  };
  var nextDay = function nextDay(date) {
    return addDateInterval(date, DAY_DURATION, 1);
  };
  var nextWeek = function nextWeek(date) {
    return addDateInterval(date, WEEK_DURATION, 1);
  };
  exports.nextWeek = nextWeek;
  var nextMonth = function nextMonth(date) {
    var days = getLastMonthDay(date);
    return addDateInterval(date, {
      days: days
    }, 1);
  };
  var isWeekend = function isWeekend(date) {
    return date.getDay() === SATURDAY_INDEX || date.getDay() === SUNDAY_INDEX;
  };
  var getWorkWeekStart = function getWorkWeekStart(firstDayOfWeek) {
    var date = new Date(firstDayOfWeek);
    while (isWeekend(date)) {
      date = nextDay(date);
    }
    return date;
  };
  var getDateAfterWorkWeek = function getDateAfterWorkWeek(workWeekStart) {
    var date = new Date(workWeekStart);
    var workDaysCount = 0;
    while (workDaysCount < DAYS_IN_WORK_WEEK) {
      if (!isWeekend(date)) {
        workDaysCount++;
      }
      date = nextDay(date);
    }
    return date;
  };
  var nextAgendaStart = function nextAgendaStart(date, agendaDuration) {
    return addDateInterval(date, {
      days: agendaDuration
    }, 1);
  };
  var getInterval = function getInterval(options) {
    var startDate = getIntervalStartDate(options);
    var endDate = getIntervalEndDate(startDate, options);
    return {
      startDate: startDate,
      endDate: endDate
    };
  };
  var getIntervalStartDate = function getIntervalStartDate(options) {
    var date = options.date,
        step = options.step,
        firstDayOfWeek = options.firstDayOfWeek;
    switch (step) {
      case 'day':
      case 'week':
      case 'month':
        return getPeriodStart(date, step, false, firstDayOfWeek);
      case 'workWeek':
        // eslint-disable-next-line no-case-declarations
        var firstWeekDay = getWeekStart(date, firstDayOfWeek);
        return getWorkWeekStart(firstWeekDay);
      case 'agenda':
        return new Date(date);
    }
  };
  var getIntervalEndDate = function getIntervalEndDate(startDate, options) {
    var intervalCount = options.intervalCount,
        step = options.step,
        agendaDuration = options.agendaDuration;
    var periodStartDate;
    var periodEndDate;
    var nextPeriodStartDate = new Date(startDate);
    for (var i = 0; i < intervalCount; i++) {
      periodStartDate = nextPeriodStartDate;
      periodEndDate = getPeriodEndDate(periodStartDate, step, agendaDuration);
      nextPeriodStartDate = getNextPeriodStartDate(periodEndDate, step);
    }
    return periodEndDate;
  };
  var getPeriodEndDate = function getPeriodEndDate(currentPeriodStartDate, step, agendaDuration) {
    var date;
    switch (step) {
      case 'day':
        date = nextDay(currentPeriodStartDate);
        break;
      case 'week':
        date = nextWeek(currentPeriodStartDate);
        break;
      case 'month':
        date = nextMonth(currentPeriodStartDate);
        break;
      case 'workWeek':
        date = getDateAfterWorkWeek(currentPeriodStartDate);
        break;
      case 'agenda':
        date = nextAgendaStart(currentPeriodStartDate, agendaDuration);
        break;
    }
    return subMS(date);
  };
  var getNextPeriodStartDate = function getNextPeriodStartDate(currentPeriodEndDate, step) {
    var date = addMS(currentPeriodEndDate);
    if (step === 'workWeek') {
      while (isWeekend(date)) {
        date = nextDay(date);
      }
    }
    return date;
  };
  var getNextIntervalDate = function getNextIntervalDate(options, direction) {
    var date = options.date,
        step = options.step,
        intervalCount = options.intervalCount,
        agendaDuration = options.agendaDuration;
    var dayDuration;
    switch (step) {
      case 'day':
        dayDuration = 1 * intervalCount;
        break;
      case 'week':
      case 'workWeek':
        dayDuration = 7 * intervalCount;
        break;
      case 'agenda':
        dayDuration = agendaDuration;
        break;
      case 'month':
        return getNextMonthDate(date, intervalCount, direction);
    }
    return addDateInterval(date, {
      days: dayDuration
    }, direction);
  };
  exports.getNextIntervalDate = getNextIntervalDate;
  var getNextMonthDate = function getNextMonthDate(date, intervalCount, direction) {
    var currentDate = date.getDate();
    var currentMonthFirstDate = new Date(new Date(date.getTime()).setDate(1));
    var thatMonthFirstDate = new Date(currentMonthFirstDate.setMonth(currentMonthFirstDate.getMonth() + intervalCount * direction));
    var thatMonthDuration = getLastMonthDay(thatMonthFirstDate);
    var minDate = currentDate < thatMonthDuration ? currentDate : thatMonthDuration;
    var currentMonthMinDate = new Date(new Date(date.getTime()).setDate(minDate));
    var thatMonthMinDate = new Date(currentMonthMinDate.setMonth(currentMonthMinDate.getMonth() + intervalCount * direction));
    return thatMonthMinDate;
  };
  var getDateMonthFormatter = function getDateMonthFormatter(isShort) {
    var monthType = isShort ? 'abbreviated' : 'wide';
    var months = _date2.default.getMonthNames(monthType);
    return function (date) {
      var day = formatDate(date, 'day');
      var month = months[date.getMonth()];
      return "".concat(day, " ").concat(month);
    };
  };
  var formatMonthYear = function formatMonthYear(date) {
    var months = _date2.default.getMonthNames('abbreviated');
    var month = months[date.getMonth()];
    var year = formatDate(date, 'year');
    return "".concat(month, " ").concat(year);
  };
  var getDateMonthYearFormatter = function getDateMonthYearFormatter(isShort) {
    return function (date) {
      var dateMonthFormat = getDateMonthFormatter(isShort);
      var dateMonth = dateMonthFormat(date);
      var year = formatDate(date, 'year');
      return "".concat(dateMonth, " ").concat(year);
    };
  };
  var getDifferentYearCaption = function getDifferentYearCaption(startDate, endDate) {
    var firstDateText = formatDate(startDate, getDateMonthYearFormatter(true));
    var lastDateDateText = formatDate(endDate, getDateMonthYearFormatter(true));
    return "".concat(firstDateText, "-").concat(lastDateDateText);
  };
  var getSameYearCaption = function getSameYearCaption(startDate, endDate, isShort) {
    var isDifferentMonthDates = startDate.getMonth() !== endDate.getMonth();
    var useShortFormat = isDifferentMonthDates || isShort;
    var firstDateFormat = isDifferentMonthDates ? getDateMonthFormatter(useShortFormat) : DAY_FORMAT;
    var firstDateText = formatDate(startDate, firstDateFormat);
    var lastDateText = formatDate(endDate, getDateMonthYearFormatter(useShortFormat));
    return "".concat(firstDateText, "-").concat(lastDateText);
  };
  var getSameDateCaption = function getSameDateCaption(date, step, isShort) {
    var useShortFormat = step === 'agenda' ? isShort : false;
    var dateMonthFormat = getDateMonthFormatter(useShortFormat);
    var dateMonth = dateMonthFormat(date);
    var year = formatDate(date, 'year');
    return "".concat(dateMonth, " ").concat(year);
  };
  var formatCaptionByMonths = function formatCaptionByMonths(startDate, endDate, isShort) {
    var isDifferentYears = startDate.getFullYear() !== endDate.getFullYear();
    if (isDifferentYears) {
      return getDifferentYearCaption(startDate, endDate);
    }
    return getSameYearCaption(startDate, endDate, isShort);
  };
  var formatMonthViewCaption = function formatMonthViewCaption(startDate, endDate) {
    if (_date.default.sameMonth(startDate, endDate)) {
      return formatDate(startDate, 'monthandyear');
    }
    var isSameYear = _date.default.sameYear(startDate, endDate);
    var firstDateText = isSameYear ? _date2.default.getMonthNames('abbreviated')[startDate.getMonth()] : formatMonthYear(startDate);
    var lastDateText = formatMonthYear(endDate);
    return "".concat(firstDateText, "-").concat(lastDateText);
  };
  var getCaptionText = function getCaptionText(startDate, endDate, isShort, step) {
    if (_date.default.sameDate(startDate, endDate)) {
      return getSameDateCaption(startDate, step, isShort);
    }
    if (step === 'month') {
      return formatMonthViewCaption(startDate, endDate);
    }
    return formatCaptionByMonths(startDate, endDate, isShort);
  };
  var getCaption = function getCaption(options, isShort, customizationFunction) {
    var _getInterval = getInterval(options),
        startDate = _getInterval.startDate,
        endDate = _getInterval.endDate;
    var text = getCaptionText(startDate, endDate, isShort, options.step);
    if ((0, _type.isFunction)(customizationFunction)) {
      text = customizationFunction({
        startDate: startDate,
        endDate: endDate,
        text: text
      });
    }
    return {
      startDate: startDate,
      endDate: endDate,
      text: text
    };
  };
  exports.getCaption = getCaption;
  var STEP_MAP = {
    day: 'day',
    week: 'week',
    workWeek: 'workWeek',
    month: 'month',
    timelineDay: 'day',
    timelineWeek: 'week',
    timelineWorkWeek: 'workWeek',
    timelineMonth: 'month',
    agenda: 'agenda'
  };
  var getStep = function getStep(view) {
    return STEP_MAP[getViewType(view)];
  };
  exports.getStep = getStep;
  var getViewType = function getViewType(view) {
    if ((0, _type.isObject)(view) && view.type) {
      return view.type;
    }
    return view;
  };
  exports.getViewType = getViewType;
  var getViewName = function getViewName(view) {
    if ((0, _type.isObject)(view)) {
      return view.name ? view.name : view.type;
    }
    return view;
  };
  exports.getViewName = getViewName;
  var getViewText = function getViewText(view) {
    if (view.name) return view.name;
    var viewName = (0, _inflector.camelize)(view.type || view, true);
    return _message.default.format('dxScheduler-switcher' + viewName);
  };
  exports.getViewText = getViewText;
  var isValidView = function isValidView(view) {
    return Object.values(_constants.VIEWS).includes(view);
  };
  var validateViews = function validateViews(views) {
    views.forEach(function (view) {
      var viewType = getViewType(view);
      if (!isValidView(viewType)) {
        _errors.default.log('W0008', viewType);
      }
    });
  };
  exports.validateViews = validateViews;
  var formatViews = function formatViews(views) {
    validateViews(views);
    return views.map(function (view) {
      var text = getViewText(view);
      var type = getViewType(view);
      var name = getViewName(view);
      return {
        text: text,
        name: name,
        view: {
          text: text,
          type: type,
          name: name
        }
      };
    });
  };
  exports.formatViews = formatViews;
  var isOneView = function isOneView(views, selectedView) {
    return views.length === 1 && views[0].name === selectedView;
  };
  exports.isOneView = isOneView;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/date","../../../localization/date","../../../localization/message","../../../core/utils/inflector","../../../core/utils/type","../../../core/errors","../constants"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/date"), require("../../../localization/date"), require("../../../localization/message"), require("../../../core/utils/inflector"), require("../../../core/utils/type"), require("../../../core/errors"), require("../constants"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.js.map