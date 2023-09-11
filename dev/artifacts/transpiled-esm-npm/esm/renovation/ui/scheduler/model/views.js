import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["height", "scrolling", "width"];
import { renovationGetCurrentView } from './untyped_getCurrentView';
import { isString } from '../../../../core/utils/type';
export var getCurrentView = renovationGetCurrentView;
export var getCurrentViewProps = (currentView, views) => {
  var currentViewProps = getCurrentView(currentView, views);
  return isString(currentViewProps) ? {
    type: currentViewProps
  } : currentViewProps;
};
export function getViewConfigProp(schedulerProp, viewProp) {
  return viewProp !== undefined ? viewProp : schedulerProp;
}
export var getCurrentViewConfig = (currentViewProps, schedulerProps, currentDate) => {
  var {
      scrolling: schedulerScrolling
    } = schedulerProps,
    restSchedulerProps = _objectWithoutPropertiesLoose(schedulerProps, _excluded);
  var {
    scrolling
  } = currentViewProps;
  var isVirtualScrolling = schedulerScrolling.mode === 'virtual' || (scrolling === null || scrolling === void 0 ? void 0 : scrolling.mode) === 'virtual';
  var crossScrollingEnabled = schedulerProps.crossScrollingEnabled || isVirtualScrolling;
  var result = _extends({
    scrolling: schedulerScrolling
  }, restSchedulerProps, currentViewProps, {
    schedulerHeight: schedulerProps.height,
    schedulerWidth: schedulerProps.width,
    crossScrollingEnabled,
    appointmentTemplate: currentViewProps.appointmentTemplate || restSchedulerProps.appointmentTemplate,
    dataCellTemplate: currentViewProps.dataCellTemplate || restSchedulerProps.dataCellTemplate,
    dateCellTemplate: currentViewProps.dateCellTemplate || restSchedulerProps.dateCellTemplate,
    timeCellTemplate: currentViewProps.timeCellTemplate || restSchedulerProps.timeCellTemplate,
    resourceCellTemplate: currentViewProps.resourceCellTemplate || restSchedulerProps.resourceCellTemplate,
    appointmentCollectorTemplate: currentViewProps.appointmentCollectorTemplate || restSchedulerProps.appointmentCollectorTemplate,
    appointmentTooltipTemplate: currentViewProps.appointmentTooltipTemplate || restSchedulerProps.appointmentTooltipTemplate,
    allDayPanelMode: currentViewProps.allDayPanelMode || restSchedulerProps.allDayPanelMode
  });
  return _extends({}, result, {
    hoursInterval: result.cellDuration / 60,
    allDayPanelExpanded: true,
    allowMultipleCellSelection: true,
    currentDate
  });
};
export var getValidGroups = (schedulerGroups, viewGroups) => getViewConfigProp(schedulerGroups, viewGroups);