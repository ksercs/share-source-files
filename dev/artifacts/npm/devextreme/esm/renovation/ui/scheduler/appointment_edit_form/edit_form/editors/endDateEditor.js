/**
* DevExtreme (esm/renovation/ui/scheduler/appointment_edit_form/edit_form/editors/endDateEditor.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["dateChange", "disabled", "endDate", "firstDayOfWeek", "isAllDay", "startDate", "value"];
import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { normalizeNewEndDate } from '../utils/normalizeDate';
import { DateEditor } from './dateEditor';
export var viewFunction = _ref => {
  var {
    props: {
      disabled,
      firstDayOfWeek,
      isAllDay,
      value
    },
    valueChange
  } = _ref;
  return createComponentVNode(2, DateEditor, {
    "value": value,
    "valueChange": valueChange,
    "firstDayOfWeek": firstDayOfWeek,
    "disabled": disabled,
    "isAllDay": isAllDay
  });
};
export var EndDateEditorProps = {};
import { convertRulesToOptions } from '../../../../../../core/options/utils';
export class EndDateEditor extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.valueChange = this.valueChange.bind(this);
  }
  valueChange(newDate) {
    var result = normalizeNewEndDate(newDate, this.props.startDate, this.props.endDate);
    this.props.dateChange(result);
    return result;
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      valueChange: this.valueChange,
      restAttributes: this.restAttributes
    });
  }
}
EndDateEditor.defaultProps = EndDateEditorProps;
var __defaultOptionRules = [];
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  EndDateEditor.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(EndDateEditor.defaultProps), Object.getOwnPropertyDescriptors(convertRulesToOptions(__defaultOptionRules))));
}
