/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/header_panel/date_header/dateHeaderText.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["splitText", "text"];
import { createVNode, createFragment } from "inferno";
import { Fragment } from 'inferno';
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
export var viewFunction = _ref => {
  var {
    props: {
      splitText,
      text
    },
    textParts
  } = _ref;
  return createFragment(splitText ? textParts.map(part => createVNode(1, "span", "dx-scheduler-header-panel-cell-date", part, 0)) : text, 0);
};
export var DateHeaderTextProps = {
  text: '',
  splitText: false
};
export class DateHeaderText extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.__getterCache = {};
  }
  get textParts() {
    if (this.__getterCache['textParts'] !== undefined) {
      return this.__getterCache['textParts'];
    }
    return this.__getterCache['textParts'] = (() => {
      var {
        text
      } = this.props;
      return text ? text.split(' ') : [''];
    })();
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    if (this.props['text'] !== nextProps['text']) {
      this.__getterCache['textParts'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      textParts: this.textParts,
      restAttributes: this.restAttributes
    });
  }
}
DateHeaderText.defaultProps = DateHeaderTextProps;
