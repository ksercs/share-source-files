import _extends from "@babel/runtime/helpers/esm/extends";
import { BaseWidgetDefaultProps } from '../../core/r1/base_props';
export const defaultButtonProps = _extends({}, BaseWidgetDefaultProps, {
  activeStateEnabled: true,
  hoverStateEnabled: true,
  icon: '',
  iconPosition: 'left',
  stylingMode: 'contained',
  text: '',
  type: 'normal',
  useInkRipple: false,
  useSubmitBehavior: false,
  templateData: {}
});