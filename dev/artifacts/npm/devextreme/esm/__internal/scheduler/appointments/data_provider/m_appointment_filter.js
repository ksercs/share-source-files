/**
* DevExtreme (esm/__internal/scheduler/appointments/data_provider/m_appointment_filter.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable max-classes-per-file */
import { wrapToArray } from '../../../../core/utils/array';
import dateUtils from '../../../../core/utils/date';
import { each, map } from '../../../../core/utils/iterator';
import { isDefined, isFunction } from '../../../../core/utils/type';
import query from '../../../../data/query';
import { getAppointmentTakesAllDay } from '../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay';
import { hasResourceValue } from '../../../../renovation/ui/scheduler/resources/hasResourceValue';
import getDatesWithoutTime from '../../../../renovation/ui/scheduler/utils/filtering/getDatesWithoutTime';
import { isDateAndTimeView as calculateIsDateAndTimeView, isTimelineView } from '../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import { createAppointmentAdapter } from '../../m_appointment_adapter';
import { getRecurrenceProcessor } from '../../m_recurrence';
import { getResourcesDataByGroups } from '../../resources/m_utils';
import { _appointmentPartInInterval, compareDateWithEndDayHour, compareDateWithStartDayHour, getAppointmentTakesSeveralDays, getRecurrenceException } from './m_utils';
var toMs = dateUtils.dateToMilliseconds;
var FilterStrategies = {
  virtual: 'virtual',
  standard: 'standard'
};
export class AppointmentFilterBaseStrategy {
  constructor(options) {
    this.options = options;
    this.dataAccessors = this.options.dataAccessors;
    this._init();
  }
  get strategyName() {
    return FilterStrategies.standard;
  }
  get timeZoneCalculator() {
    return this.options.timeZoneCalculator;
  }
  get viewStartDayHour() {
    return this.options.startDayHour;
  }
  get viewEndDayHour() {
    return this.options.endDayHour;
  }
  get timezone() {
    return this.options.timezone;
  }
  get firstDayOfWeek() {
    return this.options.firstDayOfWeek;
  }
  get showAllDayPanel() {
    return this.options.showAllDayPanel;
  }
  get loadedResources() {
    return this._resolveOption('loadedResources');
  }
  get supportAllDayRow() {
    return this._resolveOption('supportAllDayRow');
  }
  get viewType() {
    return this._resolveOption('viewType');
  }
  get viewDirection() {
    return this._resolveOption('viewDirection');
  }
  get dateRange() {
    return this._resolveOption('dateRange');
  }
  get groupCount() {
    return this._resolveOption('groupCount');
  }
  get viewDataProvider() {
    return this._resolveOption('viewDataProvider');
  }
  get allDayPanelMode() {
    return this._resolveOption('allDayPanelMode');
  }
  _resolveOption(name) {
    var result = this.options[name];
    return typeof result === 'function' ? result() : result;
  }
  _init() {
    this.setDataAccessors(this.dataAccessors);
  }
  filter(preparedItems) {
    var {
      dateRange
    } = this;
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
      supportMultiDayAppointments: isTimelineView(this.viewType),
      firstDayOfWeek: this.firstDayOfWeek
    }, preparedItems);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasAllDayAppointments(filteredItems, preparedItems) {
    var adapters = filteredItems.map(item => createAppointmentAdapter(item, this.dataAccessors, this.timeZoneCalculator));
    var result = false;
    // @ts-expect-error
    each(adapters, (_, item) => {
      if (getAppointmentTakesAllDay(item, this.viewStartDayHour, this.viewEndDayHour, this.allDayPanelMode)) {
        result = true;
        return false;
      }
    });
    return result;
  }
  setDataAccessors(dataAccessors) {
    this.dataAccessors = dataAccessors;
  }
  _createAllDayAppointmentFilter(filterOptions) {
    var {
      viewStartDayHour,
      viewEndDayHour
    } = filterOptions;
    return [[appointment => getAppointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour, this.allDayPanelMode)]];
  }
  _createCombinedFilter(filterOptions) {
    var min = new Date(filterOptions.min);
    var max = new Date(filterOptions.max);
    var {
      startDayHour,
      endDayHour,
      viewStartDayHour,
      viewEndDayHour,
      resources,
      firstDayOfWeek,
      checkIntersectViewport,
      supportMultiDayAppointments
    } = filterOptions;
    var [trimMin, trimMax] = getDatesWithoutTime(min, max);
    var useRecurrence = isDefined(this.dataAccessors.getter.recurrenceRule);
    return [[appointment => {
      var _a;
      var appointmentVisible = (_a = appointment.visible) !== null && _a !== void 0 ? _a : true;
      if (!appointmentVisible) {
        return false;
      }
      var {
        startDate,
        endDate,
        hasRecurrenceRule
      } = appointment;
      if (!hasRecurrenceRule) {
        if (!(endDate >= trimMin && startDate < trimMax || dateUtils.sameDate(endDate, trimMin) && dateUtils.sameDate(startDate, trimMin))) {
          return false;
        }
      }
      var appointmentTakesAllDay = getAppointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour, this.allDayPanelMode);
      var appointmentTakesSeveralDays = getAppointmentTakesSeveralDays(appointment);
      var isAllDay = appointment.allDay;
      var isLongAppointment = appointmentTakesSeveralDays || appointmentTakesAllDay;
      if ((resources === null || resources === void 0 ? void 0 : resources.length) && !this._filterAppointmentByResources(appointment.rawAppointment, resources)) {
        return false;
      }
      if (appointmentTakesAllDay && filterOptions.allDay === false) {
        return false;
      }
      if (hasRecurrenceRule) {
        var recurrenceException = getRecurrenceException(appointment, this.timeZoneCalculator, this.timezone);
        if (!this._filterAppointmentByRRule(_extends(_extends({}, appointment), {
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
      if (isDefined(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
        if (!compareDateWithStartDayHour(startDate, endDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays)) {
          return false;
        }
      }
      if (isDefined(endDayHour)) {
        if (!compareDateWithEndDayHour({
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
  _createAppointmentFilter(filterOptions) {
    return this._createCombinedFilter(filterOptions);
  }
  _filterAppointmentByResources(appointment, resources) {
    var checkAppointmentResourceValues = (resourceName, resourceIndex) => {
      var resourceGetter = this.dataAccessors.resources.getter[resourceName];
      var resource;
      if (isFunction(resourceGetter)) {
        resource = resourceGetter(appointment);
      }
      var appointmentResourceValues = wrapToArray(resource);
      var resourceData = map(resources[resourceIndex].items, _ref => {
        var {
          id
        } = _ref;
        return id;
      });
      for (var i = 0; i < appointmentResourceValues.length; i++) {
        if (hasResourceValue(resourceData, appointmentResourceValues[i])) {
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
  }
  _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
    var {
      recurrenceRule
    } = appointment;
    var {
      recurrenceException
    } = appointment;
    var {
      allDay
    } = appointment;
    var result = true;
    var appointmentStartDate = appointment.startDate;
    var appointmentEndDate = appointment.endDate;
    var recurrenceProcessor = getRecurrenceProcessor();
    if (allDay || _appointmentPartInInterval(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
      var [trimMin, trimMax] = getDatesWithoutTime(min, max);
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
  }
  filterLoadedAppointments(filterOptions, preparedItems) {
    var filteredItems = this.filterPreparedItems(filterOptions, preparedItems);
    return filteredItems.map(_ref2 => {
      var {
        rawAppointment
      } = _ref2;
      return rawAppointment;
    });
  }
  filterPreparedItems(filterOptions, preparedItems) {
    var combinedFilter = this._createAppointmentFilter(filterOptions);
    return query(preparedItems).filter(combinedFilter).toArray();
  }
  filterAllDayAppointments(filterOptions, preparedItems) {
    var combinedFilter = this._createAllDayAppointmentFilter(filterOptions);
    return query(preparedItems).filter(combinedFilter).toArray().map(_ref3 => {
      var {
        rawAppointment
      } = _ref3;
      return rawAppointment;
    });
  }
}
export class AppointmentFilterVirtualStrategy extends AppointmentFilterBaseStrategy {
  get strategyName() {
    return FilterStrategies.virtual;
  }
  get resources() {
    return this.options.resources;
  }
  filter(preparedItems) {
    var hourMs = toMs('hour');
    var isCalculateStartAndEndDayHour = calculateIsDateAndTimeView(this.viewType);
    var checkIntersectViewport = isCalculateStartAndEndDayHour && this.viewDirection === 'horizontal';
    var isAllDayWorkspace = !this.supportAllDayRow;
    var showAllDayAppointments = this.showAllDayPanel || isAllDayWorkspace;
    var endViewDate = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
    var filterOptions = [];
    var groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
    groupsInfo.forEach(item => {
      var {
        groupIndex
      } = item;
      var groupStartDate = item.startDate;
      var groupEndDate = new Date(Math.min(item.endDate, endViewDate));
      var startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : this.viewStartDayHour;
      var endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate - groupStartDate) / hourMs : this.viewEndDayHour;
      var resources = this._getPrerenderFilterResources(groupIndex);
      var hasAllDayPanel = this.viewDataProvider.hasGroupAllDayPanel(groupIndex);
      var supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && hasAllDayPanel;
      filterOptions.push({
        isVirtualScrolling: true,
        startDayHour,
        endDayHour,
        viewStartDayHour: this.viewStartDayHour,
        viewEndDayHour: this.viewEndDayHour,
        min: groupStartDate,
        max: groupEndDate,
        supportMultiDayAppointments: isTimelineView(this.viewType),
        allDay: supportAllDayAppointment,
        resources,
        firstDayOfWeek: this.firstDayOfWeek,
        checkIntersectViewport
      });
    });
    return this.filterLoadedAppointments({
      filterOptions,
      groupCount: this.groupCount
    }, preparedItems);
  }
  filterPreparedItems(_ref4, preparedItems) {
    var {
      filterOptions,
      groupCount
    } = _ref4;
    var combinedFilters = [];
    var itemsToFilter = preparedItems;
    var needPreFilter = groupCount > 0;
    if (needPreFilter) {
      // @ts-expect-error
      itemsToFilter = itemsToFilter.filter(_ref5 => {
        var {
          rawAppointment
        } = _ref5;
        for (var i = 0; i < filterOptions.length; ++i) {
          var {
            resources
          } = filterOptions[i];
          if (this._filterAppointmentByResources(rawAppointment, resources)) {
            return true;
          }
        }
      });
    }
    filterOptions.forEach(option => {
      combinedFilters.length && combinedFilters.push('or');
      var filter = this._createAppointmentFilter(option);
      combinedFilters.push(filter);
    });
    return query(itemsToFilter).filter(combinedFilters).toArray();
  }
  hasAllDayAppointments(adapters, preparedItems) {
    return this.filterAllDayAppointments({
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour
    }, preparedItems).length > 0;
  }
  _getPrerenderFilterResources(groupIndex) {
    var cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
    return getResourcesDataByGroups(this.loadedResources, this.resources, [cellGroup]);
  }
}
