/**
* DevExtreme (cjs/renovation/ui/scheduler/appointment/layout.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.AppointmentLayoutProps = exports.AppointmentLayout = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _appointment = require("./appointment");
var _layout = require("./overflow_indicator/layout");
var _combine_classes = require("../../../utils/combine_classes");
var _appointments_context = require("../appointments_context");
var _subscribe_to_event = require("../../../utils/subscribe_to_event");
var _excluded = ["isAllDay"];
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
var SELECTOR = {
  appointment: '.dx-scheduler-appointment',
  allDay: 'dx-scheduler-all-day-appointment',
  collector: 'dx-scheduler-appointment-collector'
};
var viewFunction = function viewFunction(_ref) {
  var appointments = _ref.appointments,
    _ref$appointmentsCont = _ref.appointmentsContextValue,
    appointmentTemplate = _ref$appointmentsCont.appointmentTemplate,
    groups = _ref$appointmentsCont.groups,
    hideReducedIconTooltip = _ref$appointmentsCont.hideReducedIconTooltip,
    onAppointmentClick = _ref$appointmentsCont.onAppointmentClick,
    onAppointmentDoubleClick = _ref$appointmentsCont.onAppointmentDoubleClick,
    overflowIndicatorTemplate = _ref$appointmentsCont.overflowIndicatorTemplate,
    showReducedIconTooltip = _ref$appointmentsCont.showReducedIconTooltip,
    classes = _ref.classes,
    layoutRef = _ref.layoutRef,
    overflowIndicators = _ref.overflowIndicators;
  return (0, _inferno.createVNode)(1, "div", classes, [appointments.map(function (item, index) {
    return (0, _inferno.createComponentVNode)(2, _appointment.Appointment, {
      "viewModel": item,
      "appointmentTemplate": appointmentTemplate,
      "index": index,
      "groups": groups,
      "onItemClick": onAppointmentClick,
      "onItemDoubleClick": onAppointmentDoubleClick,
      "showReducedIconTooltip": showReducedIconTooltip,
      "hideReducedIconTooltip": hideReducedIconTooltip
    }, item.key);
  }), overflowIndicators.map(function (item, index) {
    return (0, _inferno.createComponentVNode)(2, _layout.OverflowIndicator, {
      "viewModel": item,
      "groups": groups,
      "overflowIndicatorTemplate": overflowIndicatorTemplate,
      "data-index": index
    }, item.key);
  })], 0, null, null, layoutRef);
};
exports.viewFunction = viewFunction;
var AppointmentLayoutProps = {
  isAllDay: false
};
exports.AppointmentLayoutProps = AppointmentLayoutProps;
var AppointmentLayout = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(AppointmentLayout, _InfernoWrapperCompon);
  function AppointmentLayout(props) {
    var _this;
    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.state = {};
    _this.layoutRef = (0, _inferno.createRef)();
    _this.__getterCache = {};
    _this.pointerEventsEffect = _this.pointerEventsEffect.bind(_assertThisInitialized(_this));
    _this.onAppointmentPointerDown = _this.onAppointmentPointerDown.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = AppointmentLayout.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.pointerEventsEffect, [this.appointmentsContextValue]), (0, _inferno2.createReRenderEffect)()];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.appointmentsContextValue]);
  };
  _proto.pointerEventsEffect = function pointerEventsEffect() {
    var _this2 = this;
    var disposePointerDown = (0, _subscribe_to_event.subscribeToDXPointerDownEvent)(this.layoutRef.current, function (e) {
      return _this2.onAppointmentPointerDown(e);
    });
    return function () {
      disposePointerDown();
    };
  };
  _proto.onAppointmentPointerDown = function onAppointmentPointerDown(e) {
    var appointmentElement = e.target.closest(SELECTOR.appointment);
    if (appointmentElement) {
      var index = appointmentElement.dataset.index;
      var focusedAppointmentIndex = index ? parseInt(index, 10) : -1;
      var isAllDay = appointmentElement.classList.contains(SELECTOR.allDay);
      var isCompact = appointmentElement.classList.contains(SELECTOR.collector);
      var typeMap = {
        allDayCompact: isAllDay && isCompact,
        allDay: isAllDay && !isCompact,
        regularCompact: !isAllDay && isCompact,
        regular: !isAllDay && !isCompact
      };
      var appointmentType = Object.entries(typeMap).filter(function (item) {
        return item[1];
      })[0][0];
      this.appointmentsContextValue.updateFocusedAppointment(appointmentType, focusedAppointmentIndex);
    }
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    _InfernoWrapperCompon.prototype.componentWillUpdate.call(this);
    if (this.props['isAllDay'] !== nextProps['isAllDay'] || this.context[_appointments_context.AppointmentsContext.id] !== context[_appointments_context.AppointmentsContext.id]) {
      this.__getterCache['appointments'] = undefined;
    }
    if (this.props['isAllDay'] !== nextProps['isAllDay'] || this.context[_appointments_context.AppointmentsContext.id] !== context[_appointments_context.AppointmentsContext.id]) {
      this.__getterCache['overflowIndicators'] = undefined;
    }
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      layoutRef: this.layoutRef,
      appointmentsContextValue: this.appointmentsContextValue,
      classes: this.classes,
      appointments: this.appointments,
      overflowIndicators: this.overflowIndicators,
      onAppointmentPointerDown: this.onAppointmentPointerDown,
      restAttributes: this.restAttributes
    });
  };
  _createClass(AppointmentLayout, [{
    key: "appointmentsContextValue",
    get: function get() {
      if (this.context[_appointments_context.AppointmentsContext.id]) {
        return this.context[_appointments_context.AppointmentsContext.id];
      }
      return _appointments_context.AppointmentsContext.defaultValue;
    }
  }, {
    key: "classes",
    get: function get() {
      var isAllDay = this.props.isAllDay;
      return (0, _combine_classes.combineClasses)({
        'dx-scheduler-scrollable-appointments': !isAllDay,
        'dx-scheduler-all-day-appointments': isAllDay
      });
    }
  }, {
    key: "appointments",
    get: function get() {
      var _this3 = this;
      if (this.__getterCache['appointments'] !== undefined) {
        return this.__getterCache['appointments'];
      }
      return this.__getterCache['appointments'] = function () {
        if (_this3.props.isAllDay) {
          return _this3.appointmentsContextValue.viewModel.allDay;
        }
        return _this3.appointmentsContextValue.viewModel.regular;
      }();
    }
  }, {
    key: "overflowIndicators",
    get: function get() {
      var _this4 = this;
      if (this.__getterCache['overflowIndicators'] !== undefined) {
        return this.__getterCache['overflowIndicators'];
      }
      return this.__getterCache['overflowIndicators'] = function () {
        if (_this4.props.isAllDay) {
          return _this4.appointmentsContextValue.viewModel.allDayCompact;
        }
        return _this4.appointmentsContextValue.viewModel.regularCompact;
      }();
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        isAllDay = _this$props.isAllDay,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return AppointmentLayout;
}(_inferno2.InfernoWrapperComponent);
exports.AppointmentLayout = AppointmentLayout;
AppointmentLayout.defaultProps = AppointmentLayoutProps;
