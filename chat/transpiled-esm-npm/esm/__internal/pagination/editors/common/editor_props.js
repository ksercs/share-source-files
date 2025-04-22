import _extends from "@babel/runtime/helpers/esm/extends";
import { BaseWidgetDefaultProps } from './base_widget_props';
import { WidgetDefaultProps } from './widget_props';
export const EditorDefaultProps = _extends({}, BaseWidgetDefaultProps, {
  aria: WidgetDefaultProps.aria,
  classes: WidgetDefaultProps.classes,
  readOnly: false,
  name: '',
  value: null,
  validationError: null,
  validationErrors: null,
  validationMessageMode: 'auto',
  validationMessagePosition: 'bottom',
  validationStatus: 'valid',
  isValid: true,
  isDirty: false,
  inputAttr: {}
});