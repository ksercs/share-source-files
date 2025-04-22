import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../ui/toolbar';
import registerComponent from '../../../core/component_registrator';
import Popup from '../../../ui/popup/ui.popup';
export default class PopupFull extends Popup {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      preventScrollEvents: false
    });
  }
  // eslint-disable-next-line class-methods-use-this
  _getToolbarName() {
    return 'dxToolbar';
  }
}
PopupFull.defaultOptions = function (rule) {
  Popup.defaultOptions(rule);
};
registerComponent('dxPopup', PopupFull);