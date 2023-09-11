/**
* DevExtreme (esm/exporter/jspdf/autotable/export_data_grid.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined, isObject } from '../../../core/utils/type';
import { Export } from './export';
function _getFullOptions(options) {
  if (!(isDefined(options) && isObject(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  if (!(isDefined(options.component) && isObject(options.component) && options.component.NAME === 'dxDataGrid')) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  if (!isDefined(options.selectedRowsOnly)) {
    options.selectedRowsOnly = false;
  }
  return Export.getFullOptions(options);
}
function exportDataGrid(options) {
  return Export.export(_getFullOptions(options));
}
export { exportDataGrid };
