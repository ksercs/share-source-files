!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/scheduler/view_model/to_test/views/utils/base.js"], ["../../../../../../../ui/widget/ui.errors","../../../../../../../core/utils/date","../../../../../../../core/utils/type","../../../../../../../localization/date","../../../../../../../ui/scheduler/utils.timeZone","../../../../../../../ui/scheduler/classes","../../../../../../../ui/scheduler/constants","../../../../../../../ui/scheduler/resources/utils","../../../../workspaces/utils","./const"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/scheduler/view_model/to_test/views/utils/base.js", ["../../../../../../../ui/widget/ui.errors", "../../../../../../../core/utils/date", "../../../../../../../core/utils/type", "../../../../../../../localization/date", "../../../../../../../ui/scheduler/utils.timeZone", "../../../../../../../ui/scheduler/classes", "../../../../../../../ui/scheduler/constants", "../../../../../../../ui/scheduler/resources/utils", "../../../../workspaces/utils", "./const"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.validateDayHours = exports.setOptionHour = exports.isTimelineView = exports.isHorizontalView = exports.isDateInRange = exports.isDateAndTimeView = exports.getViewStartByOptions = exports.getVerticalGroupCountClass = exports.getTotalRowCountByCompleteData = exports.getTotalCellCountByCompleteData = exports.getToday = exports.getStartViewDateWithoutDST = exports.getStartViewDateTimeOffset = exports.getHorizontalGroupCount = exports.getHeaderCellText = exports.getDisplayedRowCount = exports.getDisplayedCellCount = exports.getCellDuration = exports.getCalculatedFirstDayOfWeek = exports.formatWeekdayAndDay = exports.formatWeekday = exports.calculateViewStartDate = exports.calculateIsGroupedAllDayPanel = exports.calculateDayDuration = exports.calculateCellIndex = void 0;
  var _ui = _interopRequireDefault($__require("../../../../../../../ui/widget/ui.errors"));
  var _date = _interopRequireDefault($__require("../../../../../../../core/utils/date"));
  var _type = $__require("../../../../../../../core/utils/type");
  var _date2 = _interopRequireDefault($__require("../../../../../../../localization/date"));
  var _utils = _interopRequireDefault($__require("../../../../../../../ui/scheduler/utils.timeZone"));
  var _classes = $__require("../../../../../../../ui/scheduler/classes");
  var _constants = $__require("../../../../../../../ui/scheduler/constants");
  var _utils2 = $__require("../../../../../../../ui/scheduler/resources/utils");
  var _utils3 = $__require("../../../../workspaces/utils");
  var _const = $__require("./const");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var isDateInRange = function isDateInRange(date, startDate, endDate, diff) {
    return diff > 0 ? _date.default.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : _date.default.dateInRange(date, endDate, startDate, 'date');
  };
  exports.isDateInRange = isDateInRange;
  var setOptionHour = function setOptionHour(date, optionHour) {
    var nextDate = new Date(date);
    if (!(0, _type.isDefined)(optionHour)) {
      return nextDate;
    }
    nextDate.setHours(optionHour, optionHour % 1 * 60, 0, 0);
    return nextDate;
  };
  exports.setOptionHour = setOptionHour;
  var getViewStartByOptions = function getViewStartByOptions(startDate, currentDate, intervalDuration, startViewDate) {
    if (!startDate) {
      return new Date(currentDate);
    }
    var currentStartDate = _date.default.trimTime(startViewDate);
    var diff = currentStartDate.getTime() <= currentDate.getTime() ? 1 : -1;
    var endDate = new Date(currentStartDate.getTime() + intervalDuration * diff);
    while (!isDateInRange(currentDate, currentStartDate, endDate, diff)) {
      currentStartDate = endDate;
      endDate = new Date(currentStartDate.getTime() + intervalDuration * diff);
    }
    return diff > 0 ? currentStartDate : endDate;
  };
  exports.getViewStartByOptions = getViewStartByOptions;
  var getCalculatedFirstDayOfWeek = function getCalculatedFirstDayOfWeek(firstDayOfWeekOption) {
    return (0, _type.isDefined)(firstDayOfWeekOption) ? firstDayOfWeekOption : _date2.default.firstDayOfWeekIndex();
  };
  exports.getCalculatedFirstDayOfWeek = getCalculatedFirstDayOfWeek;
  var calculateViewStartDate = function calculateViewStartDate(startDateOption) {
    return startDateOption;
  };
  exports.calculateViewStartDate = calculateViewStartDate;
  var calculateCellIndex = function calculateCellIndex(rowIndex, columnIndex, rowCount) {
    return columnIndex * rowCount + rowIndex;
  };
  exports.calculateCellIndex = calculateCellIndex;
  var getStartViewDateWithoutDST = function getStartViewDateWithoutDST(startViewDate, startDayHour) {
    var newStartViewDate = _utils.default.getDateWithoutTimezoneChange(startViewDate);
    newStartViewDate.setHours(startDayHour);
    return newStartViewDate;
  };
  exports.getStartViewDateWithoutDST = getStartViewDateWithoutDST;
  var getHeaderCellText = function getHeaderCellText(headerIndex, date, headerCellTextFormat, getDateForHeaderText, additionalOptions) {
    var validDate = getDateForHeaderText(headerIndex, date, additionalOptions);
    return _date2.default.format(validDate, headerCellTextFormat);
  };
  exports.getHeaderCellText = getHeaderCellText;
  var validateDayHours = function validateDayHours(startDayHour, endDayHour) {
    if (startDayHour >= endDayHour) {
      throw _ui.default.Error('E1058');
    }
  };
  exports.validateDayHours = validateDayHours;
  var getStartViewDateTimeOffset = function getStartViewDateTimeOffset(startViewDate, startDayHour) {
    var validStartDayHour = Math.floor(startDayHour);
    var isDSTChange = _utils.default.isTimezoneChangeInDate(startViewDate);
    if (isDSTChange && validStartDayHour !== startViewDate.getHours()) {
      return _date.default.dateToMilliseconds('hour');
    }
    return 0;
  };
  exports.getStartViewDateTimeOffset = getStartViewDateTimeOffset;
  var formatWeekday = function formatWeekday(date) {
    return _date2.default.getDayNames('abbreviated')[date.getDay()];
  };
  exports.formatWeekday = formatWeekday;
  var formatWeekdayAndDay = function formatWeekdayAndDay(date) {
    return "".concat(formatWeekday(date), " ").concat(_date2.default.format(date, 'day'));
  };
  exports.formatWeekdayAndDay = formatWeekdayAndDay;
  var getToday = function getToday(indicatorTime, timeZoneCalculator) {
    var todayDate = indicatorTime !== null && indicatorTime !== void 0 ? indicatorTime : new Date();
    return (timeZoneCalculator === null || timeZoneCalculator === void 0 ? void 0 : timeZoneCalculator.createDate(todayDate, {
      path: 'toGrid'
    })) || todayDate;
  };
  exports.getToday = getToday;
  var getVerticalGroupCountClass = function getVerticalGroupCountClass(groups) {
    switch (groups === null || groups === void 0 ? void 0 : groups.length) {
      case 1:
        return _classes.VERTICAL_GROUP_COUNT_CLASSES[0];
      case 2:
        return _classes.VERTICAL_GROUP_COUNT_CLASSES[1];
      case 3:
        return _classes.VERTICAL_GROUP_COUNT_CLASSES[2];
      default:
        return undefined;
    }
  };
  exports.getVerticalGroupCountClass = getVerticalGroupCountClass;
  var isDateAndTimeView = function isDateAndTimeView(viewType) {
    return viewType !== _constants.VIEWS.TIMELINE_MONTH && viewType !== _constants.VIEWS.MONTH;
  };
  exports.isDateAndTimeView = isDateAndTimeView;
  var isTimelineView = function isTimelineView(viewType) {
    return !!_const.TIMELINE_VIEWS[viewType];
  };
  exports.isTimelineView = isTimelineView;
  var getHorizontalGroupCount = function getHorizontalGroupCount(groups, groupOrientation) {
    var groupCount = (0, _utils2.getGroupCount)(groups) || 1;
    var isVerticalGrouping = (0, _utils3.isVerticalGroupingApplied)(groups, groupOrientation);
    return isVerticalGrouping ? 1 : groupCount;
  };
  exports.getHorizontalGroupCount = getHorizontalGroupCount;
  var calculateIsGroupedAllDayPanel = function calculateIsGroupedAllDayPanel(groups, groupOrientation, isAllDayPanelVisible) {
    return (0, _utils3.isVerticalGroupingApplied)(groups, groupOrientation) && isAllDayPanelVisible;
  };
  exports.calculateIsGroupedAllDayPanel = calculateIsGroupedAllDayPanel;
  var calculateDayDuration = function calculateDayDuration(startDayHour, endDayHour) {
    return endDayHour - startDayHour;
  };
  exports.calculateDayDuration = calculateDayDuration;
  var isHorizontalView = function isHorizontalView(viewType) {
    switch (viewType) {
      case _constants.VIEWS.TIMELINE_DAY:
      case _constants.VIEWS.TIMELINE_WEEK:
      case _constants.VIEWS.TIMELINE_WORK_WEEK:
      case _constants.VIEWS.TIMELINE_MONTH:
      case _constants.VIEWS.MONTH:
        return true;
      default:
        return false;
    }
  };
  exports.isHorizontalView = isHorizontalView;
  var getTotalCellCountByCompleteData = function getTotalCellCountByCompleteData(completeData) {
    return completeData[completeData.length - 1].length;
  };
  exports.getTotalCellCountByCompleteData = getTotalCellCountByCompleteData;
  var getTotalRowCountByCompleteData = function getTotalRowCountByCompleteData(completeData) {
    return completeData.length;
  };
  exports.getTotalRowCountByCompleteData = getTotalRowCountByCompleteData;
  var getDisplayedCellCount = function getDisplayedCellCount(displayedCellCount, completeData) {
    return displayedCellCount !== null && displayedCellCount !== void 0 ? displayedCellCount : getTotalCellCountByCompleteData(completeData);
  };
  exports.getDisplayedCellCount = getDisplayedCellCount;
  var getDisplayedRowCount = function getDisplayedRowCount(displayedRowCount, completeData) {
    return displayedRowCount !== null && displayedRowCount !== void 0 ? displayedRowCount : getTotalRowCountByCompleteData(completeData);
  };
  exports.getDisplayedRowCount = getDisplayedRowCount;
  var getCellDuration = function getCellDuration(viewType, startDayHour, endDayHour, hoursInterval) {
    switch (viewType) {
      case 'month':
        return calculateDayDuration(startDayHour, endDayHour) * 3600000;
      case 'timelineMonth':
        return _date.default.dateToMilliseconds('day');
      default:
        return 3600000 * hoursInterval;
    }
  };
  exports.getCellDuration = getCellDuration;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../../../../ui/widget/ui.errors","../../../../../../../core/utils/date","../../../../../../../core/utils/type","../../../../../../../localization/date","../../../../../../../ui/scheduler/utils.timeZone","../../../../../../../ui/scheduler/classes","../../../../../../../ui/scheduler/constants","../../../../../../../ui/scheduler/resources/utils","../../../../workspaces/utils","./const"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../../../../ui/widget/ui.errors"), require("../../../../../../../core/utils/date"), require("../../../../../../../core/utils/type"), require("../../../../../../../localization/date"), require("../../../../../../../ui/scheduler/utils.timeZone"), require("../../../../../../../ui/scheduler/classes"), require("../../../../../../../ui/scheduler/constants"), require("../../../../../../../ui/scheduler/resources/utils"), require("../../../../workspaces/utils"), require("./const"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=base.js.map