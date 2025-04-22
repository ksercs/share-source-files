"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowsView = void 0;
var _m_rows_view = require("../../../grids/grid_core/views/m_rows_view");
var _m_core = _interopRequireDefault(require("../m_core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RowsView = exports.RowsView = _m_rows_view.rowsModule.views.rowsView;
_m_core.default.registerModule('rows', _m_rows_view.rowsModule);