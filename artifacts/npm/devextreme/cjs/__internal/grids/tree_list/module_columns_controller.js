/**
* DevExtreme (cjs/__internal/grids/tree_list/module_columns_controller.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnsController = void 0;
var _type = require("../../../core/utils/type");
var _uiGrid_core = require("../../../ui/grid_core/ui.grid_core.columns_controller");
var _module_core = _interopRequireDefault(require("./module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ColumnsController = _uiGrid_core.columnsControllerModule.controllers.columns.inherit(function () {
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
        if (!(0, _type.isDefined)(visibleColumns[i].command)) {
          firstDataColumnIndex = visibleColumns[i].index;
          break;
        }
      }
      return firstDataColumnIndex;
    }
  };
}());
exports.ColumnsController = ColumnsController;
_module_core.default.registerModule('columns', {
  defaultOptions: _uiGrid_core.columnsControllerModule.defaultOptions,
  controllers: {
    columns: ColumnsController
  }
});
