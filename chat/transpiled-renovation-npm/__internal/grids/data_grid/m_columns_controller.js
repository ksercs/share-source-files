"use strict";

var _extend = require("../../../core/utils/extend");
var _m_columns_controller = require("../../grids/grid_core/columns_controller/m_columns_controller");
var _m_core = _interopRequireDefault(require("./m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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