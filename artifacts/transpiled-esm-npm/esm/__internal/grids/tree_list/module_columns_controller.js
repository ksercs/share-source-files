import { isDefined } from '../../../core/utils/type';
import { columnsControllerModule } from '../../../ui/grid_core/ui.grid_core.columns_controller';
import treeListCore from './module_core';
export var ColumnsController = columnsControllerModule.controllers.columns.inherit(function () {
  return {
    _getFirstItems(dataSourceAdapter) {
      return this.callBase(dataSourceAdapter).map(node => node.data);
    },
    getFirstDataColumnIndex() {
      var visibleColumns = this.getVisibleColumns();
      var visibleColumnsLength = visibleColumns.length;
      var firstDataColumnIndex = 0;
      for (var i = 0; i <= visibleColumnsLength - 1; i++) {
        if (!isDefined(visibleColumns[i].command)) {
          firstDataColumnIndex = visibleColumns[i].index;
          break;
        }
      }
      return firstDataColumnIndex;
    }
  };
}());
treeListCore.registerModule('columns', {
  defaultOptions: columnsControllerModule.defaultOptions,
  controllers: {
    columns: ColumnsController
  }
});