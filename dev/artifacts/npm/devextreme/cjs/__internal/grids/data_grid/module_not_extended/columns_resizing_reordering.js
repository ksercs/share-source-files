/**
* DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/columns_resizing_reordering.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackerView = exports.TablePositionViewController = exports.DraggingHeaderViewController = exports.DraggingHeaderView = exports.ColumnsSeparatorView = exports.ColumnsResizerViewController = void 0;
var _m_columns_resizing_reordering = require("../../../grids/grid_core/columns_resizing_reordering/m_columns_resizing_reordering");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DraggingHeaderView = _m_columns_resizing_reordering.columnsResizingReorderingModule.views.draggingHeaderView;
exports.DraggingHeaderView = DraggingHeaderView;
var DraggingHeaderViewController = _m_columns_resizing_reordering.columnsResizingReorderingModule.controllers.draggingHeader;
exports.DraggingHeaderViewController = DraggingHeaderViewController;
var ColumnsSeparatorView = _m_columns_resizing_reordering.columnsResizingReorderingModule.views.columnsSeparatorView;
exports.ColumnsSeparatorView = ColumnsSeparatorView;
var TablePositionViewController = _m_columns_resizing_reordering.columnsResizingReorderingModule.controllers.tablePosition;
exports.TablePositionViewController = TablePositionViewController;
var ColumnsResizerViewController = _m_columns_resizing_reordering.columnsResizingReorderingModule.controllers.columnsResizer;
exports.ColumnsResizerViewController = ColumnsResizerViewController;
var TrackerView = _m_columns_resizing_reordering.columnsResizingReorderingModule.views.trackerView;
exports.TrackerView = TrackerView;
_m_core.default.registerModule('columnsResizingReordering', _m_columns_resizing_reordering.columnsResizingReorderingModule);
