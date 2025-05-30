/**
* DevExtreme (cjs/exporter/common/export_load_panel.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ExportLoadPanel = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _message = _interopRequireDefault(require("../../localization/message"));
var _type = require("../../core/utils/type");
var _load_panel = _interopRequireDefault(require("../../ui/load_panel"));
var _uiGrid_core = _interopRequireDefault(require("../../ui/grid_core/ui.grid_core.utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var EXPORT_LOAD_PANEL_CLASS = 'dx-export-loadpanel';
var ExportLoadPanel = /*#__PURE__*/function () {
  function ExportLoadPanel(component, $targetElement, $container, options) {
    this._$targetElement = $targetElement;
    this._$container = $container;
    this._loadPanel = component._createComponent((0, _renderer.default)('<div>').addClass(EXPORT_LOAD_PANEL_CLASS).appendTo(this._$container), _load_panel.default, this.getOptions(options));
  }
  var _proto = ExportLoadPanel.prototype;
  _proto.getDefaultOptions = function getDefaultOptions() {
    return {
      animation: null,
      shading: false,
      height: 90,
      width: 200,
      container: this._$container
    };
  };
  _proto.getOptions = function getOptions(options) {
    if ((0, _type.isDefined)(options.text)) {
      options.message = options.text;
    } else {
      options.message = _message.default.format('dxDataGrid-exporting');
    }
    return (0, _extend.extend)(this.getDefaultOptions(), options);
  };
  _proto.show = function show() {
    this._loadPanel.option('position', _uiGrid_core.default.calculateLoadPanelPosition(this._$targetElement));
    this._loadPanel.show();
  };
  _proto.dispose = function dispose() {
    (0, _renderer.default)(this._loadPanel.element()).remove();
    delete this._loadPanel;
  };
  return ExportLoadPanel;
}();
exports.ExportLoadPanel = ExportLoadPanel;
