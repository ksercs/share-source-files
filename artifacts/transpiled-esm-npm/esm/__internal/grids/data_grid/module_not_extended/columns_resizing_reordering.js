import { columnsResizingReorderingModule } from '../../../../ui/grid_core/ui.grid_core.columns_resizing_reordering';
import gridCore from '../module_core';
export var DraggingHeaderView = columnsResizingReorderingModule.views.draggingHeaderView;
export var DraggingHeaderViewController = columnsResizingReorderingModule.controllers.draggingHeader;
export var ColumnsSeparatorView = columnsResizingReorderingModule.views.columnsSeparatorView;
export var TablePositionViewController = columnsResizingReorderingModule.controllers.tablePosition;
export var ColumnsResizerViewController = columnsResizingReorderingModule.controllers.columnsResizer;
export var TrackerView = columnsResizingReorderingModule.views.trackerView;
gridCore.registerModule('columnsResizingReordering', columnsResizingReorderingModule);