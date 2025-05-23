/**
* DevExtreme (esm/__internal/scheduler/appointments/data_provider/m_appointment_data_provider.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import config from '../../../../core/config';
import combineRemoteFilter from '../../../../renovation/ui/scheduler/utils/filtering/remote';
import { AppointmentDataSource } from './m_appointment_data_source';
import { AppointmentFilterBaseStrategy, AppointmentFilterVirtualStrategy } from './m_appointment_filter';
var FilterStrategies = {
  virtual: 'virtual',
  standard: 'standard'
};
export class AppointmentDataProvider {
  constructor(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    this.dataAccessors = this.options.dataAccessors;
    this.timeZoneCalculator = this.options.timeZoneCalculator;
    this.appointmentDataSource = new AppointmentDataSource(this.dataSource);
    this.initFilterStrategy();
  }
  get keyName() {
    return this.appointmentDataSource.keyName;
  }
  get isDataSourceInit() {
    return !!this.dataSource;
  }
  get filterStrategyName() {
    return this.options.getIsVirtualScrolling() ? FilterStrategies.virtual : FilterStrategies.standard;
  }
  getFilterStrategy() {
    if (!this.filterStrategy || this.filterStrategy.strategyName !== this.filterStrategyName) {
      this.initFilterStrategy();
    }
    return this.filterStrategy;
  }
  initFilterStrategy() {
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
    this.filterStrategy = this.filterStrategyName === FilterStrategies.virtual ? new AppointmentFilterVirtualStrategy(filterOptions) : new AppointmentFilterBaseStrategy(filterOptions);
  }
  setDataSource(dataSource) {
    this.dataSource = dataSource;
    this.initFilterStrategy();
    this.appointmentDataSource.setDataSource(this.dataSource);
  }
  updateDataAccessors(dataAccessors) {
    this.dataAccessors = dataAccessors;
    this.initFilterStrategy();
  }
  // Filter mapping
  filter(preparedItems) {
    return this.getFilterStrategy().filter(preparedItems);
  }
  // TODO rename to the setRemoteFilter
  filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
    if (!this.dataSource || !remoteFiltering) {
      return;
    }
    var dataSourceFilter = this.dataSource.filter();
    var filter = combineRemoteFilter({
      dataSourceFilter,
      dataAccessors: this.dataAccessors,
      min,
      max,
      dateSerializationFormat,
      forceIsoDateParsing: config().forceIsoDateParsing
    });
    this.dataSource.filter(filter);
  }
  hasAllDayAppointments(filteredItems, preparedItems) {
    return this.getFilterStrategy().hasAllDayAppointments(filteredItems, preparedItems);
  }
  filterLoadedAppointments(filterOption, preparedItems) {
    return this.getFilterStrategy().filterLoadedAppointments(filterOption, preparedItems);
  }
  calculateAppointmentEndDate(isAllDay, startDate) {
    return this.getFilterStrategy().calculateAppointmentEndDate(isAllDay, startDate);
  }
  // Appointment data source mappings
  cleanState() {
    this.appointmentDataSource.cleanState();
  }
  getUpdatedAppointment() {
    return this.appointmentDataSource._updatedAppointment;
  }
  getUpdatedAppointmentKeys() {
    return this.appointmentDataSource._updatedAppointmentKeys;
  }
  add(rawAppointment) {
    return this.appointmentDataSource.add(rawAppointment);
  }
  update(target, rawAppointment) {
    return this.appointmentDataSource.update(target, rawAppointment);
  }
  remove(rawAppointment) {
    return this.appointmentDataSource.remove(rawAppointment);
  }
  destroy() {
    this.appointmentDataSource.destroy();
  }
}
