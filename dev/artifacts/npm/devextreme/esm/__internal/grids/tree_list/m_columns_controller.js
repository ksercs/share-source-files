/**
* DevExtreme (esm/__internal/grids/tree_list/m_columns_controller.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../core/utils/type';
import { columnsControllerModule } from '../../grids/grid_core/columns_controller/m_columns_controller';
import treeListCore from './m_core';
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
