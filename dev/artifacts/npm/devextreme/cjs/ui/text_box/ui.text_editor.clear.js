/**
* DevExtreme (cjs/ui/text_box/ui.text_editor.clear.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _button = _interopRequireDefault(require("./texteditor_button_collection/button"));
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _click = require("../../events/click");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var pointerDown = _pointer.default.down;
var STATE_INVISIBLE_CLASS = 'dx-state-invisible';
var TEXTEDITOR_CLEAR_BUTTON_CLASS = 'dx-clear-button-area';
var TEXTEDITOR_CLEAR_ICON_CLASS = 'dx-icon-clear';
var TEXTEDITOR_ICON_CLASS = 'dx-icon';
var TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS = 'dx-show-clear-button';
var ClearButton = /*#__PURE__*/function (_TextEditorButton) {
  _inheritsLoose(ClearButton, _TextEditorButton);
  function ClearButton() {
    return _TextEditorButton.apply(this, arguments) || this;
  }
  var _proto = ClearButton.prototype;
  _proto._create = function _create() {
    var $element = (0, _renderer.default)('<span>').addClass(TEXTEDITOR_CLEAR_BUTTON_CLASS).append((0, _renderer.default)('<span>').addClass(TEXTEDITOR_ICON_CLASS).addClass(TEXTEDITOR_CLEAR_ICON_CLASS));
    this._addToContainer($element);
    this.update(true);
    return {
      instance: $element,
      $element
    };
  };
  _proto._isVisible = function _isVisible() {
    var editor = this.editor;
    return editor._isClearButtonVisible();
  };
  _proto._attachEvents = function _attachEvents(instance, $button) {
    var editor = this.editor;
    var editorName = editor.NAME;
    _events_engine.default.on($button, (0, _index.addNamespace)(pointerDown, editorName), function (e) {
      e.preventDefault();
      if (e.pointerType !== 'mouse') {
        editor._clearValueHandler(e);
      }
    });
    _events_engine.default.on($button, (0, _index.addNamespace)(_click.name, editorName), function (e) {
      return editor._clearValueHandler(e);
    });
  }

  // TODO: get rid of it
  ;
  _proto._legacyRender = function _legacyRender($editor, isVisible) {
    $editor.toggleClass(TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS, isVisible);
  };
  _proto.update = function update() {
    var rendered = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    !rendered && _TextEditorButton.prototype.update.call(this);
    var editor = this.editor,
      instance = this.instance;
    var $editor = editor.$element();
    var isVisible = this._isVisible();
    instance && instance.toggleClass(STATE_INVISIBLE_CLASS, !isVisible);
    this._legacyRender($editor, isVisible);
  };
  return ClearButton;
}(_button.default);
exports.default = ClearButton;
module.exports = exports.default;
module.exports.default = exports.default;
