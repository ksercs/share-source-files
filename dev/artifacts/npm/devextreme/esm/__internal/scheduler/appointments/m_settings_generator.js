/**
* DevExtreme (esm/__internal/scheduler/appointments/m_settings_generator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable max-classes-per-file */
import dateUtils from '../../../core/utils/date';
import { extend } from '../../../core/utils/extend';
import { isEmptyObject } from '../../../core/utils/type';
import { isDateAndTimeView } from '../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import timeZoneUtils from '../../../ui/scheduler/utils.timeZone';
import { createAppointmentAdapter } from '../m_appointment_adapter';
import { ExpressionUtils } from '../m_expression_utils';
import { getRecurrenceProcessor } from '../m_recurrence';
import { createResourcesTree, getDataAccessors, getGroupCount, getResourceTreeLeaves } from '../resources/m_utils';
import { CellPositionCalculator } from './m_cell_position_calculator';
import { createFormattedDateText } from './m_text_utils';
var toMs = dateUtils.dateToMilliseconds;
var APPOINTMENT_DATE_TEXT_FORMAT = 'TIME';
export class DateGeneratorBaseStrategy {
  constructor(options) {
    this.options = options;
  }
  get rawAppointment() {
    return this.options.rawAppointment;
  }
  get timeZoneCalculator() {
    return this.options.timeZoneCalculator;
  }
  get viewDataProvider() {
    return this.options.viewDataProvider;
  }
  get appointmentTakesAllDay() {
    return this.options.appointmentTakesAllDay;
  }
  get supportAllDayRow() {
    return this.options.supportAllDayRow;
  }
  get isAllDayRowAppointment() {
    return this.options.isAllDayRowAppointment;
  }
  get timeZone() {
    return this.options.timeZone;
  }
  get dateRange() {
    return this.options.dateRange;
  }
  get firstDayOfWeek() {
    return this.options.firstDayOfWeek;
  }
  get viewStartDayHour() {
    return this.options.viewStartDayHour;
  }
  get viewEndDayHour() {
    return this.options.viewEndDayHour;
  }
  get endViewDate() {
    return this.options.endViewDate;
  }
  get viewType() {
    return this.options.viewType;
  }
  get isGroupedByDate() {
    return this.options.isGroupedByDate;
  }
  get isVerticalOrientation() {
    return this.options.isVerticalGroupOrientation;
  }
  get dataAccessors() {
    return this.options.dataAccessors;
  }
  get loadedResources() {
    return this.options.loadedResources;
  }
  get isDateAppointment() {
    return !isDateAndTimeView(this.viewType) && this.appointmentTakesAllDay;
  }
  getIntervalDuration() {
    return this.appointmentTakesAllDay ? this.options.allDayIntervalDuration : this.options.intervalDuration;
  }
  generate(appointmentAdapter) {
    var itemGroupIndices = this._getGroupIndices(this.rawAppointment);
    var appointmentList = this._createAppointments(appointmentAdapter, itemGroupIndices);
    appointmentList = this._getProcessedByAppointmentTimeZone(appointmentList, appointmentAdapter); // T983264
    if (this._canProcessNotNativeTimezoneDates(appointmentAdapter)) {
      appointmentList = this._getProcessedNotNativeTimezoneDates(appointmentList, appointmentAdapter);
    }
    var dateSettings = this._createGridAppointmentList(appointmentList, appointmentAdapter);
    var firstViewDates = this._getAppointmentsFirstViewDate(dateSettings);
    this._fillNormalizedStartDate(dateSettings, firstViewDates);
    dateSettings = this._cropAppointmentsByStartDayHour(dateSettings, firstViewDates);
    dateSettings = this._fillNormalizedEndDate(dateSettings, this.rawAppointment);
    if (this._needSeparateLongParts()) {
      dateSettings = this._separateLongParts(dateSettings, appointmentAdapter);
    }
    var {
      isRecurrent
    } = appointmentAdapter;
    return {
      dateSettings,
      itemGroupIndices,
      isRecurrent
    };
  }
  _getProcessedByAppointmentTimeZone(appointmentList, appointment) {
    var hasAppointmentTimeZone = !isEmptyObject(appointment.startDateTimeZone) || !isEmptyObject(appointment.endDateTimeZone);
    if (hasAppointmentTimeZone) {
      var appointmentOffsets = {
        startDate: this.timeZoneCalculator.getOffsets(appointment.startDate, appointment.startDateTimeZone),
        endDate: this.timeZoneCalculator.getOffsets(appointment.endDate, appointment.endDateTimeZone)
      };
      appointmentList.forEach(a => {
        var sourceOffsets = {
          startDate: this.timeZoneCalculator.getOffsets(a.startDate, appointment.startDateTimeZone),
          endDate: this.timeZoneCalculator.getOffsets(a.endDate, appointment.endDateTimeZone)
        };
        var startDateOffsetDiff = appointmentOffsets.startDate.appointment - sourceOffsets.startDate.appointment;
        var endDateOffsetDiff = appointmentOffsets.endDate.appointment - sourceOffsets.endDate.appointment;
        if (sourceOffsets.startDate.appointment !== sourceOffsets.startDate.common) {
          a.startDate = new Date(a.startDate.getTime() + startDateOffsetDiff * toMs('hour'));
        }
        if (sourceOffsets.endDate.appointment !== sourceOffsets.endDate.common) {
          a.endDate = new Date(a.endDate.getTime() + endDateOffsetDiff * toMs('hour'));
        }
      });
    }
    return appointmentList;
  }
  _createAppointments(appointment, groupIndices) {
    var appointments = this._createRecurrenceAppointments(appointment, groupIndices);
    if (!appointment.isRecurrent && appointments.length === 0) {
      appointments.push({
        startDate: appointment.startDate,
        endDate: appointment.endDate
      });
    }
    // T817857
    appointments = appointments.map(item => {
      var _a;
      var resultEndTime = (_a = item.endDate) === null || _a === void 0 ? void 0 : _a.getTime();
      if (item.startDate.getTime() === resultEndTime) {
        item.endDate.setTime(resultEndTime + toMs('minute'));
      }
      return _extends(_extends({}, item), {
        exceptionDate: new Date(item.startDate)
      });
    });
    return appointments;
  }
  _canProcessNotNativeTimezoneDates(appointment) {
    var isTimeZoneSet = !isEmptyObject(this.timeZone);
    if (!isTimeZoneSet) {
      return false;
    }
    if (!appointment.isRecurrent) {
      return false;
    }
    return !timeZoneUtils.isEqualLocalTimeZone(this.timeZone, appointment.startDate);
  }
  _getProcessedNotNativeDateIfCrossDST(date, offset) {
    if (offset < 0) {
      // summer time
      var newDate = new Date(date);
      var newDateMinusOneHour = new Date(newDate);
      newDateMinusOneHour.setHours(newDateMinusOneHour.getHours() - 1);
      var newDateOffset = this.timeZoneCalculator.getOffsets(newDate).common;
      var newDateMinusOneHourOffset = this.timeZoneCalculator.getOffsets(newDateMinusOneHour).common;
      if (newDateOffset !== newDateMinusOneHourOffset) {
        return 0;
      }
    }
    return offset;
  }
  _getCommonOffset(date) {
    return this.timeZoneCalculator.getOffsets(date).common;
  }
  _getProcessedNotNativeTimezoneDates(appointmentList, appointment) {
    return appointmentList.map(item => {
      var diffStartDateOffset = this._getCommonOffset(appointment.startDate) - this._getCommonOffset(item.startDate);
      var diffEndDateOffset = this._getCommonOffset(appointment.endDate) - this._getCommonOffset(item.endDate);
      if (diffStartDateOffset === 0 && diffEndDateOffset === 0) {
        return item;
      }
      diffStartDateOffset = this._getProcessedNotNativeDateIfCrossDST(item.startDate, diffStartDateOffset);
      diffEndDateOffset = this._getProcessedNotNativeDateIfCrossDST(item.endDate, diffEndDateOffset);
      var newStartDate = new Date(item.startDate.getTime() + diffStartDateOffset * toMs('hour'));
      var newEndDate = new Date(item.endDate.getTime() + diffEndDateOffset * toMs('hour'));
      var testNewStartDate = this.timeZoneCalculator.createDate(newStartDate, {
        path: 'toGrid'
      });
      var testNewEndDate = this.timeZoneCalculator.createDate(newEndDate, {
        path: 'toGrid'
      });
      if (appointment.duration > testNewEndDate.getTime() - testNewStartDate.getTime()) {
        newEndDate = new Date(newStartDate.getTime() + appointment.duration);
      }
      return _extends(_extends({}, item), {
        startDate: newStartDate,
        endDate: newEndDate,
        exceptionDate: new Date(newStartDate)
      });
    });
  }
  _needSeparateLongParts() {
    return this.isVerticalOrientation ? this.isGroupedByDate : this.isGroupedByDate && this.appointmentTakesAllDay;
  }
  normalizeEndDateByViewEnd(rawAppointment, endDate) {
    var result = new Date(endDate.getTime());
    var isAllDay = isDateAndTimeView(this.viewType) && this.appointmentTakesAllDay;
    if (!isAllDay) {
      var roundedEndViewDate = dateUtils.roundToHour(this.endViewDate);
      if (result > roundedEndViewDate) {
        result = roundedEndViewDate;
      }
    }
    var endDayHour = this.viewEndDayHour;
    var allDay = ExpressionUtils.getField(this.dataAccessors, 'allDay', rawAppointment);
    var currentViewEndTime = new Date(new Date(endDate.getTime()).setHours(endDayHour, 0, 0, 0));
    if (result.getTime() > currentViewEndTime.getTime() || allDay && result.getHours() < endDayHour) {
      result = currentViewEndTime;
    }
    return result;
  }
  _fillNormalizedEndDate(dateSettings, rawAppointment) {
    return dateSettings.map(item => {
      var {
        endDate
      } = item;
      var normalizedEndDate = this.normalizeEndDateByViewEnd(rawAppointment, endDate);
      return _extends(_extends({}, item), {
        normalizedEndDate
      });
    });
  }
  _separateLongParts(gridAppointmentList, appointmentAdapter) {
    var result = [];
    gridAppointmentList.forEach(gridAppointment => {
      var maxDate = new Date(this.dateRange[1]);
      var {
        normalizedEndDate: endDateOfPart
      } = gridAppointment;
      var longStartDateParts = dateUtils.getDatesOfInterval(gridAppointment.startDate, endDateOfPart, {
        milliseconds: this.getIntervalDuration()
      });
      var list = longStartDateParts.filter(startDatePart => new Date(startDatePart) < maxDate).map(date => {
        var endDate = new Date(new Date(date).setMilliseconds(appointmentAdapter.duration));
        var normalizedEndDate = this.normalizeEndDateByViewEnd(this.rawAppointment, endDate);
        return {
          startDate: date,
          endDate,
          normalizedEndDate,
          source: gridAppointment.source
        };
      });
      result = result.concat(list);
    });
    return result;
  }
  _createGridAppointmentList(appointmentList, appointmentAdapter) {
    return appointmentList.map(source => {
      var offsetDifference = appointmentAdapter.startDate.getTimezoneOffset() - source.startDate.getTimezoneOffset();
      if (offsetDifference !== 0 && this._canProcessNotNativeTimezoneDates(appointmentAdapter)) {
        source.startDate = new Date(source.startDate.getTime() + offsetDifference * toMs('minute'));
        source.endDate = new Date(source.endDate.getTime() + offsetDifference * toMs('minute'));
        source.exceptionDate = new Date(source.startDate);
      }
      var startDate = this.timeZoneCalculator.createDate(source.startDate, {
        path: 'toGrid'
      });
      var endDate = this.timeZoneCalculator.createDate(source.endDate, {
        path: 'toGrid'
      });
      return {
        startDate,
        endDate,
        allDay: appointmentAdapter.allDay || false,
        source // TODO
      };
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createExtremeRecurrenceDates(groupIndex) {
    var startViewDate = this.appointmentTakesAllDay ? dateUtils.trimTime(this.dateRange[0]) : this.dateRange[0];
    var endViewDateByEndDayHour = this.dateRange[1];
    if (this.timeZone) {
      startViewDate = this.timeZoneCalculator.createDate(startViewDate, {
        path: 'fromGrid'
      });
      endViewDateByEndDayHour = this.timeZoneCalculator.createDate(endViewDateByEndDayHour, {
        path: 'fromGrid'
      });
      var daylightOffset = timeZoneUtils.getDaylightOffsetInMs(startViewDate, endViewDateByEndDayHour);
      if (daylightOffset) {
        endViewDateByEndDayHour = new Date(endViewDateByEndDayHour.getTime() + daylightOffset);
      }
    }
    return [startViewDate, endViewDateByEndDayHour];
  }
  _createRecurrenceOptions(appointment, groupIndex) {
    var [minRecurrenceDate, maxRecurrenceDate] = this._createExtremeRecurrenceDates(groupIndex);
    return {
      rule: appointment.recurrenceRule,
      exception: appointment.recurrenceException,
      min: minRecurrenceDate,
      max: maxRecurrenceDate,
      firstDayOfWeek: this.firstDayOfWeek,
      start: appointment.startDate,
      end: appointment.endDate,
      appointmentTimezoneOffset: this.timeZoneCalculator.getOriginStartDateOffsetInMs(appointment.startDate, appointment.rawAppointment.startDateTimeZone, true),
      getPostProcessedException: date => {
        if (isEmptyObject(this.timeZone) || timeZoneUtils.isEqualLocalTimeZone(this.timeZone, date)) {
          return date;
        }
        var appointmentOffset = this.timeZoneCalculator.getOffsets(appointment.startDate).common;
        var exceptionAppointmentOffset = this.timeZoneCalculator.getOffsets(date).common;
        var diff = appointmentOffset - exceptionAppointmentOffset;
        diff = this._getProcessedNotNativeDateIfCrossDST(date, diff);
        return new Date(date.getTime() - diff * dateUtils.dateToMilliseconds('hour'));
      }
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createRecurrenceAppointments(appointment, groupIndices) {
    var {
      duration
    } = appointment;
    var option = this._createRecurrenceOptions(appointment);
    var generatedStartDates = getRecurrenceProcessor().generateDates(option);
    return generatedStartDates.map(date => {
      var utcDate = timeZoneUtils.createUTCDateWithLocalOffset(date);
      utcDate.setTime(utcDate.getTime() + duration);
      var endDate = timeZoneUtils.createDateFromUTCWithLocalOffset(utcDate);
      return {
        startDate: new Date(date),
        endDate
      };
    });
  }
  _getAppointmentsFirstViewDate(appointments) {
    return appointments.map(appointment => this._getAppointmentFirstViewDate(appointment));
  }
  _fillNormalizedStartDate(appointments, firstViewDates, rawAppointment) {
    appointments.forEach((appointment, idx) => {
      appointment.startDate = this._getAppointmentResultDate({
        appointment,
        rawAppointment,
        startDate: new Date(appointment.startDate),
        startDayHour: this.viewStartDayHour,
        firstViewDate: firstViewDates[idx]
      });
    });
  }
  _cropAppointmentsByStartDayHour(appointments, firstViewDates) {
    return appointments.filter((appointment, idx) => {
      if (!firstViewDates[idx]) {
        return false;
      }
      if (this.appointmentTakesAllDay) {
        return true;
      }
      return appointment.endDate > appointment.startDate;
    });
  }
  _getAppointmentResultDate(options) {
    var {
      appointment,
      startDayHour,
      firstViewDate
    } = options;
    var {
      startDate
    } = options;
    var resultDate;
    if (this.appointmentTakesAllDay) {
      resultDate = dateUtils.normalizeDate(startDate, firstViewDate);
    } else {
      if (startDate < firstViewDate) {
        startDate = firstViewDate;
      }
      resultDate = dateUtils.normalizeDate(appointment.startDate, startDate);
    }
    return !this.isDateAppointment ? dateUtils.roundDateByStartDayHour(resultDate, startDayHour) : resultDate;
  }
  _getAppointmentFirstViewDate(appointment) {
    var groupIndex = appointment.source.groupIndex || 0;
    var {
      startDate,
      endDate
    } = appointment;
    if (this.isAllDayRowAppointment || appointment.allDay) {
      return this.viewDataProvider.findAllDayGroupCellStartDate(groupIndex, startDate);
    }
    return this.viewDataProvider.findGroupCellStartDate(groupIndex, startDate, endDate, this.isDateAppointment);
  }
  _getGroupIndices(rawAppointment) {
    var result = [];
    if (rawAppointment && this.loadedResources.length) {
      var tree = createResourcesTree(this.loadedResources);
      result = getResourceTreeLeaves((field, action) => getDataAccessors(this.options.dataAccessors.resources, field, action), tree, rawAppointment);
    }
    return result;
  }
}
export class DateGeneratorVirtualStrategy extends DateGeneratorBaseStrategy {
  get groupCount() {
    return getGroupCount(this.loadedResources);
  }
  _createRecurrenceAppointments(appointment, groupIndices) {
    var {
      duration
    } = appointment;
    var result = [];
    var validGroupIndices = this.groupCount ? groupIndices : [0];
    validGroupIndices.forEach(groupIndex => {
      var option = this._createRecurrenceOptions(appointment, groupIndex);
      var generatedStartDates = getRecurrenceProcessor().generateDates(option);
      var recurrentInfo = generatedStartDates.map(date => {
        var startDate = new Date(date);
        var utcDate = timeZoneUtils.createUTCDateWithLocalOffset(date);
        utcDate.setTime(utcDate.getTime() + duration);
        var endDate = timeZoneUtils.createDateFromUTCWithLocalOffset(utcDate);
        return {
          startDate,
          endDate,
          groupIndex
        };
      });
      result.push(...recurrentInfo);
    });
    return result;
  }
  _updateGroupIndices(appointments, groupIndices) {
    var result = [];
    groupIndices.forEach(groupIndex => {
      var groupStartDate = this.viewDataProvider.getGroupStartDate(groupIndex);
      if (groupStartDate) {
        appointments.forEach(appointment => {
          var appointmentCopy = extend({}, appointment);
          appointmentCopy.groupIndex = groupIndex;
          result.push(appointmentCopy);
        });
      }
    });
    return result;
  }
  _getGroupIndices(resources) {
    var groupIndices = super._getGroupIndices(resources);
    var viewDataGroupIndices = this.viewDataProvider.getGroupIndices();
    if (!(groupIndices === null || groupIndices === void 0 ? void 0 : groupIndices.length)) {
      groupIndices = [0];
    }
    return groupIndices.filter(groupIndex => viewDataGroupIndices.indexOf(groupIndex) !== -1);
  }
  _createAppointments(appointment, groupIndices) {
    var appointments = super._createAppointments(appointment, groupIndices);
    return !appointment.isRecurrent ? this._updateGroupIndices(appointments, groupIndices) : appointments;
  }
}
// TODO rename to AppointmentInfoGenerator or AppointmentViewModel after refactoring geometry calculation strategies
export class AppointmentSettingsGenerator {
  constructor(options) {
    this.options = options;
    this.appointmentAdapter = createAppointmentAdapter(this.rawAppointment, this.dataAccessors, this.timeZoneCalculator);
  }
  get rawAppointment() {
    return this.options.rawAppointment;
  }
  get dataAccessors() {
    return this.options.dataAccessors;
  }
  get timeZoneCalculator() {
    return this.options.timeZoneCalculator;
  }
  get isAllDayRowAppointment() {
    return this.options.appointmentTakesAllDay && this.options.supportAllDayRow;
  }
  get groups() {
    return this.options.groups;
  }
  get dateSettingsStrategy() {
    var options = _extends(_extends({}, this.options), {
      isAllDayRowAppointment: this.isAllDayRowAppointment
    });
    return this.options.isVirtualScrolling ? new DateGeneratorVirtualStrategy(options) : new DateGeneratorBaseStrategy(options);
  }
  create() {
    var {
      dateSettings,
      itemGroupIndices,
      isRecurrent
    } = this._generateDateSettings();
    var cellPositions = this._calculateCellPositions(dateSettings, itemGroupIndices);
    var result = this._prepareAppointmentInfos(dateSettings, cellPositions, isRecurrent);
    return result;
  }
  _generateDateSettings() {
    return this.dateSettingsStrategy.generate(this.appointmentAdapter);
  }
  _calculateCellPositions(dateSettings, itemGroupIndices) {
    var cellPositionCalculator = new CellPositionCalculator(_extends(_extends({}, this.options), {
      dateSettings
    }));
    return cellPositionCalculator.calculateCellPositions(itemGroupIndices, this.isAllDayRowAppointment, this.appointmentAdapter.isRecurrent);
  }
  _prepareAppointmentInfos(dateSettings, cellPositions, isRecurrent) {
    var infos = [];
    cellPositions.forEach(_ref => {
      var {
        coordinates,
        dateSettingIndex
      } = _ref;
      var dateSetting = dateSettings[dateSettingIndex];
      var dateText = this._getAppointmentDateText(dateSetting);
      var info = {
        appointment: dateSetting,
        sourceAppointment: dateSetting.source,
        dateText,
        isRecurrent
      };
      infos.push(_extends(_extends({}, coordinates), {
        info
      }));
    });
    return infos;
  }
  _getAppointmentDateText(sourceAppointment) {
    var {
      startDate,
      endDate,
      allDay
    } = sourceAppointment;
    return createFormattedDateText({
      startDate,
      endDate,
      allDay,
      format: APPOINTMENT_DATE_TEXT_FORMAT
    });
  }
}
