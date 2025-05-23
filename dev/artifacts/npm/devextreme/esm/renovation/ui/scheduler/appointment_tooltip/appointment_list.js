/**
* DevExtreme (esm/renovation/ui/scheduler/appointment_tooltip/appointment_list.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["appointments", "checkAndDeleteAppointment", "focusStateEnabled", "getSingleAppointmentData", "getTextAndFormatDate", "isEditingAllowed", "itemContentTemplate", "onHide", "showAppointmentPopup", "target"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { List } from '../../list';
import { TooltipItemLayout } from './item_layout';
import getCurrentAppointment from './utils/get_current_appointment';
import { defaultGetTextAndFormatDate, defaultGetSingleAppointment } from './utils/default_functions';
export var viewFunction = viewModel => normalizeProps(createComponentVNode(2, List, _extends({
  "itemTemplate": _ref => {
    var {
      index,
      item
    } = _ref;
    return createComponentVNode(2, TooltipItemLayout, {
      "item": item,
      "index": index,
      "onDelete": viewModel.props.checkAndDeleteAppointment,
      "onHide": viewModel.props.onHide,
      "itemContentTemplate": viewModel.props.itemContentTemplate,
      "getTextAndFormatDate": viewModel.props.getTextAndFormatDate,
      "singleAppointment": viewModel.props.getSingleAppointmentData(item.data, viewModel.props.target),
      "showDeleteButton": viewModel.props.isEditingAllowed && !item.data.disabled
    });
  },
  "dataSource": viewModel.props.appointments,
  "focusStateEnabled": viewModel.props.focusStateEnabled,
  "onItemClick": viewModel.onItemClick
}, viewModel.restAttributes)));
export var AppointmentListProps = {
  isEditingAllowed: true,
  focusStateEnabled: false,
  getTextAndFormatDate: defaultGetTextAndFormatDate,
  getSingleAppointmentData: defaultGetSingleAppointment
};
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class AppointmentList extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get onItemClick() {
    return _ref2 => {
      var {
        itemData
      } = _ref2;
      var {
        showAppointmentPopup
      } = this.props;
      showAppointmentPopup === null || showAppointmentPopup === void 0 ? void 0 : showAppointmentPopup(itemData.data, false, getCurrentAppointment(itemData));
    };
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        itemContentTemplate: getTemplate(props.itemContentTemplate)
      }),
      onItemClick: this.onItemClick,
      restAttributes: this.restAttributes
    });
  }
}
AppointmentList.defaultProps = AppointmentListProps;
