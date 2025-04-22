"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equals = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _data = require("../../../core/utils/data");
var _type = require("../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const hasNegation = function (oldValue, newValue) {
  return 1 / oldValue === 1 / newValue;
};
const equals = function (oldValue, newValue) {
  oldValue = (0, _data.toComparable)(oldValue, true);
  newValue = (0, _data.toComparable)(newValue, true);
  if (oldValue && newValue && (0, _type.isRenderer)(oldValue) && (0, _type.isRenderer)(newValue)) {
    return newValue.is(oldValue);
  }
  const oldValueIsNaN = oldValue !== oldValue;
  const newValueIsNaN = newValue !== newValue;
  if (oldValueIsNaN && newValueIsNaN) {
    return true;
  }
  if (oldValue === 0 && newValue === 0) {
    return hasNegation(oldValue, newValue);
  }
  if (oldValue === null || typeof oldValue !== 'object' || _dom_adapter.default.isElementNode(oldValue)) {
    return oldValue === newValue;
  }
  return false;
};
exports.equals = equals;