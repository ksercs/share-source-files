"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _wrapper = _interopRequireDefault(require("./editor_base/wrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CheckBox extends _wrapper.default {
  _useTemplates() {
    return false;
  }
  _isFocused() {
    const focusTarget = this.$element()[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return focusTarget.classList.contains('dx-state-focused');
  }
  getSupportedKeyNames() {
    return ['space'];
  }
  getProps() {
    const props = super.getProps();
    if (props.value !== null) {
      props.value = Boolean(props.value);
    }
    return props;
  }
}
exports.default = CheckBox;