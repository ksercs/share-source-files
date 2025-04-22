import { current, isMaterial } from '../../../../ui/themes';
export const defaultEditorLabelProps = {
  label: '',
  labelMode: isMaterial(current()) ? 'floating' : 'static'
};