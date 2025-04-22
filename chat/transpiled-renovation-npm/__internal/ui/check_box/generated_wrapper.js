"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _check_box = require("./check_box");
var _wrapper = _interopRequireDefault(require("./wrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CheckBox extends _wrapper.default {
  getProps() {
    const props = super.getProps();
    // @ts-expect-error
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  }
  focus() {
    var _this$viewRef;
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, prefer-rest-params
    return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.focus(...arguments);
  }
  blur() {
    var _this$viewRef2;
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, prefer-rest-params
    return (_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 ? void 0 : _this$viewRef2.blur(...arguments);
  }
  // @ts-expect-error
  _getActionConfigs() {
    return {
      onFocusIn: {},
      onClick: {}
    };
  }
  // @ts-expect-error
  get _propsInfo() {
    return {
      twoWay: [['value', 'defaultValue', 'valueChange']],
      allowNull: ['defaultValue', 'validationError', 'validationErrors', 'value'],
      elements: [],
      templates: [],
      props: ['text', 'iconSize', 'enableThreeStateBehavior', 'activeStateEnabled', 'hoverStateEnabled', 'focusStateEnabled', 'saveValueChangeEvent', 'defaultValue', 'valueChange', 'readOnly', 'name', 'validationError', 'validationErrors', 'validationMessageMode', 'validationMessagePosition', 'validationStatus', 'isValid', 'isDirty', 'inputAttr', 'onFocusIn', 'className', 'accessKey', 'disabled', 'height', 'hint', 'onClick', 'onKeyDown', 'rtlEnabled', 'tabIndex', 'visible', 'width', 'aria', 'value']
    };
  }
  // @ts-expect-error
  get _viewComponent() {
    return _check_box.CheckBox;
  }
}
exports.default = CheckBox;
(0, _component_registrator.default)('dxCheckBox', CheckBox);
CheckBox.defaultOptions = _check_box.defaultOptions;