!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/appointments/rendering_strategies/strategy_vertical.js"], ["./strategy.base","../../../../core/utils/extend","../../../../core/utils/type","../../../../core/utils/date","../../utils.timeZone","../../expressionUtils","../../appointmentAdapter","../../../../renovation/ui/scheduler/view_model/appointments/utils/getSkippedHoursInRange","../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay","../../../../core/utils/math"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/appointments/rendering_strategies/strategy_vertical.js", ["./strategy.base", "../../../../core/utils/extend", "../../../../core/utils/type", "../../../../core/utils/date", "../../utils.timeZone", "../../expressionUtils", "../../appointmentAdapter", "../../../../renovation/ui/scheduler/view_model/appointments/utils/getSkippedHoursInRange", "../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay", "../../../../core/utils/math"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _strategy = _interopRequireDefault($__require("./strategy.base"));
  var _extend = $__require("../../../../core/utils/extend");
  var _type = $__require("../../../../core/utils/type");
  var _date = _interopRequireDefault($__require("../../../../core/utils/date"));
  var _utils = _interopRequireDefault($__require("../../utils.timeZone"));
  var _expressionUtils = $__require("../../expressionUtils");
  var _appointmentAdapter = $__require("../../appointmentAdapter");
  var _getSkippedHoursInRange = _interopRequireDefault($__require("../../../../renovation/ui/scheduler/view_model/appointments/utils/getSkippedHoursInRange"));
  var _getAppointmentTakesAllDay = $__require("../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay");
  var _math = $__require("../../../../core/utils/math");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET = 5;
  var ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET = 20;
  var toMs = _date.default.dateToMilliseconds;
  var VerticalRenderingStrategy = /*#__PURE__*/function (_BaseAppointmentsStra) {
    _inheritsLoose(VerticalRenderingStrategy, _BaseAppointmentsStra);
    function VerticalRenderingStrategy() {
      return _BaseAppointmentsStra.apply(this, arguments) || this;
    }
    var _proto = VerticalRenderingStrategy.prototype;
    _proto.getDeltaTime = function getDeltaTime(args, initialSize, appointment) {
      var deltaTime = 0;
      if (this.isAllDay(appointment)) {
        deltaTime = this._getDeltaWidth(args, initialSize) * toMs('day');
      } else {
        var deltaHeight = args.height - initialSize.height;
        deltaTime = toMs('minute') * Math.round(deltaHeight / this.cellHeight * this.cellDurationInMinutes);
      }
      return deltaTime;
    };
    _proto._correctCollectorCoordinatesInAdaptive = function _correctCollectorCoordinatesInAdaptive(coordinates, isAllDay) {
      if (isAllDay) {
        _BaseAppointmentsStra.prototype._correctCollectorCoordinatesInAdaptive.call(this, coordinates, isAllDay);
      } else if (this._getMaxAppointmentCountPerCellByType() === 0) {
        var cellHeight = this.cellHeight;
        var cellWidth = this.cellWidth;
        coordinates.top += (cellHeight - this.getDropDownButtonAdaptiveSize()) / 2;
        coordinates.left += (cellWidth - this.getDropDownButtonAdaptiveSize()) / 2;
      }
    };
    _proto.getAppointmentGeometry = function getAppointmentGeometry(coordinates) {
      var geometry = null;
      if (coordinates.allDay) {
        geometry = this._getAllDayAppointmentGeometry(coordinates);
      } else {
        geometry = this.isAdaptive && coordinates.isCompact ? this._getAdaptiveGeometry(coordinates) : this._getVerticalAppointmentGeometry(coordinates);
      }
      return _BaseAppointmentsStra.prototype.getAppointmentGeometry.call(this, geometry);
    };
    _proto._getAdaptiveGeometry = function _getAdaptiveGeometry(coordinates) {
      var config = this._calculateGeometryConfig(coordinates);
      return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset);
    };
    _proto._getItemPosition = function _getItemPosition(appointment) {
      var allDay = this.isAllDay(appointment);
      if (allDay) {
        return _BaseAppointmentsStra.prototype._getItemPosition.call(this, appointment);
      }
      var adapter = (0, _appointmentAdapter.createAppointmentAdapter)(appointment, this.dataAccessors, this.timeZoneCalculator);
      var isRecurring = !!adapter.recurrenceRule;
      var appointmentStartDate = adapter.calculateStartDate('toGrid');
      var appointmentEndDate = adapter.calculateEndDate('toGrid');
      var appointmentDuration = appointmentEndDate - appointmentStartDate;
      var appointmentBeginInCurrentView = this.options.startViewDate < appointmentStartDate;
      var isAppointmentTakesSeveralDays = !_utils.default.isSameAppointmentDates(appointmentStartDate, appointmentEndDate);
      var settings = this.generateAppointmentSettings(appointment);
      var result = [];
      for (var j = 0; j < settings.length; j++) {
        var currentSetting = settings[j];
        var height = this.calculateAppointmentHeight(appointment, currentSetting);
        var width = this.calculateAppointmentWidth(appointment, currentSetting);
        var resultHeight = height;
        var appointmentReduced = null;
        var multiDaysAppointmentParts = [];
        var currentMaxAllowedPosition = currentSetting.vMax;
        if (this._isMultiViewAppointment(currentSetting, height) || isAppointmentTakesSeveralDays && !isRecurring) {
          var trimmedStartDate = _date.default.trimTime(appointmentStartDate);
          var trimmedSettingStartDate = _date.default.trimTime(currentSetting.info.appointment.startDate);
          var reduceHead = trimmedStartDate <= trimmedSettingStartDate || isRecurring;
          if (reduceHead) {
            resultHeight = this._reduceMultiDayAppointment(height, {
              top: currentSetting.top,
              bottom: currentMaxAllowedPosition
            });
            multiDaysAppointmentParts = this._getAppointmentParts({
              sourceAppointmentHeight: height,
              reducedHeight: resultHeight,
              width: width
            }, currentSetting);
          }
          var _currentSetting$info$ = currentSetting.info.appointment,
              currentSettingStartDate = _currentSetting$info$.startDate,
              currentSettingNormalizedEndDate = _currentSetting$info$.normalizedEndDate;
          var currentSettingDuration = currentSettingNormalizedEndDate - currentSettingStartDate;
          var hasNextParts = currentSettingDuration < appointmentDuration;
          appointmentReduced = hasNextParts ? appointmentBeginInCurrentView ? 'head' : 'body' : appointmentBeginInCurrentView ? 'head' : 'tail';
        }
        (0, _extend.extend)(currentSetting, {
          height: resultHeight,
          width: width,
          allDay: allDay,
          appointmentReduced: appointmentReduced
        });
        result = this._getAppointmentPartsPosition(multiDaysAppointmentParts, currentSetting, result);
      }
      return result;
    };
    _proto._isMultiViewAppointment = function _isMultiViewAppointment(_ref, height) {
      var vMax = _ref.vMax,
          top = _ref.top;
      // NOTE: we round these numbers, because in js 100 - 33.3333 = 66.66669999
      var fullAppointmentHeight = (0, _math.roundFloatPart)(height, 2);
      var remainingHeight = (0, _math.roundFloatPart)(vMax - top, 2);
      return fullAppointmentHeight > remainingHeight;
    };
    _proto._reduceMultiDayAppointment = function _reduceMultiDayAppointment(sourceAppointmentHeight, bound) {
      return Math.min(sourceAppointmentHeight, bound.bottom - Math.floor(bound.top));
    };
    _proto._getGroupHeight = function _getGroupHeight() {
      return this.cellHeight * this.rowCount;
    };
    _proto._getGroupTopOffset = function _getGroupTopOffset(appointmentSettings) {
      var groupIndex = appointmentSettings.groupIndex;
      var groupTop = Math.max(0, this.positionHelper.getGroupTop({
        groupIndex: groupIndex,
        showAllDayPanel: this.showAllDayPanel,
        isGroupedAllDayPanel: this.isGroupedAllDayPanel
      }));
      var allDayPanelOffset = this.positionHelper.getOffsetByAllDayPanel({
        groupIndex: groupIndex,
        supportAllDayRow: this.allDaySupported(),
        showAllDayPanel: this.showAllDayPanel
      });
      var appointmentGroupTopOffset = appointmentSettings.top - groupTop - allDayPanelOffset;
      return appointmentGroupTopOffset;
    };
    _proto._getTailHeight = function _getTailHeight(appointmentGeometry, appointmentSettings) {
      if (!this.isVirtualScrolling) {
        return appointmentGeometry.sourceAppointmentHeight - appointmentGeometry.reducedHeight;
      }
      var appointmentGroupTopOffset = this._getGroupTopOffset(appointmentSettings);
      var sourceAppointmentHeight = appointmentGeometry.sourceAppointmentHeight;
      var groupHeight = this._getGroupHeight();
      var tailHeight = appointmentGroupTopOffset + sourceAppointmentHeight - groupHeight;
      return tailHeight;
    };
    _proto._getAppointmentParts = function _getAppointmentParts(appointmentGeometry, appointmentSettings) {
      var width = appointmentGeometry.width;
      var result = [];
      var currentPartTop = Math.max(0, this.positionHelper.getGroupTop({
        groupIndex: appointmentSettings.groupIndex,
        showAllDayPanel: this.showAllDayPanel,
        isGroupedAllDayPanel: this.isGroupedAllDayPanel
      }));
      var cellsDiff = this.isGroupedByDate ? this.groupCount : 1;
      var offset = this.cellWidth * cellsDiff;
      var allDayPanelOffset = this.positionHelper.getOffsetByAllDayPanel({
        groupIndex: appointmentSettings.groupIndex,
        supportAllDayRow: this.allDaySupported(),
        showAllDayPanel: this.showAllDayPanel
      });
      currentPartTop += allDayPanelOffset;
      var minHeight = this.getAppointmentMinSize();
      var vMax = appointmentSettings.vMax,
          hMax = appointmentSettings.hMax;
      var hasTailPart = this.options.endViewDate > appointmentSettings.info.appointment.endDate;
      var left = Math.round(appointmentSettings.left + offset);
      var tailHeight = this._getTailHeight(appointmentGeometry, appointmentSettings);
      while (tailHeight > 0 && left < hMax) {
        tailHeight = Math.max(minHeight, tailHeight);
        var columnIndex = appointmentSettings.columnIndex + cellsDiff;
        var height = Math.min(tailHeight, vMax);
        result.push(_extends({}, appointmentSettings, {
          top: currentPartTop,
          left: left,
          height: height,
          width: width,
          appointmentReduced: 'body',
          rowIndex: 0,
          columnIndex: columnIndex
        }));
        left += offset;
        tailHeight -= vMax;
      }
      if (hasTailPart && result.length > 0) {
        result[result.length - 1].appointmentReduced = 'tail';
      }
      return result;
    };
    _proto._getMinuteHeight = function _getMinuteHeight() {
      return this.cellHeight / this.cellDurationInMinutes;
    };
    _proto._getCompactLeftCoordinate = function _getCompactLeftCoordinate(itemLeft, index) {
      var cellBorderSize = 1;
      var cellWidth = this.cellWidth || this.getAppointmentMinSize();
      return itemLeft + (cellBorderSize + cellWidth) * index;
    };
    _proto._getVerticalAppointmentGeometry = function _getVerticalAppointmentGeometry(coordinates) {
      var config = this._calculateVerticalGeometryConfig(coordinates);
      return this._customizeVerticalCoordinates(coordinates, config.width, config.appointmentCountPerCell, config.offset);
    };
    _proto._customizeVerticalCoordinates = function _customizeVerticalCoordinates(coordinates, width, appointmentCountPerCell, topOffset, isAllDay) {
      var appointmentWidth = Math.max(width / appointmentCountPerCell, width / coordinates.count);
      var height = coordinates.height;
      var appointmentLeft = coordinates.left + coordinates.index * appointmentWidth;
      var top = coordinates.top;
      if (coordinates.isCompact) {
        this._markAppointmentAsVirtual(coordinates, isAllDay);
      }
      return {
        height: height,
        width: appointmentWidth,
        top: top,
        left: appointmentLeft,
        empty: this._isAppointmentEmpty(height, width)
      };
    };
    _proto._calculateVerticalGeometryConfig = function _calculateVerticalGeometryConfig(coordinates) {
      var overlappingMode = this.maxAppointmentsPerCell;
      var offsets = this._getOffsets();
      var appointmentDefaultOffset = this._getAppointmentDefaultOffset();
      var appointmentCountPerCell = this._getAppointmentCount(overlappingMode, coordinates);
      var ratio = this._getDefaultRatio(coordinates, appointmentCountPerCell);
      var maxWidth = this._getMaxWidth();
      if (!appointmentCountPerCell) {
        appointmentCountPerCell = coordinates.count;
        ratio = (maxWidth - offsets.unlimited) / maxWidth;
      }
      var topOffset = (1 - ratio) * maxWidth;
      if (overlappingMode === 'auto' || (0, _type.isNumeric)(overlappingMode)) {
        ratio = 1;
        maxWidth = maxWidth - appointmentDefaultOffset;
        topOffset = 0;
      }
      return {
        width: ratio * maxWidth,
        appointmentCountPerCell: appointmentCountPerCell,
        offset: topOffset
      };
    };
    _proto._getMaxWidth = function _getMaxWidth() {
      return this.cellWidth;
    };
    _proto.isAllDay = function isAllDay(appointmentData) {
      return (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)((0, _appointmentAdapter.createAppointmentAdapter)(appointmentData, this.dataAccessors, this.timeZoneCalculator), this.startDayHour, this.endDayHour, this.allDayPanelMode);
    };
    _proto._getAppointmentMaxWidth = function _getAppointmentMaxWidth() {
      return this.cellWidth - this._getAppointmentDefaultOffset();
    };
    _proto.calculateAppointmentWidth = function calculateAppointmentWidth(appointment, position) {
      if (!this.isAllDay(appointment)) {
        return 0;
      }
      var startDate = _date.default.trimTime(position.info.appointment.startDate);
      var normalizedEndDate = position.info.appointment.normalizedEndDate;
      var cellWidth = this.cellWidth || this.getAppointmentMinSize();
      var durationInHours = (normalizedEndDate.getTime() - startDate.getTime()) / toMs('hour');
      var skippedHours = (0, _getSkippedHoursInRange.default)(position.info.appointment.startDate, position.info.appointment.endDate, this.viewDataProvider);
      var width = Math.ceil((durationInHours - skippedHours) / 24) * cellWidth;
      width = this.cropAppointmentWidth(width, cellWidth);
      return width;
    };
    _proto.calculateAppointmentHeight = function calculateAppointmentHeight(appointment, position) {
      if (this.isAllDay(appointment)) {
        return 0;
      }
      var startDate = position.info.appointment.startDate;
      var normalizedEndDate = position.info.appointment.normalizedEndDate;
      var allDay = _expressionUtils.ExpressionUtils.getField(this.dataAccessors, 'allDay', appointment);
      var duration = this.getAppointmentDurationInMs(startDate, normalizedEndDate, allDay);
      var durationInMinutes = this._adjustDurationByDaylightDiff(duration, startDate, normalizedEndDate) / toMs('minute');
      var height = durationInMinutes * this._getMinuteHeight();
      return height;
    };
    _proto.getDirection = function getDirection() {
      return 'vertical';
    };
    _proto._sortCondition = function _sortCondition(a, b) {
      var allDayCondition = a.allDay - b.allDay;
      var isAllDay = a.allDay && b.allDay;
      var condition = this.groupOrientation === 'vertical' && isAllDay ? this._columnCondition(a, b) : this._rowCondition(a, b);
      return allDayCondition ? allDayCondition : condition;
    };
    _proto.allDaySupported = function allDaySupported() {
      return true;
    };
    _proto._getAllDayAppointmentGeometry = function _getAllDayAppointmentGeometry(coordinates) {
      var config = this._calculateGeometryConfig(coordinates);
      return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset, true);
    };
    _proto._calculateGeometryConfig = function _calculateGeometryConfig(coordinates) {
      if (!this.allowResizing || !this.allowAllDayResizing) {
        coordinates.skipResizing = true;
      }
      var config = _BaseAppointmentsStra.prototype._calculateGeometryConfig.call(this, coordinates);
      var minAppointmentCountPerCell = Math.min(config.appointmentCountPerCell, this._getDynamicAppointmentCountPerCell().allDay);
      if (coordinates.allDay && coordinates.count <= minAppointmentCountPerCell) {
        config.offset = 0;
      }
      return config;
    };
    _proto._getAppointmentCount = function _getAppointmentCount(overlappingMode, coordinates) {
      return overlappingMode !== 'auto' && coordinates.count === 1 && !(0, _type.isNumeric)(overlappingMode) ? coordinates.count : this._getMaxAppointmentCountPerCellByType(coordinates.allDay);
    };
    _proto._getDefaultRatio = function _getDefaultRatio(coordinates, appointmentCountPerCell) {
      return coordinates.count > this.appointmentCountPerCell ? 0.65 : 1;
    };
    _proto._getOffsets = function _getOffsets() {
      return {
        unlimited: ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET,
        auto: ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET
      };
    };
    _proto._getMaxHeight = function _getMaxHeight() {
      return this.allDayHeight || this.getAppointmentMinSize();
    };
    _proto._needVerticalGroupBounds = function _needVerticalGroupBounds(allDay) {
      return !allDay;
    };
    _proto._needHorizontalGroupBounds = function _needHorizontalGroupBounds() {
      return false;
    };
    _proto.getPositionShift = function getPositionShift(timeShift, isAllDay) {
      if (!isAllDay && this.isAdaptive && this._getMaxAppointmentCountPerCellByType(isAllDay) === 0) {
        return {
          top: 0,
          left: 0,
          cellPosition: 0
        };
      }
      return _BaseAppointmentsStra.prototype.getPositionShift.call(this, timeShift, isAllDay);
    };
    return VerticalRenderingStrategy;
  }(_strategy.default);
  var _default = VerticalRenderingStrategy;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./strategy.base","../../../../core/utils/extend","../../../../core/utils/type","../../../../core/utils/date","../../utils.timeZone","../../expressionUtils","../../appointmentAdapter","../../../../renovation/ui/scheduler/view_model/appointments/utils/getSkippedHoursInRange","../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay","../../../../core/utils/math"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./strategy.base"), require("../../../../core/utils/extend"), require("../../../../core/utils/type"), require("../../../../core/utils/date"), require("../../utils.timeZone"), require("../../expressionUtils"), require("../../appointmentAdapter"), require("../../../../renovation/ui/scheduler/view_model/appointments/utils/getSkippedHoursInRange"), require("../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay"), require("../../../../core/utils/math"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=strategy_vertical.js.map