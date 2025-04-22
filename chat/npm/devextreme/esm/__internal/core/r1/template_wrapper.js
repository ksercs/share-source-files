/**
* DevExtreme (esm/__internal/core/r1/template_wrapper.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["isEqual"];
import domAdapter from '../../../core/dom_adapter';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { replaceWith } from '../../../core/utils/dom';
import { isDefined } from '../../../core/utils/type';
import { InfernoComponent, InfernoEffect } from '../../core/r1/runtime/inferno/index';
import { findDOMFromVNode } from 'inferno';
import { shallowEquals } from './utils/shallow_equals';
const isDxElementWrapper = element => !!element.toArray;
export const buildTemplateArgs = (model, template) => {
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
const renderTemplateContent = (props, container) => {
  const {
    data,
    index
  } = props.model ?? {
    data: {}
  };
  if (data) {
    Object.keys(data).forEach(name => {
      if (data[name] && domAdapter.isNode(data[name])) {
        data[name] = getPublicElement($(data[name]));
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
  return isDxElementWrapper(rendered) ? rendered.toArray() : [$(rendered).get(0)];
};
const removeDifferentElements = (oldChildren, newChildren) => {
  newChildren.forEach(newElement => {
    const hasOldChild = !!oldChildren.find(oldElement => newElement === oldElement);
    if (!hasOldChild && newElement.parentNode) {
      $(newElement).remove();
    }
  });
};
export class TemplateWrapper extends InfernoComponent {
  constructor(props) {
    super(props);
    this.renderTemplate = this.renderTemplate.bind(this);
  }
  renderTemplate() {
    const node = findDOMFromVNode(this.$LI, true);
    /* istanbul ignore next */
    if (!(node !== null && node !== void 0 && node.parentNode)) {
      return () => {};
    }
    const container = node.parentNode;
    const $container = $(container);
    const $oldContainerContent = $container.contents().toArray();
    const content = renderTemplateContent(this.props, getPublicElement($container));
    // TODO Vinogradov: Fix the renderer function type.
    // @ts-expect-error The renderer function's argument hasn't the full range of possible types
    // (the Element[] type is missing).
    replaceWith($(node), $(content));
    // NOTE: This is a dispose method that called before renderTemplate.
    return () => {
      const $actualContainerContent = $(container).contents().toArray();
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
    const equalityComparer = isEqual ?? shallowEquals;
    if (template !== nextTemplate) {
      return true;
    }
    if (!isDefined(model) || !isDefined(nextModel)) {
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
    if (!isDefined(data) || !isDefined(nextData)) {
      return model !== nextModel;
    }
    return !equalityComparer(data, nextData);
  }
  createEffects() {
    return [new InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])];
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
