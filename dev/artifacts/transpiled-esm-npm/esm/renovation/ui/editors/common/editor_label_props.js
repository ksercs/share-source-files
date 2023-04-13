import { isMaterial, current } from '../../../../ui/themes';
export var EditorLabelProps = {
  label: '',
  get labelMode() {
    return isMaterial(current()) ? 'floating' : 'static';
  }
};