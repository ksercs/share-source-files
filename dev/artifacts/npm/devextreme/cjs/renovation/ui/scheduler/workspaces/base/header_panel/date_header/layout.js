/**
* DevExtreme (cjs/renovation/ui/scheduler/workspaces/base/header_panel/date_header/layout.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.DateHeaderLayoutProps = exports.DateHeaderLayout = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _row = require("../../row");
var _utils = require("../../../utils");
var _cell = require("./cell");
var _getThemeType2 = _interopRequireDefault(require("../../../../../../utils/getThemeType"));
var _excluded = ["dateCellTemplate", "dateHeaderData", "groupByDate", "groupOrientation", "groups", "timeCellTemplate"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var _getThemeType = (0, _getThemeType2.default)(),
  isMaterial = _getThemeType.isMaterial;
var viewFunction = function viewFunction(_ref) {
  var isHorizontalGrouping = _ref.isHorizontalGrouping,
    _ref$props = _ref.props,
    dateCellTemplate = _ref$props.dateCellTemplate,
    dateHeaderData = _ref$props.dateHeaderData;
  var dataMap = dateHeaderData.dataMap,
    leftVirtualCellCount = dateHeaderData.leftVirtualCellCount,
    leftVirtualCellWidth = dateHeaderData.leftVirtualCellWidth,
    rightVirtualCellCount = dateHeaderData.rightVirtualCellCount,
    rightVirtualCellWidth = dateHeaderData.rightVirtualCellWidth;
  return (0, _inferno.createFragment)(dataMap.map(function (dateHeaderRow, rowIndex) {
    return (0, _inferno.createComponentVNode)(2, _row.Row, {
      "className": "dx-scheduler-header-row",
      "leftVirtualCellWidth": leftVirtualCellWidth,
      "leftVirtualCellCount": leftVirtualCellCount,
      "rightVirtualCellWidth": rightVirtualCellWidth,
      "rightVirtualCellCount": rightVirtualCellCount,
      "isHeaderRow": true,
      children: dateHeaderRow.map(function (_ref2) {
        var colSpan = _ref2.colSpan,
          endDate = _ref2.endDate,
          groupIndex = _ref2.groupIndex,
          cellGroups = _ref2.groups,
          index = _ref2.index,
          isFirstGroupCell = _ref2.isFirstGroupCell,
          isLastGroupCell = _ref2.isLastGroupCell,
          key = _ref2.key,
          startDate = _ref2.startDate,
          text = _ref2.text,
          today = _ref2.today;
        return (0, _inferno.createComponentVNode)(2, _cell.DateHeaderCell, {
          "startDate": startDate,
          "endDate": endDate,
          "groups": isHorizontalGrouping ? cellGroups : undefined,
          "groupIndex": isHorizontalGrouping ? groupIndex : undefined,
          "today": today,
          "index": index,
          "text": text,
          "isFirstGroupCell": isFirstGroupCell,
          "isLastGroupCell": isLastGroupCell,
          "dateCellTemplate": dateCellTemplate,
          "colSpan": colSpan,
          "splitText": isMaterial
        }, key);
      })
    }, rowIndex.toString());
  }), 0);
};
exports.viewFunction = viewFunction;
var DateHeaderLayoutProps = {
  groupOrientation: 'horizontal',
  groupByDate: false,
  groups: Object.freeze([])
};
exports.DateHeaderLayoutProps = DateHeaderLayoutProps;
var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};
var DateHeaderLayout = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(DateHeaderLayout, _BaseInfernoComponent);
  function DateHeaderLayout(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = DateHeaderLayout.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate)
      }),
      isHorizontalGrouping: this.isHorizontalGrouping,
      restAttributes: this.restAttributes
    });
  };
  _createClass(DateHeaderLayout, [{
    key: "isHorizontalGrouping",
    get: function get() {
      var _this$props = this.props,
        groupByDate = _this$props.groupByDate,
        groupOrientation = _this$props.groupOrientation,
        groups = _this$props.groups;
      return (0, _utils.isHorizontalGroupingApplied)(groups, groupOrientation) && !groupByDate;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
        dateCellTemplate = _this$props2.dateCellTemplate,
        dateHeaderData = _this$props2.dateHeaderData,
        groupByDate = _this$props2.groupByDate,
        groupOrientation = _this$props2.groupOrientation,
        groups = _this$props2.groups,
        timeCellTemplate = _this$props2.timeCellTemplate,
        restProps = _objectWithoutProperties(_this$props2, _excluded);
      return restProps;
    }
  }]);
  return DateHeaderLayout;
}(_inferno2.BaseInfernoComponent);
exports.DateHeaderLayout = DateHeaderLayout;
DateHeaderLayout.defaultProps = DateHeaderLayoutProps;
