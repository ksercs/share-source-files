import { isDataOnWeekend, workWeekUtils } from '../../../scheduler/r1/utils/index';
import { ViewDataGeneratorWeek } from './m_view_data_generator_week';
export class ViewDataGeneratorWorkWeek extends ViewDataGeneratorWeek {
  constructor() {
    super(...arguments);
    this.daysInInterval = 5;
    this.isWorkView = true;
  }
  isSkippedDate(date) {
    return isDataOnWeekend(date);
  }
  _calculateStartViewDate(options) {
    return workWeekUtils.calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), this.getFirstDayOfWeek(options.firstDayOfWeek));
  }
  getFirstDayOfWeek(firstDayOfWeekOption) {
    return firstDayOfWeekOption || 0;
  }
}