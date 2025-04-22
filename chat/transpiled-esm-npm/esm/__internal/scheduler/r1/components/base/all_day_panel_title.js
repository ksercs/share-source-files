import { createVNode } from "inferno";
import messageLocalization from '../../../../../common/core/localization/message';
import { createReRenderEffect, InfernoWrapperComponent } from '../../../../core/r1/runtime/inferno/index';
export class AllDayPanelTitle extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    const text = messageLocalization.format('dxScheduler-allDay');
    return createVNode(1, "div", "dx-scheduler-all-day-title", text, 0);
  }
}
AllDayPanelTitle.defaultProps = {};