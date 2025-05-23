/**
* DevExtreme (cjs/ui/diagram/diagram.options_update.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _diagram = _interopRequireDefault(require("./diagram.bar"));
var _diagram2 = require("./diagram.importer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var DiagramOptionsUpdateBar = /*#__PURE__*/function (_DiagramBar) {
  _inheritsLoose(DiagramOptionsUpdateBar, _DiagramBar);
  function DiagramOptionsUpdateBar(owner) {
    var _this;
    _this = _DiagramBar.call(this, owner) || this;
    var _getDiagram = (0, _diagram2.getDiagram)(),
      DiagramCommand = _getDiagram.DiagramCommand;
    _this.commandOptions = {};
    _this.commandOptions[DiagramCommand.Fullscreen] = 'fullScreen';
    _this.commandOptions[DiagramCommand.ZoomLevel] = function (value) {
      if (typeof this._getOption('zoomLevel') === 'object') {
        this._setOption('zoomLevel.value', value);
      } else {
        this._setOption('zoomLevel', value);
      }
    };
    _this.commandOptions[DiagramCommand.SwitchAutoZoom] = function (value) {
      var _getDiagram2 = (0, _diagram2.getDiagram)(),
        AutoZoomMode = _getDiagram2.AutoZoomMode;
      switch (value) {
        case AutoZoomMode.FitContent:
          this._setOption('autoZoomMode', 'fitContent');
          break;
        case AutoZoomMode.FitToWidth:
          this._setOption('autoZoomMode', 'fitWidth');
          break;
        case AutoZoomMode.Disabled:
          this._setOption('autoZoomMode', 'disabled');
          break;
      }
    };
    _this.commandOptions[DiagramCommand.ToggleSimpleView] = 'simpleView';
    _this.commandOptions[DiagramCommand.ShowGrid] = 'showGrid';
    _this.commandOptions[DiagramCommand.SnapToGrid] = 'snapToGrid';
    _this.commandOptions[DiagramCommand.GridSize] = function (value) {
      if (typeof this._getOption('gridSize') === 'object') {
        this._setOption('gridSize.value', value);
      } else {
        this._setOption('gridSize', value);
      }
    };
    _this.commandOptions[DiagramCommand.ViewUnits] = 'viewUnits';
    _this.commandOptions[DiagramCommand.PageSize] = function (value) {
      var pageSize = this._getOption('pageSize');
      if (pageSize === undefined || pageSize.width !== value.width || pageSize.height !== value.height) {
        this._setOption('pageSize', value);
      }
    };
    _this.commandOptions[DiagramCommand.PageLandscape] = function (value) {
      this._setOption('pageOrientation', value ? 'landscape' : 'portrait');
    };
    _this.commandOptions[DiagramCommand.ViewUnits] = function (value) {
      var _getDiagram3 = (0, _diagram2.getDiagram)(),
        DiagramUnit = _getDiagram3.DiagramUnit;
      switch (value) {
        case DiagramUnit.In:
          this._setOption('viewUnits', 'in');
          break;
        case DiagramUnit.Cm:
          this._setOption('viewUnits', 'cm');
          break;
        case DiagramUnit.Px:
          this._setOption('viewUnits', 'px');
          break;
      }
    };
    _this.commandOptions[DiagramCommand.PageColor] = 'pageColor';
    _this._updateLock = 0;
    return _this;
  }
  var _proto = DiagramOptionsUpdateBar.prototype;
  _proto.getCommandKeys = function getCommandKeys() {
    return Object.keys(this.commandOptions).map(function (key) {
      return parseInt(key);
    });
  };
  _proto.setItemValue = function setItemValue(key, value) {
    if (this.isUpdateLocked()) return;
    this.beginUpdate();
    try {
      if (typeof this.commandOptions[key] === 'function') {
        this.commandOptions[key].call(this, value);
      } else {
        this._setOption(this.commandOptions[key], value);
      }
    } finally {
      this.endUpdate();
    }
  };
  _proto.beginUpdate = function beginUpdate() {
    this._updateLock++;
  };
  _proto.endUpdate = function endUpdate() {
    this._updateLock--;
  };
  _proto.isUpdateLocked = function isUpdateLocked() {
    return this._updateLock > 0;
  };
  _proto._getOption = function _getOption(name) {
    return this._owner.option(name);
  };
  _proto._setOption = function _setOption(name, value) {
    this._owner.option(name, value);
  };
  return DiagramOptionsUpdateBar;
}(_diagram.default);
var _default = DiagramOptionsUpdateBar;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
