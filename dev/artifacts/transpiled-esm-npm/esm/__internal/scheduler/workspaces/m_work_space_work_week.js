import registerComponent from '../../../core/component_registrator';
import { getWeekendsCount } from '../../../renovation/ui/scheduler/view_model/to_test/views/utils/work_week';
import { VIEWS } from '../m_constants';
import SchedulerWorkSpaceWeek from './m_work_space_week';
var WORK_WEEK_CLASS = 'dx-scheduler-work-space-work-week';
class SchedulerWorkSpaceWorkWeek extends SchedulerWorkSpaceWeek {
  get type() {
    return VIEWS.WORK_WEEK;
  }
  constructor() {
    // @ts-expect-error
    super(...arguments);
    this._getWeekendsCount = getWeekendsCount;
  }
  _getElementClass() {
    return WORK_WEEK_CLASS;
  }
}
registerComponent('dxSchedulerWorkSpaceWorkWeek', SchedulerWorkSpaceWorkWeek);
export default SchedulerWorkSpaceWorkWeek;