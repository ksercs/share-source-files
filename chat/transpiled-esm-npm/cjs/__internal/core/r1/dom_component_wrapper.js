"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomComponentWrapper = void 0;
var _inferno = require("inferno");
var _index = require("../../core/r1/runtime/inferno/index");
var _get_updated_options = require("../../core/r1/utils/get_updated_options");
var _extend = require("../../../core/utils/extend");
var _config_context = require("./config_context");
const _excluded = ["componentProps", "componentType", "templateNames"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const normalizeProps = props => Object.keys(props).reduce((accumulator, key) => {
  if (props[key] !== undefined) {
    accumulator[key] = props[key];
  }
  return accumulator;
}, {});
class DomComponentWrapper extends _index.InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.refs = null;
    this.widgetRef = (0, _inferno.createRef)();
    this.instance = null;
    this.prevProps = null;
    this.getInstance = this.getInstance.bind(this);
    this.setupWidget = this.setupWidget.bind(this);
    this.updateWidget = this.updateWidget.bind(this);
  }
  getConfig() {
    const {
      id
    } = _config_context.ConfigContext;
    if (this.context[id]) {
      return this.context[id];
    }
    return _config_context.ConfigContext.defaultValue;
  }
  render() {
    return normalizeProps((0, _inferno.createVNode)(1, "div", this.props.componentProps.className, null, 1, _extends({}, this.getRestAttributes()), null, this.widgetRef));
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate(nextProps, nextState, context);
  }
  createEffects() {
    return [new _index.InfernoEffect(this.setupWidget, []), new _index.InfernoEffect(this.updateWidget, [this.props.componentProps, this.getConfig(), this.props.templateNames])];
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
    const updatedOptions = (0, _get_updated_options.getUpdatedOptions)(this.prevProps ?? {}, this.getProperties());
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
    const properties = (0, _extend.extend)({
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
      if ((0, _index.hasTemplate)(name, properties, this)) {
        properties[name] = (item, index, container) => {
          (0, _index.renderTemplate)(this.props.componentProps[name], {
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
exports.DomComponentWrapper = DomComponentWrapper;