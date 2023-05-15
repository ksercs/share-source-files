"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderPanel = void 0;
var _uiGrid_core = require("../../../../ui/grid_core/ui.grid_core.header_panel");
var _module_core = _interopRequireDefault(require("../module_core"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var HeaderPanel = _uiGrid_core.headerPanelModule.views.headerPanel;
exports.HeaderPanel = HeaderPanel;
_module_core.default.registerModule('headerPanel', _uiGrid_core.headerPanelModule);