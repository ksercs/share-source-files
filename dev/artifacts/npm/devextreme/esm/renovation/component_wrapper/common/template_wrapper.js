/**
* DevExtreme (esm/renovation/component_wrapper/common/template_wrapper.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["isEqual"];
import { InfernoComponent, InfernoEffect } from '@devextreme/runtime/inferno';
import { findDOMfromVNode } from 'inferno';
import { replaceWith } from '../../../core/utils/dom';
import { shallowEquals } from '../../utils/shallow_equals';
import $ from '../../../core/renderer';
import domAdapter from '../../../core/dom_adapter';
import { getPublicElement } from '../../../core/element';
import { isDefined } from '../../../core/utils/type';
function isDxElementWrapper(element) {
  return !!element.toArray;
}
export function buildTemplateArgs(model, template) {
  var _model$data;
  var args = {
    template,
    model: _extends({}, model)
  };
  var _ref = (_model$data = model.data) !== null && _model$data !== void 0 ? _model$data : {},
    {
      isEqual
    } = _ref,
    data = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (isEqual) {
    args.model.data = data;
    args.isEqual = isEqual;
  }
  return args;
}
function renderTemplateContent(props, container) {
  var _props$model;
  var {
    data,
    index
  } = (_props$model = props.model) !== null && _props$model !== void 0 ? _props$model : {
    data: {}
  };
  if (data) {
    Object.keys(data).forEach(name => {
      if (data[name] && domAdapter.isNode(data[name])) {
        data[name] = getPublicElement($(data[name]));
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
  return isDxElementWrapper(rendered) ? rendered.toArray() : [$(rendered).get(0)];
}
function removeDifferentElements(oldChildren, newChildren) {
  newChildren.forEach(newElement => {
    var hasOldChild = !!oldChildren.find(oldElement => newElement === oldElement);
    if (!hasOldChild && newElement.parentNode) {
      newElement.parentNode.removeChild(newElement);
    }
  });
}
export class TemplateWrapper extends InfernoComponent {
  constructor(props) {
    super(props);
    this.renderTemplate = this.renderTemplate.bind(this);
  }
  renderTemplate() {
    var node = findDOMfromVNode(this.$LI, true);
    if (!(node !== null && node !== void 0 && node.parentNode)) {
      return () => {};
    }
    var container = node.parentNode;
    var $container = $(container);
    var $oldContainerContent = $container.contents().toArray();
    var content = renderTemplateContent(this.props, getPublicElement($container));
    replaceWith($(node), $(content));
    return () => {
      var $actualContainerContent = $(container).contents().toArray();
      removeDifferentElements($oldContainerContent, $actualContainerContent);
      container.appendChild(node);
    };
  }
  shouldComponentUpdate(nextProps) {
    var {
      model,
      template
    } = this.props;
    var {
      isEqual,
      model: nextModel,
      template: nextTemplate
    } = nextProps;
    var equalityComparer = isEqual !== null && isEqual !== void 0 ? isEqual : shallowEquals;
    if (template !== nextTemplate) {
      return true;
    }
    if (!isDefined(model) || !isDefined(nextModel)) {
      return model !== nextModel;
    }
    var {
      data,
      index
    } = model;
    var {
      data: nextData,
      index: nextIndex
    } = nextModel;
    if (index !== nextIndex) {
      return true;
    }
    return !equalityComparer(data, nextData);
  }
  createEffects() {
    return [new InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])];
  }
  updateEffects() {
    this._effects[0].update([this.props.template, this.props.model]);
  }
  componentWillUnmount() {}
  render() {
    return null;
  }
}
