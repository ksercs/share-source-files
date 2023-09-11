import { ItemLabels } from '../const';
import { getSwitchLayoutItemConfig } from '../switch';
export var getSwitchGroupConfig = (allDayEditorTemplate, repeatEditorTemplate, allDayExpr) => ({
  itemType: 'group',
  colCountByScreen: {
    lg: 3,
    xs: 3
  },
  colSpan: 2,
  items: [getSwitchLayoutItemConfig(allDayEditorTemplate, allDayExpr, ItemLabels.allDay), getSwitchLayoutItemConfig(repeatEditorTemplate, 'repeat', ItemLabels.repeat), {
    itemType: 'empty',
    colSpan: 2
  }]
});