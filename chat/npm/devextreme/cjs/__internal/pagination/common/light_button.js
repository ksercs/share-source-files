/**
* DevExtreme (cjs/__internal/pagination/common/light_button.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightButtonDefaultProps = exports.LightButton = void 0;
var _inferno = require("inferno");
var _index = require("../../core/r1/runtime/inferno/index");
var _subscribe_to_event = require("../../core/r1/utils/subscribe_to_event");
var _keyboard_action_context = require("./keyboard_action_context");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

const LightButtonDefaultProps = exports.LightButtonDefaultProps = {
  className: '',
  label: '',
  tabIndex: 0,
  selected: false
};
class LightButton extends _index.InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.refs = null;
    this.widgetRef = (0, _inferno.createRef)();
    this.keyboardEffect = this.keyboardEffect.bind(this);
    this.subscribeToClick = this.subscribeToClick.bind(this);
  }
  /* istanbul ignore next: WA for Angular */
  getComponentProps() {
    return this.props;
  }
  getKeyboardContext() {
    if (this.context[_keyboard_action_context.KeyboardActionContext.id]) {
      return this.context[_keyboard_action_context.KeyboardActionContext.id];
    }
    return _keyboard_action_context.KeyboardActionContext.defaultValue;
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate(nextProps, nextState, context);
  }
  createEffects() {
    return [new _index.InfernoEffect(this.keyboardEffect, [this.getKeyboardContext(), this.props.onClick]), new _index.InfernoEffect(this.subscribeToClick, [this.props.onClick])];
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
    return (0, _subscribe_to_event.subscribeToClickEvent)(this.widgetRef.current, this.props.onClick);
  }
  render() {
    return (0, _inferno.createVNode)(1, "div", this.props.className, this.props.children, 0, {
      "tabindex": this.props.tabIndex,
      "role": "button",
      "aria-label": this.props.label,
      "aria-current": this.props.selected ? 'page' : undefined
    }, null, this.widgetRef);
  }
}
exports.LightButton = LightButton;
LightButton.defaultProps = LightButtonDefaultProps;
