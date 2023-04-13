import { sign, multiplyInExponentialForm } from '../core/utils/math';
var DECIMAL_BASE = 10;
function roundByAbs(value) {
  var valueSign = sign(value);
  return valueSign * Math.round(Math.abs(value));
}
function adjustValue(value, precision) {
  var precisionMultiplier = Math.pow(DECIMAL_BASE, precision);
  var intermediateValue = multiplyInExponentialForm(value, precision);
  return roundByAbs(intermediateValue) / precisionMultiplier;
}
export function toFixed(value, precision) {
  var valuePrecision = precision || 0;
  var adjustedValue = valuePrecision > 0 ? adjustValue(...arguments) : value;
  return adjustedValue.toFixed(valuePrecision);
}