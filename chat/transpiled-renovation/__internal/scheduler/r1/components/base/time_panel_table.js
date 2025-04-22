"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePanelTableDefaultProps = exports.TimePanelTable = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _all_day_panel_title = require("./all_day_panel_title");
var _cell = require("./cell");
var _row = require("./row");
var _table = require("./table");
var _time_panel_cell = require("./time_panel_cell");
const _excluded = ["timePanelData", "viewContext", "tableRef", "timeCellTemplate"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
const TimePanelTableDefaultProps = exports.TimePanelTableDefaultProps = {
  timePanelData: {
    groupedData: [],
    leftVirtualCellCount: 0,
    rightVirtualCellCount: 0,
    topVirtualRowCount: 0,
    bottomVirtualRowCount: 0
  }
};
class TimePanelTable extends _index.InfernoWrapperComponent {
  createEffects() {
    return [(0, _index.createReRenderEffect)()];
  }
  render() {
    const _this$props = this.props,
      {
        timePanelData,
        viewContext,
        tableRef,
        timeCellTemplate
      } = _this$props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    const {
      topVirtualRowHeight,
      bottomVirtualRowHeight
    } = timePanelData;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _table.Table, _extends({}, restProps, {
      "className": "dx-scheduler-time-panel",
      "topVirtualRowHeight": topVirtualRowHeight ?? 0,
      "bottomVirtualRowHeight": bottomVirtualRowHeight ?? 0,
      "virtualCellsCount": 1,
      "tableRef": tableRef,
      children: timePanelData.groupedData.map(_ref => {
        let {
          dateTable,
          groupIndex,
          isGroupedAllDayPanel,
          key: fragmentKey
        } = _ref;
        return (0, _inferno.createFragment)([isGroupedAllDayPanel && (0, _inferno.createComponentVNode)(2, _row.Row, {
          "leftVirtualCellWidth": _row.RowDefaultProps.leftVirtualCellWidth,
          "rightVirtualCellWidth": _row.RowDefaultProps.rightVirtualCellWidth,
          children: (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
            "className": "dx-scheduler-time-panel-title-cell",
            "viewContext": viewContext,
            "startDate": _cell.CellBaseDefaultProps.startDate,
            "endDate": _cell.CellBaseDefaultProps.endDate,
            "index": _cell.CellBaseDefaultProps.index,
            children: (0, _inferno.createComponentVNode)(2, _all_day_panel_title.AllDayPanelTitle)
          })
        }), dateTable.map(_ref2 => {
          let {
            groups,
            highlighted,
            index: cellIndex,
            isFirstGroupCell,
            isLastGroupCell,
            key,
            startDate,
            text
          } = _ref2;
          return (0, _inferno.createComponentVNode)(2, _row.Row, {
            "className": "dx-scheduler-time-panel-row",
            "leftVirtualCellWidth": _row.RowDefaultProps.leftVirtualCellWidth,
            "rightVirtualCellWidth": _row.RowDefaultProps.rightVirtualCellWidth,
            children: (0, _inferno.createComponentVNode)(2, _time_panel_cell.TimePanelCell, {
              "viewContext": viewContext,
              "startDate": startDate,
              "endDate": _cell.CellBaseDefaultProps.endDate,
              "text": text,
              "groups": groups,
              "groupIndex": groupIndex,
              "isFirstGroupCell": isFirstGroupCell,
              "isLastGroupCell": isLastGroupCell,
              "index": cellIndex,
              "timeCellTemplate": timeCellTemplate,
              "highlighted": highlighted
            })
          }, key);
        })], 0, fragmentKey);
      })
    })));
  }
}
exports.TimePanelTable = TimePanelTable;
TimePanelTable.defaultProps = TimePanelTableDefaultProps;