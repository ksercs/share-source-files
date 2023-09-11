"use strict";

exports.getFilterStrategy = void 0;
var _m_appointment_filter = require("../../../../../__internal/scheduler/appointments/data_provider/m_appointment_filter");
var getFilterStrategy = function getFilterStrategy(resources, startDayHour, endDayHour, cellDurationInMinutes, showAllDayPanel, supportAllDayRow, firstDayOfWeek, viewType, dateRange, groupCount, loadedResources, isVirtualScrolling, timeZoneCalculator, dataAccessors, viewDataProvider) {
  var filterOptions = {
    resources,
    startDayHour,
    endDayHour,
    appointmentDuration: cellDurationInMinutes,
    showAllDayPanel,
    supportAllDayRow,
    firstDayOfWeek,
    viewType,
    viewDirection: 'vertical',
    dateRange,
    groupCount,
    loadedResources,
    isVirtualScrolling,
    timeZoneCalculator,
    dataSource: undefined,
    dataAccessors,
    viewDataProvider
  };
  return isVirtualScrolling ? new _m_appointment_filter.AppointmentFilterVirtualStrategy(filterOptions) : new _m_appointment_filter.AppointmentFilterBaseStrategy(filterOptions);
};
exports.getFilterStrategy = getFilterStrategy;