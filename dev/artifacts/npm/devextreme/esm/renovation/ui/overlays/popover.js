/**
* DevExtreme (esm/renovation/ui/overlays/popover.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["children"],
  _excluded2 = ["accessKey", "activeStateEnabled", "animation", "children", "className", "container", "contentTemplate", "defaultVisible", "deferRendering", "disabled", "focusStateEnabled", "height", "hideEvent", "hideOnOutsideClick", "hint", "hoverStateEnabled", "maxHeight", "maxWidth", "minHeight", "minWidth", "onClick", "onHidden", "onHiding", "onInitialized", "onKeyDown", "onOptionChanged", "onShowing", "onShown", "onTitleRendered", "position", "rtlEnabled", "shading", "shadingColor", "showCloseButton", "showEvent", "showTitle", "tabIndex", "target", "title", "titleTemplate", "toolbarItems", "visible", "visibleChange", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from '@devextreme/runtime/inferno';
import devices from '../../../core/devices';
import LegacyPopover from '../../../ui/popover/ui.popover';
import { DomComponentWrapper } from '../common/dom_component_wrapper';
import { BaseWidgetProps } from '../common/base_props';
var isDesktop = !(!devices.real().generic || devices.isSimulator());
export var viewFunction = _ref => {
  var {
    componentProps,
    domComponentWrapperRef,
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
    "componentType": LegacyPopover,
    "componentProps": componentProps.restProps,
    "templateNames": ['titleTemplate', 'contentTemplate']
  }, restAttributes, {
    children: componentProps.children
  }), null, domComponentWrapperRef));
};
export var PopoverProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(BaseWidgetProps), Object.getOwnPropertyDescriptors({
  animation: Object.freeze({
    show: {
      type: 'fade',
      from: 0,
      to: 1
    },
    hide: {
      type: 'fade',
      to: 0
    }
  }),
  hideOnOutsideClick: false,
  contentTemplate: 'content',
  deferRendering: true,
  disabled: false,
  height: 'auto',
  hoverStateEnabled: false,
  maxHeight: null,
  maxWidth: null,
  minHeight: null,
  minWidth: null,
  position: 'bottom',
  rtlEnabled: false,
  shading: false,
  shadingColor: '',
  showCloseButton: isDesktop,
  showTitle: false,
  title: '',
  titleTemplate: 'title',
  width: 'auto',
  defaultVisible: true,
  visibleChange: () => {},
  isReactComponentWrapper: true
})));
import { convertRulesToOptions } from '../../../core/options/utils';
import { createRef as infernoCreateRef } from 'inferno';
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class Popover extends InfernoComponent {
  constructor(props) {
    super(props);
    this.domComponentWrapperRef = infernoCreateRef();
    this.__getterCache = {};
    this.state = {
      visible: this.props.visible !== undefined ? this.props.visible : this.props.defaultVisible
    };
    this.saveInstance = this.saveInstance.bind(this);
    this.setHideEventListener = this.setHideEventListener.bind(this);
  }
  createEffects() {
    return [new InfernoEffect(this.saveInstance, []), new InfernoEffect(this.setHideEventListener, [this.props.visibleChange])];
  }
  updateEffects() {
    var _this$_effects$, _this$_effects$2;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.visibleChange]);
  }
  saveInstance() {
    var _this$domComponentWra;
    this.instance = (_this$domComponentWra = this.domComponentWrapperRef.current) === null || _this$domComponentWra === void 0 ? void 0 : _this$domComponentWra.getInstance();
  }
  setHideEventListener() {
    this.instance.option('onHiding', () => {
      {
        var __newValue;
        this.setState(__state_argument => {
          __newValue = false;
          return {
            visible: __newValue
          };
        });
        this.props.visibleChange(__newValue);
      }
    });
  }
  get componentProps() {
    if (this.__getterCache['componentProps'] !== undefined) {
      return this.__getterCache['componentProps'];
    }
    return this.__getterCache['componentProps'] = (() => {
      var _this$props$visible = _extends({}, this.props, {
          visible: this.props.visible !== undefined ? this.props.visible : this.state.visible
        }),
        {
          children
        } = _this$props$visible,
        restProps = _objectWithoutPropertiesLoose(_this$props$visible, _excluded);
      return {
        children,
        restProps
      };
    })();
  }
  get restAttributes() {
    var _this$props$visible2 = _extends({}, this.props, {
        visible: this.props.visible !== undefined ? this.props.visible : this.state.visible
      }),
      restProps = _objectWithoutPropertiesLoose(_this$props$visible2, _excluded2);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate();
    if (this.props !== nextProps) {
      this.__getterCache['componentProps'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        visible: this.props.visible !== undefined ? this.props.visible : this.state.visible,
        contentTemplate: getTemplate(props.contentTemplate),
        titleTemplate: getTemplate(props.titleTemplate)
      }),
      domComponentWrapperRef: this.domComponentWrapperRef,
      componentProps: this.componentProps,
      restAttributes: this.restAttributes
    });
  }
}
function __processTwoWayProps(defaultProps) {
  var twoWayProps = ['visible'];
  return Object.keys(defaultProps).reduce((props, propName) => {
    var propValue = defaultProps[propName];
    var defaultPropName = twoWayProps.some(p => p === propName) ? 'default' + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}
Popover.defaultProps = PopoverProps;
var __defaultOptionRules = [];
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  Popover.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(Popover.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps(convertRulesToOptions(__defaultOptionRules)))));
}
