import { AppointmentFilterBaseStrategy, AppointmentFilterVirtualStrategy } from '../../../../../__internal/scheduler/appointments/data_provider/m_appointment_filter';
export var getFilterStrategy = (resources, startDayHour, endDayHour, cellDurationInMinutes, showAllDayPanel, supportAllDayRow, firstDayOfWeek, viewType, dateRange, groupCount, loadedResources, isVirtualScrolling, timeZoneCalculator, dataAccessors, viewDataProvider) => {
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
  return isVirtualScrolling ? new AppointmentFilterVirtualStrategy(filterOptions) : new AppointmentFilterBaseStrategy(filterOptions);
};