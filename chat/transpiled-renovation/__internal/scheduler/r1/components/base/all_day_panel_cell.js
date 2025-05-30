"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllDayPanelCell = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _const = require("../const");
var _date_table_cell_base = require("./date_table_cell_base");
class AllDayPanelCell extends _index.BaseInfernoComponent {
  render() {
    const {
      className,
      viewContext,
      dataCellTemplate,
      endDate,
      groupIndex,
      groups,
      index,
      isFirstGroupCell,
      isFocused,
      isLastGroupCell,
      isSelected,
      startDate
    } = this.props;
    return (0, _inferno.createComponentVNode)(2, _date_table_cell_base.DateTableCellBase, {
      "className": `${_const.ALL_DAY_PANEL_CELL_CLASS} ${className}`,
      "viewContext": viewContext,
      "startDate": startDate,
      "endDate": endDate,
      "groups": groups,
      "groupIndex": groupIndex,
      "allDay": true,
      "isFirstGroupCell": isFirstGroupCell,
      "isLastGroupCell": isLastGroupCell,
      "index": index,
      "dataCellTemplate": dataCellTemplate,
      "isSelected": isSelected,
      "isFocused": isFocused
    });
  }
}
exports.AllDayPanelCell = AllDayPanelCell;
AllDayPanelCell.defaultProps = _date_table_cell_base.DateTableCallBaseDefaultProps;