import { current, isMaterial } from '../../../../ui/themes';
export const EditorLabelDefaultProps = {
  label: '',
  labelMode: isMaterial(current()) ? 'floating' : 'static'
};