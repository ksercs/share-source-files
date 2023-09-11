/**
* DevExtreme (esm/ui/html_editor/utils/templates_storage.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined, isEmptyObject } from '../../../core/utils/type';
export default class TemplatesStorage {
  constructor() {
    this._storage = {};
  }
  set(_ref, value) {
    var _this$_storage, _this$_storage$editor;
    var {
      editorKey,
      marker
    } = _ref;
    (_this$_storage$editor = (_this$_storage = this._storage)[editorKey]) !== null && _this$_storage$editor !== void 0 ? _this$_storage$editor : _this$_storage[editorKey] = {};
    this._storage[editorKey][marker] = value;
  }
  get(_ref2) {
    var _Object$values$at, _this$_storage$editor2;
    var {
      editorKey,
      marker
    } = _ref2;
    var isQuillFormatCall = !isDefined(editorKey);

    // NOTE: If anonymous templates are used, mentions are parsed from the markup.
    // The Quill format does not have information about a related HtmlEditor instance.
    // In this case, we need to use the latest template in the storage
    // because the appropriate instance was already created and added to the storage.

    return isQuillFormatCall ? (_Object$values$at = Object.values(this._storage).at(-1)) === null || _Object$values$at === void 0 ? void 0 : _Object$values$at[marker] : (_this$_storage$editor2 = this._storage[editorKey]) === null || _this$_storage$editor2 === void 0 ? void 0 : _this$_storage$editor2[marker];
  }
  delete(_ref3) {
    var {
      editorKey,
      marker
    } = _ref3;
    if (!this._storage[editorKey]) {
      return;
    }
    delete this._storage[editorKey][marker];
    if (isEmptyObject(this._storage[editorKey])) {
      delete this._storage[editorKey];
    }
  }
}
