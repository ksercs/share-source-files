import _extends from "@babel/runtime/helpers/esm/extends";
import { BaseWidgetDefaultProps } from '../../../core/r1/base_props';
const DEFAULT_FEEDBACK_HIDE_TIMEOUT = 400;
const DEFAULT_FEEDBACK_SHOW_TIMEOUT = 30;
export const WidgetDefaultProps = _extends({}, BaseWidgetDefaultProps, {
  _feedbackHideTimeout: DEFAULT_FEEDBACK_HIDE_TIMEOUT,
  _feedbackShowTimeout: DEFAULT_FEEDBACK_SHOW_TIMEOUT,
  cssText: '',
  aria: {},
  classes: '',
  name: '',
  addWidgetClass: true
});