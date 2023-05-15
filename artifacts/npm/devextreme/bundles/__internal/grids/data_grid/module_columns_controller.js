/**
* DevExtreme (bundles/__internal/grids/data_grid/module_columns_controller.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _uiGrid_core = require("../../../ui/grid_core/ui.grid_core.columns_controller");
var _extend = require("../../../core/utils/extend");
var _module_core = _interopRequireDefault(require("./module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_module_core.default.registerModule('columns', {
  defaultOptions: function defaultOptions() {
    return (0, _extend.extend)(true, {}, _uiGrid_core.columnsControllerModule.defaultOptions(), {
      commonColumnSettings: {
        allowExporting: true
      }
    });
  },
  controllers: _uiGrid_core.columnsControllerModule.controllers
});
