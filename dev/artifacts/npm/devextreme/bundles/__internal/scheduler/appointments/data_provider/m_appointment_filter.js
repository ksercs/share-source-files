/**
* DevExtreme (bundles/__internal/scheduler/appointments/data_provider/m_appointment_filter.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentFilterVirtualStrategy = exports.AppointmentFilterBaseStrategy = void 0;
var _array = require("../../../../core/utils/array");
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _query = _interopRequireDefault(require("../../../../data/query"));
var _getAppointmentTakesAllDay = require("../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay");
var _hasResourceValue = require("../../../../renovation/ui/scheduler/resources/hasResourceValue");
var _getDatesWithoutTime5 = _interopRequireDefault(require("../../../../renovation/ui/scheduler/utils/filtering/getDatesWithoutTime"));
var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _m_appointment_adapter = require("../../m_appointment_adapter");
var _m_recurrence = require("../../m_recurrence");
var _m_utils = require("../../resources/m_utils");
var _m_utils2 = require("./m_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint-disable max-classes-per-file */
var toMs = _date.default.dateToMilliseconds;
var FilterStrategies = {
  virtual: 'virtual',
  standard: 'standard'
};
var AppointmentFilterBaseStrategy = /*#__PURE__*/function () {
  function AppointmentFilterBaseStrategy(options) {
    this.options = options;
    this.dataAccessors = this.options.dataAccessors;
    this._init();
  }
  var _proto = AppointmentFilterBaseStrategy.prototype;
  _proto._resolveOption = function _resolveOption(name) {
    var result = this.options[name];
    return typeof result === 'function' ? result() : result;
  };
  _proto._init = function _init() {
    this.setDataAccessors(this.dataAccessors);
  };
  _proto.filter = function filter(preparedItems) {
    var dateRange = this.dateRange;
    var allDay;
    if (!this.showAllDayPanel && this.supportAllDayRow) {
      allDay = false;
    }
    return this.filterLoadedAppointments({
      startDayHour: this.viewStartDayHour,
      endDayHour: this.viewEndDayHour,
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour,
      min: dateRange[0],
      max: dateRange[1],
      resources: this.loadedResources,
      allDay,
      supportMultiDayAppointments: (0, _base.isTimelineView)(this.viewType),
      firstDayOfWeek: this.firstDayOfWeek
    }, preparedItems);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.hasAllDayAppointments = function hasAllDayAppointments(filteredItems, preparedItems) {
    var _this = this;
    var adapters = filteredItems.map(function (item) {
      return (0, _m_appointment_adapter.createAppointmentAdapter)(item, _this.dataAccessors, _this.timeZoneCalculator);
    });
    var result = false;
    // @ts-expect-error
    (0, _iterator.each)(adapters, function (_, item) {
      if ((0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(item, _this.viewStartDayHour, _this.viewEndDayHour, _this.allDayPanelMode)) {
        result = true;
        return false;
      }
    });
    return result;
  };
  _proto.setDataAccessors = function setDataAccessors(dataAccessors) {
    this.dataAccessors = dataAccessors;
  };
  _proto._createAllDayAppointmentFilter = function _createAllDayAppointmentFilter(filterOptions) {
    var _this2 = this;
    var viewStartDayHour = filterOptions.viewStartDayHour,
      viewEndDayHour = filterOptions.viewEndDayHour;
    return [[function (appointment) {
      return (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(appointment, viewStartDayHour, viewEndDayHour, _this2.allDayPanelMode);
    }]];
  };
  _proto._createCombinedFilter = function _createCombinedFilter(filterOptions) {
    var _this3 = this;
    var min = new Date(filterOptions.min);
    var max = new Date(filterOptions.max);
    var startDayHour = filterOptions.startDayHour,
      endDayHour = filterOptions.endDayHour,
      viewStartDayHour = filterOptions.viewStartDayHour,
      viewEndDayHour = filterOptions.viewEndDayHour,
      resources = filterOptions.resources,
      firstDayOfWeek = filterOptions.firstDayOfWeek,
      checkIntersectViewport = filterOptions.checkIntersectViewport,
      supportMultiDayAppointments = filterOptions.supportMultiDayAppointments;
    var _getDatesWithoutTime = (0, _getDatesWithoutTime5.default)(min, max),
      _getDatesWithoutTime2 = _slicedToArray(_getDatesWithoutTime, 2),
      trimMin = _getDatesWithoutTime2[0],
      trimMax = _getDatesWithoutTime2[1];
    var useRecurrence = (0, _type.isDefined)(this.dataAccessors.getter.recurrenceRule);
    return [[function (appointment) {
      var _a;
      var appointmentVisible = (_a = appointment.visible) !== null && _a !== void 0 ? _a : true;
      if (!appointmentVisible) {
        return false;
      }
      var startDate = appointment.startDate,
        endDate = appointment.endDate,
        hasRecurrenceRule = appointment.hasRecurrenceRule;
      if (!hasRecurrenceRule) {
        if (!(endDate >= trimMin && startDate < trimMax || _date.default.sameDate(endDate, trimMin) && _date.default.sameDate(startDate, trimMin))) {
          return false;
        }
      }
      var appointmentTakesAllDay = (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(appointment, viewStartDayHour, viewEndDayHour, _this3.allDayPanelMode);
      var appointmentTakesSeveralDays = (0, _m_utils2.getAppointmentTakesSeveralDays)(appointment);
      var isAllDay = appointment.allDay;
      var isLongAppointment = appointmentTakesSeveralDays || appointmentTakesAllDay;
      if ((resources === null || resources === void 0 ? void 0 : resources.length) && !_this3._filterAppointmentByResources(appointment.rawAppointment, resources)) {
        return false;
      }
      if (appointmentTakesAllDay && filterOptions.allDay === false) {
        return false;
      }
      if (hasRecurrenceRule) {
        var recurrenceException = (0, _m_utils2.getRecurrenceException)(appointment, _this3.timeZoneCalculator, _this3.timezone);
        if (!_this3._filterAppointmentByRRule(_extends(_extends({}, appointment), {
          recurrenceException,
          allDay: appointmentTakesAllDay
        }), min, max, startDayHour, endDayHour, firstDayOfWeek)) {
          return false;
        }
      }
      if (!isAllDay && supportMultiDayAppointments && isLongAppointment) {
        if (endDate < min && (!useRecurrence || useRecurrence && !hasRecurrenceRule)) {
          return false;
        }
      }
      if ((0, _type.isDefined)(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
        if (!(0, _m_utils2.compareDateWithStartDayHour)(startDate, endDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays)) {
          return false;
        }
      }
      if ((0, _type.isDefined)(endDayHour)) {
        if (!(0, _m_utils2.compareDateWithEndDayHour)({
          startDate,
          endDate,
          startDayHour,
          endDayHour,
          viewStartDayHour,
          viewEndDayHour,
          allDay: appointmentTakesAllDay,
          severalDays: appointmentTakesSeveralDays,
          min,
          max,
          checkIntersectViewport
        })) {
          return false;
        }
      }
      if (!isAllDay && (!isLongAppointment || supportMultiDayAppointments)) {
        if (endDate < min && useRecurrence && !hasRecurrenceRule) {
          return false;
        }
      }
      return true;
    }]];
  }
  // TODO get rid of wrapper
  ;
  _proto._createAppointmentFilter = function _createAppointmentFilter(filterOptions) {
    return this._createCombinedFilter(filterOptions);
  };
  _proto._filterAppointmentByResources = function _filterAppointmentByResources(appointment, resources) {
    var _this4 = this;
    var checkAppointmentResourceValues = function checkAppointmentResourceValues(resourceName, resourceIndex) {
      var resourceGetter = _this4.dataAccessors.resources.getter[resourceName];
      var resource;
      if ((0, _type.isFunction)(resourceGetter)) {
        resource = resourceGetter(appointment);
      }
      var appointmentResourceValues = (0, _array.wrapToArray)(resource);
      var resourceData = (0, _iterator.map)(resources[resourceIndex].items, function (_ref) {
        var id = _ref.id;
        return id;
      });
      for (var i = 0; i < appointmentResourceValues.length; i++) {
        if ((0, _hasResourceValue.hasResourceValue)(resourceData, appointmentResourceValues[i])) {
          return true;
        }
      }
      return false;
    };
    var result = false;
    for (var i = 0; i < resources.length; i++) {
      var resourceName = resources[i].name;
      result = checkAppointmentResourceValues(resourceName, i);
      if (!result) {
        return false;
      }
    }
    return result;
  };
  _proto._filterAppointmentByRRule = function _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
    var recurrenceRule = appointment.recurrenceRule;
    var recurrenceException = appointment.recurrenceException;
    var allDay = appointment.allDay;
    var result = true;
    var appointmentStartDate = appointment.startDate;
    var appointmentEndDate = appointment.endDate;
    var recurrenceProcessor = (0, _m_recurrence.getRecurrenceProcessor)();
    if (allDay || (0, _m_utils2._appointmentPartInInterval)(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
      var _getDatesWithoutTime3 = (0, _getDatesWithoutTime5.default)(min, max),
        _getDatesWithoutTime4 = _slicedToArray(_getDatesWithoutTime3, 2),
        trimMin = _getDatesWithoutTime4[0],
        trimMax = _getDatesWithoutTime4[1];
      min = trimMin;
      max = new Date(trimMax.getTime() - toMs('minute'));
    }
    if (recurrenceRule && !recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
      result = appointmentEndDate > min && appointmentStartDate <= max;
    }
    if (result && recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
      result = recurrenceProcessor.hasRecurrence({
        rule: recurrenceRule,
        exception: recurrenceException,
        start: appointmentStartDate,
        end: appointmentEndDate,
        min,
        max,
        firstDayOfWeek,
        appointmentTimezoneOffset: this.timeZoneCalculator.getOriginStartDateOffsetInMs(appointmentStartDate, appointment.startDateTimeZone, false)
      });
    }
    return result;
  };
  _proto.filterLoadedAppointments = function filterLoadedAppointments(filterOptions, preparedItems) {
    var filteredItems = this.filterPreparedItems(filterOptions, preparedItems);
    return filteredItems.map(function (_ref2) {
      var rawAppointment = _ref2.rawAppointment;
      return rawAppointment;
    });
  };
  _proto.filterPreparedItems = function filterPreparedItems(filterOptions, preparedItems) {
    var combinedFilter = this._createAppointmentFilter(filterOptions);
    return (0, _query.default)(preparedItems).filter(combinedFilter).toArray();
  };
  _proto.filterAllDayAppointments = function filterAllDayAppointments(filterOptions, preparedItems) {
    var combinedFilter = this._createAllDayAppointmentFilter(filterOptions);
    return (0, _query.default)(preparedItems).filter(combinedFilter).toArray().map(function (_ref3) {
      var rawAppointment = _ref3.rawAppointment;
      return rawAppointment;
    });
  };
  _createClass(AppointmentFilterBaseStrategy, [{
    key: "strategyName",
    get: function get() {
      return FilterStrategies.standard;
    }
  }, {
    key: "timeZoneCalculator",
    get: function get() {
      return this.options.timeZoneCalculator;
    }
  }, {
    key: "viewStartDayHour",
    get: function get() {
      return this.options.startDayHour;
    }
  }, {
    key: "viewEndDayHour",
    get: function get() {
      return this.options.endDayHour;
    }
  }, {
    key: "timezone",
    get: function get() {
      return this.options.timezone;
    }
  }, {
    key: "firstDayOfWeek",
    get: function get() {
      return this.options.firstDayOfWeek;
    }
  }, {
    key: "showAllDayPanel",
    get: function get() {
      return this.options.showAllDayPanel;
    }
  }, {
    key: "loadedResources",
    get: function get() {
      return this._resolveOption('loadedResources');
    }
  }, {
    key: "supportAllDayRow",
    get: function get() {
      return this._resolveOption('supportAllDayRow');
    }
  }, {
    key: "viewType",
    get: function get() {
      return this._resolveOption('viewType');
    }
  }, {
    key: "viewDirection",
    get: function get() {
      return this._resolveOption('viewDirection');
    }
  }, {
    key: "dateRange",
    get: function get() {
      return this._resolveOption('dateRange');
    }
  }, {
    key: "groupCount",
    get: function get() {
      return this._resolveOption('groupCount');
    }
  }, {
    key: "viewDataProvider",
    get: function get() {
      return this._resolveOption('viewDataProvider');
    }
  }, {
    key: "allDayPanelMode",
    get: function get() {
      return this._resolveOption('allDayPanelMode');
    }
  }]);
  return AppointmentFilterBaseStrategy;
}();
exports.AppointmentFilterBaseStrategy = AppointmentFilterBaseStrategy;
var AppointmentFilterVirtualStrategy = /*#__PURE__*/function (_AppointmentFilterBas) {
  _inheritsLoose(AppointmentFilterVirtualStrategy, _AppointmentFilterBas);
  function AppointmentFilterVirtualStrategy() {
    return _AppointmentFilterBas.apply(this, arguments) || this;
  }
  var _proto2 = AppointmentFilterVirtualStrategy.prototype;
  _proto2.filter = function filter(preparedItems) {
    var _this5 = this;
    var hourMs = toMs('hour');
    var isCalculateStartAndEndDayHour = (0, _base.isDateAndTimeView)(this.viewType);
    var checkIntersectViewport = isCalculateStartAndEndDayHour && this.viewDirection === 'horizontal';
    var isAllDayWorkspace = !this.supportAllDayRow;
    var showAllDayAppointments = this.showAllDayPanel || isAllDayWorkspace;
    var endViewDate = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
    var filterOptions = [];
    var groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
    groupsInfo.forEach(function (item) {
      var groupIndex = item.groupIndex;
      var groupStartDate = item.startDate;
      var groupEndDate = new Date(Math.min(item.endDate, endViewDate));
      var startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : _this5.viewStartDayHour;
      var endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate - groupStartDate) / hourMs : _this5.viewEndDayHour;
      var resources = _this5._getPrerenderFilterResources(groupIndex);
      var hasAllDayPanel = _this5.viewDataProvider.hasGroupAllDayPanel(groupIndex);
      var supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && hasAllDayPanel;
      filterOptions.push({
        isVirtualScrolling: true,
        startDayHour,
        endDayHour,
        viewStartDayHour: _this5.viewStartDayHour,
        viewEndDayHour: _this5.viewEndDayHour,
        min: groupStartDate,
        max: groupEndDate,
        supportMultiDayAppointments: (0, _base.isTimelineView)(_this5.viewType),
        allDay: supportAllDayAppointment,
        resources,
        firstDayOfWeek: _this5.firstDayOfWeek,
        checkIntersectViewport
      });
    });
    return this.filterLoadedAppointments({
      filterOptions,
      groupCount: this.groupCount
    }, preparedItems);
  };
  _proto2.filterPreparedItems = function filterPreparedItems(_ref4, preparedItems) {
    var _this6 = this;
    var filterOptions = _ref4.filterOptions,
      groupCount = _ref4.groupCount;
    var combinedFilters = [];
    var itemsToFilter = preparedItems;
    var needPreFilter = groupCount > 0;
    if (needPreFilter) {
      // @ts-expect-error
      itemsToFilter = itemsToFilter.filter(function (_ref5) {
        var rawAppointment = _ref5.rawAppointment;
        for (var i = 0; i < filterOptions.length; ++i) {
          var resources = filterOptions[i].resources;
          if (_this6._filterAppointmentByResources(rawAppointment, resources)) {
            return true;
          }
        }
      });
    }
    filterOptions.forEach(function (option) {
      combinedFilters.length && combinedFilters.push('or');
      var filter = _this6._createAppointmentFilter(option);
      combinedFilters.push(filter);
    });
    return (0, _query.default)(itemsToFilter).filter(combinedFilters).toArray();
  };
  _proto2.hasAllDayAppointments = function hasAllDayAppointments(adapters, preparedItems) {
    return this.filterAllDayAppointments({
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour
    }, preparedItems).length > 0;
  };
  _proto2._getPrerenderFilterResources = function _getPrerenderFilterResources(groupIndex) {
    var cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
    return (0, _m_utils.getResourcesDataByGroups)(this.loadedResources, this.resources, [cellGroup]);
  };
  _createClass(AppointmentFilterVirtualStrategy, [{
    key: "strategyName",
    get: function get() {
      return FilterStrategies.virtual;
    }
  }, {
    key: "resources",
    get: function get() {
      return this.options.resources;
    }
  }]);
  return AppointmentFilterVirtualStrategy;
}(AppointmentFilterBaseStrategy);
exports.AppointmentFilterVirtualStrategy = AppointmentFilterVirtualStrategy;
