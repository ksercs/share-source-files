/**
* DevExtreme (cjs/events/core/keyboard_processor.js)
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
var _class = _interopRequireDefault(require("../../core/class"));
var _index = require("../../events/utils/index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var COMPOSITION_START_EVENT = 'compositionstart';
var COMPOSITION_END_EVENT = 'compositionend';
var KEYDOWN_EVENT = 'keydown';
var NAMESPACE = 'KeyboardProcessor';
var createKeyDownOptions = function createKeyDownOptions(e) {
  return {
    keyName: (0, _index.normalizeKeyName)(e),
    key: e.key,
    code: e.code,
    ctrl: e.ctrlKey,
    location: e.location,
    metaKey: e.metaKey,
    shift: e.shiftKey,
    alt: e.altKey,
    which: e.which,
    originalEvent: e
  };
};
var KeyboardProcessor = _class.default.inherit({
  _keydown: (0, _index.addNamespace)(KEYDOWN_EVENT, NAMESPACE),
  _compositionStart: (0, _index.addNamespace)(COMPOSITION_START_EVENT, NAMESPACE),
  _compositionEnd: (0, _index.addNamespace)(COMPOSITION_END_EVENT, NAMESPACE),
  ctor: function ctor(options) {
    var _this = this;
    options = options || {};
    if (options.element) {
      this._element = (0, _renderer.default)(options.element);
    }
    if (options.focusTarget) {
      this._focusTarget = options.focusTarget;
    }
    this._handler = options.handler;
    if (this._element) {
      this._processFunction = function (e) {
        var focusTargets = (0, _renderer.default)(_this._focusTarget).toArray();
        var isNotFocusTarget = _this._focusTarget && _this._focusTarget !== e.target && !focusTargets.includes(e.target);
        var shouldSkipProcessing = _this._isComposingJustFinished && e.which === 229 || _this._isComposing || isNotFocusTarget;
        _this._isComposingJustFinished = false;
        if (!shouldSkipProcessing) {
          _this.process(e);
        }
      };
      this._toggleProcessingWithContext = this.toggleProcessing.bind(this);
      _events_engine.default.on(this._element, this._keydown, this._processFunction);
      _events_engine.default.on(this._element, this._compositionStart, this._toggleProcessingWithContext);
      _events_engine.default.on(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
  },
  dispose: function dispose() {
    if (this._element) {
      _events_engine.default.off(this._element, this._keydown, this._processFunction);
      _events_engine.default.off(this._element, this._compositionStart, this._toggleProcessingWithContext);
      _events_engine.default.off(this._element, this._compositionEnd, this._toggleProcessingWithContext);
    }
    this._element = undefined;
    this._handler = undefined;
  },
  process: function process(e) {
    this._handler(createKeyDownOptions(e));
  },
  toggleProcessing: function toggleProcessing(_ref) {
    var type = _ref.type;
    this._isComposing = type === COMPOSITION_START_EVENT;
    this._isComposingJustFinished = !this._isComposing;
  }
});
KeyboardProcessor.createKeyDownOptions = createKeyDownOptions;
var _default = KeyboardProcessor;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
