/**
* DevExtreme (esm/__internal/scheduler/appointments/rendering_strategies/m_strategy_week.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import VerticalRenderingStrategy from './m_strategy_vertical';
class WeekAppointmentRenderingStrategy extends VerticalRenderingStrategy {
  isApplyCompactAppointmentOffset() {
    if (this.isAdaptive && this._getMaxAppointmentCountPerCellByType() === 0) {
      return false;
    }
    return this.supportCompactDropDownAppointments();
  }
}
export default WeekAppointmentRenderingStrategy;
