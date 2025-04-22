/**
* DevExtreme (esm/__internal/grids/data_grid/module_not_extended/columns_resizing_reordering.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { columnsResizingReorderingModule } from '../../../grids/grid_core/columns_resizing_reordering/m_columns_resizing_reordering';
import gridCore from '../m_core';
export const DraggingHeaderView = columnsResizingReorderingModule.views.draggingHeaderView;
export const DraggingHeaderViewController = columnsResizingReorderingModule.controllers.draggingHeader;
export const ColumnsSeparatorView = columnsResizingReorderingModule.views.columnsSeparatorView;
export const TablePositionViewController = columnsResizingReorderingModule.controllers.tablePosition;
export const ColumnsResizerViewController = columnsResizingReorderingModule.controllers.columnsResizer;
export const TrackerView = columnsResizingReorderingModule.views.trackerView;
gridCore.registerModule('columnsResizingReordering', columnsResizingReorderingModule);
// NOTE: default export for QUnit tests
export default {
  DraggingHeaderView,
  DraggingHeaderViewController,
  ColumnsSeparatorView,
  TablePositionViewController,
  ColumnsResizerViewController,
  TrackerView
};
