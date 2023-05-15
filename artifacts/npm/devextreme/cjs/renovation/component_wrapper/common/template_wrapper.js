/**
* DevExtreme (cjs/renovation/component_wrapper/common/template_wrapper.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.TemplateWrapper = void 0;
exports.buildTemplateArgs = buildTemplateArgs;
var _inferno = require("@devextreme/runtime/inferno");
var _inferno2 = require("inferno");
var _shallow_equals = require("../../utils/shallow_equals");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _element = require("../../../core/element");
var _type = require("../../../core/utils/type");
var _common = require("../../../core/utils/common");
var _mutations_recording = require("./mutations_recording");
var _excluded = ["isEqual"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function isDxElementWrapper(element) {
  return !!element.toArray;
}
function buildTemplateArgs(model, template) {
  var _model$data;
  var args = {
    template: template,
    model: _extends({}, model)
  };
  var _ref = (_model$data = model.data) !== null && _model$data !== void 0 ? _model$data : {},
    isEqual = _ref.isEqual,
    data = _objectWithoutProperties(_ref, _excluded);
  if (isEqual) {
    args.model.data = data;
    args.isEqual = isEqual;
  }
  return args;
}
function buildTemplateContent(props, container) {
  var _props$model;
  var _ref2 = (_props$model = props.model) !== null && _props$model !== void 0 ? _props$model : {
      data: {}
    },
    data = _ref2.data,
    index = _ref2.index;
  if (data) {
    Object.keys(data).forEach(function (name) {
      if (data[name] && _dom_adapter.default.isNode(data[name])) {
        data[name] = (0, _element.getPublicElement)((0, _renderer.default)(data[name]));
      }
    });
  }
  var rendered = props.template.render(_extends({
    container: container,
    transclude: props.transclude
  }, {
    renovated: props.renovated
  }, !props.transclude ? {
    model: data
  } : {}, !props.transclude && Number.isFinite(index) ? {
    index: index
  } : {}));
  if (rendered === undefined) {
    return [];
  }
  return isDxElementWrapper(rendered) ? rendered.toArray() : [(0, _renderer.default)(rendered).get(0)];
}
var TemplateWrapper = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(TemplateWrapper, _InfernoComponent);
  function TemplateWrapper(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.cleanParent = _common.noop;
    _this.renderTemplate = _this.renderTemplate.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = TemplateWrapper.prototype;
  _proto.renderTemplate = function renderTemplate() {
    var _this2 = this;
    var node = (0, _inferno2.findDOMfromVNode)(this.$LI, true);
    var container = node.parentElement;
    this.cleanParent();
    this.cleanParent = (0, _mutations_recording.recordMutations)(container, function () {
      var content = buildTemplateContent(_this2.props, (0, _element.getPublicElement)((0, _renderer.default)(container)));
      if (content.length !== 0 && !(content.length === 1 && content[0] === container)) {
        node.after.apply(node, _toConsumableArray(content));
      }
    });
  };
  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var _this$props = this.props,
      model = _this$props.model,
      template = _this$props.template;
    var isEqual = nextProps.isEqual,
      nextModel = nextProps.model,
      nextTemplate = nextProps.template;
    var equalityComparer = isEqual !== null && isEqual !== void 0 ? isEqual : _shallow_equals.shallowEquals;
    if (template !== nextTemplate) {
      return true;
    }
    if (!(0, _type.isDefined)(model) || !(0, _type.isDefined)(nextModel)) {
      return model !== nextModel;
    }
    var data = model.data,
      index = model.index;
    var nextData = nextModel.data,
      nextIndex = nextModel.index;
    if (index !== nextIndex) {
      return true;
    }
    return !equalityComparer(data, nextData);
  };
  _proto.createEffects = function createEffects() {
    return [new _inferno.InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])];
  };
  _proto.updateEffects = function updateEffects() {
    this._effects[0].update([this.props.template, this.props.model]);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cleanParent();
  };
  _proto.render = function render() {
    return null;
  };
  return TemplateWrapper;
}(_inferno.InfernoComponent);
exports.TemplateWrapper = TemplateWrapper;
