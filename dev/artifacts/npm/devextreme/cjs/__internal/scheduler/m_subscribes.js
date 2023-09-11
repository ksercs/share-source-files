/**
* DevExtreme (cjs/__internal/scheduler/m_subscribes.js)
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
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _m_text_utils = require("./appointments/m_text_utils");
var _m_appointment_adapter = require("./m_appointment_adapter");
var _m_classes = require("./m_classes");
var _m_utils = require("./m_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var toMs = _date.default.dateToMilliseconds;
var subscribes = {
  isCurrentViewAgenda() {
    return this.currentViewType === 'agenda';
  },
  currentViewUpdated(currentView) {
    this.option('currentView', currentView);
  },
  currentDateUpdated(date) {
    this.option('currentDate', date);
  },
  getOption(name) {
    return this.option(name);
  },
  getWorkspaceOption(name) {
    return this.getWorkSpace().option(name);
  },
  isVirtualScrolling() {
    return this.isVirtualScrolling();
  },
  setCellDataCacheAlias(appointment, geometry) {
    this._workSpace.setCellDataCacheAlias(appointment, geometry);
  },
  isGroupedByDate() {
    return this.getWorkSpace().isGroupedByDate();
  },
  showAppointmentTooltip(options) {
    var targetedAppointment = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentTooltip(options.data, options.target, targetedAppointment);
  },
  hideAppointmentTooltip() {
    this.hideAppointmentTooltip();
  },
  showEditAppointmentPopup(options) {
    var targetedData = this.getTargetedAppointment(options.data, options.target);
    this.showAppointmentPopup(options.data, false, targetedData);
  },
  updateAppointmentAfterResize(options) {
    var _this = this;
    var info = _m_utils.utils.dataAccessors.getAppointmentInfo(options.$appointment);
    var exceptionDate = info.sourceAppointment.exceptionDate;
    this._checkRecurringAppointment(options.target, options.data, exceptionDate, function () {
      _this._updateAppointment(options.target, options.data, function () {
        this._appointments.moveAppointmentBack();
      });
    });
  },
  getUpdatedData(rawAppointment) {
    return this._getUpdatedData(rawAppointment);
  },
  updateAppointmentAfterDrag(_ref) {
    var _this2 = this;
    var event = _ref.event,
      element = _ref.element,
      rawAppointment = _ref.rawAppointment,
      newCellIndex = _ref.newCellIndex,
      oldCellIndex = _ref.oldCellIndex;
    var info = _m_utils.utils.dataAccessors.getAppointmentInfo(element);
    var appointment = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, this._dataAccessors, this.timeZoneCalculator);
    var targetedAppointment = (0, _m_appointment_adapter.createAppointmentAdapter)((0, _extend.extend)({}, rawAppointment, this._getUpdatedData(rawAppointment)), this._dataAccessors, this.timeZoneCalculator);
    var targetedRawAppointment = targetedAppointment.source();
    var becomeAllDay = targetedAppointment.allDay;
    var wasAllDay = appointment.allDay;
    var movedBetweenAllDayAndSimple = this._workSpace.supportAllDayRow() && (wasAllDay && !becomeAllDay || !wasAllDay && becomeAllDay);
    var isDragAndDropBetweenComponents = event.fromComponent !== event.toComponent;
    if (newCellIndex === -1) {
      if (!isDragAndDropBetweenComponents) {
        // TODO dragging inside component
        this._appointments.moveAppointmentBack(event);
      }
      return;
    }
    if (newCellIndex !== oldCellIndex || isDragAndDropBetweenComponents || movedBetweenAllDayAndSimple) {
      this._checkRecurringAppointment(rawAppointment, targetedRawAppointment, info.sourceAppointment.exceptionDate, function () {
        _this2._updateAppointment(rawAppointment, targetedRawAppointment, function () {
          this._appointments.moveAppointmentBack(event);
        }, event);
      }, undefined, undefined, event);
    } else {
      this._appointments.moveAppointmentBack(event);
    }
  },
  onDeleteButtonPress(options) {
    var targetedData = this.getTargetedAppointment(options.data, (0, _renderer.default)(options.target));
    this.checkAndDeleteAppointment(options.data, targetedData);
    this.hideAppointmentTooltip();
  },
  getTextAndFormatDate(appointmentRaw, targetedAppointmentRaw, format) {
    var appointmentAdapter = (0, _m_appointment_adapter.createAppointmentAdapter)(appointmentRaw, this._dataAccessors, this.timeZoneCalculator);
    var targetedAdapter = (0, _m_appointment_adapter.createAppointmentAdapter)(targetedAppointmentRaw || appointmentRaw, this._dataAccessors, this.timeZoneCalculator);
    // TODO pull out time zone converting from appointment adapter for knockout(T947938)
    var startDate = this.timeZoneCalculator.createDate(targetedAdapter.startDate, {
      path: 'toGrid'
    });
    var endDate = this.timeZoneCalculator.createDate(targetedAdapter.endDate, {
      path: 'toGrid'
    });
    var formatType = format || (0, _m_text_utils.getFormatType)(startDate, endDate, targetedAdapter.allDay, this.currentViewType !== 'month');
    return {
      text: targetedAdapter.text || appointmentAdapter.text,
      formatDate: (0, _m_text_utils.formatDates)(startDate, endDate, formatType)
    };
  },
  _createAppointmentTitle(data) {
    if ((0, _type.isPlainObject)(data)) {
      return data.text;
    }
    return String(data);
  },
  getResizableAppointmentArea(options) {
    var allDay = options.allDay;
    var groups = this._getCurrentViewOption('groups');
    if (groups && groups.length) {
      if (allDay || this.getLayoutManager().getRenderingStrategyInstance()._needHorizontalGroupBounds()) {
        var horizontalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);
        return {
          left: horizontalGroupBounds.left,
          right: horizontalGroupBounds.right,
          top: 0,
          bottom: 0
        };
      }
      if (this.getLayoutManager().getRenderingStrategyInstance()._needVerticalGroupBounds(allDay) && this._workSpace._isVerticalGroupedWorkSpace()) {
        var verticalGroupBounds = this._workSpace.getGroupBounds(options.coordinates);
        return {
          left: 0,
          right: 0,
          top: verticalGroupBounds.top,
          bottom: verticalGroupBounds.bottom
        };
      }
    }
    return undefined;
  },
  needRecalculateResizableArea() {
    return this.getWorkSpace().needRecalculateResizableArea();
  },
  getAppointmentGeometry(settings) {
    return this.getLayoutManager().getRenderingStrategyInstance().getAppointmentGeometry(settings);
  },
  isAllDay(appointmentData) {
    return this.getLayoutManager().getRenderingStrategyInstance().isAllDay(appointmentData);
  },
  getDeltaTime(e, initialSize, itemData) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDeltaTime(e, initialSize, itemData);
  },
  getDropDownAppointmentWidth(isAllDay) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentWidth(this._getViewCountConfig().intervalCount, isAllDay);
  },
  getDropDownAppointmentHeight() {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentHeight();
  },
  getCellWidth() {
    return this.getWorkSpace().getCellWidth();
  },
  getCellHeight() {
    return this.getWorkSpace().getCellHeight();
  },
  getMaxAppointmentCountPerCellByType(isAllDay) {
    return this.getRenderingStrategyInstance()._getMaxAppointmentCountPerCellByType(isAllDay);
  },
  needCorrectAppointmentDates() {
    return this.getRenderingStrategyInstance().needCorrectAppointmentDates();
  },
  getRenderingStrategyDirection() {
    return this.getRenderingStrategyInstance().getDirection();
  },
  updateAppointmentEndDate(options) {
    var endDate = options.endDate;
    var endDayHour = this._getCurrentViewOption('endDayHour');
    var startDayHour = this._getCurrentViewOption('startDayHour');
    var updatedEndDate = endDate;
    if (endDate.getHours() >= endDayHour) {
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    } else if (!options.isSameDate && startDayHour > 0 && endDate.getHours() * 60 + endDate.getMinutes() < startDayHour * 60) {
      updatedEndDate = new Date(updatedEndDate.getTime() - toMs('day'));
      updatedEndDate.setHours(endDayHour, 0, 0, 0);
    }
    return updatedEndDate;
  },
  renderCompactAppointments(options) {
    this._compactAppointmentsHelper.render(options);
  },
  clearCompactAppointments() {
    this._compactAppointmentsHelper.clear();
  },
  supportCompactDropDownAppointments() {
    return this.getLayoutManager().getRenderingStrategyInstance().supportCompactDropDownAppointments();
  },
  getGroupCount() {
    return this._workSpace._getGroupCount();
  },
  mapAppointmentFields(config) {
    var itemData = config.itemData,
      itemElement = config.itemElement,
      targetedAppointment = config.targetedAppointment;
    var targetedData = targetedAppointment || this.getTargetedAppointment(itemData, itemElement);
    return {
      appointmentData: config.itemData,
      appointmentElement: config.itemElement,
      targetedAppointmentData: targetedData
    };
  },
  dayHasAppointment(day, appointment, trimTime) {
    return this.dayHasAppointment(day, appointment, trimTime);
  },
  getLayoutManager() {
    return this._layoutManager;
  },
  getAgendaVerticalStepHeight() {
    return this.getWorkSpace().getAgendaVerticalStepHeight();
  },
  getAgendaDuration() {
    return this._getCurrentViewOption('agendaDuration');
  },
  getStartViewDate() {
    return this.getStartViewDate();
  },
  getEndViewDate() {
    return this.getEndViewDate();
  },
  forceMaxAppointmentPerCell() {
    return this.forceMaxAppointmentPerCell();
  },
  onAgendaReady(rows) {
    var $appts = this.getAppointmentsInstance()._itemElements();
    var total = 0;
    var applyClass = function applyClass(_, count) {
      var index = count + total - 1;
      $appts.eq(index).addClass(_m_classes.AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS);
      total += count;
    };
    for (var i = 0; i < rows.length; i++) {
      (0, _iterator.each)(rows[i], applyClass);
    }
  },
  getTimezone() {
    return this._getTimezoneOffsetByOption();
  },
  getTargetedAppointmentData(appointment, element) {
    return this.getTargetedAppointment(appointment, element);
  },
  getEndDayHour() {
    return this._workSpace.option('endDayHour') || this.option('endDayHour');
  },
  getStartDayHour() {
    return this._workSpace.option('startDayHour') || this.option('startDayHour');
  },
  isAdaptive() {
    return this.option('adaptivityEnabled');
  },
  removeDroppableCellClass() {
    this._workSpace.removeDroppableCellClass();
  }
};
var _default = subscribes;
exports.default = _default;
