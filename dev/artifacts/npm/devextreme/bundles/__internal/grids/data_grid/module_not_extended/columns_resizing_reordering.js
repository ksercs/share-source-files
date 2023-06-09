/**
* DevExtreme (bundles/__internal/grids/data_grid/module_not_extended/columns_resizing_reordering.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerView = exports.ColumnsResizerViewController = exports.TablePositionViewController = exports.ColumnsSeparatorView = exports.DraggingHeaderViewController = exports.DraggingHeaderView = void 0;
var ui_grid_core_columns_resizing_reordering_1 = require("../../../../ui/grid_core/ui.grid_core.columns_resizing_reordering");
var module_core_1 = __importDefault(require("../module_core"));
exports.DraggingHeaderView = ui_grid_core_columns_resizing_reordering_1.columnsResizingReorderingModule.views.draggingHeaderView;
exports.DraggingHeaderViewController = ui_grid_core_columns_resizing_reordering_1.columnsResizingReorderingModule.controllers.draggingHeader;
exports.ColumnsSeparatorView = ui_grid_core_columns_resizing_reordering_1.columnsResizingReorderingModule.views.columnsSeparatorView;
exports.TablePositionViewController = ui_grid_core_columns_resizing_reordering_1.columnsResizingReorderingModule.controllers.tablePosition;
exports.ColumnsResizerViewController = ui_grid_core_columns_resizing_reordering_1.columnsResizingReorderingModule.controllers.columnsResizer;
exports.TrackerView = ui_grid_core_columns_resizing_reordering_1.columnsResizingReorderingModule.views.trackerView;
module_core_1.default.registerModule('columnsResizingReordering', ui_grid_core_columns_resizing_reordering_1.columnsResizingReorderingModule);
