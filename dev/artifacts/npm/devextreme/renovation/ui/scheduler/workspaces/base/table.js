/**
* DevExtreme (renovation/ui/scheduler/workspaces/base/table.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.TableProps = exports.Table = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _utils = require("../utils");
var _virtual_row = require("./virtual_row");
var _excluded = ["bottomVirtualRowHeight", "children", "className", "height", "leftVirtualCellCount", "leftVirtualCellWidth", "rightVirtualCellCount", "rightVirtualCellWidth", "tableRef", "topVirtualRowHeight", "virtualCellsCount", "width"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(_ref) {
  var hasBottomVirtualRow = _ref.hasBottomVirtualRow,
    hasTopVirtualRow = _ref.hasTopVirtualRow,
    _ref$props = _ref.props,
    bottomVirtualRowHeight = _ref$props.bottomVirtualRowHeight,
    children = _ref$props.children,
    className = _ref$props.className,
    leftVirtualCellCount = _ref$props.leftVirtualCellCount,
    leftVirtualCellWidth = _ref$props.leftVirtualCellWidth,
    rightVirtualCellCount = _ref$props.rightVirtualCellCount,
    rightVirtualCellWidth = _ref$props.rightVirtualCellWidth,
    tableRef = _ref$props.tableRef,
    topVirtualRowHeight = _ref$props.topVirtualRowHeight,
    virtualCellsCount = _ref$props.virtualCellsCount,
    style = _ref.style;
  return (0, _inferno.createVNode)(1, "table", className, (0, _inferno.createVNode)(1, "tbody", null, [hasTopVirtualRow && (0, _inferno.createComponentVNode)(2, _virtual_row.VirtualRow, {
    "height": topVirtualRowHeight,
    "cellsCount": virtualCellsCount,
    "leftVirtualCellWidth": leftVirtualCellWidth,
    "rightVirtualCellWidth": rightVirtualCellWidth,
    "leftVirtualCellCount": leftVirtualCellCount,
    "rightVirtualCellCount": rightVirtualCellCount
  }), children, hasBottomVirtualRow && (0, _inferno.createComponentVNode)(2, _virtual_row.VirtualRow, {
    "height": bottomVirtualRowHeight,
    "cellsCount": virtualCellsCount,
    "leftVirtualCellWidth": leftVirtualCellWidth,
    "rightVirtualCellWidth": rightVirtualCellWidth,
    "leftVirtualCellCount": leftVirtualCellCount,
    "rightVirtualCellCount": rightVirtualCellCount
  })], 0), 2, {
    "style": (0, _inferno2.normalizeStyles)(style)
  }, null, tableRef);
};
exports.viewFunction = viewFunction;
var TableProps = {
  className: '',
  topVirtualRowHeight: 0,
  bottomVirtualRowHeight: 0,
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  virtualCellsCount: 0
};
exports.TableProps = TableProps;
var Table = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(Table, _BaseInfernoComponent);
  function Table(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.elementRef = (0, _inferno.createRef)();
    return _this;
  }
  var _proto = Table.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      elementRef: this.elementRef,
      style: this.style,
      hasTopVirtualRow: this.hasTopVirtualRow,
      hasBottomVirtualRow: this.hasBottomVirtualRow,
      restAttributes: this.restAttributes
    });
  };
  _createClass(Table, [{
    key: "style",
    get: function get() {
      var _this$props = this.props,
        height = _this$props.height,
        width = _this$props.width;
      var style = this.restAttributes.style;
      var heightAdded = (0, _utils.addHeightToStyle)(height, style);
      return (0, _utils.addWidthToStyle)(width, heightAdded);
    }
  }, {
    key: "hasTopVirtualRow",
    get: function get() {
      var topVirtualRowHeight = this.props.topVirtualRowHeight;
      return !!topVirtualRowHeight;
    }
  }, {
    key: "hasBottomVirtualRow",
    get: function get() {
      var bottomVirtualRowHeight = this.props.bottomVirtualRowHeight;
      return !!bottomVirtualRowHeight;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
        bottomVirtualRowHeight = _this$props2.bottomVirtualRowHeight,
        children = _this$props2.children,
        className = _this$props2.className,
        height = _this$props2.height,
        leftVirtualCellCount = _this$props2.leftVirtualCellCount,
        leftVirtualCellWidth = _this$props2.leftVirtualCellWidth,
        rightVirtualCellCount = _this$props2.rightVirtualCellCount,
        rightVirtualCellWidth = _this$props2.rightVirtualCellWidth,
        tableRef = _this$props2.tableRef,
        topVirtualRowHeight = _this$props2.topVirtualRowHeight,
        virtualCellsCount = _this$props2.virtualCellsCount,
        width = _this$props2.width,
        restProps = _objectWithoutProperties(_this$props2, _excluded);
      return restProps;
    }
  }]);
  return Table;
}(_inferno2.BaseInfernoComponent);
exports.Table = Table;
Table.defaultProps = TableProps;
