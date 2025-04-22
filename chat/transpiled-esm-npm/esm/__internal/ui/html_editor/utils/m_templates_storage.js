import { isDefined, isEmptyObject } from '../../../../core/utils/type';
export default class TemplatesStorage {
  constructor() {
    this._storage = {};
  }
  set(_ref, value) {
    let {
      editorKey,
      marker
    } = _ref;
    var _a;
    (_a = this._storage)[editorKey] ?? (_a[editorKey] = {});
    this._storage[editorKey][marker] = value;
  }
  get(_ref2) {
    var _Object$values$at, _this$_storage$editor;
    let {
      editorKey,
      marker
    } = _ref2;
    const isQuillFormatCall = !isDefined(editorKey);
    // NOTE: If anonymous templates are used, mentions are parsed from the markup.
    // The Quill format does not have information about a related HtmlEditor instance.
    // In this case, we need to use the latest template in the storage
    // because the appropriate instance was already created and added to the storage.
    return isQuillFormatCall ? (_Object$values$at = Object.values(this._storage).at(-1)) === null || _Object$values$at === void 0 ? void 0 : _Object$values$at[marker] : (_this$_storage$editor = this._storage[editorKey]) === null || _this$_storage$editor === void 0 ? void 0 : _this$_storage$editor[marker];
  }
  delete(_ref3) {
    let {
      editorKey,
      marker
    } = _ref3;
    if (!this._storage[editorKey]) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this._storage[editorKey][marker];
    if (isEmptyObject(this._storage[editorKey])) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this._storage[editorKey];
    }
  }
}