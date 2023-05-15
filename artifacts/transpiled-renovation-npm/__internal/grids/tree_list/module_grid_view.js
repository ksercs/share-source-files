"use strict";

var _uiGrid_core = require("../../../ui/grid_core/ui.grid_core.grid_view");
var _module_core = _interopRequireDefault(require("./module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var GridView = _uiGrid_core.gridViewModule.views.gridView.inherit(function () {
  return {
    _getWidgetAriaLabel: function _getWidgetAriaLabel() {
      return 'dxTreeList-ariaTreeList';
    },
    _getTableRoleName: function _getTableRoleName() {
      return 'treegrid';
    }
  };
}());
_module_core.default.registerModule('gridView', {
  defaultOptions: _uiGrid_core.gridViewModule.defaultOptions,
  controllers: _uiGrid_core.gridViewModule.controllers,
  views: {
    gridView: GridView
  },
  extenders: {
    controllers: {
      resizing: {
        _toggleBestFitMode: function _toggleBestFitMode(isBestFit) {
          this.callBase(isBestFit);
          var $rowsTable = this._rowsView.getTableElement();
          $rowsTable.find('.dx-treelist-cell-expandable').toggleClass(this.addWidgetPrefix('best-fit'), isBestFit);
        }
      }
    }
  }
});