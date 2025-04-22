/**
* DevExtreme (cjs/__internal/scheduler/r1/components/base/all_day_panel_cell.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
