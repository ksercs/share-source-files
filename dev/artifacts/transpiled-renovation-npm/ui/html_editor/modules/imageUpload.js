"use strict";

exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _base = _interopRequireDefault(require("./base"));
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _type = require("../../../core/utils/type");
var _extend = require("../../../core/utils/extend");
var _image_uploader_helper = require("../utils/image_uploader_helper");
var _index = require("../../../events/utils/index");
var _file_uploader = _interopRequireDefault(require("../../file_uploader"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var MODULE_NAMESPACE = 'dxHtmlEditorImageUpload';
var HIDDEN_FILE_UPLOADER_CLASS = 'dx-htmleditor-hidden-content';
var ImageUploadModule = _base.default;
if (_devextremeQuill.default) {
  ImageUploadModule = /*#__PURE__*/function (_BaseModule) {
    _inheritsLoose(ImageUploadModule, _BaseModule);
    function ImageUploadModule(quill, options) {
      var _this;
      _this = _BaseModule.call(this, quill, options) || this;
      _this.options = options;
      _this._quillContainer = _this.editorInstance._getQuillContainer();
      _this.addCleanCallback(_this.prepareCleanCallback());
      _this._handleServerUpload();
      return _this;
    }
    var _proto = ImageUploadModule.prototype;
    _proto._handleServerUpload = function _handleServerUpload() {
      var useServerUpload = (0, _type.isDefined)(this.options.fileUploadMode) && this.options.fileUploadMode !== 'base64';
      useServerUpload ? this._enableDragAndDropUploading() : this._disableDragAndDropUploading();
    };
    _proto._getUploaderModule = function _getUploaderModule() {
      if (!this._uploaderModule) {
        this._uploaderModule = this.quill.getModule('uploader');
      }
      return this._uploaderModule;
    };
    _proto._disableDragAndDropUploading = function _disableDragAndDropUploading() {
      var _this$_fileUploader;
      this._getUploaderModule().preventImageUploading(false);
      this._detachEvents();
      (_this$_fileUploader = this._fileUploader) === null || _this$_fileUploader === void 0 ? void 0 : _this$_fileUploader.dispose();
    };
    _proto._enableDragAndDropUploading = function _enableDragAndDropUploading() {
      this._initFileUploader();
      this._getUploaderModule().preventImageUploading(true);
      this._attachEvents();
    };
    _proto._initFileUploader = function _initFileUploader() {
      var $container = (0, _renderer.default)('<div>').addClass(HIDDEN_FILE_UPLOADER_CLASS).appendTo(this._quillContainer);
      var fileUploaderOptions = (0, _extend.extend)({}, (0, _image_uploader_helper.getFileUploaderBaseOptions)(), {
        uploadUrl: this.options.uploadUrl,
        onUploaded: this._onUploaded.bind(this)
      }, this.options.fileUploaderOptions);
      this._fileUploader = this.editorInstance._createComponent($container, _file_uploader.default, fileUploaderOptions);
      return $container;
    };
    _proto._onUploaded = function _onUploaded(data) {
      var _this$quill$getSelect;
      var _ref = (_this$quill$getSelect = this.quill.getSelection()) !== null && _this$quill$getSelect !== void 0 ? _this$quill$getSelect : {
          index: this.quill.getLength()
        },
        pasteIndex = _ref.index;
      (0, _image_uploader_helper.serverUpload)(this.options.uploadDirectory, data.file.name, this.quill, pasteIndex);
    };
    _proto._attachEvents = function _attachEvents() {
      _events_engine.default.on(this.quill.root, (0, _index.addNamespace)('drop', MODULE_NAMESPACE), this._dropHandler.bind(this));
      _events_engine.default.on(this.quill.root, (0, _index.addNamespace)('paste', MODULE_NAMESPACE), this._pasteHandler.bind(this));
    };
    _proto._detachEvents = function _detachEvents() {
      _events_engine.default.off(this.quill.root, MODULE_NAMESPACE);
    };
    _proto._dropHandler = function _dropHandler(e) {
      this._handleInsertImages(e, 'dataTransfer');
    };
    _proto._pasteHandler = function _pasteHandler(e) {
      this._handleInsertImages(e, 'clipboardData');
    };
    _proto._handleInsertImages = function _handleInsertImages(e, filesField) {
      this.saveValueChangeEvent(e);
      var files = Array.from(e.originalEvent[filesField].files || []);
      var uploads = files;
      if (uploads.length) {
        e.preventDefault();
        e.stopPropagation();
        this._fileUploader.option('value', uploads);
        this._fileUploader.upload();
      }
    };
    _proto.clean = function clean() {
      this._disableDragAndDropUploading();
    };
    _proto.prepareCleanCallback = function prepareCleanCallback() {
      var _this2 = this;
      return function () {
        _this2.clean();
      };
    };
    _proto.option = function option(_option, value) {
      switch (_option) {
        case 'imageUpload':
          this.handleOptionChangeValue(value);
          break;
        case 'fileUploadMode':
          this.options.fileUploadMode = value;
          this._handleServerUpload();
          break;
        case 'fileUploaderOptions':
          this._fileUploader.option(value);
      }
    };
    return ImageUploadModule;
  }(_base.default);
}
var _default = ImageUploadModule;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;