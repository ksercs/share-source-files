import { columnChooserModule } from '../../../grids/grid_core/column_chooser/m_column_chooser';
import gridCore from '../m_core';
export var ColumnChooserController = columnChooserModule.controllers.columnChooser;
export var ColumnChooserView = columnChooserModule.views.columnChooserView;
gridCore.registerModule('columnChooser', columnChooserModule);