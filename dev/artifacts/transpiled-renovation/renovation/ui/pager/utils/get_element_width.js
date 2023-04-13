"use strict";

exports.getElementContentWidth = getElementContentWidth;
exports.getElementMinWidth = getElementMinWidth;
exports.getElementStyle = getElementStyle;
exports.getElementWidth = getElementWidth;
var _get_computed_style = _interopRequireDefault(require("../../../utils/get_computed_style"));
var _type_conversion = require("../../../utils/type_conversion");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getElementStyle(name, element) {
  var _getElementComputedSt;
  var computedStyle = (_getElementComputedSt = (0, _get_computed_style.default)(element)) !== null && _getElementComputedSt !== void 0 ? _getElementComputedSt : {};
  return (0, _type_conversion.toNumber)(computedStyle[name]);
}
function getElementContentWidth(element) {
  var padding = getElementStyle('paddingLeft', element) + getElementStyle('paddingRight', element);
  var width = getElementStyle('width', element);
  return width - padding;
}
function getElementWidth(element) {
  var margin = getElementStyle('marginLeft', element) + getElementStyle('marginRight', element);
  var width = getElementStyle('width', element);
  return margin + width;
}
function getElementMinWidth(element) {
  return getElementStyle('minWidth', element);
}