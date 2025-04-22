import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import CollectionWidgetItem from '../../ui/collection/item';
import ResizeHandle from './resize_handle';
class SplitterItem extends CollectionWidgetItem {
  constructor($element, options, rawData) {
    // @ts-expect-error
    super($element, options, rawData);
    this._owner = options.owner;
  }
  _renderResizeHandle() {
    if (this._shouldHaveResizeHandle()) {
      const id = `dx_${new Guid()}`;
      this._setIdAttr(id);
      const config = this._owner._getResizeHandleConfig(id);
      this._resizeHandle = this._owner._createComponent($('<div>'), ResizeHandle, config);
      if (this._resizeHandle && this._$element) {
        $(this._resizeHandle.element()).insertAfter(this._$element);
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
export default SplitterItem;