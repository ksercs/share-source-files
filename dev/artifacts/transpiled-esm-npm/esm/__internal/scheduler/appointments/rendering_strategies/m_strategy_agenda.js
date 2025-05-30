import dateUtils from '../../../../core/utils/date';
import { each } from '../../../../core/utils/iterator';
import { createAppointmentAdapter } from '../../m_appointment_adapter';
import { ExpressionUtils } from '../../m_expression_utils';
import { groupAppointmentsByResources } from '../../resources/m_utils';
import { getAppointmentTakesSeveralDays, replaceWrongEndDate } from '../data_provider/m_utils';
import BaseRenderingStrategy from './m_strategy_base';
class AgendaRenderingStrategy extends BaseRenderingStrategy {
  get instance() {
    return this.options.instance;
  }
  get agendaDuration() {
    return this.options.agendaDuration;
  }
  getAppointmentMinSize() {}
  getDeltaTime() {}
  keepAppointmentSettings() {
    return true;
  }
  getAppointmentGeometry(geometry) {
    return geometry;
  }
  groupAppointmentByResources(appointments) {
    var groups = this.instance._getCurrentViewOption('groups');
    var config = {
      loadedResources: this.options.loadedResources,
      resources: this.options.resources,
      dataAccessors: this.dataAccessors.resources
    };
    return groupAppointmentsByResources(config, appointments, groups);
  }
  createTaskPositionMap(appointments) {
    var height;
    var appointmentsByResources;
    this.calculateRows(appointments, this.agendaDuration, this.currentDate);
    if (appointments.length) {
      height = this.instance.fire('getAgendaVerticalStepHeight');
      appointmentsByResources = this.groupAppointmentByResources(appointments);
      var groupedAppts = [];
      each(appointmentsByResources, (i, appts) => {
        var additionalAppointments = [];
        var recurrentIndexes = [];
        each(appts, (index, appointment) => {
          var recurrenceBatch = this.instance.getAppointmentsInstance()._processRecurrenceAppointment(appointment, index);
          var appointmentBatch = null;
          if (!recurrenceBatch.indexes.length) {
            appointmentBatch = this.instance.getAppointmentsInstance()._processLongAppointment(appointment);
            additionalAppointments = additionalAppointments.concat(appointmentBatch.parts);
          }
          additionalAppointments = additionalAppointments.concat(recurrenceBatch.parts);
          recurrentIndexes = recurrentIndexes.concat(recurrenceBatch.indexes);
        });
        this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(recurrentIndexes, appts);
        this.instance.getAppointmentsInstance()._combineAppointments(appts, additionalAppointments);
        groupedAppts = groupedAppts.concat(appts);
      });
      Array.prototype.splice.apply(appointments, [0, appointments.length].concat(groupedAppts));
    }
    var result = [];
    var sortedIndex = 0;
    appointments.forEach((appt, index) => {
      result.push([{
        height,
        width: '100%',
        sortedIndex: sortedIndex++,
        groupIndex: this._calculateGroupIndex(index, appointmentsByResources),
        agendaSettings: appt.settings
      }]);
      delete appt.settings;
    });
    return result;
  }
  _calculateGroupIndex(apptIndex, appointmentsByResources) {
    var resultInd;
    var counter = 0;
    // eslint-disable-next-line
    for (var i in appointmentsByResources) {
      var countApptInGroup = appointmentsByResources[i].length;
      if (apptIndex >= counter && apptIndex < counter + countApptInGroup) {
        resultInd = Number(i);
        break;
      }
      counter += countApptInGroup;
    }
    return resultInd;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getDeltaWidth(args, initialSize) {}
  _getAppointmentMaxWidth() {
    return this.cellWidth;
  }
  _needVerifyItemSize() {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getAppointmentParts(geometry, settings) {}
  _reduceMultiWeekAppointment() {}
  calculateAppointmentHeight() {
    return 0;
  }
  calculateAppointmentWidth() {
    return 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isAppointmentGreaterThan(etalon, comparisonParameters) {}
  isAllDay() {
    return false;
  }
  _sortCondition() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _rowCondition(a, b) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _columnCondition(a, b) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _findIndexByKey(arr, iKey, jKey, iValue, jValue) {}
  _markAppointmentAsVirtual() {}
  getDropDownAppointmentWidth() {}
  getCollectorLeftOffset() {}
  getCollectorTopOffset() {}
  // From subscribe
  replaceWrongAppointmentEndDate(rawAppointment, startDate, endDate) {
    var adapter = createAppointmentAdapter(rawAppointment, this.dataAccessors, this.timeZoneCalculator);
    replaceWrongEndDate(adapter, startDate, endDate, this.cellDuration, this.dataAccessors);
  }
  // TODO: get rid of an extra 'needClearSettings' argument
  calculateRows(appointments, agendaDuration, currentDate, needClearSettings) {
    this._rows = [];
    currentDate = dateUtils.trimTime(new Date(currentDate));
    var groupedAppointments = this.groupAppointmentByResources(appointments);
    // @ts-expect-error
    each(groupedAppointments, (_, currentAppointments) => {
      var groupResult = [];
      var appts = {
        indexes: [],
        parts: []
      };
      if (!currentAppointments.length) {
        this._rows.push([]);
        return true;
      }
      each(currentAppointments, (index, appointment) => {
        var startDate = ExpressionUtils.getField(this.dataAccessors, 'startDate', appointment);
        var endDate = ExpressionUtils.getField(this.dataAccessors, 'endDate', appointment);
        this.replaceWrongAppointmentEndDate(appointment, startDate, endDate);
        needClearSettings && delete appointment.settings;
        var result = this.instance.getAppointmentsInstance()._processRecurrenceAppointment(appointment, index, false);
        appts.parts = appts.parts.concat(result.parts);
        appts.indexes = appts.indexes.concat(result.indexes);
      });
      this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(appts.indexes, currentAppointments);
      currentAppointments.push(...appts.parts);
      var appointmentCount = currentAppointments.length;
      for (var i = 0; i < agendaDuration; i++) {
        var day = new Date(currentDate);
        day.setMilliseconds(day.getMilliseconds() + 24 * 3600000 * i);
        if (groupResult[i] === undefined) {
          groupResult[i] = 0;
        }
        for (var j = 0; j < appointmentCount; j++) {
          var appointmentData = currentAppointments[j].settings || currentAppointments[j];
          var adapter = createAppointmentAdapter(currentAppointments[j], this.dataAccessors, this.timeZoneCalculator);
          var appointmentIsLong = getAppointmentTakesSeveralDays(adapter);
          var appointmentIsRecurrence = ExpressionUtils.getField(this.dataAccessors, 'recurrenceRule', currentAppointments[j]);
          if (this.instance.fire('dayHasAppointment', day, appointmentData, true) || !appointmentIsRecurrence && appointmentIsLong && this.instance.fire('dayHasAppointment', day, currentAppointments[j], true)) {
            groupResult[i] += 1;
          }
        }
      }
      this._rows.push(groupResult);
    });
    return this._rows;
  }
  _iterateRow(row, obj, index) {
    for (var i = 0; i < row.length; i++) {
      obj.counter += row[i];
      if (obj.counter >= index) {
        obj.indexInRow = i;
        break;
      }
    }
  }
  getDateByIndex(index, rows, startViewDate) {
    var obj = {
      counter: 0,
      indexInRow: 0
    };
    index++;
    for (var i = 0; i < rows.length; i++) {
      this._iterateRow(rows[i], obj, index);
      if (obj.indexInRow) break;
    }
    return new Date(new Date(startViewDate).setDate(startViewDate.getDate() + obj.indexInRow));
  }
  getAppointmentDataCalculator() {
    return ($appointment, originalStartDate) => {
      var apptIndex = $appointment.index();
      var startViewDate = this.instance.getStartViewDate();
      var calculatedStartDate = this.getDateByIndex(apptIndex, this._rows, startViewDate);
      var wrappedOriginalStartDate = new Date(originalStartDate);
      return {
        startDate: new Date(calculatedStartDate.setHours(wrappedOriginalStartDate.getHours(), wrappedOriginalStartDate.getMinutes(), wrappedOriginalStartDate.getSeconds(), wrappedOriginalStartDate.getMilliseconds()))
      };
    };
  }
}
export default AgendaRenderingStrategy;