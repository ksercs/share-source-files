/**
* DevExtreme (cjs/__internal/scheduler/r1/components/wrappers/date_table_month.js)
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
exports.DateTableMonthComponent = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../../core/component_registrator"));
var _date_table_month = require("../month/date_table_month");
var _date_table = require("./date_table");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DateTableMonthComponent extends _date_table.DateTableComponent {
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ['cellTemplate', 'dataCellTemplate'],
      props: ['viewData', 'viewContext', 'cellTemplate', 'groupOrientation', 'leftVirtualCellWidth', 'rightVirtualCellWidth', 'topVirtualRowHeight', 'bottomVirtualRowHeight', 'addDateTableClass', 'addVerticalSizesClassToRows', 'width', 'dataCellTemplate']
    };
  }
  /* eslint-enable @typescript-eslint/explicit-module-boundary-types */
  /* eslint-enable @typescript-eslint/explicit-function-return-type */
  get _viewComponent() {
    return _date_table_month.DateTableMonth;
  }
}
exports.DateTableMonthComponent = DateTableMonthComponent;
(0, _component_registrator.default)('dxMonthDateTableLayout', DateTableMonthComponent);
