"use strict";

exports.ViewProps = exports.ScrollingProps = exports.SchedulerProps = exports.ResourceProps = exports.DataAccessorsProps = exports.CurrentViewConfigProps = exports.AppointmentEditingProps = exports.AppointmentDraggingProps = void 0;
var _message = _interopRequireDefault(require("../../../localization/message"));
var _base_props = require("../common/base_props");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var ScrollingProps = {};
exports.ScrollingProps = ScrollingProps;
var ResourceProps = {};
exports.ResourceProps = ResourceProps;
var ViewProps = {};
exports.ViewProps = ViewProps;
var AppointmentEditingProps = {};
exports.AppointmentEditingProps = AppointmentEditingProps;
var AppointmentDraggingProps = {};
exports.AppointmentDraggingProps = AppointmentDraggingProps;
var SchedulerProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_base_props.BaseWidgetProps), Object.getOwnPropertyDescriptors(Object.defineProperties({
  adaptivityEnabled: false,
  crossScrollingEnabled: false,
  descriptionExpr: 'description',
  editing: Object.freeze({
    allowAdding: true,
    allowDeleting: true,
    allowDragging: true,
    allowResizing: true,
    allowUpdating: true,
    allowTimeZoneEditing: false
  }),
  focusStateEnabled: true,
  groupByDate: false,
  indicatorUpdateInterval: 300000,
  recurrenceEditMode: 'dialog',
  remoteFiltering: false,
  resources: Object.freeze([]),
  scrolling: Object.freeze({
    mode: 'standard'
  }),
  selectedCellData: Object.freeze([]),
  shadeUntilCurrentTime: false,
  showAllDayPanel: true,
  showCurrentTimeIndicator: true,
  timeZone: '',
  useDropDownViewSwitcher: false,
  views: Object.freeze(['day', 'week']),
  endDayHour: 24,
  startDayHour: 0,
  firstDayOfWeek: 0,
  cellDuration: 30,
  groups: Object.freeze([]),
  maxAppointmentsPerCell: 'auto',
  recurrenceExceptionExpr: 'recurrenceException',
  recurrenceRuleExpr: 'recurrenceRule',
  startDateExpr: 'startDate',
  startDateTimeZoneExpr: 'startDateTimeZone',
  endDateExpr: 'endDate',
  endDateTimeZoneExpr: 'endDateTimeZone',
  allDayExpr: 'allDay',
  textExpr: 'text',
  allDayPanelMode: 'all',
  toolbar: Object.freeze([{
    defaultElement: 'dateNavigator',
    location: 'before'
  }, {
    defaultElement: 'viewSwitcher',
    location: 'after'
  }]),
  defaultCurrentDate: Object.freeze(new Date()),
  currentDateChange: function currentDateChange() {},
  defaultCurrentView: 'day',
  currentViewChange: function currentViewChange() {}
}, {
  noDataText: {
    get: function get() {
      return _message.default.format('dxCollectionWidget-noDataText');
    },
    configurable: true,
    enumerable: true
  }
}))));
exports.SchedulerProps = SchedulerProps;
var DataAccessorsProps = Object.defineProperties({}, {
  descriptionExpr: {
    get: function get() {
      return SchedulerProps.descriptionExpr;
    },
    configurable: true,
    enumerable: true
  },
  resources: {
    get: function get() {
      return SchedulerProps.resources;
    },
    configurable: true,
    enumerable: true
  },
  recurrenceExceptionExpr: {
    get: function get() {
      return SchedulerProps.recurrenceExceptionExpr;
    },
    configurable: true,
    enumerable: true
  },
  recurrenceRuleExpr: {
    get: function get() {
      return SchedulerProps.recurrenceRuleExpr;
    },
    configurable: true,
    enumerable: true
  },
  startDateExpr: {
    get: function get() {
      return SchedulerProps.startDateExpr;
    },
    configurable: true,
    enumerable: true
  },
  startDateTimeZoneExpr: {
    get: function get() {
      return SchedulerProps.startDateTimeZoneExpr;
    },
    configurable: true,
    enumerable: true
  },
  endDateExpr: {
    get: function get() {
      return SchedulerProps.endDateExpr;
    },
    configurable: true,
    enumerable: true
  },
  endDateTimeZoneExpr: {
    get: function get() {
      return SchedulerProps.endDateTimeZoneExpr;
    },
    configurable: true,
    enumerable: true
  },
  allDayExpr: {
    get: function get() {
      return SchedulerProps.allDayExpr;
    },
    configurable: true,
    enumerable: true
  },
  textExpr: {
    get: function get() {
      return SchedulerProps.textExpr;
    },
    configurable: true,
    enumerable: true
  }
});
exports.DataAccessorsProps = DataAccessorsProps;
var CurrentViewConfigProps = Object.defineProperties({}, {
  crossScrollingEnabled: {
    get: function get() {
      return SchedulerProps.crossScrollingEnabled;
    },
    configurable: true,
    enumerable: true
  },
  groupByDate: {
    get: function get() {
      return SchedulerProps.groupByDate;
    },
    configurable: true,
    enumerable: true
  },
  indicatorUpdateInterval: {
    get: function get() {
      return SchedulerProps.indicatorUpdateInterval;
    },
    configurable: true,
    enumerable: true
  },
  scrolling: {
    get: function get() {
      return SchedulerProps.scrolling;
    },
    configurable: true,
    enumerable: true
  },
  shadeUntilCurrentTime: {
    get: function get() {
      return SchedulerProps.shadeUntilCurrentTime;
    },
    configurable: true,
    enumerable: true
  },
  showAllDayPanel: {
    get: function get() {
      return SchedulerProps.showAllDayPanel;
    },
    configurable: true,
    enumerable: true
  },
  showCurrentTimeIndicator: {
    get: function get() {
      return SchedulerProps.showCurrentTimeIndicator;
    },
    configurable: true,
    enumerable: true
  },
  endDayHour: {
    get: function get() {
      return SchedulerProps.endDayHour;
    },
    configurable: true,
    enumerable: true
  },
  startDayHour: {
    get: function get() {
      return SchedulerProps.startDayHour;
    },
    configurable: true,
    enumerable: true
  },
  firstDayOfWeek: {
    get: function get() {
      return SchedulerProps.firstDayOfWeek;
    },
    configurable: true,
    enumerable: true
  },
  cellDuration: {
    get: function get() {
      return SchedulerProps.cellDuration;
    },
    configurable: true,
    enumerable: true
  },
  maxAppointmentsPerCell: {
    get: function get() {
      return SchedulerProps.maxAppointmentsPerCell;
    },
    configurable: true,
    enumerable: true
  },
  allDayPanelMode: {
    get: function get() {
      return SchedulerProps.allDayPanelMode;
    },
    configurable: true,
    enumerable: true
  }
});
exports.CurrentViewConfigProps = CurrentViewConfigProps;