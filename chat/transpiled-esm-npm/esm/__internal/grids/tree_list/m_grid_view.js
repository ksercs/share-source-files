import _extends from "@babel/runtime/helpers/esm/extends";
import { gridViewModule, ResizingController } from '../../grids/grid_core/views/m_grid_view';
import treeListCore from './m_core';
const TREELIST_EXPANDABLE_INSTRUCTION = 'dxTreeList-ariaExpandableInstruction';
class TreeListResizingController extends ResizingController {
  constructor() {
    super(...arguments);
    this._expandableWidgetAriaId = TREELIST_EXPANDABLE_INSTRUCTION;
  }
  _getWidgetAriaLabel() {
    return 'dxTreeList-ariaTreeList';
  }
  _toggleBestFitMode(isBestFit) {
    super._toggleBestFitMode(isBestFit);
    const $rowsTable = this._rowsView.getTableElement();
    $rowsTable.find('.dx-treelist-cell-expandable').toggleClass(this.addWidgetPrefix('best-fit'), isBestFit);
  }
}
treeListCore.registerModule('gridView', {
  defaultOptions: gridViewModule.defaultOptions,
  controllers: _extends({}, gridViewModule.controllers, {
    resizing: TreeListResizingController
  }),
  views: gridViewModule.views
});