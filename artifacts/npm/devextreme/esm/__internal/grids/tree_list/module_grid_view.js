/**
* DevExtreme (esm/__internal/grids/tree_list/module_grid_view.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { gridViewModule } from '../../../ui/grid_core/ui.grid_core.grid_view';
import treeListCore from './module_core';
var GridView = gridViewModule.views.gridView.inherit(function () {
  return {
    _getWidgetAriaLabel() {
      return 'dxTreeList-ariaTreeList';
    },
    _getTableRoleName() {
      return 'treegrid';
    }
  };
}());
treeListCore.registerModule('gridView', {
  defaultOptions: gridViewModule.defaultOptions,
  controllers: gridViewModule.controllers,
  views: {
    gridView: GridView
  },
  extenders: {
    controllers: {
      resizing: {
        _toggleBestFitMode(isBestFit) {
          this.callBase(isBestFit);
          var $rowsTable = this._rowsView.getTableElement();
          $rowsTable.find('.dx-treelist-cell-expandable').toggleClass(this.addWidgetPrefix('best-fit'), isBestFit);
        }
      }
    }
  }
});
