/**
* DevExtreme (esm/ui/html_editor/converters/delta.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ConverterController from '../converterController';
class DeltaConverter {
  setQuillInstance(quillInstance) {
    this.quillInstance = quillInstance;
  }
  toHtml() {
    if (!this.quillInstance) {
      return;
    }
    return this._isQuillEmpty() ? '' : this.quillInstance.getSemanticHTML(0, this.quillInstance.getLength() + 1);
  }
  _isQuillEmpty() {
    var delta = this.quillInstance.getContents();
    return delta.length() === 1 && this._isDeltaEmpty(delta);
  }
  _isDeltaEmpty(delta) {
    return delta.reduce((__, _ref) => {
      var {
        insert
      } = _ref;
      return insert.indexOf('\n') !== -1;
    });
  }
}
ConverterController.addConverter('delta', DeltaConverter);
export default DeltaConverter;
