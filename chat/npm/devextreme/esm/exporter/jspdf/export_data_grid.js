/**
* DevExtreme (esm/exporter/jspdf/export_data_grid.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined, isObject } from '../../core/utils/type';
import errors from '../../core/errors';
import { Export } from './common/export';
const HOW_TO_MIGRATE_ARTICLE = 'https://supportcenter.devexpress.com/ticket/details/t1077554';
function _getFullOptions(options) {
  if (!(isDefined(options) && isObject(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  if (!(isDefined(options.component) && isObject(options.component) && options.component.NAME === 'dxDataGrid')) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  if (!(isDefined(options.jsPDFDocument) && isObject(options.jsPDFDocument))) {
    throw Error('The "jsPDFDocument" field must contain a jsPDF instance.');
  }
  if (isDefined(options.autoTableOptions)) {
    errors.log('W0001', 'Export', 'autoTableOptions', '22.1', `You can migrate from exporting to PDF with the AutoTable plugin to a new export system. See the following topic for more information: ${HOW_TO_MIGRATE_ARTICLE}`);
  }
  return Export.getFullOptions(options);
}
function exportDataGrid(options) {
  return Export.export(_getFullOptions(options));
}
export { exportDataGrid };
