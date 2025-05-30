"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnsController = void 0;
var _type = require("../../../core/utils/type");
var _m_columns_controller = require("../../grids/grid_core/columns_controller/m_columns_controller");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ColumnsController = _m_columns_controller.columnsControllerModule.controllers.columns.inherit(function () {
  return {
    _getFirstItems(dataSourceAdapter) {
      return this.callBase(dataSourceAdapter).map(function (node) {
        return node.data;
      });
    },
    getFirstDataColumnIndex() {
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
_m_core.default.registerModule('columns', {
  defaultOptions: _m_columns_controller.columnsControllerModule.defaultOptions,
  controllers: {
    columns: ColumnsController
  }
});