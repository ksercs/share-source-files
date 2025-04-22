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