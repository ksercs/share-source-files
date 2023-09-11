/**
* DevExtreme (bundles/__internal/scheduler/appointments/data_provider/m_appointment_data_provider.js)
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
exports.AppointmentDataProvider = void 0;
var _config = _interopRequireDefault(require("../../../../core/config"));
var _remote = _interopRequireDefault(require("../../../../renovation/ui/scheduler/utils/filtering/remote"));
var _m_appointment_data_source = require("./m_appointment_data_source");
var _m_appointment_filter = require("./m_appointment_filter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var FilterStrategies = {
  virtual: 'virtual',
  standard: 'standard'
};
var AppointmentDataProvider = /*#__PURE__*/function () {
  function AppointmentDataProvider(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    this.dataAccessors = this.options.dataAccessors;
    this.timeZoneCalculator = this.options.timeZoneCalculator;
    this.appointmentDataSource = new _m_appointment_data_source.AppointmentDataSource(this.dataSource);
    this.initFilterStrategy();
  }
  var _proto = AppointmentDataProvider.prototype;
  _proto.getFilterStrategy = function getFilterStrategy() {
    if (!this.filterStrategy || this.filterStrategy.strategyName !== this.filterStrategyName) {
      this.initFilterStrategy();
    }
    return this.filterStrategy;
  };
  _proto.initFilterStrategy = function initFilterStrategy() {
    var filterOptions = {
      resources: this.options.resources,
      dataAccessors: this.dataAccessors,
      startDayHour: this.options.startDayHour,
      endDayHour: this.options.endDayHour,
      showAllDayPanel: this.options.showAllDayPanel,
      timeZoneCalculator: this.options.timeZoneCalculator,
      //
      loadedResources: this.options.getLoadedResources,
      supportAllDayRow: this.options.getSupportAllDayRow,
      viewType: this.options.getViewType,
      viewDirection: this.options.getViewDirection,
      dateRange: this.options.getDateRange,
      groupCount: this.options.getGroupCount,
      viewDataProvider: this.options.getViewDataProvider,
      allDayPanelMode: this.options.allDayPanelMode
    };
    this.filterStrategy = this.filterStrategyName === FilterStrategies.virtual ? new _m_appointment_filter.AppointmentFilterVirtualStrategy(filterOptions) : new _m_appointment_filter.AppointmentFilterBaseStrategy(filterOptions);
  };
  _proto.setDataSource = function setDataSource(dataSource) {
    this.dataSource = dataSource;
    this.initFilterStrategy();
    this.appointmentDataSource.setDataSource(this.dataSource);
  };
  _proto.updateDataAccessors = function updateDataAccessors(dataAccessors) {
    this.dataAccessors = dataAccessors;
    this.initFilterStrategy();
  }
  // Filter mapping
  ;
  _proto.filter = function filter(preparedItems) {
    return this.getFilterStrategy().filter(preparedItems);
  }
  // TODO rename to the setRemoteFilter
  ;
  _proto.filterByDate = function filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
    if (!this.dataSource || !remoteFiltering) {
      return;
    }
    var dataSourceFilter = this.dataSource.filter();
    var filter = (0, _remote.default)({
      dataSourceFilter,
      dataAccessors: this.dataAccessors,
      min,
      max,
      dateSerializationFormat,
      forceIsoDateParsing: (0, _config.default)().forceIsoDateParsing
    });
    this.dataSource.filter(filter);
  };
  _proto.hasAllDayAppointments = function hasAllDayAppointments(filteredItems, preparedItems) {
    return this.getFilterStrategy().hasAllDayAppointments(filteredItems, preparedItems);
  };
  _proto.filterLoadedAppointments = function filterLoadedAppointments(filterOption, preparedItems) {
    return this.getFilterStrategy().filterLoadedAppointments(filterOption, preparedItems);
  };
  _proto.calculateAppointmentEndDate = function calculateAppointmentEndDate(isAllDay, startDate) {
    return this.getFilterStrategy().calculateAppointmentEndDate(isAllDay, startDate);
  }
  // Appointment data source mappings
  ;
  _proto.cleanState = function cleanState() {
    this.appointmentDataSource.cleanState();
  };
  _proto.getUpdatedAppointment = function getUpdatedAppointment() {
    return this.appointmentDataSource._updatedAppointment;
  };
  _proto.getUpdatedAppointmentKeys = function getUpdatedAppointmentKeys() {
    return this.appointmentDataSource._updatedAppointmentKeys;
  };
  _proto.add = function add(rawAppointment) {
    return this.appointmentDataSource.add(rawAppointment);
  };
  _proto.update = function update(target, rawAppointment) {
    return this.appointmentDataSource.update(target, rawAppointment);
  };
  _proto.remove = function remove(rawAppointment) {
    return this.appointmentDataSource.remove(rawAppointment);
  };
  _proto.destroy = function destroy() {
    this.appointmentDataSource.destroy();
  };
  _createClass(AppointmentDataProvider, [{
    key: "keyName",
    get: function get() {
      return this.appointmentDataSource.keyName;
    }
  }, {
    key: "isDataSourceInit",
    get: function get() {
      return !!this.dataSource;
    }
  }, {
    key: "filterStrategyName",
    get: function get() {
      return this.options.getIsVirtualScrolling() ? FilterStrategies.virtual : FilterStrategies.standard;
    }
  }]);
  return AppointmentDataProvider;
}();
exports.AppointmentDataProvider = AppointmentDataProvider;
