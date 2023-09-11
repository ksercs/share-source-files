import _extends from "@babel/runtime/helpers/esm/extends";
import { LayoutProps } from './layout_props';
export var MainLayoutProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(LayoutProps), Object.getOwnPropertyDescriptors({
  timePanelData: Object.freeze({
    groupedData: [],
    leftVirtualCellCount: 0,
    rightVirtualCellCount: 0,
    topVirtualRowCount: 0,
    bottomVirtualRowCount: 0
  }),
  groupPanelData: Object.freeze({
    groupPanelItems: [],
    baseColSpan: 1
  }),
  intervalCount: 1,
  className: '',
  isRenderDateHeader: true,
  groups: Object.freeze([]),
  groupByDate: false,
  groupPanelClassName: 'dx-scheduler-work-space-vertical-group-table',
  isAllDayPanelCollapsed: true,
  isAllDayPanelVisible: false,
  isRenderHeaderEmptyCell: true,
  isRenderGroupPanel: false,
  isStandaloneAllDayPanel: false,
  isRenderTimePanel: false,
  isUseMonthDateTable: false,
  isUseTimelineHeader: false
})));