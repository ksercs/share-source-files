"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTableCellBase = exports.DateTableCallBaseDefaultProps = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _index2 = require("../../../../scheduler/r1/components/templates/index");
var _render_utils = require("../../../../core/r1/utils/render_utils");
var _index3 = require("../../utils/index");
var _const = require("../const");
var _cell = require("./cell");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DateTableCallBaseDefaultProps = exports.DateTableCallBaseDefaultProps = _extends({}, _cell.CellBaseDefaultProps, {
  otherMonth: false,
  today: false,
  firstDayOfMonth: false,
  isSelected: false,
  isFocused: false
});
const ADD_APPOINTMENT_LABEL = 'Add appointment';
class DateTableCellBase extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.dataCellTemplateProps = null;
  }
  getDataCellTemplateProps() {
    if (this.dataCellTemplateProps !== null) {
      return this.dataCellTemplateProps;
    }
    const {
      allDay,
      contentTemplateProps,
      endDate,
      groupIndex,
      groups,
      index,
      startDate
    } = this.props;
    this.dataCellTemplateProps = {
      data: _extends({
        startDate,
        endDate,
        groups,
        groupIndex: groups ? groupIndex : undefined,
        text: '',
        allDay: !!allDay || undefined
      }, contentTemplateProps === null || contentTemplateProps === void 0 ? void 0 : contentTemplateProps.data),
      index
    };
    return this.dataCellTemplateProps;
  }
  componentWillUpdate(nextProps) {
    if (this.props.allDay !== nextProps.allDay || this.props.contentTemplateProps !== nextProps.contentTemplateProps || this.props.endDate !== nextProps.endDate || this.props.groupIndex !== nextProps.groupIndex || this.props.groups !== nextProps.groups || this.props.index !== nextProps.index || this.props.startDate !== nextProps.startDate) {
      this.dataCellTemplateProps = null;
    }
  }
  render() {
    const {
      viewContext,
      allDay,
      className,
      isFocused,
      isSelected,
      isFirstGroupCell,
      isLastGroupCell,
      dataCellTemplate,
      children
    } = this.props;
    const {
      view: {
        type: viewType
      },
      crossScrollingEnabled
    } = viewContext;
    const cellSizeHorizontalClass = _index3.renderUtils.getCellSizeHorizontalClass(viewType, crossScrollingEnabled);
    const cellSizeVerticalClass = _index3.renderUtils.getCellSizeVerticalClass(!!allDay);
    const classes = (0, _render_utils.combineClasses)({
      [cellSizeHorizontalClass]: true,
      [cellSizeVerticalClass]: true,
      [_const.DATE_TABLE_CELL_CLASS]: !allDay,
      'dx-state-focused': isSelected,
      'dx-scheduler-focused-cell': isFocused,
      [className ?? '']: true
    });
    const ariaLabel = isSelected ? ADD_APPOINTMENT_LABEL : undefined;
    const dataCellTemplateProps = this.getDataCellTemplateProps();
    return (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
      "className": classes,
      "viewContext": viewContext,
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "ariaLabel": ariaLabel,
      "startDate": _cell.CellBaseDefaultProps.startDate,
      "endDate": _cell.CellBaseDefaultProps.endDate,
      "index": _cell.CellBaseDefaultProps.index,
      children: (0, _inferno.createFragment)(dataCellTemplate ? (0, _inferno.createComponentVNode)(2, _index2.PublicTemplate, {
        "template": dataCellTemplate,
        "templateProps": {
          index: dataCellTemplateProps.index,
          data: dataCellTemplateProps.data
        }
      }) : children, 0)
    });
  }
}
exports.DateTableCellBase = DateTableCellBase;
DateTableCellBase.defaultProps = DateTableCallBaseDefaultProps;