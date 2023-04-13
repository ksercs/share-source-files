/**
* DevExtreme (esm/ui/tree_list/ui.tree_list.columns_controller.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../core/utils/type';
import treeListCore from './ui.tree_list.core';
import { columnsControllerModule } from '../grid_core/ui.grid_core.columns_controller';
export var ColumnsController = columnsControllerModule.controllers.columns.inherit(function () {
  return {
    _getFirstItems: function _getFirstItems(dataSourceAdapter) {
      return this.callBase(dataSourceAdapter).map(function (node) {
        return node.data;
      });
    },
    getFirstDataColumnIndex: function getFirstDataColumnIndex() {
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
