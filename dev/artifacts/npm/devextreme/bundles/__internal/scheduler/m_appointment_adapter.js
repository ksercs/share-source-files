/**
* DevExtreme (bundles/__internal/scheduler/m_appointment_adapter.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.createAppointmentAdapter = void 0;
var _extend = require("../../core/utils/extend");
var _object = require("../../core/utils/object");
var _ui = _interopRequireDefault(require("../../ui/widget/ui.errors"));
var _m_expression_utils = require("./m_expression_utils");
var _m_recurrence = require("./m_recurrence");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PROPERTY_NAMES = {
  startDate: 'startDate',
  endDate: 'endDate',
  allDay: 'allDay',
  text: 'text',
  description: 'description',
  startDateTimeZone: 'startDateTimeZone',
  endDateTimeZone: 'endDateTimeZone',
  recurrenceRule: 'recurrenceRule',
  recurrenceException: 'recurrenceException',
  disabled: 'disabled'
};
var AppointmentAdapter = /*#__PURE__*/function () {
  function AppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator, options) {
    this.rawAppointment = rawAppointment;
    this.dataAccessors = dataAccessors;
    this.timeZoneCalculator = timeZoneCalculator;
    this.options = options;
  }
  var _proto = AppointmentAdapter.prototype;
  _proto.getField = function getField(property) {
    return _m_expression_utils.ExpressionUtils.getField(this.dataAccessors, property, this.rawAppointment);
  };
  _proto.setField = function setField(property, value) {
    return _m_expression_utils.ExpressionUtils.setField(this.dataAccessors, property, this.rawAppointment, value);
  };
  _proto.calculateStartDate = function calculateStartDate(pathTimeZoneConversion) {
    if (!this.startDate || isNaN(this.startDate.getTime())) {
      throw _ui.default.Error('E1032', this.text);
    }
    return this.calculateDate(this.startDate, this.startDateTimeZone, pathTimeZoneConversion);
  };
  _proto.calculateEndDate = function calculateEndDate(pathTimeZoneConversion) {
    return this.calculateDate(this.endDate, this.endDateTimeZone, pathTimeZoneConversion);
  };
  _proto.calculateDate = function calculateDate(date, appointmentTimeZone, pathTimeZoneConversion) {
    if (!date) {
      // TODO: E1032 should be thrown only for startDate above
      return undefined;
    }
    return this.timeZoneCalculator.createDate(date, {
      appointmentTimeZone,
      path: pathTimeZoneConversion
    });
  };
  _proto.clone = function clone() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    var result = new AppointmentAdapter((0, _object.deepExtendArraySafe)({}, this.rawAppointment), this.dataAccessors, this.timeZoneCalculator, options);
    if (options === null || options === void 0 ? void 0 : options.pathTimeZone) {
      result.startDate = result.calculateStartDate(options.pathTimeZone);
      result.endDate = result.calculateEndDate(options.pathTimeZone);
    }
    return result;
  };
  _proto.source = function source() {
    var serializeDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (serializeDate) {
      // TODO: hack for use dateSerializationFormat
      var clonedAdapter = this.clone();
      clonedAdapter.startDate = this.startDate;
      clonedAdapter.endDate = this.endDate;
      return clonedAdapter.source();
    }
    return (0, _extend.extend)({}, this.rawAppointment);
  };
  _createClass(AppointmentAdapter, [{
    key: "duration",
    get: function get() {
      return this.endDate ? this.endDate - this.startDate : 0;
    }
  }, {
    key: "startDate",
    get: function get() {
      var result = this.getField(PROPERTY_NAMES.startDate);
      return result === undefined ? result : new Date(result);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.startDate, value);
    }
  }, {
    key: "endDate",
    get: function get() {
      var result = this.getField(PROPERTY_NAMES.endDate);
      return result === undefined ? result : new Date(result);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.endDate, value);
    }
  }, {
    key: "allDay",
    get: function get() {
      return this.getField(PROPERTY_NAMES.allDay);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.allDay, value);
    }
  }, {
    key: "text",
    get: function get() {
      return this.getField(PROPERTY_NAMES.text);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.text, value);
    }
  }, {
    key: "description",
    get: function get() {
      return this.getField(PROPERTY_NAMES.description);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.description, value);
    }
  }, {
    key: "startDateTimeZone",
    get: function get() {
      return this.getField(PROPERTY_NAMES.startDateTimeZone);
    }
  }, {
    key: "endDateTimeZone",
    get: function get() {
      return this.getField(PROPERTY_NAMES.endDateTimeZone);
    }
  }, {
    key: "recurrenceRule",
    get: function get() {
      return this.getField(PROPERTY_NAMES.recurrenceRule);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.recurrenceRule, value);
    }
  }, {
    key: "recurrenceException",
    get: function get() {
      return this.getField(PROPERTY_NAMES.recurrenceException);
    },
    set: function set(value) {
      this.setField(PROPERTY_NAMES.recurrenceException, value);
    }
  }, {
    key: "disabled",
    get: function get() {
      return !!this.getField(PROPERTY_NAMES.disabled);
    }
  }, {
    key: "isRecurrent",
    get: function get() {
      return (0, _m_recurrence.getRecurrenceProcessor)().isValidRecurrenceRule(this.recurrenceRule);
    }
  }]);
  return AppointmentAdapter;
}();
var _default = AppointmentAdapter;
exports.default = _default;
var createAppointmentAdapter = function createAppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator, options) {
  return new AppointmentAdapter(rawAppointment, dataAccessors, timeZoneCalculator, options);
};
exports.createAppointmentAdapter = createAppointmentAdapter;
