/**
* DevExtreme (cjs/__internal/scheduler/appointments/rendering_strategies/m_strategy_agenda.js)
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
exports.default = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _iterator = require("../../../../core/utils/iterator");
var _m_appointment_adapter = require("../../m_appointment_adapter");
var _m_expression_utils = require("../../m_expression_utils");
var _m_utils = require("../../resources/m_utils");
var _m_utils2 = require("../data_provider/m_utils");
var _m_strategy_base = _interopRequireDefault(require("./m_strategy_base"));
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
var AgendaRenderingStrategy = /*#__PURE__*/function (_BaseRenderingStrateg) {
  _inheritsLoose(AgendaRenderingStrategy, _BaseRenderingStrateg);
  function AgendaRenderingStrategy() {
    return _BaseRenderingStrateg.apply(this, arguments) || this;
  }
  var _proto = AgendaRenderingStrategy.prototype;
  _proto.getAppointmentMinSize = function getAppointmentMinSize() {};
  _proto.getDeltaTime = function getDeltaTime() {};
  _proto.keepAppointmentSettings = function keepAppointmentSettings() {
    return true;
  };
  _proto.getAppointmentGeometry = function getAppointmentGeometry(geometry) {
    return geometry;
  };
  _proto.groupAppointmentByResources = function groupAppointmentByResources(appointments) {
    var groups = this.instance._getCurrentViewOption('groups');
    var config = {
      loadedResources: this.options.loadedResources,
      resources: this.options.resources,
      dataAccessors: this.dataAccessors.resources
    };
    return (0, _m_utils.groupAppointmentsByResources)(config, appointments, groups);
  };
  _proto.createTaskPositionMap = function createTaskPositionMap(appointments) {
    var _this = this;
    var height;
    var appointmentsByResources;
    this.calculateRows(appointments, this.agendaDuration, this.currentDate);
    if (appointments.length) {
      height = this.instance.fire('getAgendaVerticalStepHeight');
      appointmentsByResources = this.groupAppointmentByResources(appointments);
      var groupedAppts = [];
      (0, _iterator.each)(appointmentsByResources, function (i, appts) {
        var additionalAppointments = [];
        var recurrentIndexes = [];
        (0, _iterator.each)(appts, function (index, appointment) {
          var recurrenceBatch = _this.instance.getAppointmentsInstance()._processRecurrenceAppointment(appointment, index);
          var appointmentBatch = null;
          if (!recurrenceBatch.indexes.length) {
            appointmentBatch = _this.instance.getAppointmentsInstance()._processLongAppointment(appointment);
            additionalAppointments = additionalAppointments.concat(appointmentBatch.parts);
          }
          additionalAppointments = additionalAppointments.concat(recurrenceBatch.parts);
          recurrentIndexes = recurrentIndexes.concat(recurrenceBatch.indexes);
        });
        _this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(recurrentIndexes, appts);
        _this.instance.getAppointmentsInstance()._combineAppointments(appts, additionalAppointments);
        groupedAppts = groupedAppts.concat(appts);
      });
      Array.prototype.splice.apply(appointments, [0, appointments.length].concat(groupedAppts));
    }
    var result = [];
    var sortedIndex = 0;
    appointments.forEach(function (appt, index) {
      result.push([{
        height,
        width: '100%',
        sortedIndex: sortedIndex++,
        groupIndex: _this._calculateGroupIndex(index, appointmentsByResources),
        agendaSettings: appt.settings
      }]);
      delete appt.settings;
    });
    return result;
  };
  _proto._calculateGroupIndex = function _calculateGroupIndex(apptIndex, appointmentsByResources) {
    var resultInd;
    var counter = 0;
    // eslint-disable-next-line
    for (var i in appointmentsByResources) {
      var countApptInGroup = appointmentsByResources[i].length;
      if (apptIndex >= counter && apptIndex < counter + countApptInGroup) {
        resultInd = Number(i);
        break;
      }
      counter += countApptInGroup;
    }
    return resultInd;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._getDeltaWidth = function _getDeltaWidth(args, initialSize) {};
  _proto._getAppointmentMaxWidth = function _getAppointmentMaxWidth() {
    return this.cellWidth;
  };
  _proto._needVerifyItemSize = function _needVerifyItemSize() {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._getAppointmentParts = function _getAppointmentParts(geometry, settings) {};
  _proto._reduceMultiWeekAppointment = function _reduceMultiWeekAppointment() {};
  _proto.calculateAppointmentHeight = function calculateAppointmentHeight() {
    return 0;
  };
  _proto.calculateAppointmentWidth = function calculateAppointmentWidth() {
    return 0;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.isAppointmentGreaterThan = function isAppointmentGreaterThan(etalon, comparisonParameters) {};
  _proto.isAllDay = function isAllDay() {
    return false;
  };
  _proto._sortCondition = function _sortCondition() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._rowCondition = function _rowCondition(a, b) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._columnCondition = function _columnCondition(a, b) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._findIndexByKey = function _findIndexByKey(arr, iKey, jKey, iValue, jValue) {};
  _proto._markAppointmentAsVirtual = function _markAppointmentAsVirtual() {};
  _proto.getDropDownAppointmentWidth = function getDropDownAppointmentWidth() {};
  _proto.getCollectorLeftOffset = function getCollectorLeftOffset() {};
  _proto.getCollectorTopOffset = function getCollectorTopOffset() {}
  // From subscribe
  ;
  _proto.replaceWrongAppointmentEndDate = function replaceWrongAppointmentEndDate(rawAppointment, startDate, endDate) {
    var adapter = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, this.dataAccessors, this.timeZoneCalculator);
    (0, _m_utils2.replaceWrongEndDate)(adapter, startDate, endDate, this.cellDuration, this.dataAccessors);
  }
  // TODO: get rid of an extra 'needClearSettings' argument
  ;
  _proto.calculateRows = function calculateRows(appointments, agendaDuration, currentDate, needClearSettings) {
    var _this2 = this;
    this._rows = [];
    currentDate = _date.default.trimTime(new Date(currentDate));
    var groupedAppointments = this.groupAppointmentByResources(appointments);
    // @ts-expect-error
    (0, _iterator.each)(groupedAppointments, function (_, currentAppointments) {
      var groupResult = [];
      var appts = {
        indexes: [],
        parts: []
      };
      if (!currentAppointments.length) {
        _this2._rows.push([]);
        return true;
      }
      (0, _iterator.each)(currentAppointments, function (index, appointment) {
        var startDate = _m_expression_utils.ExpressionUtils.getField(_this2.dataAccessors, 'startDate', appointment);
        var endDate = _m_expression_utils.ExpressionUtils.getField(_this2.dataAccessors, 'endDate', appointment);
        _this2.replaceWrongAppointmentEndDate(appointment, startDate, endDate);
        needClearSettings && delete appointment.settings;
        var result = _this2.instance.getAppointmentsInstance()._processRecurrenceAppointment(appointment, index, false);
        appts.parts = appts.parts.concat(result.parts);
        appts.indexes = appts.indexes.concat(result.indexes);
      });
      _this2.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(appts.indexes, currentAppointments);
      currentAppointments.push.apply(currentAppointments, _toConsumableArray(appts.parts));
      var appointmentCount = currentAppointments.length;
      for (var i = 0; i < agendaDuration; i++) {
        var day = new Date(currentDate);
        day.setMilliseconds(day.getMilliseconds() + 24 * 3600000 * i);
        if (groupResult[i] === undefined) {
          groupResult[i] = 0;
        }
        for (var j = 0; j < appointmentCount; j++) {
          var appointmentData = currentAppointments[j].settings || currentAppointments[j];
          var adapter = (0, _m_appointment_adapter.createAppointmentAdapter)(currentAppointments[j], _this2.dataAccessors, _this2.timeZoneCalculator);
          var appointmentIsLong = (0, _m_utils2.getAppointmentTakesSeveralDays)(adapter);
          var appointmentIsRecurrence = _m_expression_utils.ExpressionUtils.getField(_this2.dataAccessors, 'recurrenceRule', currentAppointments[j]);
          if (_this2.instance.fire('dayHasAppointment', day, appointmentData, true) || !appointmentIsRecurrence && appointmentIsLong && _this2.instance.fire('dayHasAppointment', day, currentAppointments[j], true)) {
            groupResult[i] += 1;
          }
        }
      }
      _this2._rows.push(groupResult);
    });
    return this._rows;
  };
  _proto._iterateRow = function _iterateRow(row, obj, index) {
    for (var i = 0; i < row.length; i++) {
      obj.counter += row[i];
      if (obj.counter >= index) {
        obj.indexInRow = i;
        break;
      }
    }
  };
  _proto.getDateByIndex = function getDateByIndex(index, rows, startViewDate) {
    var obj = {
      counter: 0,
      indexInRow: 0
    };
    index++;
    for (var i = 0; i < rows.length; i++) {
      this._iterateRow(rows[i], obj, index);
      if (obj.indexInRow) break;
    }
    return new Date(new Date(startViewDate).setDate(startViewDate.getDate() + obj.indexInRow));
  };
  _proto.getAppointmentDataCalculator = function getAppointmentDataCalculator() {
    var _this3 = this;
    return function ($appointment, originalStartDate) {
      var apptIndex = $appointment.index();
      var startViewDate = _this3.instance.getStartViewDate();
      var calculatedStartDate = _this3.getDateByIndex(apptIndex, _this3._rows, startViewDate);
      var wrappedOriginalStartDate = new Date(originalStartDate);
      return {
        startDate: new Date(calculatedStartDate.setHours(wrappedOriginalStartDate.getHours(), wrappedOriginalStartDate.getMinutes(), wrappedOriginalStartDate.getSeconds(), wrappedOriginalStartDate.getMilliseconds()))
      };
    };
  };
  _createClass(AgendaRenderingStrategy, [{
    key: "instance",
    get: function get() {
      return this.options.instance;
    }
  }, {
    key: "agendaDuration",
    get: function get() {
      return this.options.agendaDuration;
    }
  }]);
  return AgendaRenderingStrategy;
}(_m_strategy_base.default);
var _default = AgendaRenderingStrategy;
exports.default = _default;
