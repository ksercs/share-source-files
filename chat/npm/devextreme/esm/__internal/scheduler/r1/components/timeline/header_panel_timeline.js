/**
* DevExtreme (esm/__internal/scheduler/r1/components/timeline/header_panel_timeline.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
