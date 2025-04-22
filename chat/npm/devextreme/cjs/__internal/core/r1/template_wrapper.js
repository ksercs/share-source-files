/**
* DevExtreme (cjs/__internal/core/r1/template_wrapper.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTemplateArgs = exports.TemplateWrapper = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _dom = require("../../../core/utils/dom");
var _type = require("../../../core/utils/type");
var _index = require("../../core/r1/runtime/inferno/index");
var _inferno = require("inferno");
var _shallow_equals = require("./utils/shallow_equals");
const _excluded = ["isEqual"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const isDxElementWrapper = element => !!element.toArray;
const buildTemplateArgs = (model, template) => {
  const args = {
    template,
    model: _extends({}, model)
  };
  const _ref = model.data ?? {},
    {
      isEqual
    } = _ref,
    data = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (isEqual) {
    args.model.data = data;
    args.isEqual = isEqual;
  }
  return args;
};
exports.buildTemplateArgs = buildTemplateArgs;
const renderTemplateContent = (props, container) => {
  const {
    data,
    index
  } = props.model ?? {
    data: {}
  };
  if (data) {
    Object.keys(data).forEach(name => {
      if (data[name] && _dom_adapter.default.isNode(data[name])) {
        data[name] = (0, _element.getPublicElement)((0, _renderer.default)(data[name]));
      }
    });
  }
  const rendered = props.template.render(_extends({
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
};
const removeDifferentElements = (oldChildren, newChildren) => {
  newChildren.forEach(newElement => {
    const hasOldChild = !!oldChildren.find(oldElement => newElement === oldElement);
    if (!hasOldChild && newElement.parentNode) {
      (0, _renderer.default)(newElement).remove();
    }
  });
};
class TemplateWrapper extends _index.InfernoComponent {
  constructor(props) {
    super(props);
    this.renderTemplate = this.renderTemplate.bind(this);
  }
  renderTemplate() {
    const node = (0, _inferno.findDOMFromVNode)(this.$LI, true);
    /* istanbul ignore next */
    if (!(node !== null && node !== void 0 && node.parentNode)) {
      return () => {};
    }
    const container = node.parentNode;
    const $container = (0, _renderer.default)(container);
    const $oldContainerContent = $container.contents().toArray();
    const content = renderTemplateContent(this.props, (0, _element.getPublicElement)($container));
    // TODO Vinogradov: Fix the renderer function type.
    // @ts-expect-error The renderer function's argument hasn't the full range of possible types
    // (the Element[] type is missing).
    (0, _dom.replaceWith)((0, _renderer.default)(node), (0, _renderer.default)(content));
    // NOTE: This is a dispose method that called before renderTemplate.
    return () => {
      const $actualContainerContent = (0, _renderer.default)(container).contents().toArray();
      removeDifferentElements($oldContainerContent, $actualContainerContent);
      container.appendChild(node);
    };
  }
  shouldComponentUpdate(nextProps) {
    const {
      template,
      model
    } = this.props;
    const {
      template: nextTemplate,
      model: nextModel,
      isEqual
    } = nextProps;
    const equalityComparer = isEqual ?? _shallow_equals.shallowEquals;
    if (template !== nextTemplate) {
      return true;
    }
    if (!(0, _type.isDefined)(model) || !(0, _type.isDefined)(nextModel)) {
      return model !== nextModel;
    }
    const {
      data,
      index
    } = model;
    const {
      data: nextData,
      index: nextIndex
    } = nextModel;
    if (index !== nextIndex) {
      return true;
    }
    if (!(0, _type.isDefined)(data) || !(0, _type.isDefined)(nextData)) {
      return model !== nextModel;
    }
    return !equalityComparer(data, nextData);
  }
  createEffects() {
    return [new _index.InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])];
  }
  updateEffects() {
    this._effects[0].update([this.props.template, this.props.model]);
  }
  // NOTE: Prevent nodes clearing on unmount.
  //       Nodes will be destroyed by inferno on markup update
  componentWillUnmount() {}
  render() {
    return null;
  }
}
exports.TemplateWrapper = TemplateWrapper;
