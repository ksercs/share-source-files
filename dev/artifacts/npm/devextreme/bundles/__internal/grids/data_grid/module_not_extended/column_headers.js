/**
* DevExtreme (bundles/__internal/grids/data_grid/module_not_extended/column_headers.js)
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
exports.ColumnHeadersView = void 0;
var _m_column_headers = require("../../../grids/grid_core/column_headers/m_column_headers");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ColumnHeadersView = _m_column_headers.columnHeadersModule.views.columnHeadersView;
exports.ColumnHeadersView = ColumnHeadersView;
_m_core.default.registerModule('columnHeaders', _m_column_headers.columnHeadersModule);
