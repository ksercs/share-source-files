import dateSerialization from '../../../../../../core/utils/date_serialization';
var validateAppointmentFormDate = date => date === null || !!date && !!new Date(date).getDate();
var normalizeNewDate = (newDate, currentDate, currentOppositeDate, needCorrect) => {
  if (!validateAppointmentFormDate(newDate)) {
    return currentDate;
  }
  var normalizedDate = dateSerialization.deserializeDate(newDate);
  var normalizedOppositeDate = dateSerialization.deserializeDate(currentOppositeDate);
  var result = normalizedDate;
  if (normalizedOppositeDate && normalizedDate && needCorrect(normalizedOppositeDate, normalizedDate)) {
    var duration = normalizedOppositeDate.getTime() - normalizedDate.getTime();
    result = new Date(normalizedDate.getTime() + duration);
  }
  return result;
};
export var normalizeNewStartDate = (newStartDate, currentStartDate, currentEndDate) => normalizeNewDate(newStartDate, currentStartDate, currentEndDate, (endDate, startDate) => endDate < startDate);
export var normalizeNewEndDate = (newEndDate, currentStartDate, currentEndDate) => normalizeNewDate(newEndDate, currentEndDate, currentStartDate, (startDate, endDate) => endDate < startDate);