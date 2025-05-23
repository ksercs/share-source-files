/**
* DevExtreme (esm/__internal/scheduler/workspaces/m_work_space_vertical.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
