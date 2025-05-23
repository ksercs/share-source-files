/**
* DevExtreme (esm/renovation/ui/scheduler/appointment/appointment.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["appointmentTemplate", "groups", "hideReducedIconTooltip", "index", "onItemClick", "onItemDoubleClick", "showReducedIconTooltip", "viewModel"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from '@devextreme/runtime/inferno';
import { normalizeStyles } from '@devextreme/runtime/inferno';
import { getAppointmentStyles, mergeStylesWithColor } from './utils';
import { AppointmentContent } from './content/layout';
import { Widget } from '../../common/widget';
import { combineClasses } from '../../../utils/combine_classes';
import { getAppointmentColor } from '../resources/utils';
import { AppointmentsContext } from '../appointments_context';
export var viewFunction = _ref => {
  var {
    classes,
    data,
    dateText,
    isReduced,
    onItemClick,
    props: {
      appointmentTemplate,
      hideReducedIconTooltip,
      index,
      showReducedIconTooltip,
      viewModel: {
        info: {
          isRecurrent
        }
      }
    },
    ref,
    styles,
    text
  } = _ref;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "focusStateEnabled": true,
    "onClick": onItemClick,
    "rootElementRef": ref,
    "style": normalizeStyles(styles),
    "classes": classes,
    "hint": text
  }, {
    role: 'button',
    'data-index': index
  }, {
    children: createComponentVNode(2, AppointmentContent, {
      "text": text,
      "isReduced": isReduced,
      "dateText": dateText,
      "isRecurrent": isRecurrent,
      "index": index,
      "data": data,
      "showReducedIconTooltip": showReducedIconTooltip,
      "hideReducedIconTooltip": hideReducedIconTooltip,
      "appointmentTemplate": appointmentTemplate
    })
  })));
};
export var AppointmentProps = {
  index: 0
};
import { createRef as infernoCreateRef } from 'inferno';
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class Appointment extends InfernoComponent {
  constructor(props) {
    super(props);
    this.ref = infernoCreateRef();
    this.state = {
      color: undefined
    };
    this.updateStylesEffect = this.updateStylesEffect.bind(this);
    this.bindDoubleClickEffect = this.bindDoubleClickEffect.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onItemDoubleClick = this.onItemDoubleClick.bind(this);
  }
  get appointmentsContextValue() {
    if (this.context[AppointmentsContext.id]) {
      return this.context[AppointmentsContext.id];
    }
    return AppointmentsContext.defaultValue;
  }
  createEffects() {
    return [new InfernoEffect(this.updateStylesEffect, [this.props.viewModel, this.appointmentsContextValue, this.props.groups]), new InfernoEffect(this.bindDoubleClickEffect, [])];
  }
  updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.viewModel, this.appointmentsContextValue, this.props.groups]);
  }
  updateStylesEffect() {
    var _viewModel$info$group;
    var {
      viewModel
    } = this.props;
    var groupIndex = (_viewModel$info$group = viewModel.info.groupIndex) !== null && _viewModel$info$group !== void 0 ? _viewModel$info$group : 0;
    var {
      appointment
    } = viewModel;
    getAppointmentColor({
      resources: this.appointmentsContextValue.resources,
      resourceLoaderMap: this.appointmentsContextValue.resourceLoaderMap,
      resourcesDataAccessors: this.appointmentsContextValue.dataAccessors.resources,
      loadedResources: this.appointmentsContextValue.loadedResources
    }, {
      itemData: appointment,
      groupIndex,
      groups: this.props.groups
    }).then(color => {
      this.setState(__state_argument => ({
        color: color
      }));
    }).catch(() => '');
  }
  bindDoubleClickEffect() {
    var _this$ref$current;
    var onDoubleClick = () => this.onItemDoubleClick();
    (_this$ref$current = this.ref.current) === null || _this$ref$current === void 0 ? void 0 : _this$ref$current.addEventListener('dblclick', onDoubleClick);
    return () => {
      var _this$ref$current2;
      (_this$ref$current2 = this.ref.current) === null || _this$ref$current2 === void 0 ? void 0 : _this$ref$current2.removeEventListener('dblclick', onDoubleClick);
    };
  }
  get appointmentStyles() {
    return getAppointmentStyles(this.props.viewModel);
  }
  get styles() {
    return mergeStylesWithColor(this.state.color, this.appointmentStyles);
  }
  get text() {
    return this.props.viewModel.appointment.text;
  }
  get isReduced() {
    var {
      appointmentReduced
    } = this.props.viewModel.info;
    return !!appointmentReduced;
  }
  get classes() {
    var {
      focused,
      info: {
        allDay,
        appointmentReduced,
        direction,
        isRecurrent
      }
    } = this.props.viewModel;
    var isVerticalDirection = direction === 'vertical';
    return combineClasses({
      'dx-state-focused': !!focused,
      'dx-scheduler-appointment': true,
      'dx-scheduler-appointment-horizontal': !isVerticalDirection,
      'dx-scheduler-appointment-vertical': isVerticalDirection,
      'dx-scheduler-appointment-recurrence': isRecurrent,
      'dx-scheduler-all-day-appointment': allDay,
      'dx-scheduler-appointment-reduced': this.isReduced,
      'dx-scheduler-appointment-head': appointmentReduced === 'head',
      'dx-scheduler-appointment-body': appointmentReduced === 'body',
      'dx-scheduler-appointment-tail': appointmentReduced === 'tail'
    });
  }
  get dateText() {
    return this.props.viewModel.info.dateText;
  }
  get data() {
    return {
      appointmentData: this.props.viewModel.info.appointment,
      targetedAppointmentData: this.props.viewModel.appointment
    };
  }
  onItemClick() {
    var e = {
      data: [this.props.viewModel],
      target: this.ref.current,
      index: this.props.index
    };
    this.props.onItemClick(e);
  }
  onItemDoubleClick() {
    var e = {
      data: [this.props.viewModel],
      target: this.ref.current,
      index: this.props.index
    };
    this.props.onItemDoubleClick(e);
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
        appointmentTemplate: getTemplate(props.appointmentTemplate)
      }),
      color: this.state.color,
      ref: this.ref,
      appointmentsContextValue: this.appointmentsContextValue,
      appointmentStyles: this.appointmentStyles,
      styles: this.styles,
      text: this.text,
      isReduced: this.isReduced,
      classes: this.classes,
      dateText: this.dateText,
      data: this.data,
      onItemClick: this.onItemClick,
      onItemDoubleClick: this.onItemDoubleClick,
      restAttributes: this.restAttributes
    });
  }
}
Appointment.defaultProps = AppointmentProps;
