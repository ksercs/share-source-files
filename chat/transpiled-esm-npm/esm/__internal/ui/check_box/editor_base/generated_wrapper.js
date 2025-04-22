import registerComponent from '../../../../core/component_registrator';
import { defaultOptions, Editor as EditorComponent } from './editor';
import EditorWrapperComponent from './wrapper';
export default class Editor extends EditorWrapperComponent {
  getProps() {
    const props = super.getProps();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  }
  focus() {
    var _this$viewRef;
    // @ts-expect-error
    // eslint-disable-next-line prefer-rest-params
    return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.focus(...arguments);
  }
  blur() {
    var _this$viewRef2;
    // @ts-expect-error
    // eslint-disable-next-line prefer-rest-params
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
      allowNull: ['validationError', 'validationErrors'],
      elements: [],
      templates: [],
      props: ['readOnly', 'name', 'validationError', 'validationErrors', 'validationMessageMode', 'validationMessagePosition', 'validationStatus', 'isValid', 'isDirty', 'inputAttr', 'onFocusIn', 'defaultValue', 'valueChange', 'className', 'accessKey', 'activeStateEnabled', 'disabled', 'focusStateEnabled', 'height', 'hint', 'hoverStateEnabled', 'onClick', 'onKeyDown', 'rtlEnabled', 'tabIndex', 'visible', 'width', 'aria', 'classes', 'value']
    };
  }
  // @ts-expect-error
  get _viewComponent() {
    return EditorComponent;
  }
}
registerComponent('dxEditor', Editor);
Editor.defaultOptions = defaultOptions;