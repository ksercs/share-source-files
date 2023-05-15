/**
* DevExtreme (esm/renovation/ui/scheduler/appointment/utils.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { addToStyles } from '../workspaces/utils';
import messageLocalization from '../../../../localization/message';
import dateLocalization from '../../../../localization/date';
var EditorLabelLocalizationConst = 'dxScheduler-editorLabelEndDate';
export var getAppointmentStyles = viewModel => {
  var defaultSize = 50;
  var {
    geometry: {
      height,
      left,
      top,
      width
    }
  } = viewModel;
  return addToStyles([{
    attr: 'height',
    value: "".concat(height || defaultSize, "px")
  }, {
    attr: 'width',
    value: "".concat(width || defaultSize, "px")
  }, {
    attr: 'top',
    value: "".concat(top, "px")
  }, {
    attr: 'left',
    value: "".concat(left, "px")
  }]);
};
export var getAppointmentKey = geometry => {
  var {
    height,
    left,
    top,
    width
  } = geometry;
  return "".concat(left, "-").concat(top, "-").concat(width, "-").concat(height);
};
export var getReducedIconTooltipText = endDate => {
  var tooltipLabel = messageLocalization.format(EditorLabelLocalizationConst);
  if (!endDate) {
    return tooltipLabel;
  }
  var date = new Date(endDate);
  var monthAndDay = dateLocalization.format(date, 'monthAndDay');
  var year = dateLocalization.format(date, 'year');
  return "".concat(tooltipLabel, ": ").concat(monthAndDay, ", ").concat(year);
};
export var mergeStylesWithColor = (color, styles) => !color ? styles : addToStyles([{
  attr: 'backgroundColor',
  value: color
}], styles);
