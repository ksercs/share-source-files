"use strict";

exports.default = void 0;
var _diagram = _interopRequireDefault(require("./diagram.items_option"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EdgesOption extends _diagram.default {
  _getKeyExpr() {
    return this._diagramWidget._createOptionGetter('edges.keyExpr');
  }
}
var _default = exports.default = EdgesOption;
module.exports = exports.default;
module.exports.default = exports.default;