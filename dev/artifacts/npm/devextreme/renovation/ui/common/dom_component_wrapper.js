/**
* DevExtreme (renovation/ui/common/dom_component_wrapper.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.DomComponentWrapperProps = exports.DomComponentWrapper = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _config_context = require("../../common/config_context");
var _get_updated_options = require("./utils/get_updated_options");
var _excluded = ["valueChange"],
  _excluded2 = ["componentProps", "componentType", "templateNames"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var normalizeProps = function normalizeProps(props) {
  return Object.keys(props).reduce(function (accumulator, key) {
    if (props[key] !== undefined) {
      accumulator[key] = props[key];
    }
    return accumulator;
  }, {});
};
var viewFunction = function viewFunction(_ref) {
  var className = _ref.props.componentProps.className,
    restAttributes = _ref.restAttributes,
    widgetRef = _ref.widgetRef;
  return normalizeProps((0, _inferno.createVNode)(1, "div", className, null, 1, _extends({}, restAttributes), null, widgetRef));
};
exports.viewFunction = viewFunction;
var DomComponentWrapperProps = {};
exports.DomComponentWrapperProps = DomComponentWrapperProps;
var DomComponentWrapper = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(DomComponentWrapper, _InfernoComponent);
  function DomComponentWrapper(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.widgetRef = (0, _inferno.createRef)();
    _this.getInstance = _this.getInstance.bind(_assertThisInitialized(_this));
    _this.setupWidget = _this.setupWidget.bind(_assertThisInitialized(_this));
    _this.updateWidget = _this.updateWidget.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = DomComponentWrapper.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.setupWidget, []), new _inferno2.InfernoEffect(this.updateWidget, [this.props.componentProps, this.config, this.props.templateNames])];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.componentProps, this.config, this.props.templateNames]);
  };
  _proto.setupWidget = function setupWidget() {
    var _this2 = this;
    var componentInstance = new this.props.componentType(this.widgetRef.current, this.properties);
    this.instance = componentInstance;
    return function () {
      componentInstance.dispose();
      _this2.instance = null;
    };
  };
  _proto.updateWidget = function updateWidget() {
    var instance = this.getInstance();
    if (!instance) {
      return;
    }
    var updatedOptions = (0, _get_updated_options.getUpdatedOptions)(this.prevProps || {}, this.properties);
    if (updatedOptions.length) {
      instance.beginUpdate();
      updatedOptions.forEach(function (_ref2) {
        var path = _ref2.path,
          value = _ref2.value;
        instance.option(path, value);
      });
      instance.endUpdate();
    }
    this.prevProps = this.properties;
  };
  _proto.getInstance = function getInstance() {
    return this.instance;
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      widgetRef: this.widgetRef,
      config: this.config,
      properties: this.properties,
      restAttributes: this.restAttributes
    });
  };
  _createClass(DomComponentWrapper, [{
    key: "config",
    get: function get() {
      if (this.context[_config_context.ConfigContext.id]) {
        return this.context[_config_context.ConfigContext.id];
      }
      return _config_context.ConfigContext.defaultValue;
    }
  }, {
    key: "properties",
    get: function get() {
      var _this$config,
        _this3 = this;
      var normalizedProps = normalizeProps(this.props.componentProps);
      var valueChange = normalizedProps.valueChange,
        restProps = _objectWithoutProperties(normalizedProps, _excluded);
      var properties = _extends({
        rtlEnabled: !!((_this$config = this.config) !== null && _this$config !== void 0 && _this$config.rtlEnabled),
        isRenovated: true
      }, restProps);
      if (valueChange) {
        properties.onValueChanged = function (_ref3) {
          var value = _ref3.value;
          return valueChange(value);
        };
      }
      var templates = this.props.templateNames;
      templates.forEach(function (name) {
        if ((0, _inferno2.hasTemplate)(name, properties, _this3)) {
          properties[name] = function (item, index, container) {
            (0, _inferno2.renderTemplate)(_this3.props.componentProps[name], {
              item,
              index,
              container
            }, _this3);
          };
        }
      });
      return properties;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        componentProps = _this$props.componentProps,
        componentType = _this$props.componentType,
        templateNames = _this$props.templateNames,
        restProps = _objectWithoutProperties(_this$props, _excluded2);
      return restProps;
    }
  }]);
  return DomComponentWrapper;
}(_inferno2.InfernoComponent);
exports.DomComponentWrapper = DomComponentWrapper;
DomComponentWrapper.defaultProps = DomComponentWrapperProps;
