/**
* DevExtreme (cjs/ui/html_editor/quill_registrator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _quill_importer = require("./quill_importer");
var _base = _interopRequireDefault(require("./themes/base"));
var _image = _interopRequireDefault(require("./formats/image"));
var _link = _interopRequireDefault(require("./formats/link"));
var _font = _interopRequireDefault(require("./formats/font"));
var _size = _interopRequireDefault(require("./formats/size"));
var _align = _interopRequireDefault(require("./formats/align"));
var _toolbar = _interopRequireDefault(require("./modules/toolbar"));
var _dropImage = _interopRequireDefault(require("./modules/dropImage"));
var _variables = _interopRequireDefault(require("./modules/variables"));
var _resizing = _interopRequireDefault(require("./modules/resizing"));
var _tableResizing = _interopRequireDefault(require("./modules/tableResizing"));
var _tableContextMenu = _interopRequireDefault(require("./modules/tableContextMenu"));
var _imageUpload = _interopRequireDefault(require("./modules/imageUpload"));
var _imageCursor = _interopRequireDefault(require("./modules/imageCursor"));
var _mentions = _interopRequireDefault(require("./modules/mentions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var QuillRegistrator = /*#__PURE__*/function () {
  function QuillRegistrator() {
    if (QuillRegistrator.initialized) {
      return;
    }
    var quill = this.getQuill();
    var DirectionStyle = quill.import('attributors/style/direction');
    quill.register({
      'formats/align': _align.default,
      'formats/direction': DirectionStyle,
      'formats/font': _font.default,
      'formats/size': _size.default,
      'formats/extendedImage': _image.default,
      'formats/link': _link.default,
      'modules/toolbar': _toolbar.default,
      'modules/dropImage': _dropImage.default,
      'modules/variables': _variables.default,
      'modules/resizing': _resizing.default,
      'modules/tableResizing': _tableResizing.default,
      'modules/tableContextMenu': _tableContextMenu.default,
      'modules/imageUpload': _imageUpload.default,
      'modules/imageCursor': _imageCursor.default,
      'modules/mentions': _mentions.default,
      'themes/basic': _base.default
    }, true);
    this._customModules = [];
    QuillRegistrator._initialized = true;
  }
  var _proto = QuillRegistrator.prototype;
  _proto.createEditor = function createEditor(container, config) {
    var quill = this.getQuill();
    return new quill(container, config);
  };
  _proto.registerModules = function registerModules(modulesConfig) {
    var isModule = RegExp('modules/*');
    var quill = this.getQuill();
    var isRegisteredModule = function isRegisteredModule(modulePath) {
      return !!quill.imports[modulePath];
    };
    for (var modulePath in modulesConfig) {
      if (isModule.test(modulePath) && !isRegisteredModule(modulePath)) {
        this._customModules.push(modulePath.slice(8));
      }
    }
    quill.register(modulesConfig, true);
  };
  _proto.getRegisteredModuleNames = function getRegisteredModuleNames() {
    return this._customModules;
  };
  _proto.getQuill = function getQuill() {
    return (0, _quill_importer.getQuill)();
  };
  return QuillRegistrator;
}();
var _default = QuillRegistrator;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
