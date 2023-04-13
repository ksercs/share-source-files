/**
* DevExtreme (esm/ui/scheduler/appointments/rendering_strategies/strategy_week.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import VerticalRenderingStrategy from './strategy_vertical';
class WeekAppointmentRenderingStrategy extends VerticalRenderingStrategy {
  isApplyCompactAppointmentOffset() {
    if (this.isAdaptive && this._getMaxAppointmentCountPerCellByType() === 0) {
      return false;
    }
    return this.supportCompactDropDownAppointments();
  }
}
export default WeekAppointmentRenderingStrategy;
