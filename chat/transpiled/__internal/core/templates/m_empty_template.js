"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyTemplate = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _template_base = require("../../../core/templates/template_base");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EmptyTemplate extends _template_base.TemplateBase {
  _renderCore() {
    return (0, _renderer.default)();
  }
}
exports.EmptyTemplate = EmptyTemplate;