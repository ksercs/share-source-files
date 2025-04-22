/**
* DevExtreme (cjs/__internal/ui/splitter/splitter_item.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _item = _interopRequireDefault(require("../../ui/collection/item"));
var _resize_handle = _interopRequireDefault(require("./resize_handle"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SplitterItem extends _item.default {
  constructor($element, options, rawData) {
    // @ts-expect-error
    super($element, options, rawData);
    this._owner = options.owner;
  }
  _renderResizeHandle() {
    if (this._shouldHaveResizeHandle()) {
      const id = `dx_${new _guid.default()}`;
      this._setIdAttr(id);
      const config = this._owner._getResizeHandleConfig(id);
      this._resizeHandle = this._owner._createComponent((0, _renderer.default)('<div>'), _resize_handle.default, config);
      if (this._resizeHandle && this._$element) {
        (0, _renderer.default)(this._resizeHandle.element()).insertAfter(this._$element);
      }
    }
  }
  _shouldHaveResizeHandle() {
    var _this$_rawData;
    return ((_this$_rawData = this._rawData) === null || _this$_rawData === void 0 ? void 0 : _this$_rawData.visible) !== false && !this.isLast();
  }
  updateResizeHandle() {
    if (this._shouldHaveResizeHandle()) {
      if (this.getResizeHandle()) return;
      this._renderResizeHandle();
    } else {
      this._removeIdAttr();
      this._removeResizeHandle();
    }
  }
  _setIdAttr(id) {
    this._$element.attr('id', id);
  }
  _removeIdAttr() {
    this._$element.attr('id', null);
  }
  getIndex() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._owner._getIndexByItemData(this._rawData);
  }
  getResizeHandle() {
    return this._resizeHandle;
  }
  _removeResizeHandle() {
    var _this$getResizeHandle;
    (_this$getResizeHandle = this.getResizeHandle()) === null || _this$getResizeHandle === void 0 || _this$getResizeHandle.$element().remove();
    delete this._resizeHandle;
  }
  isLast() {
    return this._owner._isLastVisibleItem(this.getIndex());
  }
  _dispose() {
    this._removeResizeHandle();
    super._dispose();
  }
}
var _default = exports.default = SplitterItem;
