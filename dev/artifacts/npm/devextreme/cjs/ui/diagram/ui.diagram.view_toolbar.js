/**
* DevExtreme (cjs/ui/diagram/ui.diagram.view_toolbar.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _uiDiagram = _interopRequireDefault(require("./ui.diagram.toolbar"));
var _diagram = _interopRequireDefault(require("./diagram.commands_manager"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var DiagramViewToolbar = /*#__PURE__*/function (_DiagramToolbar) {
  _inheritsLoose(DiagramViewToolbar, _DiagramToolbar);
  function DiagramViewToolbar() {
    return _DiagramToolbar.apply(this, arguments) || this;
  }
  var _proto = DiagramViewToolbar.prototype;
  _proto._getCommands = function _getCommands() {
    return _diagram.default.getViewToolbarCommands(this.option('commands'), this.option('excludeCommands'));
  };
  return DiagramViewToolbar;
}(_uiDiagram.default);
var _default = DiagramViewToolbar;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
