import _extends from "@babel/runtime/helpers/esm/extends";
import '../../../ui/toolbar';
import registerComponent from '../../../core/component_registrator';
import Popover from '../../../ui/popover/ui.popover';
export default class PopoverFull extends Popover {
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
PopoverFull.defaultOptions = function (rule) {
  Popover.defaultOptions(rule);
};
registerComponent('dxPopover', PopoverFull);