/**
* DevExtreme (esm/__internal/grids/tree_list/m_grid_view.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { gridViewModule } from '../../grids/grid_core/views/m_grid_view';
import treeListCore from './m_core';
var ResizingController = gridViewModule.controllers.resizing.inherit({
  _getWidgetAriaLabel() {
    return 'dxTreeList-ariaTreeList';
  },
  _toggleBestFitMode(isBestFit) {
    this.callBase(isBestFit);
    var $rowsTable = this._rowsView.getTableElement();
    $rowsTable.find('.dx-treelist-cell-expandable').toggleClass(this.addWidgetPrefix('best-fit'), isBestFit);
  }
});
treeListCore.registerModule('gridView', {
  defaultOptions: gridViewModule.defaultOptions,
  controllers: _extends(_extends({}, gridViewModule.controllers), {
    resizing: ResizingController
  }),
  views: gridViewModule.views
});
