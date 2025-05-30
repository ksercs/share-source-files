/**
* DevExtreme (renovation/ui/scheduler/workspaces/base/group_panel/group_panel.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.GroupPanelProps = exports.GroupPanel = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _utils = require("../../utils");
var _group_panel_props = require("./group_panel_props");
var _layout = require("./vertical/layout");
var _layout2 = require("./horizontal/layout");
var _consts = require("../../../consts");
var _excluded = ["className", "elementRef", "groupByDate", "groupOrientation", "groupPanelData", "groups", "height", "resourceCellTemplate"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var viewFunction = function viewFunction(_ref) {
  var isVerticalLayout = _ref.isVerticalLayout,
    _ref$props = _ref.props,
    className = _ref$props.className,
    elementRef = _ref$props.elementRef,
    groupPanelData = _ref$props.groupPanelData,
    height = _ref$props.height,
    resourceCellTemplate = _ref$props.resourceCellTemplate,
    restAttributes = _ref.restAttributes;
  return isVerticalLayout ? (0, _inferno.createComponentVNode)(2, _layout.GroupPanelVerticalLayout, {
    "height": height,
    "resourceCellTemplate": resourceCellTemplate,
    "className": className,
    "groupPanelData": groupPanelData,
    "elementRef": elementRef,
    "styles": restAttributes.style
  }) : (0, _inferno.createComponentVNode)(2, _layout2.GroupPanelHorizontalLayout, {
    "height": height,
    "resourceCellTemplate": resourceCellTemplate,
    "className": className,
    "groupPanelData": groupPanelData,
    "elementRef": elementRef,
    "styles": restAttributes.style
  });
};
exports.viewFunction = viewFunction;
var GroupPanelProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_group_panel_props.GroupPanelBaseProps), Object.getOwnPropertyDescriptors({
  groups: Object.freeze([]),
  groupOrientation: _consts.VERTICAL_GROUP_ORIENTATION
})));
exports.GroupPanelProps = GroupPanelProps;
var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};
var GroupPanel = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(GroupPanel, _InfernoWrapperCompon);
  function GroupPanel(props) {
    var _this;
    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = GroupPanel.prototype;
  _proto.createEffects = function createEffects() {
    return [(0, _inferno2.createReRenderEffect)()];
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        resourceCellTemplate: getTemplate(props.resourceCellTemplate)
      }),
      isVerticalLayout: this.isVerticalLayout,
      restAttributes: this.restAttributes
    });
  };
  _createClass(GroupPanel, [{
    key: "isVerticalLayout",
    get: function get() {
      var _this$props = this.props,
        groupOrientation = _this$props.groupOrientation,
        groups = _this$props.groups;
      return (0, _utils.isVerticalGroupingApplied)(groups, groupOrientation);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
        className = _this$props2.className,
        elementRef = _this$props2.elementRef,
        groupByDate = _this$props2.groupByDate,
        groupOrientation = _this$props2.groupOrientation,
        groupPanelData = _this$props2.groupPanelData,
        groups = _this$props2.groups,
        height = _this$props2.height,
        resourceCellTemplate = _this$props2.resourceCellTemplate,
        restProps = _objectWithoutProperties(_this$props2, _excluded);
      return restProps;
    }
  }]);
  return GroupPanel;
}(_inferno2.InfernoWrapperComponent);
exports.GroupPanel = GroupPanel;
GroupPanel.defaultProps = GroupPanelProps;
