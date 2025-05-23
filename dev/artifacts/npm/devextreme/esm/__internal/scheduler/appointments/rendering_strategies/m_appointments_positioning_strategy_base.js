/**
* DevExtreme (esm/__internal/scheduler/appointments/rendering_strategies/m_appointments_positioning_strategy_base.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../../core/utils/type';
var COLLECTOR_DEFAULT_WIDTH = 24;
var COLLECTOR_DEFAULT_OFFSET = 3;
var COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET = 22;
var APPOINTMENT_MIN_COUNT = 1;
var APPOINTMENT_DEFAULT_WIDTH = 40;
var COLLECTOR_WIDTH_IN_PERCENTS = 75;
var APPOINTMENT_INCREASED_WIDTH = 50;
class AppointmentPositioningStrategy {
  constructor(renderingStrategy) {
    this._renderingStrategy = renderingStrategy;
  }
  getDropDownAppointmentWidth(intervalCount, isAllDay) {
    if (isAllDay || !isDefined(isAllDay)) {
      return COLLECTOR_WIDTH_IN_PERCENTS * this._renderingStrategy.cellWidth / 100;
    }
    return COLLECTOR_DEFAULT_WIDTH;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCollectorTopOffset(allDay) {
    return COLLECTOR_DEFAULT_OFFSET;
  }
  getCollectorLeftOffset() {
    return COLLECTOR_DEFAULT_OFFSET;
  }
  getAppointmentDefaultOffset() {
    if (this._renderingStrategy._isCompactTheme()) {
      return COMPACT_THEME_APPOINTMENT_DEFAULT_OFFSET;
    }
    return this._renderingStrategy.appointmentOffset;
  }
  getDynamicAppointmentCountPerCell() {
    var renderingStrategy = this._renderingStrategy;
    var {
      cellHeight
    } = renderingStrategy;
    var allDayCount = Math.floor((cellHeight - renderingStrategy._getAppointmentDefaultOffset()) / renderingStrategy._getAppointmentDefaultHeight()) || this._getAppointmentMinCount();
    // NOTE: Simplify using only object
    if (renderingStrategy.allDaySupported()) {
      return {
        allDay: renderingStrategy.groupOrientation === 'vertical' ? allDayCount : this._renderingStrategy.appointmentCountPerCell,
        simple: this._calculateDynamicAppointmentCountPerCell() || this._getAppointmentMinCount()
      };
    }
    return allDayCount;
  }
  getDropDownAppointmentHeight() {
    return undefined;
  }
  _getAppointmentMinCount() {
    return APPOINTMENT_MIN_COUNT;
  }
  _calculateDynamicAppointmentCountPerCell() {
    return Math.floor(this._renderingStrategy._getAppointmentMaxWidth() / APPOINTMENT_INCREASED_WIDTH);
  }
  _getAppointmentDefaultWidth() {
    return APPOINTMENT_DEFAULT_WIDTH;
  }
}
export default AppointmentPositioningStrategy;
