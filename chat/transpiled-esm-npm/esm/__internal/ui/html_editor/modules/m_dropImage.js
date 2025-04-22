import eventsEngine from '../../../../common/core/events/core/events_engine';
import { addNamespace } from '../../../../common/core/events/utils/index';
import browser from '../../../../core/utils/browser';
import { each } from '../../../../core/utils/iterator';
import { getWindow } from '../../../../core/utils/window';
import Quill from 'devextreme-quill';
import BaseModule from './m_base';
// eslint-disable-next-line import/no-mutable-exports
let DropImageModule = BaseModule;
if (Quill) {
  // @ts-expect-error
  DropImageModule = class DropImageModule extends BaseModule {
    constructor(quill, options) {
      // @ts-expect-error
      super(quill, options);
      const widgetName = this.editorInstance.NAME;
      eventsEngine.on(this.quill.root, addNamespace('drop', widgetName), this._dropHandler.bind(this));
      eventsEngine.on(this.quill.root, addNamespace('paste', widgetName), this._pasteHandler.bind(this));
    }
    _dropHandler(e) {
      var _dataTransfer$files;
      const {
        dataTransfer
      } = e.originalEvent;
      const hasFiles = dataTransfer === null || dataTransfer === void 0 || (_dataTransfer$files = dataTransfer.files) === null || _dataTransfer$files === void 0 ? void 0 : _dataTransfer$files.length;
      // @ts-expect-error
      this.saveValueChangeEvent(e);
      e.preventDefault();
      if (hasFiles) {
        this._getImage(dataTransfer.files, this._addImage.bind(this));
      }
    }
    _pasteHandler(e) {
      var _clipboardData$items;
      const {
        clipboardData
      } = e.originalEvent;
      // @ts-expect-error
      this.saveValueChangeEvent(e);
      if (!clipboardData) {
        return;
      }
      const hasDataItems = (_clipboardData$items = clipboardData.items) === null || _clipboardData$items === void 0 ? void 0 : _clipboardData$items.length;
      const isHtmlData = clipboardData.getData('text/html');
      if (!isHtmlData && hasDataItems) {
        this._getImage(clipboardData.items, imageData => {
          if (browser.mozilla) {
            return;
          }
          this._addImage(imageData);
        });
      }
    }
    _isImage(file) {
      return !!file.type.match(/^image\/(a?png|bmp|gif|p?jpe?g|svg|vnd\.microsoft\.icon|webp)/i);
    }
    _getImage(files, callback) {
      const window = getWindow();
      each(files, (index, file) => {
        if (!this._isImage(file)) {
          return;
        }
        // @ts-expect-error
        const reader = new window.FileReader();
        reader.onload = _ref => {
          let {
            target
          } = _ref;
          callback(target.result);
        };
        const readableFile = file.getAsFile ? file.getAsFile() : file;
        // @ts-expect-error
        if (readableFile instanceof window.Blob) {
          reader.readAsDataURL(readableFile);
        }
      });
    }
    _addImage(data) {
      const selection = this.quill.getSelection();
      const pasteIndex = selection ? selection.index : this.quill.getLength();
      this.quill.insertEmbed(pasteIndex, 'extendedImage', data, 'user');
    }
  };
}
export default DropImageModule;