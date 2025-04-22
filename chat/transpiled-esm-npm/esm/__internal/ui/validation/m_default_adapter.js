import Class from '../../../core/class';
// @ts-expect-error dxClass inheritance issue
class DefaultAdapter extends Class.inherit({}) {
  ctor(editor, validator) {
    this.editor = editor;
    this.validator = validator;
    this.validationRequestsCallbacks = [];
    const handler = args => {
      this.validationRequestsCallbacks.forEach(item => item(args));
    };
    editor.validationRequest.add(handler);
    editor.on('disposing', () => {
      editor.validationRequest.remove(handler);
    });
  }
  getValue() {
    return this.editor.option('value');
  }
  getCurrentValidationError() {
    return this.editor.option('validationError');
  }
  bypass() {
    return this.editor.option('disabled');
  }
  applyValidationResults(params) {
    this.editor.option({
      validationErrors: params.brokenRules,
      validationStatus: params.status
    });
  }
  reset() {
    this.editor.clear();
  }
  focus() {
    this.editor.focus();
  }
}
export default DefaultAdapter;