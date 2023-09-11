/**
* DevExtreme (bundles/__internal/grids/data_grid/m_data_controller.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataController = void 0;
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _m_data_controller = require("../../grids/grid_core/data_controller/m_data_controller");
var _m_core = _interopRequireDefault(require("./m_core"));
var _m_data_source_adapter = _interopRequireDefault(require("./m_data_source_adapter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _a, _b;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
var DataController = (_b = (_a = _m_data_controller.dataControllerModule.controllers) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.inherit(function () {
  return {
    _getDataSourceAdapter() {
      return _m_data_source_adapter.default;
    },
    _getSpecificDataSourceOption() {
      var dataSource = this.option('dataSource');
      if (dataSource && !Array.isArray(dataSource) && this.option('keyExpr')) {
        _ui.default.log('W1011');
      }
      return this.callBase();
    }
  };
}());
exports.DataController = DataController;
_m_core.default.registerModule('data', {
  defaultOptions: _m_data_controller.dataControllerModule.defaultOptions,
  controllers: {
    data: DataController
  }
});
