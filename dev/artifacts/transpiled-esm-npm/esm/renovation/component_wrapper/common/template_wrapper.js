import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["isEqual"];
import { InfernoComponent, InfernoEffect } from '@devextreme/runtime/inferno';
import { findDOMfromVNode } from 'inferno';
import { shallowEquals } from '../../utils/shallow_equals';
import $ from '../../../core/renderer';
import domAdapter from '../../../core/dom_adapter';
import { getPublicElement } from '../../../core/element';
import { isDefined } from '../../../core/utils/type';
import { noop } from '../../../core/utils/common';
import { recordMutations } from './mutations_recording';
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
function buildTemplateContent(props, container) {
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
export class TemplateWrapper extends InfernoComponent {
  constructor(props) {
    super(props);
    this.cleanParent = noop;
    this.renderTemplate = this.renderTemplate.bind(this);
  }
  renderTemplate() {
    var node = findDOMfromVNode(this.$LI, true);
    var container = node.parentElement;
    this.cleanParent();
    this.cleanParent = recordMutations(container, () => {
      var content = buildTemplateContent(this.props, getPublicElement($(container)));
      if (content.length !== 0 && !(content.length === 1 && content[0] === container)) {
        node.after(...content);
      }
    });
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
  componentWillUnmount() {
    this.cleanParent();
  }
  render() {
    return null;
  }
}