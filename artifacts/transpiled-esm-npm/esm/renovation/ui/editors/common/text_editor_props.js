import { isMaterial, current } from '../../../../ui/themes';
export var TextEditorProps = {
  maxLength: null,
  spellCheck: false,
  valueChangeEvent: 'change',
  get stylingMode() {
    return isMaterial(current()) ? 'filled' : 'outlined';
  },
  defaultValue: ''
};