import { columnChooserModule } from '../../../../ui/grid_core/ui.grid_core.column_chooser';
import gridCore from '../module_core';
export var ColumnChooserController = columnChooserModule.controllers.columnChooser;
export var ColumnChooserView = columnChooserModule.views.columnChooserView;
gridCore.registerModule('columnChooser', columnChooserModule);