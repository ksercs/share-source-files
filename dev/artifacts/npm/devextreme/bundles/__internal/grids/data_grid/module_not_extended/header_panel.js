/**
* DevExtreme (bundles/__internal/grids/data_grid/module_not_extended/header_panel.js)
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
exports.HeaderPanel = void 0;
var _m_header_panel = require("../../../grids/grid_core/header_panel/m_header_panel");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var HeaderPanel = _m_header_panel.headerPanelModule.views.headerPanel;
exports.HeaderPanel = HeaderPanel;
_m_core.default.registerModule('headerPanel', _m_header_panel.headerPanelModule);
