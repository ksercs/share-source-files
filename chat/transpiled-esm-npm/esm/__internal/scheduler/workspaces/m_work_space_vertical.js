import _extends from "@babel/runtime/helpers/esm/extends";
import { formatWeekdayAndDay } from '../../scheduler/r1/utils/index';
import SchedulerWorkSpaceIndicator from './m_work_space_indicator';
class SchedulerWorkspaceVertical extends SchedulerWorkSpaceIndicator {
  _getFormat() {
    return formatWeekdayAndDay;
  }
  generateRenderOptions() {
    const options = super.generateRenderOptions();
    return _extends({}, options, {
      isGenerateTimePanelData: true
    });
  }
  _isRenderHeaderPanelEmptyCell() {
    return true;
  }
}
export default SchedulerWorkspaceVertical;