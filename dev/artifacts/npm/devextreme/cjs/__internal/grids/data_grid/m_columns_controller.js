/**
* DevExtreme (cjs/__internal/grids/data_grid/m_columns_controller.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _extend = require("../../../core/utils/extend");
var _m_columns_controller = require("../../grids/grid_core/columns_controller/m_columns_controller");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_m_core.default.registerModule('columns', {
  defaultOptions() {
    return (0, _extend.extend)(true, {}, _m_columns_controller.columnsControllerModule.defaultOptions(), {
      commonColumnSettings: {
        allowExporting: true
      }
    });
  },
  controllers: _m_columns_controller.columnsControllerModule.controllers
});
