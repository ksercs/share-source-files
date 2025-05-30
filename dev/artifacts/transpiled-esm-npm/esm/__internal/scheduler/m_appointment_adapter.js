import { extend } from '../../core/utils/extend';
import { deepExtendArraySafe } from '../../core/utils/object';
import errors from '../../ui/widget/ui.errors';
import { ExpressionUtils } from './m_expression_utils';
import { getRecurrenceProcessor } from './m_recurrence';
var PROPERTY_NAMES = {
  startDate: 'startDate',
  endDate: 'endDate',
  allDay: 'allDay',
  text: 'text',
  description: 'description',
  startDateTimeZone: 'startDateTimeZone',
  endDateTimeZone: 'endDateTimeZone',
  recurrenceRule: 'recurrenceRule',
  recurrenceException: 'recurrenceException',
  disabled: 'disabled'
};
class AppointmentAdapter {
  constructor(rawAppointment, dataAccessors, timeZoneCalculator, options) {
    this.rawAppointment = rawAppointment;
    this.dataAccessors = dataAccessors;
    this.timeZoneCalculator = timeZoneCalculator;
    this.options = options;
  }
  get duration() {
    return this.endDate ? this.endDate - this.startDate : 0;
  }
  get startDate() {
    var result = this.getField(PROPERTY_NAMES.startDate);
    return result === undefined ? result : new Date(result);
  }
  set startDate(value) {
    this.setField(PROPERTY_NAMES.startDate, value);
  }
  get endDate() {
    var result = this.getField(PROPERTY_NAMES.endDate);
    return result === undefined ? result : new Date(result);
  }
  set endDate(value) {
    this.setField(PROPERTY_NAMES.endDate, value);
  }
  get allDay() {
    return this.getField(PROPERTY_NAMES.allDay);
  }
  set allDay(value) {
    this.setField(PROPERTY_NAMES.allDay, value);
  }
  get text() {
    return this.getField(PROPERTY_NAMES.text);
  }
  set text(value) {
    this.setField(PROPERTY_NAMES.text, value);
  }
  get description() {
    return this.getField(PROPERTY_NAMES.description);
  }
  set description(value) {
    this.setField(PROPERTY_NAMES.description, value);
  }
  get startDateTimeZone() {
    return this.getField(PROPERTY_NAMES.startDateTimeZone);
  }
  get endDateTimeZone() {
    return this.getField(PROPERTY_NAMES.endDateTimeZone);
  }
  get recurrenceRule() {
    return this.getField(PROPERTY_NAMES.recurrenceRule);
  }
  set recurrenceRule(value) {
    this.setField(PROPERTY_NAMES.recurrenceRule, value);
  }
  get recurrenceException() {
    return this.getField(PROPERTY_NAMES.recurrenceException);
  }
  set recurrenceException(value) {
    this.setField(PROPERTY_NAMES.recurrenceException, value);
  }
  get disabled() {
    return !!this.getField(PROPERTY_NAMES.disabled);
  }
  get isRecurrent() {
    return getRecurrenceProcessor().isValidRecurrenceRule(this.recurrenceRule);
  }
  getField(property) {
    return ExpressionUtils.getField(this.dataAccessors, property, this.rawAppointment);
  }
  setField(property, value) {
    return ExpressionUtils.setField(this.dataAccessors, property, this.rawAppointment, value);
  }
  calculateStartDate(pathTimeZoneConversion) {
    if (!this.startDate || isNaN(this.startDate.getTime())) {
      throw errors.Error('E1032', this.text);
    }
    return this.calculateDate(this.startDate, this.startDateTimeZone, pathTimeZoneConversion);
  }
  calculateEndDate(pathTimeZoneConversion) {
    return this.calculateDate(this.endDate, this.endDateTimeZone, pathTimeZoneConversion);
  }
  calculateDate(date, appointmentTimeZone, pathTimeZoneConversion) {
    if (!date) {
      // TODO: E1032 should be thrown only for startDate above
      return undefined;
    }
    return this.timeZoneCalculator.createDate(date, {
      appointmentTimeZone,
      path: pathTimeZoneConversion
    });
  }
  clone() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var result = new AppointmentAdapter(deepExtendArraySafe({}, this.rawAppointment), this.dataAccessors, this.timeZoneCalculator, options);
    if (options === null || options === void 0 ? void 0 : options.pathTimeZone) {
      result.startDate = result.calculateStartDate(options.pathTimeZone);
      result.endDate = result.calculateEndDate(options.pathTimeZone);
    }
    return result;
  }
  source() {
    var serializeDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (serializeDate) {
      // TODO: hack for use dateSerializationFormat
      var clonedAdapter = this.clone();
      clonedAdapter.startDate = this.startDate;
      clonedAdapter.endDate = this.endDate;
      return clonedAdapter.source();
    }
    return extend({}, this.rawAppointment);
  }
}
export default AppointmentAdapter;
export var createAppointmentAdapter = (rawAppointment, dataAccessors, timeZoneCalculator, options) => new AppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator, options);