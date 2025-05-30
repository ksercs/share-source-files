"use strict";

exports.SchedulerCalendarProps = exports.SchedulerCalendar = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _utils = require("./utils");
var _popup = require("../../overlays/popup");
var _popover = require("../../overlays/popover");
var _calendar = require("../../editors/calendar");
var _utils2 = require("../../../../core/options/utils");
var _excluded = ["currentDate", "firstDayOfWeek", "isMobileLayout", "max", "min", "onCurrentDateUpdate", "onVisibleUpdate", "visible"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(viewModel) {
  var calendarRef = viewModel.calendarRef,
    focusCalendar = viewModel.focusCalendar,
    isMobile = viewModel.isMobile,
    props = viewModel.props,
    updateDate = viewModel.updateDate,
    updateVisible = viewModel.updateVisible;
  var currentDate = props.currentDate,
    firstDayOfWeek = props.firstDayOfWeek,
    max = props.max,
    min = props.min,
    visible = props.visible;
  var calendar = (0, _inferno.createVNode)(1, "div", "dx-scheduler-navigator-calendar", (0, _inferno.createComponentVNode)(2, _calendar.Calendar, {
    "value": currentDate,
    "valueChange": updateDate,
    "min": min,
    "max": max,
    "firstDayOfWeek": firstDayOfWeek,
    "width": "100%",
    "focusStateEnabled": true,
    "skipFocusCheck": true
  }, null, calendarRef), 2);
  return isMobile ? (0, _inferno.createComponentVNode)(2, _popup.Popup, {
    "className": "dx-scheduler-navigator-calendar-popup",
    "showTitle": false,
    "hideOnOutsideClick": true,
    "visible": visible,
    "visibleChange": updateVisible,
    "showCloseButton": true,
    "fullScreen": true,
    "toolbarItems": [{
      shortcut: 'cancel'
    }],
    "onShown": focusCalendar,
    children: calendar
  }) : (0, _inferno.createComponentVNode)(2, _popover.Popover, {
    "target": ".dx-scheduler-navigator-caption",
    "className": "dx-scheduler-navigator-calendar-popover",
    "showTitle": false,
    "hideOnOutsideClick": true,
    "visible": visible,
    "visibleChange": updateVisible,
    "onShown": focusCalendar,
    children: calendar
  });
};
exports.viewFunction = viewFunction;
var SchedulerCalendarProps = Object.defineProperties({}, {
  isMobileLayout: {
    get: function get() {
      return (0, _utils.isMobileLayout)();
    },
    configurable: true,
    enumerable: true
  }
});
exports.SchedulerCalendarProps = SchedulerCalendarProps;
var SchedulerCalendar = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(SchedulerCalendar, _BaseInfernoComponent);
  function SchedulerCalendar(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.calendarRef = (0, _inferno.createRef)();
    _this.focusCalendar = _this.focusCalendar.bind(_assertThisInitialized(_this));
    _this.updateVisible = _this.updateVisible.bind(_assertThisInitialized(_this));
    _this.updateDate = _this.updateDate.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = SchedulerCalendar.prototype;
  _proto.focusCalendar = function focusCalendar() {
    var _this$calendarRef$cur;
    (_this$calendarRef$cur = this.calendarRef.current) === null || _this$calendarRef$cur === void 0 ? void 0 : _this$calendarRef$cur.focus();
  };
  _proto.updateVisible = function updateVisible(visible) {
    this.props.onVisibleUpdate(visible);
  };
  _proto.updateDate = function updateDate(date) {
    this.props.onCurrentDateUpdate(date);
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      calendarRef: this.calendarRef,
      isMobile: this.isMobile,
      focusCalendar: this.focusCalendar,
      updateVisible: this.updateVisible,
      updateDate: this.updateDate,
      restAttributes: this.restAttributes
    });
  };
  _createClass(SchedulerCalendar, [{
    key: "isMobile",
    get: function get() {
      return this.props.isMobileLayout;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        currentDate = _this$props.currentDate,
        firstDayOfWeek = _this$props.firstDayOfWeek,
        isMobileLayout = _this$props.isMobileLayout,
        max = _this$props.max,
        min = _this$props.min,
        onCurrentDateUpdate = _this$props.onCurrentDateUpdate,
        onVisibleUpdate = _this$props.onVisibleUpdate,
        visible = _this$props.visible,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return SchedulerCalendar;
}(_inferno2.BaseInfernoComponent);
exports.SchedulerCalendar = SchedulerCalendar;
SchedulerCalendar.defaultProps = SchedulerCalendarProps;
var __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  SchedulerCalendar.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(SchedulerCalendar.defaultProps), Object.getOwnPropertyDescriptors((0, _utils2.convertRulesToOptions)(__defaultOptionRules))));
}