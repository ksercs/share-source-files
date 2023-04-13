"use strict";

exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _base = _interopRequireDefault(require("./base"));
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _index = require("../../../events/utils/index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var MODULE_NAMESPACE = 'dxHtmlEditorImageCursor';
var clickEvent = (0, _index.addNamespace)('dxclick', MODULE_NAMESPACE);
var ImageCursorModule = _base.default;
if (_devextremeQuill.default) {
  ImageCursorModule = /*#__PURE__*/function (_BaseModule) {
    _inheritsLoose(ImageCursorModule, _BaseModule);
    function ImageCursorModule(quill, options) {
      var _this;
      _this = _BaseModule.call(this, quill, options) || this;
      _this.addCleanCallback(_this.clean.bind(_assertThisInitialized(_this)));
      _this._attachEvents();
      return _this;
    }
    var _proto = ImageCursorModule.prototype;
    _proto._attachEvents = function _attachEvents() {
      _events_engine.default.on(this.quill.root, clickEvent, this._clickHandler.bind(this));
    };
    _proto._detachEvents = function _detachEvents() {
      _events_engine.default.off(this.quill.root, clickEvent);
    };
    _proto._clickHandler = function _clickHandler(e) {
      if (this._isAllowedTarget(e.target)) {
        this._adjustSelection(e);
      }
    };
    _proto._isAllowedTarget = function _isAllowedTarget(targetElement) {
      return this._isImage(targetElement);
    };
    _proto._isImage = function _isImage(targetElement) {
      return targetElement.tagName.toUpperCase() === 'IMG';
    };
    _proto._adjustSelection = function _adjustSelection(e) {
      var blot = this.quill.scroll.find(e.target);
      if (blot) {
        var index = blot.offset(this.quill.scroll);
        this.quill.setSelection(index + 1, 0);
      } else {
        this.quill.setSelection(0, 0);
      }
    };
    _proto.clean = function clean() {
      this._detachEvents();
    };
    return ImageCursorModule;
  }(_base.default);
}
var _default = ImageCursorModule;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;