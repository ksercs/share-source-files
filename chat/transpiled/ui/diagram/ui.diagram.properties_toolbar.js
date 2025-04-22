"use strict";

exports.default = void 0;
var _uiDiagram = _interopRequireDefault(require("./ui.diagram.toolbar"));
var _diagram = _interopRequireDefault(require("./diagram.commands_manager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DiagramPropertiesToolbar extends _uiDiagram.default {
  _getCommands() {
    return _diagram.default.getPropertiesToolbarCommands();
  }
}
var _default = exports.default = DiagramPropertiesToolbar;
module.exports = exports.default;
module.exports.default = exports.default;