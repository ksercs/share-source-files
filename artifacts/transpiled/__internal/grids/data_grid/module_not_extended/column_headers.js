"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnHeadersView = void 0;
var _uiGrid_core = require("../../../../ui/grid_core/ui.grid_core.column_headers");
var _module_core = _interopRequireDefault(require("../module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ColumnHeadersView = _uiGrid_core.columnHeadersModule.views.columnHeadersView;
exports.ColumnHeadersView = ColumnHeadersView;
_module_core.default.registerModule('columnHeaders', _uiGrid_core.columnHeadersModule);