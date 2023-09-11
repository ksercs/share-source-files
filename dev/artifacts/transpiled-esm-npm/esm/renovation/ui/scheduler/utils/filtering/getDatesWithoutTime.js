import dateUtils from '../../../../../core/utils/date';
var getDatesWithoutTime = (min, max) => {
  var newMin = dateUtils.trimTime(min);
  var newMax = dateUtils.trimTime(max);
  newMax.setDate(newMax.getDate() + 1);
  return [newMin, newMax];
};
export default getDatesWithoutTime;