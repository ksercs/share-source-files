/**
* DevExtreme (cjs/__internal/grids/grid_core/module_export.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareItems = void 0;
var extend_1 = require("../../../core/utils/extend");
function prepareItems(items, emptyCell) {
    var defaultSetter = function (value) { return (!value ? 1 : value); };
    var cloneItem = function (item) { return extend_1.extend({}, item, emptyCell); };
    var resultItems = [];
    var cols = (items[0] || []).reduce(function (sum, item) { return sum + defaultSetter(item.colspan); }, 0);
    var getItem = (function (items) {
        var rowIndex = 0;
        var cellIndex = 0;
        return function () {
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
    var addItem = function (rowIndex, cellIndex, item) {
        var row = resultItems[rowIndex] = resultItems[rowIndex] || [];
        row[cellIndex] = item;
        if (item.colspan > 1 || item.rowspan > 1) {
            var clone = cloneItem(item);
            for (var c = 1; c < item.colspan; c++) {
                addItem(rowIndex, cellIndex + c, clone);
            }
            for (var r = 1; r < item.rowspan; r++) {
                for (var c = 0; c < item.colspan; c++) {
                    addItem(rowIndex + r, cellIndex + c, clone);
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
exports.prepareItems = prepareItems;
