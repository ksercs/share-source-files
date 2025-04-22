/**
* DevExtreme (esm/__internal/ui/html_editor/modules/m_base.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined, isObject } from '../../../../core/utils/type';
import Quill from 'devextreme-quill';
import EmptyModule from './empty';
// eslint-disable-next-line import/no-mutable-exports
let BaseModule = EmptyModule;
if (Quill) {
  const BaseQuillModule = Quill.import('core/module');
  // @ts-expect-error
  BaseModule = class BaseHtmlEditorModule extends BaseQuillModule {
    constructor(quill, options) {
      super(quill, options);
      this.editorInstance = options.editorInstance;
    }
    saveValueChangeEvent(event) {
      this.editorInstance._saveValueChangeEvent(event);
    }
    addCleanCallback(callback) {
      this.editorInstance.addCleanCallback(callback);
    }
    handleOptionChangeValue(changes) {
      if (isObject(changes)) {
        Object.entries(changes).forEach(_ref => {
          let [name, value] = _ref;
          return this.option(name, value);
        });
      } else if (!isDefined(changes)) {
        this === null || this === void 0 || this.clean();
      }
    }
  };
}
export default BaseModule;
