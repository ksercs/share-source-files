"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnChooserView = exports.ColumnChooserController = void 0;
var _uiGrid_core = require("../../../../ui/grid_core/ui.grid_core.column_chooser");
var _module_core = _interopRequireDefault(require("../module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ColumnChooserController = _uiGrid_core.columnChooserModule.controllers.columnChooser;
exports.ColumnChooserController = ColumnChooserController;
var ColumnChooserView = _uiGrid_core.columnChooserModule.views.columnChooserView;
exports.ColumnChooserView = ColumnChooserView;
_module_core.default.registerModule('columnChooser', _uiGrid_core.columnChooserModule);