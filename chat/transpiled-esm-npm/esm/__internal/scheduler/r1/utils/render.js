import _extends from "@babel/runtime/helpers/esm/extends";
import { combineClasses } from '../../../core/r1/utils/render_utils';
export const addToStyles = (options, style) => {
  const nextStyle = style ?? {};
  const result = _extends({}, nextStyle);
  options.forEach(_ref => {
    let {
      attr,
      value
    } = _ref;
    result[attr] = value || nextStyle[attr];
  });
  return result;
};
export const addWidthToStyle = (value, style) => {
  const width = value ? `${value}px` : '';
  return addToStyles([{
    attr: 'width',
    value: width
  }], style);
};
export const addHeightToStyle = (value, style) => {
  const height = value ? `${value}px` : '';
  return addToStyles([{
    attr: 'height',
    value: height
  }], style);
};
export const getGroupCellClasses = function () {
  let isFirstGroupCell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  let isLastGroupCell = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return combineClasses({
    'dx-scheduler-first-group-cell': isFirstGroupCell,
    'dx-scheduler-last-group-cell': isLastGroupCell,
    [className]: true
  });
};
export const getCellSizeHorizontalClass = (viewType, crossScrollingEnabled) => {
  const sizeClassName = 'dx-scheduler-cell-sizes-horizontal';
  switch (viewType) {
    case 'day':
    case 'week':
    case 'workWeek':
    case 'month':
      return crossScrollingEnabled ? sizeClassName : '';
    default:
      return sizeClassName;
  }
};
export const getCellSizeVerticalClass = isAllDayCell => {
  const sizeClassName = 'dx-scheduler-cell-sizes-vertical';
  return !isAllDayCell ? sizeClassName : '';
};