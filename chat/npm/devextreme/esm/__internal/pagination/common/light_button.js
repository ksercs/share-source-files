/**
* DevExtreme (esm/__internal/pagination/common/light_button.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { createVNode } from "inferno";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfernoComponent, InfernoEffect } from '../../core/r1/runtime/inferno/index';
import { createRef } from 'inferno';
import { subscribeToClickEvent } from '../../core/r1/utils/subscribe_to_event';
import { KeyboardActionContext } from './keyboard_action_context';
export const LightButtonDefaultProps = {
  className: '',
  label: '',
  tabIndex: 0,
  selected: false
};
export class LightButton extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.refs = null;
    this.widgetRef = createRef();
    this.keyboardEffect = this.keyboardEffect.bind(this);
    this.subscribeToClick = this.subscribeToClick.bind(this);
  }
  /* istanbul ignore next: WA for Angular */
  getComponentProps() {
    return this.props;
  }
  getKeyboardContext() {
    if (this.context[KeyboardActionContext.id]) {
      return this.context[KeyboardActionContext.id];
    }
    return KeyboardActionContext.defaultValue;
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate(nextProps, nextState, context);
  }
  createEffects() {
    return [new InfernoEffect(this.keyboardEffect, [this.getKeyboardContext(), this.props.onClick]), new InfernoEffect(this.subscribeToClick, [this.props.onClick])];
  }
  updateEffects() {
    var _this$_effects$, _this$_effects$2;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 || _this$_effects$.update([this.getKeyboardContext(), this.props.onClick]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 || _this$_effects$2.update([this.props.onClick]);
  }
  keyboardEffect() {
    return this.getKeyboardContext().registerKeyboardAction(this.widgetRef.current, this.props.onClick);
  }
  subscribeToClick() {
    return subscribeToClickEvent(this.widgetRef.current, this.props.onClick);
  }
  render() {
    return createVNode(1, "div", this.props.className, this.props.children, 0, {
      "tabindex": this.props.tabIndex,
      "role": "button",
      "aria-label": this.props.label,
      "aria-current": this.props.selected ? 'page' : undefined
    }, null, this.widgetRef);
  }
}
LightButton.defaultProps = LightButtonDefaultProps;
