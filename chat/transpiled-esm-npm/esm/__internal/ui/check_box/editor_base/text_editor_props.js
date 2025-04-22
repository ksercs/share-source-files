import { current, isMaterial } from '../../../../ui/themes';
export const defaultTextEditorProps = {
  maxLength: null,
  spellCheck: false,
  valueChangeEvent: 'change',
  stylingMode: isMaterial(current()) ? 'filled' : 'outlined',
  defaultValue: ''
};