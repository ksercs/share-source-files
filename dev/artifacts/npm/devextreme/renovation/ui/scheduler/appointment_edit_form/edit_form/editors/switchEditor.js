/**
* DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/editors/switchEditor.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.SwitchEditorProps = exports.SwitchEditor = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _switch = require("../../../../editors/switch");
var _utils = require("../../../../../../core/options/utils");
var _excluded = ["value", "valueChange"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(_ref) {
  var onToggle = _ref.onToggle,
    value = _ref.value;
  return (0, _inferno.createComponentVNode)(2, _switch.Switch, {
    "value": value,
    "valueChange": onToggle
  });
};
exports.viewFunction = viewFunction;
var SwitchEditorProps = {};
exports.SwitchEditorProps = SwitchEditorProps;
var SwitchEditor = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(SwitchEditor, _InfernoComponent);
  function SwitchEditor(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {
      value: undefined
    };
    _this.initDate = _this.initDate.bind(_assertThisInitialized(_this));
    _this.onToggle = _this.onToggle.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = SwitchEditor.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.initDate, [])];
  };
  _proto.initDate = function initDate() {
    var _this2 = this;
    if (!this.state.value) {
      this.setState(function (__state_argument) {
        return {
          value: _this2.props.value
        };
      });
    }
  };
  _proto.onToggle = function onToggle(value) {
    this.setState(function (__state_argument) {
      return {
        value: value
      };
    });
    this.props.valueChange(value);
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      value: this.state.value,
      onToggle: this.onToggle,
      restAttributes: this.restAttributes
    });
  };
  _createClass(SwitchEditor, [{
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        value = _this$props.value,
        valueChange = _this$props.valueChange,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return SwitchEditor;
}(_inferno2.InfernoComponent);
exports.SwitchEditor = SwitchEditor;
SwitchEditor.defaultProps = SwitchEditorProps;
var __defaultOptionRules = [];
function defaultOptions(rule) {
  __defaultOptionRules.push(rule);
  SwitchEditor.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(SwitchEditor.defaultProps), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(__defaultOptionRules))));
}
