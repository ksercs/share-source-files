/**
* DevExtreme (esm/__internal/grids/data_grid/module_not_extended/columns_resizing_reordering.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { columnsResizingReorderingModule } from '../../../../ui/grid_core/ui.grid_core.columns_resizing_reordering';
import gridCore from '../module_core';
export const DraggingHeaderView = columnsResizingReorderingModule.views.draggingHeaderView;
export const DraggingHeaderViewController = columnsResizingReorderingModule.controllers.draggingHeader;
export const ColumnsSeparatorView = columnsResizingReorderingModule.views.columnsSeparatorView;
export const TablePositionViewController = columnsResizingReorderingModule.controllers.tablePosition;
export const ColumnsResizerViewController = columnsResizingReorderingModule.controllers.columnsResizer;
export const TrackerView = columnsResizingReorderingModule.views.trackerView;
gridCore.registerModule('columnsResizingReordering', columnsResizingReorderingModule);
