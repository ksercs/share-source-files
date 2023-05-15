"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataController = void 0;
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _uiGrid_core = require("../../../ui/grid_core/ui.grid_core.data_controller");
var _module_core = _interopRequireDefault(require("./module_core"));
var _module_data_source_adapter = _interopRequireDefault(require("./module_data_source_adapter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _a;
var DataController = ((_a = _uiGrid_core.dataControllerModule.controllers) === null || _a === void 0 ? void 0 : _a.data).inherit(function () {
  return {
    _getDataSourceAdapter: function _getDataSourceAdapter() {
      return _module_data_source_adapter.default;
    },
    _getSpecificDataSourceOption: function _getSpecificDataSourceOption() {
      var dataSource = this.option('dataSource');
      if (dataSource && !Array.isArray(dataSource) && this.option('keyExpr')) {
        _ui.default.log('W1011');
      }
      return this.callBase();
    }
  };
}());
exports.DataController = DataController;
_module_core.default.registerModule('data', {
  defaultOptions: _uiGrid_core.dataControllerModule.defaultOptions,
  controllers: {
    data: DataController
  }
});