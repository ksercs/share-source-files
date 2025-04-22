/**
* DevExtreme (esm/exporter/jspdf/export_gantt.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
function exportGantt(options) {
  const component = options.component;
  return component === null || component === void 0 ? void 0 : component.exportToPdf(options);
}
export { exportGantt };
