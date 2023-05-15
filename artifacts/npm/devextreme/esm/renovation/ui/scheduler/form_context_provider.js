/**
* DevExtreme (esm/renovation/ui/scheduler/form_context_provider.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["children", "formContextValue"];
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { FormContext } from './form_context';
export var viewFunction = viewModel => viewModel.props.children;
export var FormContextProviderProps = {};
export class FormContextProvider extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.__getterCache = {};
  }
  getChildContext() {
    return _extends({}, this.context, {
      [FormContext.id]: this.formContextValue || FormContext.defaultValue
    });
  }
  get formContextValue() {
    if (this.__getterCache['formContextValue'] !== undefined) {
      return this.__getterCache['formContextValue'];
    }
    return this.__getterCache['formContextValue'] = (() => {
      return this.props.formContextValue;
    })();
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    if (this.props['formContextValue'] !== nextProps['formContextValue']) {
      this.__getterCache['formContextValue'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      formContextValue: this.formContextValue,
      restAttributes: this.restAttributes
    });
  }
}
FormContextProvider.defaultProps = FormContextProviderProps;
