"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTableMonth = void 0;
var _inferno = require("inferno");
var _index = require("../../../../core/r1/runtime/inferno/index");
var _date_table = require("../base/date_table");
var _date_table_month_cell = require("./date_table_month_cell");
const _excluded = ["viewData", "viewContext", "addDateTableClass", "addVerticalSizesClassToRows", "dataCellTemplate", "groupOrientation", "tableRef", "width"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
class DateTableMonth extends _index.InfernoWrapperComponent {
  createEffects() {
    return [(0, _index.createReRenderEffect)()];
  }
  render() {
    const _this$props = this.props,
      {
        viewData,
        viewContext,
        addDateTableClass,
        addVerticalSizesClassToRows,
        dataCellTemplate,
        groupOrientation,
        tableRef,
        width
      } = _this$props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _date_table.DateTable, _extends({}, restProps, {
      "viewData": viewData,
      "viewContext": viewContext,
      "groupOrientation": groupOrientation,
      "addDateTableClass": addDateTableClass,
      "dataCellTemplate": dataCellTemplate,
      "cellTemplate": _date_table_month_cell.DateTableMonthCell,
      "tableRef": tableRef,
      "addVerticalSizesClassToRows": addVerticalSizesClassToRows,
      "width": width
    })));
  }
}
exports.DateTableMonth = DateTableMonth;
DateTableMonth.defaultProps = _date_table.DateTableDefaultProps;