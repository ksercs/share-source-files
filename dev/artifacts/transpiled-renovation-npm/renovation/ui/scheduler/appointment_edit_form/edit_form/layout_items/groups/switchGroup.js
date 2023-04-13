"use strict";

exports.getSwitchGroupConfig = void 0;
var _const = require("../const");
var _switch = require("../switch");
var getSwitchGroupConfig = function getSwitchGroupConfig(allDayEditorTemplate, repeatEditorTemplate, allDayExpr) {
  return {
    itemType: 'group',
    colCountByScreen: {
      lg: 3,
      xs: 3
    },
    colSpan: 2,
    items: [(0, _switch.getSwitchLayoutItemConfig)(allDayEditorTemplate, allDayExpr, _const.ItemLabels.allDay), (0, _switch.getSwitchLayoutItemConfig)(repeatEditorTemplate, 'repeat', _const.ItemLabels.repeat), {
      itemType: 'empty',
      colSpan: 2
    }]
  };
};
exports.getSwitchGroupConfig = getSwitchGroupConfig;