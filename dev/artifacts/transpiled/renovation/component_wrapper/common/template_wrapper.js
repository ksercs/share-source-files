"use strict";

exports.TemplateWrapper = void 0;
exports.buildTemplateArgs = buildTemplateArgs;
var _inferno = require("@devextreme/runtime/inferno");
var _inferno2 = require("inferno");
var _dom = require("../../../core/utils/dom");
var _shallow_equals = require("../../utils/shallow_equals");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _element = require("../../../core/element");
var _type = require("../../../core/utils/type");
var _excluded = ["isEqual"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
    template,
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
function renderTemplateContent(props, container) {
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
    container,
    transclude: props.transclude
  }, {
    renovated: props.renovated
  }, !props.transclude ? {
    model: data
  } : {}, !props.transclude && Number.isFinite(index) ? {
    index
  } : {}));
  if (rendered === undefined) {
    return [];
  }
  return isDxElementWrapper(rendered) ? rendered.toArray() : [(0, _renderer.default)(rendered).get(0)];
}
function removeDifferentElements(oldChildren, newChildren) {
  newChildren.forEach(function (newElement) {
    var hasOldChild = !!oldChildren.find(function (oldElement) {
      return newElement === oldElement;
    });
    if (!hasOldChild && newElement.parentNode) {
      newElement.parentNode.removeChild(newElement);
    }
  });
}
var TemplateWrapper = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(TemplateWrapper, _InfernoComponent);
  function TemplateWrapper(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.renderTemplate = _this.renderTemplate.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = TemplateWrapper.prototype;
  _proto.renderTemplate = function renderTemplate() {
    var node = (0, _inferno2.findDOMfromVNode)(this.$LI, true);
    if (!(node !== null && node !== void 0 && node.parentNode)) {
      return function () {};
    }
    var container = node.parentNode;
    var $container = (0, _renderer.default)(container);
    var $oldContainerContent = $container.contents().toArray();
    var content = renderTemplateContent(this.props, (0, _element.getPublicElement)($container));
    (0, _dom.replaceWith)((0, _renderer.default)(node), (0, _renderer.default)(content));
    return function () {
      var $actualContainerContent = (0, _renderer.default)(container).contents().toArray();
      removeDifferentElements($oldContainerContent, $actualContainerContent);
      container.appendChild(node);
    };
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
  _proto.componentWillUnmount = function componentWillUnmount() {};
  _proto.render = function render() {
    return null;
  };
  return TemplateWrapper;
}(_inferno.InfernoComponent);
exports.TemplateWrapper = TemplateWrapper;