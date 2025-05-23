/**
* DevExtreme (esm/__internal/grids/grid_core/m_export.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
function prepareItems(items, emptyCell) {
  var defaultSetter = value => !value ? 1 : value;
  var cloneItem = item => extend({}, item, emptyCell);
  var resultItems = [];
  var cols = (items[0] || []).reduce((sum, item) => sum + defaultSetter(item.colspan), 0);
  var getItem = (items => {
    var rowIndex = 0;
    var cellIndex = 0;
    return () => {
      var row = items[rowIndex] || [];
      var item = row[cellIndex++];
      if (cellIndex >= row.length) {
        rowIndex++;
        cellIndex = 0;
      }
      if (item) {
        item.colspan = defaultSetter(item.colspan);
        item.rowspan = defaultSetter(item.rowspan);
      }
      return item;
    };
  })(items);
  var addItem = (rowIndex, cellIndex, item) => {
    var row = resultItems[rowIndex] = resultItems[rowIndex] || [];
    row[cellIndex] = item;
    if (item.colspan > 1 || item.rowspan > 1) {
      var clone = cloneItem(item);
      for (var c = 1; c < item.colspan; c++) {
        addItem(rowIndex, cellIndex + c, clone);
      }
      for (var r = 1; r < item.rowspan; r++) {
        for (var _c = 0; _c < item.colspan; _c++) {
          addItem(rowIndex + r, cellIndex + _c, clone);
        }
      }
    }
  };
  var item = getItem();
  var rowIndex = 0;
  while (item) {
    for (var cellIndex = 0; cellIndex < cols; cellIndex++) {
      if (!item) {
        break;
      }
      if (resultItems[rowIndex] && resultItems[rowIndex][cellIndex]) {
        continue;
      }
      addItem(rowIndex, cellIndex, item);
      cellIndex += item.colspan - 1;
      item = getItem();
    }
    rowIndex++;
  }
  return resultItems;
}
export { prepareItems };
