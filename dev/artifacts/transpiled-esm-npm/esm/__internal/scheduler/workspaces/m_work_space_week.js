import registerComponent from '../../../core/component_registrator';
import { calculateViewStartDate } from '../../../renovation/ui/scheduler/view_model/to_test/views/utils/week';
import { VIEWS } from '../m_constants';
import SchedulerWorkSpaceVertical from './m_work_space_vertical';
var WEEK_CLASS = 'dx-scheduler-work-space-week';
class SchedulerWorkSpaceWeek extends SchedulerWorkSpaceVertical {
  get type() {
    return VIEWS.WEEK;
  }
  _getElementClass() {
    return WEEK_CLASS;
  }
  _calculateViewStartDate() {
    return calculateViewStartDate(this.option('startDate'), this._firstDayOfWeek());
  }
}
registerComponent('dxSchedulerWorkSpaceWeek', SchedulerWorkSpaceWeek);
export default SchedulerWorkSpaceWeek;