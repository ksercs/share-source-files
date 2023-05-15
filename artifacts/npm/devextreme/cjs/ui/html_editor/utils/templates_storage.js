/**
* DevExtreme (cjs/ui/html_editor/utils/templates_storage.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _type = require("../../../core/utils/type");
var TemplatesStorage = /*#__PURE__*/function () {
  function TemplatesStorage() {
    this._storage = {};
  }
  var _proto = TemplatesStorage.prototype;
  _proto.set = function set(_ref, value) {
    var _this$_storage, _this$_storage$editor;
    var editorKey = _ref.editorKey,
      marker = _ref.marker;
    (_this$_storage$editor = (_this$_storage = this._storage)[editorKey]) !== null && _this$_storage$editor !== void 0 ? _this$_storage$editor : _this$_storage[editorKey] = {};
    this._storage[editorKey][marker] = value;
  };
  _proto.get = function get(_ref2) {
    var _Object$values$at, _this$_storage$editor2;
    var editorKey = _ref2.editorKey,
      marker = _ref2.marker;
    var isQuillFormatCall = !(0, _type.isDefined)(editorKey);

    // NOTE: If anonymous templates are used, mentions are parsed from the markup.
    // The Quill format does not have information about a related HtmlEditor instance.
    // In this case, we need to use the latest template in the storage
    // because the appropriate instance was already created and added to the storage.

    return isQuillFormatCall ? (_Object$values$at = Object.values(this._storage).at(-1)) === null || _Object$values$at === void 0 ? void 0 : _Object$values$at[marker] : (_this$_storage$editor2 = this._storage[editorKey]) === null || _this$_storage$editor2 === void 0 ? void 0 : _this$_storage$editor2[marker];
  };
  _proto.delete = function _delete(_ref3) {
    var editorKey = _ref3.editorKey,
      marker = _ref3.marker;
    if (!this._storage[editorKey]) {
      return;
    }
    delete this._storage[editorKey][marker];
    if ((0, _type.isEmptyObject)(this._storage[editorKey])) {
      delete this._storage[editorKey];
    }
  };
  return TemplatesStorage;
}();
exports.default = TemplatesStorage;
module.exports = exports.default;
module.exports.default = exports.default;
