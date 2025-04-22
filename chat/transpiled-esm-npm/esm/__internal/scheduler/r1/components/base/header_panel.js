import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, createComponentVNode } from "inferno";
import { createReRenderEffect, InfernoWrapperComponent } from '../../../../core/r1/runtime/inferno/index';
import { PublicTemplate } from '../../../../scheduler/r1/components/templates/index';
import { isHorizontalGroupingApplied } from '../../utils/index';
import { DateHeader } from './date_header';
import { GroupPanel, GroupPanelDefaultProps } from './group_panel';
export const HeaderPanelDefaultProps = _extends({}, GroupPanelDefaultProps, {
  isRenderDateHeader: true,
  dateHeaderTemplate: DateHeader
});
export class HeaderPanel extends InfernoWrapperComponent {
  createEffects() {
    return [createReRenderEffect()];
  }
  render() {
    const {
      viewContext,
      dateHeaderData,
      groupByDate,
      groupOrientation,
      groupPanelData,
      groups,
      isRenderDateHeader,
      dateCellTemplate,
      dateHeaderTemplate,
      resourceCellTemplate,
      timeCellTemplate
    } = this.props;
    const isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation);
    return createVNode(1, "thead", null, [isHorizontalGrouping && !groupByDate && createComponentVNode(2, GroupPanel, {
      "viewContext": viewContext,
      "groupPanelData": groupPanelData,
      "groups": groups,
      "groupByDate": groupByDate,
      "groupOrientation": groupOrientation,
      "resourceCellTemplate": resourceCellTemplate
    }), isRenderDateHeader && createComponentVNode(2, PublicTemplate, {
      "template": dateHeaderTemplate,
      "templateProps": {
        viewContext,
        groupByDate,
        dateHeaderData,
        groupOrientation,
        groups,
        dateCellTemplate,
        timeCellTemplate
      }
    }), groupByDate && createComponentVNode(2, GroupPanel, {
      "viewContext": viewContext,
      "groupPanelData": groupPanelData,
      "groups": groups,
      "groupByDate": groupByDate,
      "groupOrientation": groupOrientation,
      "resourceCellTemplate": resourceCellTemplate
    })], 0);
  }
}
HeaderPanel.defaultProps = HeaderPanelDefaultProps;