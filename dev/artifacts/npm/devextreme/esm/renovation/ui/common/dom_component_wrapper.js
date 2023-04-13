/**
* DevExtreme (esm/renovation/ui/common/dom_component_wrapper.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["valueChange"],
  _excluded2 = ["componentProps", "componentType", "templateNames"];
import { createVNode } from "inferno";
import { InfernoEffect, InfernoComponent } from '@devextreme/runtime/inferno';
import { renderTemplate, hasTemplate } from '@devextreme/runtime/inferno';
import { ConfigContext } from '../../common/config_context';
import { getUpdatedOptions } from './utils/get_updated_options';
var normalizeProps = props => Object.keys(props).reduce((accumulator, key) => {
  if (props[key] !== undefined) {
    accumulator[key] = props[key];
  }
  return accumulator;
}, {});
export var viewFunction = _ref => {
  var {
    props: {
      componentProps: {
        className
      }
    },
    restAttributes,
    widgetRef
  } = _ref;
  return normalizeProps(createVNode(1, "div", className, null, 1, _extends({}, restAttributes), null, widgetRef));
};
export var DomComponentWrapperProps = {};
import { createRef as infernoCreateRef } from 'inferno';
export class DomComponentWrapper extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.widgetRef = infernoCreateRef();
    this.getInstance = this.getInstance.bind(this);
    this.setupWidget = this.setupWidget.bind(this);
    this.updateWidget = this.updateWidget.bind(this);
  }
  get config() {
    if (this.context[ConfigContext.id]) {
      return this.context[ConfigContext.id];
    }
    return ConfigContext.defaultValue;
  }
  createEffects() {
    return [new InfernoEffect(this.setupWidget, []), new InfernoEffect(this.updateWidget, [this.props.componentProps, this.config, this.props.templateNames])];
  }
  updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.componentProps, this.config, this.props.templateNames]);
  }
  setupWidget() {
    var componentInstance = new this.props.componentType(this.widgetRef.current, this.properties);
    this.instance = componentInstance;
    return () => {
      componentInstance.dispose();
      this.instance = null;
    };
  }
  updateWidget() {
    var instance = this.getInstance();
    if (!instance) {
      return;
    }
    var updatedOptions = getUpdatedOptions(this.prevProps || {}, this.properties);
    if (updatedOptions.length) {
      instance.beginUpdate();
      updatedOptions.forEach(_ref2 => {
        var {
          path,
          value
        } = _ref2;
        instance.option(path, value);
      });
      instance.endUpdate();
    }
    this.prevProps = this.properties;
  }
  get properties() {
    var _this$config;
    var normalizedProps = normalizeProps(this.props.componentProps);
    var {
        valueChange
      } = normalizedProps,
      restProps = _objectWithoutPropertiesLoose(normalizedProps, _excluded);
    var properties = _extends({
      rtlEnabled: !!((_this$config = this.config) !== null && _this$config !== void 0 && _this$config.rtlEnabled),
      isRenovated: true
    }, restProps);
    if (valueChange) {
      properties.onValueChanged = _ref3 => {
        var {
          value
        } = _ref3;
        return valueChange(value);
      };
    }
    var templates = this.props.templateNames;
    templates.forEach(name => {
      if (hasTemplate(name, properties, this)) {
        properties[name] = (item, index, container) => {
          renderTemplate(this.props.componentProps[name], {
            item,
            index,
            container
          }, this);
        };
      }
    });
    return properties;
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded2);
    return restProps;
  }
  getInstance() {
    return this.instance;
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      widgetRef: this.widgetRef,
      config: this.config,
      properties: this.properties,
      restAttributes: this.restAttributes
    });
  }
}
DomComponentWrapper.defaultProps = DomComponentWrapperProps;
