/**
* DevExtreme (cjs/renovation/ui/scheduler/scheduler.j.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _component = _interopRequireDefault(require("../../component_wrapper/common/component"));
var _scheduler = require("./scheduler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Scheduler = /*#__PURE__*/function (_BaseComponent) {
  _inheritsLoose(Scheduler, _BaseComponent);
  function Scheduler() {
    return _BaseComponent.apply(this, arguments) || this;
  }
  var _proto = Scheduler.prototype;
  _proto.getProps = function getProps() {
    var props = _BaseComponent.prototype.getProps.call(this);
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  };
  _proto.addAppointment = function addAppointment(_appointment) {
    var _this$viewRef;
    return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.addAppointment.apply(_this$viewRef, arguments);
  };
  _proto.deleteAppointment = function deleteAppointment(_appointment) {
    var _this$viewRef2;
    return (_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 ? void 0 : _this$viewRef2.deleteAppointment.apply(_this$viewRef2, arguments);
  };
  _proto.updateAppointment = function updateAppointment(_target, _appointment) {
    var _this$viewRef3;
    return (_this$viewRef3 = this.viewRef) === null || _this$viewRef3 === void 0 ? void 0 : _this$viewRef3.updateAppointment.apply(_this$viewRef3, arguments);
  };
  _proto.getDataSource = function getDataSource() {
    var _this$viewRef4;
    return (_this$viewRef4 = this.viewRef) === null || _this$viewRef4 === void 0 ? void 0 : _this$viewRef4.getDataSource.apply(_this$viewRef4, arguments);
  };
  _proto.getEndViewDate = function getEndViewDate() {
    var _this$viewRef5;
    return (_this$viewRef5 = this.viewRef) === null || _this$viewRef5 === void 0 ? void 0 : _this$viewRef5.getEndViewDate.apply(_this$viewRef5, arguments);
  };
  _proto.getStartViewDate = function getStartViewDate() {
    var _this$viewRef6;
    return (_this$viewRef6 = this.viewRef) === null || _this$viewRef6 === void 0 ? void 0 : _this$viewRef6.getStartViewDate.apply(_this$viewRef6, arguments);
  };
  _proto.hideAppointmentPopup = function hideAppointmentPopup(_saveChanges) {
    var _this$viewRef7;
    return (_this$viewRef7 = this.viewRef) === null || _this$viewRef7 === void 0 ? void 0 : _this$viewRef7.hideAppointmentPopup.apply(_this$viewRef7, arguments);
  };
  _proto.hideAppointmentTooltip = function hideAppointmentTooltip() {
    var _this$viewRef8;
    return (_this$viewRef8 = this.viewRef) === null || _this$viewRef8 === void 0 ? void 0 : _this$viewRef8.hideAppointmentTooltip.apply(_this$viewRef8, arguments);
  };
  _proto.scrollTo = function scrollTo(_date, _group, _allDay) {
    var _this$viewRef9;
    return (_this$viewRef9 = this.viewRef) === null || _this$viewRef9 === void 0 ? void 0 : _this$viewRef9.scrollTo.apply(_this$viewRef9, arguments);
  };
  _proto.scrollToTime = function scrollToTime(_hours, _minutes, _date) {
    var _this$viewRef10;
    return (_this$viewRef10 = this.viewRef) === null || _this$viewRef10 === void 0 ? void 0 : _this$viewRef10.scrollToTime.apply(_this$viewRef10, arguments);
  };
  _proto.showAppointmentPopup = function showAppointmentPopup(_appointmentData, _createNewAppointment, _currentAppointmentData) {
    var _this$viewRef11;
    return (_this$viewRef11 = this.viewRef) === null || _this$viewRef11 === void 0 ? void 0 : _this$viewRef11.showAppointmentPopup.apply(_this$viewRef11, arguments);
  };
  _proto.showAppointmentTooltip = function showAppointmentTooltip(_appointmentData, _target, _currentAppointmentData) {
    var _this$viewRef12;
    var params = [_appointmentData, this._patchElementParam(_target), _currentAppointmentData];
    return (_this$viewRef12 = this.viewRef) === null || _this$viewRef12 === void 0 ? void 0 : _this$viewRef12.showAppointmentTooltip.apply(_this$viewRef12, _toConsumableArray(params.slice(0, arguments.length)));
  };
  _proto._getActionConfigs = function _getActionConfigs() {
    return {
      onAppointmentAdded: {},
      onAppointmentAdding: {},
      onAppointmentClick: {},
      onAppointmentContextMenu: {},
      onAppointmentDblClick: {},
      onAppointmentDeleted: {},
      onAppointmentDeleting: {},
      onAppointmentFormOpening: {},
      onAppointmentRendered: {},
      onAppointmentUpdated: {},
      onAppointmentUpdating: {},
      onCellClick: {},
      onCellContextMenu: {},
      onClick: {}
    };
  };
  _createClass(Scheduler, [{
    key: "_propsInfo",
    get: function get() {
      return {
        twoWay: [['currentDate', 'defaultCurrentDate', 'currentDateChange'], ['currentView', 'defaultCurrentView', 'currentViewChange']],
        allowNull: [],
        elements: [],
        templates: ['dataCellTemplate', 'dateCellTemplate', 'timeCellTemplate', 'resourceCellTemplate', 'appointmentCollectorTemplate', 'appointmentTemplate', 'appointmentTooltipTemplate'],
        props: ['adaptivityEnabled', 'appointmentDragging', 'crossScrollingEnabled', 'dataSource', 'dateSerializationFormat', 'descriptionExpr', 'editing', 'focusStateEnabled', 'groupByDate', 'indicatorUpdateInterval', 'max', 'min', 'noDataText', 'recurrenceEditMode', 'remoteFiltering', 'resources', 'scrolling', 'selectedCellData', 'shadeUntilCurrentTime', 'showAllDayPanel', 'showCurrentTimeIndicator', 'timeZone', 'useDropDownViewSwitcher', 'views', 'endDayHour', 'startDayHour', 'firstDayOfWeek', 'cellDuration', 'groups', 'maxAppointmentsPerCell', 'customizeDateNavigatorText', 'onAppointmentAdded', 'onAppointmentAdding', 'onAppointmentClick', 'onAppointmentContextMenu', 'onAppointmentDblClick', 'onAppointmentDeleted', 'onAppointmentDeleting', 'onAppointmentFormOpening', 'onAppointmentRendered', 'onAppointmentUpdated', 'onAppointmentUpdating', 'onCellClick', 'onCellContextMenu', 'recurrenceExceptionExpr', 'recurrenceRuleExpr', 'startDateExpr', 'startDateTimeZoneExpr', 'endDateExpr', 'endDateTimeZoneExpr', 'allDayExpr', 'textExpr', 'allDayPanelMode', 'dataCellTemplate', 'dateCellTemplate', 'timeCellTemplate', 'resourceCellTemplate', 'appointmentCollectorTemplate', 'appointmentTemplate', 'appointmentTooltipTemplate', 'toolbar', 'defaultCurrentDate', 'currentDateChange', 'defaultCurrentView', 'currentViewChange', 'className', 'accessKey', 'activeStateEnabled', 'disabled', 'height', 'hint', 'hoverStateEnabled', 'onClick', 'onKeyDown', 'rtlEnabled', 'tabIndex', 'visible', 'width', 'currentDate', 'currentView']
      };
    }
  }, {
    key: "_viewComponent",
    get: function get() {
      return _scheduler.Scheduler;
    }
  }]);
  return Scheduler;
}(_component.default);
exports.default = Scheduler;
(0, _component_registrator.default)('dxScheduler', Scheduler);
module.exports = exports.default;
module.exports.default = exports.default;
