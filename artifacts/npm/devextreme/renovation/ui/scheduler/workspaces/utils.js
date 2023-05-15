/**
* DevExtreme (renovation/ui/scheduler/workspaces/utils.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.isVerticalGroupingApplied = exports.isHorizontalGroupingApplied = exports.isGroupingByDate = exports.getKeyByGroup = exports.getKeyByDateAndGroup = exports.getIsGroupedAllDayPanel = exports.getGroupCellClasses = exports.addWidthToStyle = exports.addToStyles = exports.addHeightToStyle = void 0;
var _combine_classes = require("../../../utils/combine_classes");
var _consts = require("../consts");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var getKeyByDateAndGroup = function getKeyByDateAndGroup(date, groupIndex) {
  var key = date.getTime();
  if (!groupIndex) {
    return key.toString();
  }
  return (key + groupIndex).toString();
};
exports.getKeyByDateAndGroup = getKeyByDateAndGroup;
var getKeyByGroup = function getKeyByGroup(groupIndex, isVerticalGrouping) {
  if (isVerticalGrouping && !!groupIndex) {
    return groupIndex.toString();
  }
  return '0';
};
exports.getKeyByGroup = getKeyByGroup;
var addToStyles = function addToStyles(options, style) {
  var nextStyle = style !== null && style !== void 0 ? style : {};
  var result = _extends({}, nextStyle);
  options.forEach(function (_ref) {
    var attr = _ref.attr,
      value = _ref.value;
    result[attr] = value || nextStyle[attr];
  });
  return result;
};
exports.addToStyles = addToStyles;
var addHeightToStyle = function addHeightToStyle(value, style) {
  var height = value ? "".concat(value, "px") : '';
  return addToStyles([{
    attr: 'height',
    value: height
  }], style);
};
exports.addHeightToStyle = addHeightToStyle;
var addWidthToStyle = function addWidthToStyle(value, style) {
  var width = value ? "".concat(value, "px") : '';
  return addToStyles([{
    attr: 'width',
    value: width
  }], style);
};
exports.addWidthToStyle = addWidthToStyle;
var getGroupCellClasses = function getGroupCellClasses() {
  var isFirstGroupCell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var isLastGroupCell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return (0, _combine_classes.combineClasses)(_defineProperty({
    'dx-scheduler-first-group-cell': isFirstGroupCell,
    'dx-scheduler-last-group-cell': isLastGroupCell
  }, className, true));
};
exports.getGroupCellClasses = getGroupCellClasses;
var getIsGroupedAllDayPanel = function getIsGroupedAllDayPanel(hasAllDayRow, isVerticalGrouping) {
  return hasAllDayRow && isVerticalGrouping;
};
exports.getIsGroupedAllDayPanel = getIsGroupedAllDayPanel;
var isVerticalGroupingApplied = function isVerticalGroupingApplied(groups, groupOrientation) {
  return groupOrientation === _consts.VERTICAL_GROUP_ORIENTATION && !!groups.length;
};
exports.isVerticalGroupingApplied = isVerticalGroupingApplied;
var isHorizontalGroupingApplied = function isHorizontalGroupingApplied(groups, groupOrientation) {
  return groupOrientation === _consts.HORIZONTAL_GROUP_ORIENTATION && !!groups.length;
};
exports.isHorizontalGroupingApplied = isHorizontalGroupingApplied;
var isGroupingByDate = function isGroupingByDate(groups, groupOrientation, groupByDate) {
  var isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation);
  return groupByDate && isHorizontalGrouping;
};
exports.isGroupingByDate = isGroupingByDate;
