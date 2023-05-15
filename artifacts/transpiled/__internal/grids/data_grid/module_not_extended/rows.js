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