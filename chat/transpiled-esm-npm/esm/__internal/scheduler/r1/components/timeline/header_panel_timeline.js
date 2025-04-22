import { createComponentVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '../../../../core/r1/runtime/inferno/index';
import { HeaderPanel, HeaderPanelDefaultProps } from '../base/header_panel';
import { TimelineDateHeaderLayout } from './date_header_timeline';
export class HeaderPanelTimeline extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    const {
      viewContext,
      dateCellTemplate,
      dateHeaderData,
      groupByDate,
      groupOrientation,
      groupPanelData,
      groups,
      isRenderDateHeader,
      resourceCellTemplate,
      timeCellTemplate
    } = this.props;
    return createComponentVNode(2, HeaderPanel, {
      "viewContext": viewContext,
      "dateHeaderData": dateHeaderData,
      "groupPanelData": groupPanelData,
      "groupByDate": groupByDate,
      "groups": groups,
      "groupOrientation": groupOrientation,
      "isRenderDateHeader": isRenderDateHeader,
      "dateHeaderTemplate": TimelineDateHeaderLayout,
      "resourceCellTemplate": resourceCellTemplate,
      "dateCellTemplate": dateCellTemplate,
      "timeCellTemplate": timeCellTemplate
    });
  }
}
HeaderPanelTimeline.defaultProps = HeaderPanelDefaultProps;