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