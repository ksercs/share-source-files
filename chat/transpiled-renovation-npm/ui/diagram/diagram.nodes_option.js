"use strict";

exports.default = void 0;
var _diagram = _interopRequireDefault(require("./diagram.items_option"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class NodesOption extends _diagram.default {
  _getKeyExpr() {
    return this._diagramWidget._createOptionGetter('nodes.keyExpr');
  }
  _getItemsExpr() {
    return this._diagramWidget._createOptionGetter('nodes.itemsExpr');
  }
  _getContainerChildrenExpr() {
    return this._diagramWidget._createOptionGetter('nodes.containerChildrenExpr');
  }
}
var _default = exports.default = NodesOption;
module.exports = exports.default;
module.exports.default = exports.default;