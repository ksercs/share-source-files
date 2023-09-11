/**
* DevExtreme (cjs/ui/diagram/diagram.nodes_option.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _diagram = _interopRequireDefault(require("./diagram.items_option"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var NodesOption = /*#__PURE__*/function (_ItemsOption) {
  _inheritsLoose(NodesOption, _ItemsOption);
  function NodesOption() {
    return _ItemsOption.apply(this, arguments) || this;
  }
  var _proto = NodesOption.prototype;
  _proto._getKeyExpr = function _getKeyExpr() {
    return this._diagramWidget._createOptionGetter('nodes.keyExpr');
  };
  _proto._getItemsExpr = function _getItemsExpr() {
    return this._diagramWidget._createOptionGetter('nodes.itemsExpr');
  };
  _proto._getContainerChildrenExpr = function _getContainerChildrenExpr() {
    return this._diagramWidget._createOptionGetter('nodes.containerChildrenExpr');
  };
  return NodesOption;
}(_diagram.default);
var _default = NodesOption;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
