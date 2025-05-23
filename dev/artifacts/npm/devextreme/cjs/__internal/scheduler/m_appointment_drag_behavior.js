/**
* DevExtreme (cjs/__internal/scheduler/m_appointment_drag_behavior.js)
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
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _draggable = _interopRequireDefault(require("../../ui/draggable"));
var _m_constants = require("./m_constants");
var _is_scheduler_component = require("./utils/is_scheduler_component");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var APPOINTMENT_ITEM_CLASS = 'dx-scheduler-appointment';
var AppointmentDragBehavior = /*#__PURE__*/function () {
  function AppointmentDragBehavior(scheduler) {
    this.scheduler = scheduler;
    this.workspace = this.scheduler._workSpace;
    this.appointments = this.scheduler._appointments;
    this.initialPosition = {
      left: 0,
      top: 0
    };
    this.appointmentInfo = null;
    this.dragBetweenComponentsPromise = null;
  }
  var _proto = AppointmentDragBehavior.prototype;
  _proto.isAllDay = function isAllDay(appointment) {
    return appointment.data('dxAppointmentSettings').allDay;
  };
  _proto.onDragStart = function onDragStart(e) {
    var itemSettings = e.itemSettings,
      itemData = e.itemData,
      initialPosition = e.initialPosition;
    this.initialPosition = initialPosition;
    this.appointmentInfo = {
      appointment: itemData,
      settings: itemSettings
    };
    this.appointments.notifyObserver('hideAppointmentTooltip');
  };
  _proto.onDragMove = function onDragMove(e) {
    if (e.fromComponent !== e.toComponent) {
      this.appointments.notifyObserver('removeDroppableCellClass');
    }
  };
  _proto.getAppointmentElement = function getAppointmentElement(e) {
    var itemElement = e.event.data && e.event.data.itemElement || e.itemElement;
    return (0, _renderer.default)(itemElement);
  };
  _proto.onDragEnd = function onDragEnd(event) {
    var element = this.getAppointmentElement(event);
    var rawAppointment = this.appointments._getItemData(element);
    var container = this.appointments._getAppointmentContainer(this.isAllDay(element));
    container.append(element);
    var newCellIndex = this.workspace.getDroppableCellIndex();
    var oldCellIndex = this.workspace.getCellIndexByCoordinates(this.initialPosition);
    this.appointments.notifyObserver('updateAppointmentAfterDrag', {
      event,
      element,
      rawAppointment,
      newCellIndex,
      oldCellIndex
    });
  };
  _proto.onDragCancel = function onDragCancel() {
    this.removeDroppableClasses();
  };
  _proto.getItemData = function getItemData(appointmentElement) {
    var dataFromTooltip = (0, _renderer.default)(appointmentElement).data(_m_constants.LIST_ITEM_DATA_KEY);
    var itemDataFromTooltip = dataFromTooltip === null || dataFromTooltip === void 0 ? void 0 : dataFromTooltip.appointment;
    var itemDataFromGrid = this.appointments._getItemData(appointmentElement);
    return itemDataFromTooltip || itemDataFromGrid;
  };
  _proto.getItemSettings = function getItemSettings(appointment) {
    var itemData = (0, _renderer.default)(appointment).data(_m_constants.LIST_ITEM_DATA_KEY);
    return itemData && itemData.settings || [];
  };
  _proto.createDragStartHandler = function createDragStartHandler(options, appointmentDragging) {
    var _this = this;
    return function (e) {
      e.itemData = _this.getItemData(e.itemElement);
      e.itemSettings = _this.getItemSettings(e.itemElement);
      appointmentDragging.onDragStart && appointmentDragging.onDragStart(e);
      if (!e.cancel) {
        options.onDragStart(e);
      }
    };
  };
  _proto.createDragMoveHandler = function createDragMoveHandler(options, appointmentDragging) {
    return function (e) {
      appointmentDragging.onDragMove && appointmentDragging.onDragMove(e);
      if (!e.cancel) {
        options.onDragMove(e);
      }
    };
  };
  _proto.createDragEndHandler = function createDragEndHandler(options, appointmentDragging) {
    var _this2 = this;
    return function (e) {
      var updatedData = _this2.appointments.invoke('getUpdatedData', e.itemData);
      _this2.appointmentInfo = null;
      e.toItemData = (0, _extend.extend)({}, e.itemData, updatedData);
      appointmentDragging.onDragEnd && appointmentDragging.onDragEnd(e);
      if (!e.cancel) {
        options.onDragEnd(e);
        if (e.fromComponent !== e.toComponent) {
          appointmentDragging.onRemove && appointmentDragging.onRemove(e);
        }
      }
      // NOTE: event.cancel may be promise or different type, so we need strict check here.
      if (e.cancel === true) {
        _this2.removeDroppableClasses();
      }
      if (e.cancel !== true && (0, _is_scheduler_component.isSchedulerComponent)(e.toComponent)) {
        var targetDragBehavior = e.toComponent._getDragBehavior();
        // @ts-expect-error
        targetDragBehavior.dragBetweenComponentsPromise = new _deferred.Deferred();
      }
    };
  };
  _proto.createDropHandler = function createDropHandler(appointmentDragging) {
    var _this3 = this;
    return function (e) {
      var updatedData = _this3.appointments.invoke('getUpdatedData', e.itemData);
      e.itemData = (0, _extend.extend)({}, e.itemData, updatedData);
      if (e.fromComponent !== e.toComponent) {
        appointmentDragging.onAdd && appointmentDragging.onAdd(e);
      }
      if (_this3.dragBetweenComponentsPromise) {
        _this3.dragBetweenComponentsPromise.resolve();
      }
    };
  };
  _proto.addTo = function addTo(container, config) {
    var appointmentDragging = this.scheduler.option('appointmentDragging') || {};
    var options = (0, _extend.extend)({
      component: this.scheduler,
      contentTemplate: null,
      filter: ".".concat(APPOINTMENT_ITEM_CLASS),
      immediate: false,
      onDragStart: this.onDragStart.bind(this),
      onDragMove: this.onDragMove.bind(this),
      onDragEnd: this.onDragEnd.bind(this),
      onDragCancel: this.onDragCancel.bind(this)
    }, config);
    this.appointments._createComponent(container, _draggable.default, (0, _extend.extend)({}, options, appointmentDragging, {
      onDragStart: this.createDragStartHandler(options, appointmentDragging),
      onDragMove: this.createDragMoveHandler(options, appointmentDragging),
      onDragEnd: this.createDragEndHandler(options, appointmentDragging),
      onDrop: this.createDropHandler(appointmentDragging),
      onCancelByEsc: true
    }));
  };
  _proto.updateDragSource = function updateDragSource(appointment, settings) {
    var appointmentInfo = this.appointmentInfo;
    if (appointmentInfo || appointment) {
      var currentAppointment = appointment || appointmentInfo.appointment;
      var currentSettings = settings || appointmentInfo.settings;
      this.appointments._setDragSourceAppointment(currentAppointment, currentSettings);
    }
  };
  _proto.removeDroppableClasses = function removeDroppableClasses() {
    this.appointments._removeDragSourceClassFromDraggedAppointment();
    this.workspace.removeDroppableCellClass();
  };
  return AppointmentDragBehavior;
}();
exports.default = AppointmentDragBehavior;
