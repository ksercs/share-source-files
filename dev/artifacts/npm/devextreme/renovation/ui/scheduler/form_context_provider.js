/**
* DevExtreme (renovation/ui/scheduler/form_context_provider.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.FormContextProviderProps = exports.FormContextProvider = void 0;
var _inferno = require("@devextreme/runtime/inferno");
var _form_context = require("./form_context");
var _excluded = ["children", "formContextValue"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(viewModel) {
  return viewModel.props.children;
};
exports.viewFunction = viewFunction;
var FormContextProviderProps = {};
exports.FormContextProviderProps = FormContextProviderProps;
var FormContextProvider = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(FormContextProvider, _BaseInfernoComponent);
  function FormContextProvider(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.__getterCache = {};
    return _this;
  }
  var _proto = FormContextProvider.prototype;
  _proto.getChildContext = function getChildContext() {
    return _extends({}, this.context, {
      [_form_context.FormContext.id]: this.formContextValue || _form_context.FormContext.defaultValue
    });
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    if (this.props['formContextValue'] !== nextProps['formContextValue']) {
      this.__getterCache['formContextValue'] = undefined;
    }
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      formContextValue: this.formContextValue,
      restAttributes: this.restAttributes
    });
  };
  _createClass(FormContextProvider, [{
    key: "formContextValue",
    get: function get() {
      var _this2 = this;
      if (this.__getterCache['formContextValue'] !== undefined) {
        return this.__getterCache['formContextValue'];
      }
      return this.__getterCache['formContextValue'] = function () {
        return _this2.props.formContextValue;
      }();
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        children = _this$props.children,
        formContextValue = _this$props.formContextValue,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return FormContextProvider;
}(_inferno.BaseInfernoComponent);
exports.FormContextProvider = FormContextProvider;
FormContextProvider.defaultProps = FormContextProviderProps;
