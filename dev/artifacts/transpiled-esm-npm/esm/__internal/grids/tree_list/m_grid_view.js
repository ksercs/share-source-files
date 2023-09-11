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