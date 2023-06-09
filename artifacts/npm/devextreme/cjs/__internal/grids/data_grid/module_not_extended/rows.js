/**
* DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/rows.js)
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
exports.RowsView = void 0;
var _uiGrid_core = require("../../../../ui/grid_core/ui.grid_core.rows");
var _module_core = _interopRequireDefault(require("../module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var RowsView = _uiGrid_core.rowsModule.views.rowsView;
exports.RowsView = RowsView;
_module_core.default.registerModule('rows', _uiGrid_core.rowsModule);
