import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["componentProps", "componentType", "templateNames"];
import { createVNode } from "inferno";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { hasTemplate, InfernoComponent, InfernoEffect, renderTemplate } from '../../core/r1/runtime/inferno/index';
import { getUpdatedOptions } from '../../core/r1/utils/get_updated_options';
import { createRef } from 'inferno';
import { extend } from '../../../core/utils/extend';
import { ConfigContext } from './config_context';
const normalizeProps = props => Object.keys(props).reduce((accumulator, key) => {
  if (props[key] !== undefined) {
    accumulator[key] = props[key];
  }
  return accumulator;
}, {});
export class DomComponentWrapper extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.refs = null;
    this.widgetRef = createRef();
    this.instance = null;
    this.prevProps = null;
    this.getInstance = this.getInstance.bind(this);
    this.setupWidget = this.setupWidget.bind(this);
    this.updateWidget = this.updateWidget.bind(this);
  }
  getConfig() {
    const {
      id
    } = ConfigContext;
    if (this.context[id]) {
      return this.context[id];
    }
    return ConfigContext.defaultValue;
  }
  render() {
    return normalizeProps(createVNode(1, "div", this.props.componentProps.className, null, 1, _extends({}, this.getRestAttributes()), null, this.widgetRef));
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate(nextProps, nextState, context);
  }
  createEffects() {
    return [new InfernoEffect(this.setupWidget, []), new InfernoEffect(this.updateWidget, [this.props.componentProps, this.getConfig(), this.props.templateNames])];
  }
  updateEffects() {
    var _this$_effects$;
    const dependency = [this.props.componentProps, this.getConfig(), this.props.templateNames];
    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 || _this$_effects$.update(dependency);
  }
  setupWidget() {
    const current = this.widgetRef.current;
    // eslint-disable-next-line new-cap
    const componentInstance = new this.props.componentType(current, this.getProperties());
    this.instance = componentInstance;
    return () => {
      componentInstance.dispose();
      this.instance = null;
    };
  }
  updateWidget() {
    if (!this.instance) {
      return;
    }
    const updatedOptions = getUpdatedOptions(this.prevProps ?? {}, this.getProperties());
    if (updatedOptions.length) {
      this.instance.beginUpdate();
      updatedOptions.forEach(_ref2 => {
        var _this$instance;
        const {
          path,
          value
        } = _ref2;
        (_this$instance = this.instance) === null || _this$instance === void 0 || _this$instance.option(path, value);
      });
      this.instance.endUpdate();
    }
    this.prevProps = this.getProperties();
  }
  getRestAttributes() {
    const _this$props = this.props,
      restAttr = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restAttr;
  }
  getProperties() {
    var _this$getConfig;
    const normalizedProps = normalizeProps(this.props.componentProps);
    const {
      valueChange
    } = normalizedProps;
    const properties = extend({
      rtlEnabled: (_this$getConfig = this.getConfig()) === null || _this$getConfig === void 0 ? void 0 : _this$getConfig.rtlEnabled,
      isRenovated: true
    }, normalizedProps);
    if (valueChange) {
      properties.onValueChanged = _ref3 => {
        const {
          value
        } = _ref3;
        return valueChange(value);
      };
    }
    const templates = this.props.templateNames;
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
  getInstance() {
    return this.instance;
  }
}