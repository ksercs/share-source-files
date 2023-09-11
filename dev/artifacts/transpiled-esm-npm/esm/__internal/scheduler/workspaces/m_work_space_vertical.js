import _extends from "@babel/runtime/helpers/esm/extends";
import { formatWeekdayAndDay } from '../../../renovation/ui/scheduler/view_model/to_test/views/utils/base';
import SchedulerWorkSpaceIndicator from './m_work_space_indicator';
class SchedulerWorkspaceVertical extends SchedulerWorkSpaceIndicator {
  _getFormat() {
    return formatWeekdayAndDay;
  }
  generateRenderOptions() {
    var options = super.generateRenderOptions();
    return _extends(_extends({}, options), {
      isGenerateTimePanelData: true
    });
  }
  _isRenderHeaderPanelEmptyCell() {
    return true;
  }
}
export default SchedulerWorkspaceVertical;