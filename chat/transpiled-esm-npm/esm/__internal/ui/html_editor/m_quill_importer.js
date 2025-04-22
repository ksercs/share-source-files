import Errors from '../../../ui/widget/ui.errors';
import Quill from 'devextreme-quill';
export function getQuill() {
  if (!Quill) {
    throw Errors.Error('E1041', 'Quill');
  }
  return Quill;
}