/**
* DevExtreme (cjs/__internal/grids/data_grid/module_not_extended/column_chooser.js)
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
exports.ColumnChooserView = exports.ColumnChooserController = void 0;
var _m_column_chooser = require("../../../grids/grid_core/column_chooser/m_column_chooser");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ColumnChooserController = _m_column_chooser.columnChooserModule.controllers.columnChooser;
exports.ColumnChooserController = ColumnChooserController;
var ColumnChooserView = _m_column_chooser.columnChooserModule.views.columnChooserView;
exports.ColumnChooserView = ColumnChooserView;
_m_core.default.registerModule('columnChooser', _m_column_chooser.columnChooserModule);
