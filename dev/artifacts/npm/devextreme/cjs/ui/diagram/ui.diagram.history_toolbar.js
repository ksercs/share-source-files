/**
* DevExtreme (cjs/ui/diagram/ui.diagram.history_toolbar.js)
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
var DiagramHistoryToolbar = /*#__PURE__*/function (_DiagramToolbar) {
  _inheritsLoose(DiagramHistoryToolbar, _DiagramToolbar);
  function DiagramHistoryToolbar() {
    return _DiagramToolbar.apply(this, arguments) || this;
  }
  var _proto = DiagramHistoryToolbar.prototype;
  _proto._getCommands = function _getCommands() {
    return _diagram.default.getHistoryToolbarCommands(this.option('commands'), this._getExcludeCommands());
  };
  _proto._getExcludeCommands = function _getExcludeCommands() {
    var commands = [].concat(this.option('excludeCommands'));
    if (!this.option('isMobileView')) {
      commands.push(_diagram.default.SHOW_TOOLBOX_COMMAND_NAME);
    }
    return commands;
  };
  return DiagramHistoryToolbar;
}(_uiDiagram.default);
var _default = DiagramHistoryToolbar;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
