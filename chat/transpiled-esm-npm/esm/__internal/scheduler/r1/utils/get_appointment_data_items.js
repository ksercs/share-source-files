import { isDefined } from '../../../../core/utils/type';
import { dateUtilsTs } from '../../../core/utils/date';
import { dateUtils } from '../../../core/utils/m_date';
import { createAppointmentAdapter } from '../../m_appointment_adapter';
const RECURRENCE_FREQ = 'freq';
const toMs = dateUtils.dateToMilliseconds;
export const replaceIncorrectEndDate = (rawAppointment, appointmentDuration, dataAccessors) => {
  const startDate = new Date(dataAccessors.get('startDate', rawAppointment));
  const endDate = new Date(dataAccessors.get('endDate', rawAppointment));
  if (!dateUtilsTs.isValidDate(startDate)) {
    return false;
  }
  const isEndDateIncorrect = !dateUtilsTs.isValidDate(endDate) || startDate.getTime() > endDate.getTime();
  if (isEndDateIncorrect) {
    const isAllDay = Boolean(dataAccessors.get('allDay', rawAppointment));
    const correctedEndDate = isAllDay ? dateUtils.setToDayEnd(new Date(startDate)) : new Date(startDate.getTime() + appointmentDuration * toMs('minute'));
    // TODO(4): fixme. serializationFormat auto-detection will not the same as in startDate
    dataAccessors.set('endDate', rawAppointment, correctedEndDate);
  }
  return true;
};
export const getAppointmentDataItems = (dataItems, dataAccessors, cellDurationInMinutes, timeZoneCalculator) => {
  const result = [];
  dataItems === null || dataItems === void 0 || dataItems.forEach(rawAppointment => {
    var _recurrenceRule$match;
    const isAppointmentSafe = replaceIncorrectEndDate(rawAppointment, cellDurationInMinutes, dataAccessors);
    if (!isAppointmentSafe) {
      return;
    }
    const adapter = createAppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator);
    const regex = new RegExp(RECURRENCE_FREQ, 'gi');
    const {
      recurrenceRule
    } = adapter;
    const hasRecurrenceRule = Boolean(recurrenceRule === null || recurrenceRule === void 0 || (_recurrenceRule$match = recurrenceRule.match(regex)) === null || _recurrenceRule$match === void 0 ? void 0 : _recurrenceRule$match.length);
    const visible = isDefined(rawAppointment.visible) ? Boolean(rawAppointment.visible) : true;
    result.push({
      allDay: Boolean(adapter.allDay),
      startDate: adapter.calculateStartDate('toGrid'),
      startDateTimeZone: rawAppointment.startDateTimeZone,
      endDate: adapter.calculateEndDate('toGrid'),
      endDateTimeZone: rawAppointment.endDateTimeZone,
      recurrenceRule,
      recurrenceException: adapter.recurrenceException,
      hasRecurrenceRule,
      visible,
      rawAppointment
    });
  });
  return result;
};