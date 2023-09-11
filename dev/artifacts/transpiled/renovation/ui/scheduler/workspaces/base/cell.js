"use strict";

exports.viewFunction = exports.CellBaseProps = exports.CellBase = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _utils = require("../utils");
var _excluded = ["allDay", "ariaLabel", "children", "className", "contentTemplateProps", "endDate", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "startDate", "text"];
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
  return (0, _inferno.createVNode)(1, "td", viewModel.classes, viewModel.props.children, 0, {
    "aria-label": viewModel.props.ariaLabel
  });
};
exports.viewFunction = viewFunction;
var CellBaseProps = {
  className: '',
  isFirstGroupCell: false,
  isLastGroupCell: false,
  startDate: Object.freeze(new Date()),
  endDate: Object.freeze(new Date()),
  allDay: false,
  text: '',
  index: 0,
  contentTemplateProps: Object.freeze({
    data: {},
    index: 0
  })
};
exports.CellBaseProps = CellBaseProps;
var CellBase = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(CellBase, _BaseInfernoComponent);
  function CellBase(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = CellBase.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  };
  _createClass(CellBase, [{
    key: "classes",
    get: function get() {
      var _this$props = this.props,
        className = _this$props.className,
        isFirstGroupCell = _this$props.isFirstGroupCell,
        isLastGroupCell = _this$props.isLastGroupCell;
      return (0, _utils.getGroupCellClasses)(isFirstGroupCell, isLastGroupCell, className);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
        allDay = _this$props2.allDay,
        ariaLabel = _this$props2.ariaLabel,
        children = _this$props2.children,
        className = _this$props2.className,
        contentTemplateProps = _this$props2.contentTemplateProps,
        endDate = _this$props2.endDate,
        groupIndex = _this$props2.groupIndex,
        groups = _this$props2.groups,
        index = _this$props2.index,
        isFirstGroupCell = _this$props2.isFirstGroupCell,
        isLastGroupCell = _this$props2.isLastGroupCell,
        startDate = _this$props2.startDate,
        text = _this$props2.text,
        restProps = _objectWithoutProperties(_this$props2, _excluded);
      return restProps;
    }
  }]);
  return CellBase;
}(_inferno2.BaseInfernoComponent);
exports.CellBase = CellBase;
CellBase.defaultProps = CellBaseProps;