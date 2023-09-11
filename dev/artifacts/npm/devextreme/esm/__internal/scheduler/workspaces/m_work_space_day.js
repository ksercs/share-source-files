/**
* DevExtreme (esm/__internal/scheduler/workspaces/m_work_space_day.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import { VIEWS } from '../m_constants';
import SchedulerWorkSpaceVertical from './m_work_space_vertical';
var DAY_CLASS = 'dx-scheduler-work-space-day';
class SchedulerWorkSpaceDay extends SchedulerWorkSpaceVertical {
  get type() {
    return VIEWS.DAY;
  }
  _getElementClass() {
    return DAY_CLASS;
  }
  _renderDateHeader() {
    return this.option('intervalCount') === 1 ? null : super._renderDateHeader();
  }
  renderRHeaderPanel() {
    if (this.option('intervalCount') === 1) {
      super.renderRHeaderPanel(false);
    } else {
      super.renderRHeaderPanel(true);
    }
  }
}
registerComponent('dxSchedulerWorkSpaceDay', SchedulerWorkSpaceDay);
export default SchedulerWorkSpaceDay;
